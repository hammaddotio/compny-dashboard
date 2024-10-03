// models/purchase.model.js
import mongoose, { Schema } from 'mongoose'

const purchaseSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    servicePlan: {
        type: Schema.Types.ObjectId,
        ref: 'ServicePlan',
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    expiryDate: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Purchase = mongoose.model('Purchase', purchaseSchema);
export { Purchase }
