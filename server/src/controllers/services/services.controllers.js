// servicePlan.controller.js
import { Purchase } from '../../models/purchase.model.js';
import { ServicePlan } from '../../models/service.model.js'

// Create a new service plan
export const createServicePlan = async (req, res) => {
    try {
        const servicePlan = new ServicePlan(req.body);
        await servicePlan.save();
        res.status(201).json(servicePlan);
    } catch (error) {
        res.status(400).json(error);
    }
};

// Get all service plans
export const getAllServicePlans = async (req, res) => {
    try {
        const servicePlans = await ServicePlan.find();
        res.status(200).json(servicePlans);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get a single service plan by ID
export const getServicePlanById = async (req, res) => {
    try {
        const servicePlan = await ServicePlan.findById(req.params.id);
        if (!servicePlan) return res.status(404).json();
        res.status(200).json(servicePlan);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update a service plan by ID
export const updateServicePlan = async (req, res) => {
    try {
        const servicePlan = await ServicePlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!servicePlan) return res.status(404).json();
        res.status(200).json(servicePlan);
    } catch (error) {
        res.status(400).json(error);
    }
};

// Delete a service plan by ID
export const deleteServicePlan = async (req, res) => {
    try {
        const servicePlan = await ServicePlan.findByIdAndDelete(req.params.id);
        if (!servicePlan) return res.status(404).json();
        res.status(200).json(servicePlan);
    } catch (error) {
        res.status(500).json(error);
    }
};


// controllers/purchase.controller.js

// Get purchases by user ID
export const getPurchasesByUser = async (req, res) => {
    try {
        const purchases = await Purchase.find({ user: req.params.userId })
            .populate('servicePlan') // This will populate the service plan details
            .populate('user');
        // .populate('servicePlan') // This will populate the service plan details
        // .populate('user'); // This will populate user details if needed

        console.log('purchases', purchases)
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find()
            .populate('servicePlan') // This will populate the service plan details
            .populate('user'); // This will populate user details if needed

        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


