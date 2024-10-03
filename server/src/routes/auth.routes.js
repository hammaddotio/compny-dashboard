import express from 'express'
import { login, register } from '../controllers/authentication/auth.controllers.js'
import { auth_middleware } from '../middlewares/auth.middlewares.js'

export const auth_router = express.Router()

auth_router.post('/api/register', register)
auth_router.post('/api/login', login)