import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import storyRoutes from './routes/stories.js';
import userRoutes from './routes/users.js';
import gameRoutes from './routes/game.js';
import gamedataRoutes from './routes/gameData.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/$/, '');
app.use(cors({
    origin: clientUrl,
    optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '50mb' }));

app.use('/api/stories', storyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/gamedata', gamedataRoutes);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/storyteller';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));