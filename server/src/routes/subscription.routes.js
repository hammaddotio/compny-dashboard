import express from 'express';
import { subscribeUser, getSubscription, updateSubscription } from '../controllers/services/services.controllers.js';

export const subscription_route = express.Router();

// Route to subscribe a user
subscription_route.post('/subscribe', subscribeUser);

// Route to get a user's subscription
subscription_route.get('/:userId', getSubscription);

// Route to update a subscription
subscription_route.patch('/:userId', updateSubscription);



