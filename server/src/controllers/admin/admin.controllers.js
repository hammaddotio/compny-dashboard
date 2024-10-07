// controllers/adminController.js
import { User } from '../../models/user.models.js';

export const getUsersWithPlans = async (req, res) => {
    try {
        const users = await User.find({ purchasedServices: { $ne: null } })
            .select('client_name company_name official_email username') // Select only relevant fields
            .exec();

        res.json(users);
    } catch (error) {
        console.error('Error fetching users with plans:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
