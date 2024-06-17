import { getCpuUsage, measureCpuUsage } from "../utils/measureCpuUsage";

let totalUsage: number = 0;
let count: number = 0;

export const collectUsage = () => {
    const currentUsage: number = getCpuUsage();
    totalUsage += currentUsage;
    count++;
}

export const sendUsageToServer = (emitUsage: (usage: number) => void) => {
    if(count > 0) {
        const averageCpuUsage: number = measureCpuUsage(totalUsage, count);
        emitUsage(averageCpuUsage);
        totalUsage = 0;
        count = 0;
    }
}