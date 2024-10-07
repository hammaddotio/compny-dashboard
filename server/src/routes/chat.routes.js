import express from 'express'
import { auth_middleware, check_plan_buyer_or_not_middleware } from '../middlewares/auth.middlewares.js'
import { getMessages, recentChats, sendMessage } from '../controllers/chat/chat.controllers.js'
import { Message } from '../models/chat.model.js'

export const chat_router = express.Router()

chat_router.get('/api/get-messages/:userId', auth_middleware(['US', 'AD']), check_plan_buyer_or_not_middleware(), getMessages)

chat_router.post('/api/send-message', auth_middleware(['US', 'AD']), check_plan_buyer_or_not_middleware(), sendMessage)

chat_router.get('/api/recent-chats/:userId', auth_middleware(['US', 'AD']), check_plan_buyer_or_not_middleware(), recentChats)


// API endpoint to get all messages for admin
chat_router.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().populate('sender receiver'); // Populate user data if needed
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Error fetching messages' });
    }
});

// API endpoint to get messages by user
chat_router.get('/api/messages/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        }).populate('sender receiver'); // Populate user data if needed

        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Error fetching messages' });
    }
});
