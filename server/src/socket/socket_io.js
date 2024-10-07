import { Server } from 'socket.io';
import { Message } from '../models/chat.model.js';

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*', // Replace '*' with your frontend URL for production
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true // Allow credentials if needed
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Listen for messages
        socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
            try {
                // Save the message to the database
                const newMessage = new Message({ sender: senderId, receiver: receiverId, message });
                await newMessage.save();

                // Emit the message to both the receiver and sender
                io.to(receiverId).emit('receiveMessage', newMessage);
                io.to(senderId).emit('receiveMessage', newMessage); // Optionally send to the sender
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io; // Return the io instance if needed
};

export default initSocket;
