import express from 'express';
import { createServer } from 'node:http';
import { Server as SocketIOServer} from 'socket.io';
import { connectDb } from './database';
import { ClientCpuUsage } from './types';
import cors from 'cors';
import { saveCpuUsage } from './services/cpuUsageService';
import { SYSTEM_CONFIGS } from './configs/systemConfig';
import router from './routes/cpuUsageRoutes';

connectDb();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
const PORT: number = 3000;

app.use(cors({origin: '*'}));

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Server is running with socket.io!!');
})

app.use(router);

io.on('connection', (socket) => {
    console.log('A client is connected');

    // On every client disconnected
    socket.on('disconnect', ()=> {
        console.log('A client disconnected');
    })

    // On data receipt from any client related to CPU usage
    socket.on(SYSTEM_CONFIGS.EVENTS.CPU_USAGE, async (data: ClientCpuUsage) => {
        try {
            await saveCpuUsage(socket.id, data.usage);
            //Emitting to all connected clients
            io.emit(SYSTEM_CONFIGS.EVENTS.USAGE_UPDATE_BROADCAST, { clientId: `${SYSTEM_CONFIGS.CPU_USAGE_KEY_PREFIX}${socket.id}`, usage: data.usage});
        } catch (error) {
            console.error('Error saving CPU usage data:', error);
        }
    });
})


httpServer.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT} `);
})