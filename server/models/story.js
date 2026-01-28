import mongoose from 'mongoose';

const EffectSchema = new mongoose.Schema({
    stats: { type: mongoose.Schema.Types.Mixed, default: {} },
    inventory: { type: mongoose.Schema.Types.Mixed, default: {} },
    flags: { type: mongoose.Schema.Types.Mixed, default: {} },
    setCheckpoint: Boolean,
}, { _id: false });

const ChoiceSchema = new mongoose.Schema({
    text: String,
    next: mongoose.Schema.Types.Mixed,
    requires: { type: mongoose.Schema.Types.Mixed, default: {} },
    effects: EffectSchema,
}, { _id: false });

const NodeSchema = new mongoose.Schema({
    speaker: String,
    text: String,
    background: String,
    bgm: String,
    sfx: String,
    visualEffect: String,
    textEffects: [{
        word: String,
        effect: String,
    }],
    effects: EffectSchema,
    choices: [ChoiceSchema],
    npc: mongoose.Schema.Types.Mixed,
    ambientSfx: [{
        triggerWord: String,
        sfx: String,
    }],
    revisitText: String,
    revisitSpeaker: String,
    isDeath: { type: Boolean, default: false },
    nextOnDeath: String,
    timer: Number,
    defaultChoiceIndex: Number,
    jumpscare: { type: mongoose.Schema.Types.Mixed, default: {} },
});

const ChapterDetailsSchema = new mongoose.Schema({
    title: String,
    number: Number,
    description: String,
    flavorText: String,
}, { _id: false });

const CautionScreenSchema = new mongoose.Schema({
    enabled: { type: Boolean, default: false },
    title: { type: String, default: 'WARNING' },
    text: { type: String, default: 'This story contains content that may be disturbing to some players. Player discretion is advised.' },
}, { _id: false });

const VoiceProfileSchema = new mongoose.Schema({
    names: { type: String, default: '' },
    pitch: { type: Number, default: 1 },
    rate: { type: Number, default: 1 },
    lang: String,
}, { _id: false });

const CharacterSchema = new mongoose.Schema({
    name: String,
    sprite: String,
    lore: String,
    voiceKey: String
}, { _id: false });


const StorySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    thumbnail: String,
    accentColor: String,
    language: { type: String, default: 'en', enum: ['en'] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    published: { type: Boolean, default: false },
    cautionScreen: { type: CautionScreenSchema, default: () => ({}) },
    storyDetails: {
        title: String,
        chapters: {
            type: Map,
            of: ChapterDetailsSchema,
        }
    },
    storyData: {
        type: Map,
        of: {
            type: Map,
            of: NodeSchema,
        }
    },
    voices: { type: Map, of: VoiceProfileSchema, default: {} },
    characters: { type: Map, of: CharacterSchema, default: {} },
    items: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { id: false });

export const Story = mongoose.model('Story', StorySchema);