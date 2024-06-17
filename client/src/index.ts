import io from 'socket.io-client';
import { SYSTEM_CONFIGS } from './configs/systemConfigs';
import { collectUsage, sendUsageToServer } from './managers/cpuUsageManager';

const socket = io(SYSTEM_CONFIGS.SOCKET_SERVER_URL);

socket.on('connect', () => {
    console.log("connected to server");

    //collect random usage at every interval
    setInterval(collectUsage, SYSTEM_CONFIGS.COLLECTION_INTERVAL);

    //calculate average of the collected usages after a bigger interval 
    //and send to server through socket connection
    setInterval(() => {
        sendUsageToServer((avgCpuUsage) => {
            socket.emit(SYSTEM_CONFIGS.EVENTS.CPU_USAGE, {usage: avgCpuUsage});
        })
    }, SYSTEM_CONFIGS.TRANSMISSION_INTERVAL);
})

socket.on('disconnect', () => {
    console.log("Disconnected from server");
})