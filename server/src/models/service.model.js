// servicePlan.model.js
import mongoose from 'mongoose'

const servicePlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    services: [{ type: String, required: true }],
    supportHours: { type: Number },
    addOns: {
        customDevelopment: { type: Number, default: 100 },
        emergencySupport: { type: Number, default: 150 },
        seoContentCreation: { type: Number, default: 200 },
    },
}, { timestamps: true });

const ServicePlan = mongoose.model('ServicePlan', servicePlanSchema);
export { ServicePlan };
