import { Router } from "express";
import { getCpuUsageByClient, getHighCpuUsageClients, getRecentCpuUsage } from "../services/cpuUsageService";

const router = Router();

router.get('/cpu-usage/recent', async (req, res) => {
    try {
        const data = await getRecentCpuUsage();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from Redis:', error);
        res.status(500).send('Failed to retrieve data');
    }
});

router.get('/cpu-usage/client', async (req, res) => {
    try {
        const { clientId, startTime, endTime, limit } = req.query;
        const start = startTime ? new Date(startTime as string): undefined;
        const end = endTime ? new Date(endTime as string): undefined;
        const numLimit = limit ? parseInt(limit as string, 10) : 10;
        const data = await getCpuUsageByClient(clientId as string, start, end, numLimit);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send('Failed to retrieve data for a client');
    }
});

router.get('/cpu-usage/clients', async (req, res) => {
    try {
        const threshold = Number(req.query.threshold) || 80;
        const {startTime, endTime} = req.query;
        const start = startTime ? new Date(startTime as string): undefined;
        const end = endTime ? new Date(endTime as string): undefined;
        const data = await getHighCpuUsageClients(threshold, start, end);
        res.json(data);
    } catch(err) {
        console.error('Error fetching high CPU usage data:', err);
        res.status(500).send('Failed to retrieve high usage data clients');
    }
})

export default router;