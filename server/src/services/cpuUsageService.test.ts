import cpuUsage from "../models/cpuUsage";
import { getCpuUsageByClient, getHighCpuUsageClients, getRecentCpuUsage, saveCpuUsage } from "./cpuUsageService";
import * as redisService from './redisService';

const mockUsageData = [{ clientId: 'client1', usage: 95, timestamp: new Date() }];
const mockAggregationResults = [{ _id: 'client1', averageUsage: 85 }];

jest.mock('./redisService', () => ({
  ...jest.requireActual('./redisService'),  
  setRedisKey: jest.fn(),
  getRedisKeys: jest.fn(() => Promise.resolve(['cpuUsage_client1', 'cpuUsage_client2'])),
  getRedisValue: jest.fn((key) => Promise.resolve(key.includes('client1') ? '85' : '90')),
}));

// Mocking the model's constructor to return an object with a mock save method
const mockSave = jest.fn().mockResolvedValue({});
const mockFind = jest.fn().mockImplementation(() => ({
    sort: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue(mockUsageData)
}));
const mockAggregate = jest.fn().mockReturnValue(mockAggregationResults);

jest.mock('../models/cpuUsage', () => {
    return jest.fn().mockImplementation(() => ({
        save: mockSave
    }));
})

//Because these are static methods
cpuUsage.find = mockFind;
cpuUsage.aggregate = mockAggregate;

describe("CpusageService Experiment", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("saveCpuUsage() should save the data in redis and mongo", async () => {
        const clientId = 'client1';
        const usage = 82;

        await saveCpuUsage(clientId, usage);

        expect(redisService.setRedisKey).toHaveBeenCalledWith(
            `cpuUsage_${clientId}`,
            usage,
            3600
        );
        expect(mockSave).toHaveBeenCalled();
    }, 10000)

    test("saveCpuUsage() should handle error when saving to Redis", async () => {
        (redisService.setRedisKey as jest.Mock).mockRejectedValueOnce(new Error("Save CpuUsage Error"));
        const clientId = 'client2';
        const usage = 90;

        await expect(saveCpuUsage(clientId, usage)).rejects.toThrow("Save CpuUsage Error");
    });

    test('getRecentCpuUsage() should retrieve recent CPU usage from Redis', async () => {
        // Debug: Print to check if mocks are set correctly
        console.log('isMockFunction getRedisKeys:', jest.isMockFunction(redisService.getRedisKeys));
        console.log('isMockFunction getRedisValue:', jest.isMockFunction(redisService.getRedisValue));

        const results = await getRecentCpuUsage();
        expect(redisService.getRedisKeys).toHaveBeenCalled();
        expect(redisService.getRedisValue).toHaveBeenCalledTimes(2);
        expect(results).toEqual([
          { clientId: 'cpuUsage_client1', usage: '85' },
          { clientId: 'cpuUsage_client2', usage: '90' }
        ]);
    });

    test('getCpuUsageByClient should query CPU usage by client ID', async () => {
        const clientId = 'client1';
    
        const results = await getCpuUsageByClient(clientId);
    
        expect(mockFind).toHaveBeenCalledWith({ clientId });
        expect(results).toEqual(mockUsageData);
    });

    test("getCpuUsageByClient should handle no data found", async () => {
        mockFind.mockImplementationOnce(() => ({
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue([])
        }));
        const clientId = 'client4';

        const results = await getCpuUsageByClient(clientId);

        expect(mockFind).toHaveBeenCalledWith({ clientId });
        expect(results).toEqual([]);
    });

    test("getCpuUsageByClient should throw error if get query fails", async () => {
        mockFind.mockImplementationOnce(() => ({
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockRejectedValueOnce(new Error('Failed to get data'))
        }));
        const clientId = 'client4';
        await expect(getCpuUsageByClient(clientId)).rejects.toThrow("Failed to get data");
    });

    test('getHighCpuUsageClients should find clients with high CPU usage', async () => {
        const threshold = 80;
        const results = await getHighCpuUsageClients(threshold);

        expect(cpuUsage.aggregate).toHaveBeenCalledWith([
            { $match: { usage: { $gt: threshold } } },
            { $group: { _id: "$clientId", averageUsage: { $avg: "$usage" } } },
            { $sort: { averageUsage: -1 } }
        ]);
        expect(results).toEqual(mockAggregationResults);
    });

    test("getHighCpuUsageClients should handle no high usage clients", async () => {
        (cpuUsage.aggregate as jest.Mock).mockResolvedValueOnce([]);
        const threshold = 90;
        const results = await getHighCpuUsageClients(threshold);

        expect(cpuUsage.aggregate).toHaveBeenCalledWith([
            { $match: { usage: { $gt: threshold } } },
            { $group: { _id: "$clientId", averageUsage: { $avg: "$usage" } } },
            { $sort: { averageUsage: -1 } }
        ]);
        expect(results).toEqual([]);
    });
})