
import express from 'express';
import jwt from 'jsonwebtoken';
import { GameData } from '../models/GameData.js';
import { User } from '../models/user.js'; // Needed for admin check if referencing role directly

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';

// Middleware (copied from other routes to keep this self-contained)
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

// GET /api/gamedata
router.get('/', async (req, res) => {
    try {
        // Try to find the configuration in DB
        let gameData = await GameData.findOne({ id: 'global_config' }).lean();

        if (!gameData) {
            // Fallback empty structure if seeding failed (though seed should handle this)
            return res.json({ BGM: {}, SFX: {}, voiceMap: {} });
        }

        res.json({
            BGM: gameData.BGM || {},
            SFX: gameData.SFX || {},
            voiceMap: gameData.voiceMap || {}
        });
    } catch (err) {
        console.error('Error fetching game data:', err);
        res.status(500).json({ message: 'Error fetching game data' });
    }
});

// PUT /api/gamedata (Admin Only)
router.put('/', auth, adminAuth, async (req, res) => {
    try {
        const { BGM, SFX, voiceMap } = req.body;

        // updateOne with upsert to ensure it exists
        const result = await GameData.findOneAndUpdate(
            { id: 'global_config' },
            {
                $set: {
                    BGM: BGM,
                    SFX: SFX,
                    voiceMap: voiceMap
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json(result);
    } catch (err) {
        console.error('Error updating game data:', err);
        res.status(500).json({ message: 'Error updating game data' });
    }
});

export default router;
