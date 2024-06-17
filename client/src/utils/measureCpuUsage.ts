export const getCpuUsage = (): number => {
    return Math.floor(Math.random() * 100);
}

export const measureCpuUsage = (totalUsage: number, count: number): number => {
    return totalUsage/count;
}