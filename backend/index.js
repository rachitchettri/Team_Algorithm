import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import fs from 'fs'; // <-- IMPORTANT: add this
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { streamChat as groqStreamChat } from './services/chatService.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Ensure public folder exists
const publicDir = path.join(process.cwd(), 'public'); // ✅ process.cwd() works better in ESM
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

// Registration handler (file-based)
app.post('/register', async (req, res) => {
  try {
    const newUser = req.body;
    
    if (!newUser.role || !['finder', 'provider'].includes(newUser.role)) {
      return res.status(400).json({ success: false, error: 'Invalid user role' });
    }

    const userType = newUser.role === 'provider' ? 'providers' : 'seekers';
    const filePath = path.join(publicDir, `${userType}.json`);

    // Ensure file exists
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]');
    }

    const existingUsers = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Check for duplicate email
    if (existingUsers.some(user => user.email === newUser.email)) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }

    // Add timestamp and clean data
    const userToSave = {
      ...newUser,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      password: newUser.password // Note: Hash this in production!
    };

    // Save user
    fs.writeFileSync(filePath, JSON.stringify([...existingUsers, userToSave], null, 2));

    res.json({ 
      success: true, 
      message: 'Registration successful',
      userType
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Server error during registration' 
    });
  }
});
// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// AI chat stream route
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages are required and must be an array' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Flush headers to establish SSE stream
    res.flushHeaders();

    const responseStream = await groqStreamChat(messages);

    for await (const chunk of responseStream) {
      const text = chunk.choices?.[0]?.delta?.content || '';
      if (text) {
        res.write(`data: ${text}\n\n`);  // SSE format: each chunk prefixed by 'data:'
      }
    }

    // Signal the end of the stream
    res.write('data: [DONE]\n\n');
    res.end();

  } catch (err) {
    console.error('Chat streaming error:', err);
    // If headers already sent, cannot send JSON, so just close connection
    if (!res.headersSent) {
      res.status(500).json({ error: 'Server error' });
    } else {
      res.end();
    }
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    dbState: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    uptime: process.uptime()
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
