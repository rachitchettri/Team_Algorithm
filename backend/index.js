import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { streamChat as groqStreamChat } from './services/chatService.js';


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// MongoDB connection (same as before)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
connectDB();

// Your existing Mongoose Schema, Multer setup, routes here...
// ...

// Existing auth routes
app.use('/api/auth', authRoutes);

// Your existing application POST and GET routes here...
// ...

// Add your /api/chat streaming route here:
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages are required and must be an array' });
    }

    // Set headers for streaming response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const responseStream = await groqStreamChat(messages);

    // responseStream is assumed to be an async iterable of chunks
    for await (const chunk of responseStream) {
      // Extract text from chunk (adjust based on actual structure)
      const text = chunk.choices?.[0]?.delta?.content || '';
      if (text) {
        res.write(text);
      }
    }
    

    res.end();
  } catch (err) {
    console.error('Chat streaming error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check endpoint
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
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
