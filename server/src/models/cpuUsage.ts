import mongoose, {Schema} from 'mongoose';

export interface ICpuUsage {
    clientId: string;
    usage: number;
    timestamp: Date;
}

const CpuUsageSchema: Schema = new Schema({
    clientId: { type: String, required: true },
    usage: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<ICpuUsage>('CpuUsage', CpuUsageSchema);