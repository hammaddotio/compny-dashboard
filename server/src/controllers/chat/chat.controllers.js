// controllers/messageController.js
import { Message } from '../../models/chat.model.js';

// Controller to send a message
export const sendMessage = async (req, res) => {
    try {
        // Extract sender from the token (set by middleware)
        const sender = req.user_id;  // You already attached the user_id in the middleware
        const { receiverId, message } = req.body;

        // Create a new message with the sender extracted from the token
        const send_message = new Message({ sender, receiver: receiverId, content: message });
        await send_message.save();

        res.status(201).json({ message: send_message });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
};

// // Controller to get all messages between user and admin
// export const getMessages = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const messages = await Message.find({ receiver: userId }).sort({ timestamp: 1 });
//         res.status(200).json(messages);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to retrieve messages' });
//     }
// };

// export const recentChats = async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const recentChats = await Message.find({
//             $or: [
//                 { sender: userId },
//                 { receiver: userId }
//             ]
//         }).sort({ createdAt: -1 }).limit(20); // Fetch last 20 messages

//         res.status(200).json(recentChats);
//     } catch (error) {
//         console.error('Error fetching recent chats:', error);
//         res.status(500).json({ message: 'Error fetching recent chats' });
//     }
// }



// Example: Updated getMessages method
export const getMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await Message.find({ receiver: userId })
            .populate('sender', 'name email purchasedServices') // Populate sender details and purchased services
            .populate('receiver', 'name email purchasedServices') // Populate receiver details and purchased services
            .sort({ timestamp: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};

// Example: Updated recentChats method
export const recentChats = async (req, res) => {
    const { userId } = req.params;

    try {
        const recentChats = await Message.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        })
            .populate('sender', 'name email purchasedServices') // Populate sender details and purchased services
            .populate('receiver', 'name email purchasedServices') // Populate receiver details and purchased services
            .sort({ createdAt: 1 })

        res.status(200).json(recentChats);
    } catch (error) {
        console.error('Error fetching recent chats:', error);
        res.status(500).json({ message: 'Error fetching recent chats' });
    }
};
