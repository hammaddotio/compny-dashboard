import express from 'express'
import { auth_middleware } from '../middlewares/auth.middlewares.js'
import { getUsersWithPlans } from '../controllers/admin/admin.controllers.js';

export const admin_router = express.Router()

admin_router.get('/api/admin/users/plans', auth_middleware(['AD']), getUsersWithPlans);
