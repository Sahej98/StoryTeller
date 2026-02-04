import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
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
    if (!req.user || req.user.role !== 'admin') {
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
        // Explicitly select id and _id to ensure client has both
        const fields = 'id _id title description thumbnail theme author published worldTitle';
        
        let stories;
        if (req.user && req.user.role === 'admin') {
            // Admins see everything. Use lean() for performance and plain objects.
            stories = await Story.find({}, fields).lean();
        } else {
            // Regular users/guests only see published stories
            stories = await Story.find({ published: true }, fields).lean();
        }

        res.json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single story by ID (full data)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cleanId = id.trim();
        
        console.log(`[Stories API] GET /:id called with: ${cleanId}`);

        let query = {};
        if (mongoose.Types.ObjectId.isValid(cleanId)) {
            // Explicitly cast to ObjectId for the _id field to ensure matching works
            query = { $or: [{ _id: new mongoose.Types.ObjectId(cleanId) }, { id: cleanId }] };
        } else {
            // If it's not a valid Mongo ID, it MUST be a custom 'id'
            query = { id: cleanId };
        }

        console.log(`[Stories API] Executing query:`, JSON.stringify(query));

        const story = await Story.findOne(query).lean();
        
        if (!story) {
            console.warn(`[Stories API] Story NOT FOUND for identifier: ${cleanId}`);
            return res.status(404).json({ message: 'Story not found' });
        }
        
        console.log(`[Stories API] Story found: ${story.title} (_id: ${story._id})`);
        res.json(story);
    } catch (err) {
        console.error('[Stories API] Error fetching story:', err);
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
        console.log(`[Stories API] Created new story: ${savedStory.title} (ID: ${savedStory.id}, _ID: ${savedStory._id})`);
        
        // Return toObject() to ensure virtuals/transformations are applied if any, but mostly to get a clean object
        res.status(201).json(savedStory.toObject());
    } catch (err) {
        console.error('[Stories API] Error creating story:', err);
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/stories/:id (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const cleanId = id.trim();
        
        let query = {};
        if (mongoose.Types.ObjectId.isValid(cleanId)) {
            query = { $or: [{ _id: new mongoose.Types.ObjectId(cleanId) }, { id: cleanId }] };
        } else {
            query = { id: cleanId };
        }

        const story = await Story.findOne(query);
        if (!story) {
            console.warn(`[Stories API] Update failed - Story NOT FOUND: ${cleanId}`);
            return res.status(404).json({ message: 'Story not found' });
        }

        // Admins can edit any story.
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
        console.log(`[Stories API] Updated story: ${updatedStory.title} (ID: ${updatedStory.id})`);
        
        res.json(updatedStory.toObject());
    } catch (err) {
        console.error('[Stories API] Error updating story:', err);
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/stories/:id (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const cleanId = id.trim();
        
        let query = {};
        if (mongoose.Types.ObjectId.isValid(cleanId)) {
            query = { $or: [{ _id: new mongoose.Types.ObjectId(cleanId) }, { id: cleanId }] };
        } else {
            query = { id: cleanId };
        }

        const story = await Story.findOne(query);
        if (!story) return res.status(404).json({ message: 'Story not found' });

        await story.deleteOne();
        console.log(`[Stories API] Deleted story: ${cleanId}`);
        res.json({ message: 'Story deleted successfully' });
    } catch (err) {
        console.error('[Stories API] Error deleting story:', err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
