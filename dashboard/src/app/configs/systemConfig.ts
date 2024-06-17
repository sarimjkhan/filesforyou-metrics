export const SYSTEM_CONFIGS = {
    SOCKET_SERVER_URL: 'http://localhost:3000',
    API_SERVER_URL: 'http://localhost:3000',
    EVENTS: {
        CPU_USAGE: 'cpuUsage',
        USAGE_UPDATE_BROADCAST: 'usageUpdateBroadcast',
    },
    ENDPOINTS: {
        CPU_USAGE_ROOT: 'http://localhost:3000/cpu-usage',
        CPU_USAGE_BY_CLIENT: 'http://localhost:3000/cpu-usage/client',
        RECENT_CPU_USAGE: `http://localhost:3000/cpu-usage/recent`,
        HIGH_CPU_USAGE_CLIENTS: 'http://localhost:3000/cpu-usage/clients'
    }
}