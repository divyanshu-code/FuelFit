import express from 'express';
import { askBot } from '../Controllers/ChatController.js';

const router = express.Router();

router.post('/ask', askBot);

export default router;
