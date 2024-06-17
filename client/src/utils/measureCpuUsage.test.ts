import { getCpuUsage, measureCpuUsage } from './measureCpuUsage';

describe('getCpuUsage', () => {
  test('should return a number between 0 and 100', () => {
    const usage = getCpuUsage();
    expect(usage).toBeGreaterThanOrEqual(0);
    expect(usage).toBeLessThanOrEqual(100);
  });
});

describe('measureCpuUsage', () => {
  test('should calculate average usage correctly', () => {
    expect(measureCpuUsage(300, 3)).toEqual(100);
    expect(measureCpuUsage(150, 3)).toEqual(50);
  });

  test('should handle division by zero', () => {
    expect(measureCpuUsage(0, 0)).toBeNaN();
  });
});
