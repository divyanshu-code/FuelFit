import express from 'express';
import { sendFeedbackEmail } from '../Controllers/FeedbackController.js';

const router = express.Router();

// Route to handle feedback submission
router.post('/submit', sendFeedbackEmail);

export default router;
