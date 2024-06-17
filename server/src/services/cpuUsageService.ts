import { SYSTEM_CONFIGS } from "../configs/systemConfig";
import cpuUsage from "../models/cpuUsage";
import { getRedisKeys, getRedisValue, setRedisKey } from "./redisService";

export const saveCpuUsage = async (clientId: string, usage: number) => {
    const redisKey = `${SYSTEM_CONFIGS.CPU_USAGE_KEY_PREFIX}${clientId}`;
    try {
        await setRedisKey(redisKey, usage, 3600);

        const newCpuUsage = new cpuUsage({
            clientId,
            usage,
            timestamp: new Date()
        });
        console.log("saving to mongodb");
        await newCpuUsage.save();
    } catch (error) {
        console.error('Failed to save cpu usage:', error);
        throw error;
    }
};

export const getRecentCpuUsage = async () => {
    const keys = await getRedisKeys('cpuUsage_*');
    return Promise.all(keys.map(async (key) => {
        const value = await getRedisValue(key);
        return { clientId: key, usage: value };
    }));
};

export const getCpuUsageByClient = async (clientId: string, startTime?: Date, endTime?: Date, limit: number = 10) => {
    const query: any = { clientId };
    if (startTime) query.timestamp = { $gte: startTime };
    if (endTime) {
        if (!query.timestamp) query.timestamp = {};
        query.timestamp.$lte = endTime;
    }

    try {
        return cpuUsage.find(query).sort({usage: -1}).limit(limit)
    } catch (err) {
        console.error("Failed to get cpu usage by client: ", err);
    }
};

export const getHighCpuUsageClients = async (threshold: number, startTime?: Date, endTime?: Date) => {
    const match: any = { usage: { $gt: threshold } };
    if (startTime) match.timestamp = { $gte: startTime };
    if (endTime) {
        if (!match.timestamp) match.timestamp = {};
        match.timestamp.$lte = endTime;
    }

    try {
        return cpuUsage.aggregate([
            { $match: match },
            { $group: { _id: "$clientId", averageUsage: { $avg: "$usage" } } },
            { $sort: { averageUsage: -1 } }
        ]);
    } catch (err) {
        console.error('Failed to get clients with high cpu usage: ', err);
    }
};