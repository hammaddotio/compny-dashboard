// src/socket.js

import { io } from 'socket.io-client';

// Replace with your Socket.IO server URL
const SOCKET_URL = 'http://localhost:3000'; // Adjust this if your server is hosted elsewhere
export const socket = io(SOCKET_URL, {
    transports: ['websocket'],
});
