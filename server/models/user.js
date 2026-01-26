import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
    master: { type: Number, default: 1 },
    bgm: { type: Number, default: 0.3 },
    sfx: { type: Number, default: 0.6 },
    narration: { type: Number, default: 0.8 },
    narrationEnabled: { type: Boolean, default: true },
    textSpeed: { type: Number, default: 0.5 },
    screenShakeEnabled: { type: Boolean, default: true },
    visualEffectsEnabled: { type: Boolean, default: true },
}, { _id: false });

const GameSaveSchema = new mongoose.Schema({
    currentPosition: { chapter: String, key: String },
    checkpoint: { chapter: String, key: String },
    playerStats: {
        sanity: Number,
        health: Number,
        stamina: Number,
        morality: Number
    },
    inventory: [String],
    flags: [String],
    discoveredLore: [String],
    visitedNodes: [String],
    characters: [String],
    highestChapterUnlocked: Number,
    relationships: mongoose.Schema.Types.Mixed,
}, { _id: false });

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['player', 'admin'], default: 'player' },
    disabled: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    verificationOtp: { type: String },
    otpExpires: { type: Date },
    passwordResetOtp: { type: String },
    passwordResetOtpExpires: { type: Date },
    settings: { type: SettingsSchema, default: () => ({}) },
    gameSaves: {
        type: Map,
        of: GameSaveSchema,
        default: {},
    },
    lastSave: {
        storyId: String,
        timestamp: Date,
    },
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);