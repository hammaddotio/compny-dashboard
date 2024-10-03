import express from 'express'
import { login, register } from '../controllers/authentication/auth.controllers.js'
import { auth_middleware } from '../middlewares/auth.middlewares.js'
import { create_payment_intent } from '../controllers/payments/stripe.controller.js'
import { payment_paypal } from '../controllers/payments/paypal.conroller.js'

export const payment_router = express.Router()

payment_router.post('/api/payment/stripe', auth_middleware(['US']), create_payment_intent)
payment_router.post('/api/payment/paypal', payment_paypal)