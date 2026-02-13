
import mongoose from 'mongoose';

const VoiceProfileSchema = new mongoose.Schema({
    names: { type: String, default: '' }, // Comma separated list of voice names
    pitch: { type: Number, default: 1 },
    rate: { type: Number, default: 1 },
    lang: { type: String, default: 'en-US' },
}, { _id: false });

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
    },
    voiceMap: {
        type: Map,
        of: VoiceProfileSchema, // Key: 'narrator', Value: Profile
        default: {}
    }
}, { timestamps: true });

export const GameData = mongoose.model('GameData', GameDataSchema);
