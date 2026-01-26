import express from 'express';
import jwt from 'jsonwebtoken';
import { Story } from '../models/story.js';
import { User } from '../models/user.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

const adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

const optionalAuth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return next();
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
    } catch (e) {
        // Invalid token is fine, just proceed without user
    }
    next();
};

// GET all stories (metadata only)
router.get('/', optionalAuth, async (req, res) => {
    try {
        const fields = 'id title description thumbnail theme author published worldTitle';
        const publicStoriesQuery = Story.find({ published: true }, fields);

        const queries = [publicStoriesQuery];

        if (req.user && req.user.role === 'admin') {
            const userStoriesQuery = Story.find({ author: req.user.id }, fields);
            queries.push(userStoriesQuery);
        }

        const results = await Promise.all(queries);
        const allStories = results.flat();

        // Deduplicate stories
        const uniqueStories = Array.from(new Map(allStories.map(story => [story.id, story])).values());

        res.json(uniqueStories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single story by ID (full data)
router.get('/:id', async (req, res) => {
    try {
        // Use .lean() to get a plain JavaScript object instead of a Mongoose document.
        // This is more performant for read-only operations and ensures all nested
        // Maps are converted to plain objects, fixing the issue where chapters
        // were not appearing on the client.
        const story = await Story.findOne({ id: req.params.id }).lean();
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.json(story);
    } catch (err) {
        console.error('Error fetching story by ID:', err);
        res.status(500).json({ message: err.message });
    }
});

// POST /api/stories (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
    try {
        const newStoryData = req.body;
        const convertToMap = (obj) => obj ? new Map(Object.entries(obj)) : new Map();

        if (newStoryData.storyDetails && newStoryData.storyDetails.chapters) {
            newStoryData.storyDetails.chapters = convertToMap(newStoryData.storyDetails.chapters);
        }
        if (newStoryData.storyData) {
            const storyDataAsMap = new Map();
            for (const chapterKey in newStoryData.storyData) {
                storyDataAsMap.set(chapterKey, convertToMap(newStoryData.storyData[chapterKey]));
            }
            newStoryData.storyData = storyDataAsMap;
        }

        const newStory = new Story({
            ...newStoryData,
            author: req.user.id,
        });
        const savedStory = await newStory.save();
        res.status(201).json(savedStory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/stories/:id (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
    try {
        const story = await Story.findOne({ id: req.params.id });
        if (!story) return res.status(404).json({ message: 'Story not found' });

        if (story.author && story.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to edit this story' });
        }

        const { _id, author, ...updateData } = req.body;

        const convertToMap = (obj) => obj ? new Map(Object.entries(obj)) : new Map();

        if (updateData.storyDetails && updateData.storyDetails.chapters) {
            updateData.storyDetails.chapters = convertToMap(updateData.storyDetails.chapters);
        }
        if (updateData.storyData) {
            const storyDataAsMap = new Map();
            for (const chapterKey in updateData.storyData) {
                storyDataAsMap.set(chapterKey, convertToMap(updateData.storyData[chapterKey]));
            }
            updateData.storyData = storyDataAsMap;
        }

        Object.assign(story, updateData);
        story.markModified('storyData');
        story.markModified('storyDetails');
        story.markModified('characters');
        story.markModified('items');

        const updatedStory = await story.save();
        res.json(updatedStory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/stories/:id (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
    try {
        const story = await Story.findOne({ id: req.params.id });
        if (!story) return res.status(404).json({ message: 'Story not found' });

        if (story.author && story.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this story' });
        }

        await Story.deleteOne({ id: req.params.id });
        res.json({ message: 'Story deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default router;