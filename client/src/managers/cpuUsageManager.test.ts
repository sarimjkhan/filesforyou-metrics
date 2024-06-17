import { collectUsage, sendUsageToServer } from "./cpuUsageManager";
import { getCpuUsage, measureCpuUsage } from "../utils/measureCpuUsage";

jest.mock('../utils/measureCpuUsage', () => ({
  getCpuUsage: jest.fn(() => 50),
  measureCpuUsage: jest.fn( () => 50)
}));

describe('CPU Usage receiving and emitting', () => {
    it('collects usage data correctly', () => {
        collectUsage();
        expect(getCpuUsage).toHaveBeenCalled();
    });

    it('sends usage data correctly', () => {
      const emitMock = jest.fn();
      sendUsageToServer(emitMock);
      expect(emitMock).toHaveBeenCalledWith(50);
      expect(measureCpuUsage).toHaveBeenCalledWith(expect.any(Number), expect.any(Number));
    });
})