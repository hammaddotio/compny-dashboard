import { Ticket } from '../../models/ticket.model.js'; // Use .js extension for ES modules

// Create a new ticket
export const createTicket = async (req, res) => {
    try {
        const { request_type, subject, description, priority, userId } = req.body; // Extract userId from the request body
        const fileUrl = req.file ? `uploads/${req.file.filename}` : undefined;

        const newTicket = new Ticket({
            request_type,
            subject,
            description,
            priority,
            // fileUrl,
            userId: req.user_id, // Add userId to the ticket
        });

        const savedTicket = await newTicket.save();
        console.log('savedTicket', savedTicket)
        res.status(201).json(savedTicket);
    } catch (error) {
        res.status(500).json({ message: 'Error creating ticket', error });
    }
};

// Get all tickets
export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('userId', 'username email'); // Populate user data (assuming you have username and email fields)
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets', error });
    }
};

// Get all tickets (or tickets by userId if provided)
export const getUserTickets = async (req, res) => {
    try {
        // Get userId from query parameters
        const { userId } = req.params;

        let tickets;

        if (userId) {
            // If userId is provided, filter tickets by userId
            tickets = await Ticket.find({ userId }).populate('userId', 'username email');
        } else {
            // If no userId is provided, retrieve all tickets
            tickets = await Ticket.find().populate('userId', 'username email');
        }

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets', error });
    }
};


export const updateTicketPriority = async (req, res) => {
    const { id } = req.params;
    const { priority } = req.body;

    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            { priority },
            { new: true } // Returns the updated ticket document
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: 'Error updating ticket priority', error });
    }
};

export const updateTicket = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body; // Assuming req.body contains all fields to update

    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } // Returns the updated ticket document and runs validation
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: 'Error updating ticket', error });
    }
};

