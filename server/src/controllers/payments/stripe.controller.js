// Assuming you have a User and Subscription model defined
import mongoose, { Schema, model } from 'mongoose';
import Stripe from 'stripe';
import { User } from '../../models/user.models.js';
import { Subscription } from './../../models/subscription.models.js';
import { Purchase } from '../../models/purchase.model.js';

// Initialize Stripe with your private key
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);


export const create_payment_intent = async (req, res) => {
    try {
        const { amount, planType, isSubscription, servicePlan } = req.body; // Get the data from the request body
        const userId = req.user_id

        // Ensure userId is an ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Step 1: Create the payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd', // Adjust currency as needed
            payment_method_types: ['card'],
        });

        // Step 2: If it's a subscription, create or update the subscription
        if (isSubscription) {
            // Retrieve the user to get their subscription details
            const user = await User.findById(userObjectId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Create or update subscription based on the plan
            const subscription = await Subscription.create({
                user: userObjectId,
                type: planType, // Here you can use the planId to determine the subscription type
                start_date: new Date(),
                end_date: new Date(Date.now() + 730 * 60 * 60 * 1000), // Adds 730 hours // Example: 30-day subscription
                is_active: true,
            });
            const purchased = await Purchase.create({
                user: req.user_id,
                servicePlan,
                price: amount,
                expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Adds 30 days
            })

            // Step 3: Return both payment intent and subscription ID
            res.status(200).json({
                clientSecret: paymentIntent.client_secret,
                purchased,
                subscriptionId: subscription._id
            });
        } else {
            // If not a subscription, just return the payment intent
            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        }
    } catch (error) {
        console.error('Error processing payment and subscription:', error);
        res.status(500).json({ error: error.message });
    }
};
