
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Story } from './models/story.js';
import { GameData } from './models/GameData.js';
import { stories as storiesData } from './data/stories/index.js';
import { BGM, SFX } from './data/audioData.js';
import { voiceMap } from './data/voiceData.js';

dotenv.config();

let MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/storyteller';

if (MONGO_URI.match(/:\d+\/\//)) {
    MONGO_URI = MONGO_URI.replace(/:\d+\/\/+/, (match) => match.replace(/\/\/+/, '/'));
}

const seedDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        // Increased timeouts to handle network latency or slow connections
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 50000,
            socketTimeoutMS: 60000,
        });
        console.log('MongoDB connected for seeding');

        // 1. Seed Stories
        await Story.deleteMany({ author: { $exists: false } });
        console.log('Cleared existing seeded stories');

        const storiesToInsert = Object.values(storiesData);
        const convertToMap = (obj) => {
            if (obj && typeof obj === 'object' && !Array.isArray(obj) && obj.constructor === Object) {
                return new Map(Object.entries(obj));
            }
            return obj;
        };

        const formattedStories = storiesToInsert.map(story => {
            const formattedStory = { ...story, published: true };
            if (formattedStory.storyDetails && formattedStory.storyDetails.chapters) {
                formattedStory.storyDetails.chapters = convertToMap(formattedStory.storyDetails.chapters);
            }
            if (formattedStory.storyData) {
                const storyDataAsMap = new Map();
                for (const chapterKey in formattedStory.storyData) {
                    storyDataAsMap.set(chapterKey, convertToMap(formattedStory.storyData[chapterKey]));
                }
                formattedStory.storyData = storyDataAsMap;
            }
            return formattedStory;
        });

        await Story.insertMany(formattedStories);
        console.log('Stories seeded successfully');

        // 2. Seed Global GameData (Audio/Voices)
        const existingGameData = await GameData.findOne({ id: 'global_config' });
        if (!existingGameData) {
            console.log('No global config found. Seeding initial Audio/Voice data...');

            // Format voiceMap: Convert arrays of names to comma-separated strings for schema compatibility
            const formattedVoiceMap = {};
            for (const [key, val] of Object.entries(voiceMap)) {
                formattedVoiceMap[key] = {
                    ...val,
                    names: Array.isArray(val.names) ? val.names.join(', ') : val.names
                };
            }

            const newGameData = new GameData({
                id: 'global_config',
                BGM: BGM,
                SFX: SFX,
                voiceMap: formattedVoiceMap
            });
            await newGameData.save();
            console.log('GameData seeded successfully');
        } else {
            console.log('Global GameData already exists. Skipping seed to preserve custom changes.');
        }

    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
            console.log('MongoDB connection closed');
        }
    }
};

seedDB();
