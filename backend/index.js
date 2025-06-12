import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
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

// MongoDB connection
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

// Auth routes
app.use('/api/auth', authRoutes);

// Chat streaming route
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages are required and must be an array' });
    }

    // Set headers for SSE (Server-Sent Events) streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Flush headers to establish SSE stream
    res.flushHeaders();

    const responseStream = await groqStreamChat(messages);

    // Stream chunks from groqStreamChat to client
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
