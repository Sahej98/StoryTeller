
import mongoose from 'mongoose';

const GameDataSchema = new mongoose.Schema({
    id: { type: String, default: 'global_config', unique: true }, // Singleton ID
    BGM: {
        type: Map,
        of: String, // Key: 'tension', Value: URL
        default: {}
    },
    SFX: {
        type: Map,
        of: String, // Key: 'scream', Value: URL
        default: {}
    }
}, { timestamps: true });

export const GameData = mongoose.model('GameData', GameDataSchema);
