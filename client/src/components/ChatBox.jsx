import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client'; // Import Socket.IO client
import { ADMIN_ID, checkToken, checkUserId, GET_RECENT_CHATS_API, URL } from '../constant';

const UserChatBox = () => {
    const [isChatboxOpen, setChatboxOpen] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [recentChats, setRecentChats] = useState([]); // Change to recentChats
    const chatboxRef = useRef(null);
    const socket = useRef(null); // Create a ref for socket

    useEffect(() => {
        // Initialize socket connection
        socket.current = io(URL);

        // Join the room with user ID
        socket.current.emit('joinRoom', checkUserId); // Emit joinRoom with userId

        // Fetch recent chats when chat opens
        if (isChatboxOpen) {
            fetchRecentChats(); // Change to fetch recent chats
        }

        // Listen for incoming messages
        socket.current.on('receiveMessage', (newMessage) => {
            setRecentChats(prevChats => {
                const existingChat = prevChats.find(chat => chat._id === newMessage.receiverId || chat._id === newMessage.senderId);
                if (existingChat) {
                    return prevChats.map(chat =>
                        chat._id === existingChat._id ? { ...chat, messages: [...chat.messages, newMessage] } : chat
                    );
                } else {
                    return [...prevChats, { _id: newMessage.receiverId, messages: [newMessage] }]; // Adjust as needed
                }
            });
            // chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight; // Scroll to bottom on new message
        });

        return () => {
            // Clean up the socket connection on component unmount
            socket.current.disconnect();
        };
    }, [isChatboxOpen]);

    const fetchRecentChats = async () => {
        try {
            const response = await axios.get(`${URL}${GET_RECENT_CHATS_API}${checkUserId}`, {
                headers: {
                    Authorization: checkToken
                }
            });
            setRecentChats(response.data); // Set recent chats
        } catch (error) {
            console.error('Error fetching recent chats:', error);
        }
    };

    const toggleChatbox = () => {
        setChatboxOpen((prev) => !prev);
    };

    const handleSendMessage = async () => {
        if (userMessage.trim() !== "") {
            await addUserMessage(userMessage);
            setUserMessage(''); // Clear input after sending
            fetchRecentChats()
        }
    };

    const addUserMessage = async (message) => {
        try {
            const newMessage = { message, sender: checkUserId, timestamp: new Date().toISOString() }; // Add timestamp to new message
            // Emit the message to the server
            socket.current.emit('sendMessage', { senderId: checkUserId, receiverId: ADMIN_ID, message, timestamp: newMessage.timestamp }); // Replace 'adminId' with the actual admin ID

            // Optionally, you could also add the message to the state here to ensure immediate UI feedback
            setRecentChats(prevChats => {
                const existingChat = prevChats.find(chat => chat._id === ADMIN_ID);
                if (existingChat) {
                    return prevChats.map(chat =>
                        chat._id === existingChat._id ? { ...chat, messages: [...existingChat.messages, newMessage] } : chat
                    );
                } else {
                    return [...prevChats, { _id: ADMIN_ID, messages: [newMessage] }]; // Adjust as needed
                }
            });
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight; // Auto-scroll to the bottom
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options); // Format the date
    };

    const renderRecentChats = () => {
        return recentChats && recentChats?.map((chat) => {
            return (
                <div key={chat?._id}>
                    <div className={`mb-2 ${chat?.sender?._id === checkUserId ? 'text-right' : ''}`}>
                        <p className={`py-2 px-4 inline-block rounded-lg ${chat?.sender?._id === checkUserId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            {chat.message}
                            <p>
                                <span className={`text-xs ${chat?.sender?._id === checkUserId ? 'text-blue-300' : 'text-gray-500'}`}>
                                    {formatDate(chat.timestamp)} {/* Display the formatted date */}
                                </span>
                            </p>
                        </p>
                    </div>
                </div>
            )
        });
    };

    return (
        <div>
            <div className={`fixed bottom-0 right-0 mb-4 mr-4 ${isChatboxOpen ? 'hidden' : ''}`}>
                <button
                    onClick={toggleChatbox}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
                >
                    Chat with Admin
                </button>
            </div>

            {isChatboxOpen && (
                <div id="chat-container" className="fixed bottom-16 right-4 w-full max-w-sm sm:max-w-md lg:max-w-lg">
                    <div className="bg-white shadow-md rounded-lg w-full">
                        <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                            <p className="text-lg font-semibold">Chat with Admin</p>
                            <button onClick={toggleChatbox} className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                                X
                            </button>
                        </div>

                        <div ref={chatboxRef} className="p-4 h-80 overflow-y-auto">
                            {renderRecentChats()} {/* Render recent chats */}
                        </div>

                        <div className="p-4 border-t flex flex-col sm:flex-row">
                            <input
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                onKeyUp={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                                type="text"
                                placeholder="Type a message"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-2 sm:mt-0 sm:ml-2">Send</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default UserChatBox;
