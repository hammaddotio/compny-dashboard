// servicePlan.routes.js
import express from 'express'
import {
    createServicePlan
    , getAllServicePlans
    , getServicePlanById
    , updateServicePlan
    , deleteServicePlan,
    getPurchasesByUser,
    getAllPurchases
} from '../controllers/services/services.controllers.js'
import { auth_middleware } from '../middlewares/auth.middlewares.js';

export const services_router = express.Router();

services_router.post('/api/create-service', auth_middleware(['AD']), createServicePlan);
services_router.get('/api/services', getAllServicePlans);
services_router.get('/api/service/:id', auth_middleware(['AD']), getServicePlanById);
services_router.patch('/api/update-service/:id', auth_middleware(['AD']), updateServicePlan);
services_router.delete('/api/delete-service/:id', auth_middleware(['AD']), deleteServicePlan);


// Add this route in purchase.routes.js
services_router.get('/api/service-purchases/:userId', auth_middleware(['AD', 'US']), getPurchasesByUser);
services_router.get('/api/service-purchases', auth_middleware(['AD']), getAllPurchases);