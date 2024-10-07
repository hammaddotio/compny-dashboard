import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { message, Spin, Button, Input, List, Avatar, Typography } from 'antd';
import dayjs from 'dayjs';
import {
    URL,
    GET_USER_PLANS_API,
    GET_MESSAGES_API,
    POST_MESSAGES_API,
    GET_RECENT_CHATS_API,
    authHeaders,
    ADMIN_ID,
} from '../constant';
import { socket } from '../socket';
import Main from '../components/layout/Main';

const { Title } = Typography;

const AdminChat = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [loadingMessages, setLoadingMessages] = useState(false);
    const chatboxRef = useRef(null);
    const [recentChats, setRecentChats] = useState([]);
    const [plans, setPlans] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    // Fetch users who have purchased plans
    useEffect(() => {
        const fetchUsersWithPlans = async () => {
            setLoadingUsers(true);
            try {
                const { data } = await axios.get(`${URL}/users/purchased-plans`, authHeaders);
                setUsers(Array.isArray(data) ? data : []);
            } catch (error) {
                message.error('Failed to fetch users.');
                setUsers([]);
            } finally {
                setLoadingUsers(false);
            }
        };

        fetchUsersWithPlans();
    }, []);

    // Fetch messages, recent chats, and user plans when a user is selected
    useEffect(() => {
        if (selectedUser) {
            fetchMessages();
            fetchRecentChats();
            fetchUserPlans();

            // Listen for new messages through socket
            socket.on('receiveMessage', (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                // scrollToBottom();
            });

            console.log(selectedUser)
            // Cleanup socket listener on unmount
            return () => socket.off('receiveMessage');
        }
    }, [selectedUser]);

    const fetchMessages = async () => {
        setLoadingMessages(true);
        try {
            const { data } = await axios.get(`${URL}${GET_MESSAGES_API}/${selectedUser._id}`, authHeaders);
            // Sort messages by createdAt in descending order
            const sortedMessages = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setMessages(sortedMessages);
            // scrollToBottom();
        } catch (error) {
            message.error('Failed to fetch messages.');
        } finally {
            setLoadingMessages(false);
        }
    };

    const fetchRecentChats = async () => {
        try {
            const { data } = await axios.get(`${URL}${GET_RECENT_CHATS_API}${selectedUser._id}`, authHeaders);
            // Sort recent chats by createdAt in descending order
            const sortedRecentChats = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRecentChats(sortedRecentChats);
            fetchMessages()
        } catch (error) {
            message.error('Failed to fetch recent chats.');
        }
    };

    const fetchUserPlans = async () => {
        try {
            const { data } = await axios.get(`${URL}${GET_USER_PLANS_API}/${selectedUser._id}`, authHeaders);
            setPlans(data);
        } catch (error) {
            message.error('Failed to fetch user plans.');
        }
    };

    const handleSendMessage = async () => {
        if (userMessage.trim() === '') return;

        const messageData = {
            senderId: ADMIN_ID,
            receiverId: selectedUser._id,
            message: userMessage,
            createdAt: new Date().toISOString(),
        };

        socket.emit('sendMessage', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setUserMessage('');

        await fetchMessages(); // Fetch all messages after sending
        scrollToBottom(); // Scroll to bottom if user is at the bottom
    };

    // Socket listener for new messages
    useEffect(() => {
        if (selectedUser) {
            socket.on('receiveMessage', (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                scrollToBottom(); // Scroll to bottom if user is at the bottom
            });

            return () => socket.off('receiveMessage');
        }
    }, [selectedUser]);



    const scrollToBottom = () => {
        if (chatboxRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatboxRef.current;
            // Check if user is at the bottom
            if (scrollTop + clientHeight >= scrollHeight - 5) { // 5 is a buffer to account for scroll precision
                chatboxRef.current.scrollTop = scrollHeight; // Scroll to bottom
            }
        }
    };


    const renderTime = (createdAt) => dayjs(createdAt).format('MMM DD, YYYY h:mm A');

    return (
        <Main>
            <div className="admin-dashboard flex flex-wrap">
                {/* Users List */}
                <div className="user-list w-1/4 pr-4">
                    <Title level={3} className="mb-4">Users with Purchased Plans</Title>
                    {loadingUsers ? (
                        <Spin tip="Loading users..." />
                    ) : users.length > 0 ? (
                        <List
                            itemLayout="horizontal"
                            dataSource={users}
                            renderItem={(user) => (
                                <List.Item
                                    className={`cursor-pointer p-2 mb-2 ${selectedUser?._id === user._id ? 'bg-blue-100' : ''}`}
                                    onClick={() => setSelectedUser(user)}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar>{user.client_name.charAt(0)}</Avatar>}
                                        title={user.client_name}
                                    />
                                </List.Item>
                            )}
                        />
                    ) : (
                        <p>No users found</p>
                    )}
                </div>

                {/* Chat Section */}
                {selectedUser && (
                    <div className="user-chat w-3/4">
                        <div className="chat-header flex justify-between items-center mb-4">
                            <Title level={4}>{selectedUser.client_name}</Title>
                            <Button type="danger" onClick={() => setSelectedUser(null)}>
                                Close
                            </Button>
                        </div>

                        <div ref={chatboxRef} className="chat-messages overflow-auto max-h-96 border rounded-md p-4 bg-gray-100 mb-4">
                            {loadingMessages ? (
                                <Spin tip="Loading messages..." />
                            ) : (
                                <>
                                    {/* Combine and sort messages and recent chats */}
                                    {[...messages, ...recentChats]
                                        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Sort in ascending order
                                        .map((msg, index) => (
                                            <div key={index} className={`message flex ${msg?.sender?._id === ADMIN_ID ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`message-content max-w-xs p-2 rounded-lg mb-2 ${msg?.sender?._id === ADMIN_ID ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'}`}>
                                                    <p>{msg?.message}</p>
                                                    <small className={`text-xs ${msg?.sender?._id === ADMIN_ID ? 'text-gray-600' : 'text-gray-800'}`}>
                                                        {renderTime(msg?.createdAt)} - {msg?.sender?._id === ADMIN_ID ? 'You' : selectedUser.client_name}
                                                    </small>
                                                </div>
                                            </div>
                                        ))}
                                </>
                            )}
                        </div>


                        <div className="chat-input flex mb-4">
                            <Input
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') handleSendMessage();
                                }}
                                className="flex-grow"
                                placeholder="Type a message"
                            />
                            <Button type="primary" onClick={handleSendMessage}>
                                Send
                            </Button>
                        </div>

                        {/* User's Purchased Plans */}
                        <div className="user-plans mb-4">
                            <Title level={5}>Purchased Plans</Title>
                            <List
                                dataSource={plans}
                                renderItem={(plan) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={`${plan.servicePlan.name} - $${plan.servicePlan.price}`}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                )}
            </div>
        </Main>
    );
};

export default AdminChat;
