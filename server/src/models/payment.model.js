// paymentModel.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stripeCustomerId: {
        type: String,
        required: true
    },
    paymentMethodId: {
        type: String,
        required: true
    },
    paymentIntentId: {
        type: String,
        required: true
    },
    last4: {
        type: String, // Last 4 digits for display
        required: true
    },
    brand: {
        type: String, // Card brand (e.g., Visa, MasterCard)
        required: true
    },
    // Optional fields for additional card details
    cardNumber: {
        type: String, // Full card number (consider encryption)
        required: true
    },
    cvc: {
        type: String, // CVV/CVC (consider encryption)
        required: true
    },
    expMonth: {
        type: Number,
        required: true
    },
    expYear: {
        type: Number,
        required: true
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription'
    },
    servicePlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServicePlan'
    }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export { Payment };
