import express from 'express';
import { BGM, SFX } from '../data/audioData.js';
import { voiceMap } from '../data/voiceData.js';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.json({ BGM, SFX, voiceMap });
    } catch (err) {
        console.error('Error fetching game data:', err);
        res.status(500).json({ message: 'Error fetching game data' });
    }
});

export default router;
