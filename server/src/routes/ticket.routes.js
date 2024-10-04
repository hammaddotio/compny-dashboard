import express from 'express';
import { createTicket, getAllTickets, getUserTickets, updateTicket, updateTicketPriority } from '../controllers/ticket/ticket.controllers.js';
import { upload } from '../middlewares/multer.middleware.js';
import { auth_middleware, check_plan_buyer_or_not_middleware } from '../middlewares/auth.middlewares.js';

const ticket_router = express.Router();


// Create a new ticket
ticket_router.post('/api/create-ticket', auth_middleware(['US']), check_plan_buyer_or_not_middleware(), upload.single('file'), createTicket);

// Get all tickets
ticket_router.get('/api/all-tickets', auth_middleware(['AD']), getAllTickets);
ticket_router.get('/api/get-user-tickets', auth_middleware(['US', 'AD']), check_plan_buyer_or_not_middleware(), getUserTickets);
ticket_router.patch('/api/update-ticket-priority/:id', auth_middleware(['US', 'AD']), check_plan_buyer_or_not_middleware(), updateTicketPriority);
ticket_router.patch('/api/update-ticket/:id', auth_middleware(['AD']), updateTicket);

export { ticket_router };
