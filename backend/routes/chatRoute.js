import express from 'express';
import { streamChat } from '../services/chatService.js';

const router = express.Router();

router.post('/', streamChat);

export default router;
