import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
    request_type: { type: String, },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    fileUrl: { type: String }, // Optional for file uploads
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to the User model
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);
export { Ticket };
