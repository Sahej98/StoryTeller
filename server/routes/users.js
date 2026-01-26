import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { Story } from '../models/story.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/mailer.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import crypto from 'crypto';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';

// Middleware for authentication
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

const adminAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user && user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Admin access required' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during admin check' });
    }
};

const generateOtp = () => crypto.randomInt(100000, 999999).toString();

// POST /api/users/register
router.post('/register', async (req, res) => {
    const { username, password, email, fullName } = req.body;
    if (!username || !password || !email || !fullName) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        let userByUsername = await User.findOne({ username });
        if (userByUsername) return res.status(400).json({ message: 'Username already exists' });

        let userByEmail = await User.findOne({ email });
        if (userByEmail) return res.status(400).json({ message: 'Email already in use' });

        const isFirstAccount = (await User.countDocuments()) === 0;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const otp = generateOtp();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const user = new User({
            username,
            password: hashedPassword,
            email,
            fullName,
            role: isFirstAccount ? 'admin' : 'player',
            verificationOtp: otp,
            otpExpires,
            isVerified: false,
        });

        await user.save();
        await sendVerificationEmail(email, otp);

        res.status(201).json({ message: 'Registration successful. Please check your console for the verification code.', email });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/users/verify
router.post('/verify', async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found.' });
        if (user.isVerified) return res.status(400).json({ message: 'Account already verified.' });
        if (user.verificationOtp !== otp || user.otpExpires < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        user.isVerified = true;
        user.verificationOtp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        const userPayload = { username: user.username, fullName: user.fullName, email: user.email, role: user.role, settings: user.settings };
        res.json({ token, user: userPayload });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


// POST /api/users/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Please enter all fields' });

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        if (!user.isVerified) return res.status(401).json({ message: 'Please verify your email address before logging in.' });
        if (user.disabled) return res.status(403).json({ message: 'This account has been disabled.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        const userPayload = { username: user.username, fullName: user.fullName, email: user.email, role: user.role, settings: user.settings };
        res.json({ token, user: userPayload });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/users/forgot-password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User with that email does not exist.' });

        const otp = generateOtp();
        user.passwordResetOtp = otp;
        user.passwordResetOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save();

        await sendPasswordResetEmail(email, otp);
        res.json({ message: 'Password reset code sent.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/users/reset-password
router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found.' });
        if (user.passwordResetOtp !== otp || user.passwordResetOtpExpires < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired reset code.' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.passwordResetOtp = undefined;
        user.passwordResetOtpExpires = undefined;
        await user.save();

        res.json({ message: 'Password has been reset successfully.' });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


// GET /api/users/me - Get logged in user data
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ id: user._id, username: user.username, fullName: user.fullName, email: user.email, role: user.role, settings: user.settings, savedStories: user.gameSaves ? Array.from(user.gameSaves.keys()) : [], lastSave: user.lastSave });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/users/me - User deletes their own account
router.delete('/me', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID in token.' });
        }
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await Story.deleteMany({ author: user._id });
        await user.deleteOne();

        res.json({ message: 'User account and associated stories deleted successfully.' });
    } catch (err) {
        console.error('Error deleting user account:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/users/settings
router.put('/settings', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const settingsUpdate = user.settings ? user.settings.toObject() : {};
        Object.assign(settingsUpdate, req.body);
        user.settings = settingsUpdate;

        await user.save();
        res.json(user.settings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving settings' });
    }
});


// POST /api/users/save/:storyId
router.post('/save/:storyId', auth, async (req, res) => {
    const { storyId } = req.params;
    const gameState = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.gameSaves.set(storyId, gameState);
        user.lastSave = { storyId, timestamp: new Date() };
        await user.save();

        res.json({ message: 'Game saved successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving game' });
    }
});


// GET /api/users/load/:storyId
router.get('/load/:storyId', auth, async (req, res) => {
    const { storyId } = req.params;
    try {
        const user = await User.findById(req.user.id);
        if (!user || !user.gameSaves.has(storyId)) {
            return res.status(404).json({ message: 'No save data found' });
        }
        res.json(user.gameSaves.get(storyId));
    } catch (err) {
        res.status(500).json({ message: 'Error loading game' });
    }
});

// --- ADMIN ROUTES ---

// GET /api/users - Get all users (admin only)
router.get('/', auth, adminAuth, async (req, res) => {
    try {
        const users = await User.find({}).select('-password -gameSaves');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/users/:id - Update a user (admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
    const { role, disabled, username, fullName, email } = req.body;
    const { id } = req.params;

    if (id === req.user.id && (role || typeof disabled === 'boolean')) {
        return res.status(403).json({ message: "Admins cannot change their own role or status." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (role) user.role = role;
        if (typeof disabled === 'boolean') user.disabled = disabled;
        if (fullName) user.fullName = fullName;

        if (username && username !== user.username) {
            const existing = await User.findOne({ username });
            if (existing) return res.status(400).json({ message: 'Username already taken.' });
            user.username = username;
        }
        if (email && email !== user.email) {
            const existing = await User.findOne({ email });
            if (existing) return res.status(400).json({ message: 'Email already in use.' });
            user.email = email;
        }

        await user.save();
        res.json({ message: 'User updated successfully.' });

    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/users/:id - Delete a user (admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
    try {
        const { id } = req.params;

        if (id === req.user.id) {
            return res.status(400).json({ message: 'Admin cannot delete their own account.' });
        }

        const userToDelete = await User.findById(id);
        if (!userToDelete) return res.status(404).json({ message: 'User not found' });

        await userToDelete.deleteOne();
        res.json({ message: 'User deleted successfully.' });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;