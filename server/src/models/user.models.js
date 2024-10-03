import mongoose, { Schema, model } from 'mongoose';

// User Schema
const userSchema = new Schema(
    {
        salutation: {
            type: String,
            enum: ['mr', 'mrs', 'miss', 'ms'],
        },
        username: {
            type: String,
            required: true,
            unique: true,  // Optional: Ensure usernames are unique
            trim: true
        },
        first_name: {
            type: String,
            // required: true,
            trim: true
        },
        last_name: {
            type: String,
            // required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,  // Normalize to lowercase
            trim: true
        },
        phone_number: {
            type: String,
            // required: true
        },
        password: {
            type: String,
            required: true
        },
        birthday: {
            type: Date
        },
        street: {
            type: String,
            // required: true,
            trim: true
        },
        city: {
            type: String,
            // required: true,
            trim: true
        },
        state: {
            type: String,
            // required: true,
            trim: true
        },
        zip: {
            type: String,
            // required: true
        },
        country: {
            type: String,
            // required: true,
            trim: true
        },
        referral: {
            type: String,
            trim: true
        },
        user_role: {
            type: String,
            default: 'US',
            enum: ['US', 'AD'] // Example roles
        },
        status: {
            type: String,
            enum: ['active', 'inactive'], // Define valid statuses
            default: 'active'
        },
        // Reference to the Subscription model
        subscription: {
            type: Schema.Types.ObjectId,
            ref: 'Subscription'
        },
        purchasedServices: [{
            type: Schema.Types.ObjectId,
            ref: 'ServicePlan'
        }],
    },
    {
        timestamps: true
    }
);

export const User = model('User', userSchema);
