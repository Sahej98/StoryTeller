import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Story } from './models/story.js';
import { stories as storiesData } from './data/stories/index.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/storyteller';

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected for seeding');

        await Story.deleteMany({ author: { $exists: false } }); // Only delete seeded stories
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
        console.log('Database seeded successfully');
    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
};

seedDB();