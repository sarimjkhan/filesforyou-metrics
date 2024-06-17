import { createClient } from 'redis';
import { SYSTEM_CONFIGS } from '../configs/systemConfig';

const redisClient = createClient({
    url: SYSTEM_CONFIGS.REDIS_URL
});

redisClient.on('error', (err) => {
    console.error('Redis client error: ', err);
});

(async () => {
    await redisClient.connect();
})();

export const setRedisKey = async (key: string, value: any, expiry: number) => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
    await redisClient.set(key, JSON.stringify(value), {
        EX: expiry
    });
};

export const getRedisKeys = async (pattern: string) => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
    return await redisClient.keys(pattern);
};

export const getRedisValue = async (key: string) => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
};

export const closeConnection = async () => {
    redisClient.disconnect();
}