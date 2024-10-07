import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    client_name: {
        type: String,
        // required: true // Assuming you want this to be required as well
    },
    company_name: {
        type: String,
        // required: true // Assuming you want this to be required as well
    },
    contact_person: {
        type: String,
        // required: false // Optional
    },
    personal_email: {
        type: String,
        required: true, // Making personal_email required
        unique: true
    },
    phone_number: {
        type: String,
        required: false // Optional
    },
    address: {
        type: String,
        required: false // Optional
    },
    website_url: {
        type: String,
        required: false // Optional
    },
    industry: {
        type: String,
        required: false // Optional
    },
    username: {
        type: String,
        required: true, // Making username required
        unique: true // Assuming you want unique usernames
    },
    password: {
        type: String,
        required: true // Making password required
    },
    user_role: {
        type: String,
        default: 'US',
        enum: ['US', 'AD'] // Example roles
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription'
    },
    purchasedServices: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServicePlan'
    },
    // Optional fields for added functionality
    profile_picture: {
        type: String, // URL or path to profile picture
        default: `https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png`
    },
    account_type: {
        type: String,
        enum: ['personal', 'business'], // Example account types
        default: 'personal'
    }
});

const User = mongoose.model('User', userSchema);

export { User };
