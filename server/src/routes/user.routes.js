import express from 'express'
import { auth_middleware, check_plan_buyer_or_not_middleware } from '../middlewares/auth.middlewares.js'
import { delete_user, get_all_users, get_user, getUserProfile, getUsers, update_user } from '../controllers/users/user.controllers.js'

export const user_router = express.Router()

user_router.get('/api/get-all-users', auth_middleware(['AD']), get_all_users)
user_router.patch('/api/update-user/:id', auth_middleware(['AD', 'US']), update_user)
user_router.delete('/api/delete-user/:id', auth_middleware(['AD', 'US']), delete_user)
user_router.get('/api/get-user/:id', auth_middleware(['AD']), get_user)

user_router.get('/api/user', auth_middleware(['AD', 'US']), getUserProfile)
user_router.get('/users/purchased-plans', auth_middleware(['AD']), check_plan_buyer_or_not_middleware(), getUsers)
