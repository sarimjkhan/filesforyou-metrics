//import redisClient from '../redisClient';
import { getRedisKeys, getRedisValue, setRedisKey } from './redisService';

jest.mock('redis', () => ({
  createClient: jest.fn().mockReturnValue({
    connect: jest.fn(),
    get: jest.fn().mockResolvedValue('{"usage": 50}'),
    set: jest.fn().mockResolvedValue(true),
    on: jest.fn(),
    disconnect: jest.fn(),
    isOpen: true,
    keys: jest.fn().mockResolvedValue(['key1', 'key2'])
  })
}));

describe('Redis Service', () => {
  test('setRedisKey(),getRedisValue() sets and retrieves values correctly', async () => {
    const key = 'testKey';
    const value = { usage: 50 };

    await setRedisKey(key, value, 3600);
    const result = await getRedisValue(key);

    expect(result).toEqual(value);
  });

  test('getRedisKeys() retrieves all keys correctly', async () => {
    const result = await getRedisKeys('k*');
    expect(result).toEqual(['key1', 'key2']);
  });
});
