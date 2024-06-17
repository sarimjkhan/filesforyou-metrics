import mongoose from 'mongoose';
import { SYSTEM_CONFIGS } from './configs/systemConfig';

const mongoURI: string = SYSTEM_CONFIGS.MONGO_URL;

export const connectDb = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Mongo Db Connected");
    } catch (err) {
        if(err instanceof Error) {
            console.error('Database connection error:', err.message);
        } else {
            console.error('Unable to connect to mongodb: ');
        }
        process.exit(1);
    }
}