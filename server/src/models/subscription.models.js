import { model } from "mongoose";
import { Schema } from "mongoose";

// Subscription Schema
const subscriptionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['basic', 'standard', 'professional ', 'business', 'premium', 'enterprise'],
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

export const Subscription = model('Subscription', subscriptionSchema);
