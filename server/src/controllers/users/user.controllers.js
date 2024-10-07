import { Purchase } from "../../models/purchase.model.js"
import { User } from "../../models/user.models.js"
import { encrypt_password } from "../../utils/bcrypt.js"
import { generate_jwt_token } from "../../utils/jwt.js"

export const get_all_users = async (req, res) => {
    try {
        // const { _id } = req.headers

        // const user = await User.findById(_id)
        // if (!user) return res.status(401).json({ error: 'user not found' })

        const users = await User.find()
        res.status(200).json({ users })
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

export const get_user = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const update_user = async (req, res) => {
    try {
        const {
            client_name,
            company_name,
            contact_person,
            official_email,
            personal_email,
            phone_number,
            address,
            website_url,
            industry,
            username, // Get username from request if it's included
        } = req.body;

        // Find the user by ID
        const find_user = await User.findById(req.user_id);
        if (!find_user) return res.status(400).json({ message: 'User not found' });

        // Prepare updated data, excluding the password
        const updated_data = {
            client_name,
            company_name,
            contact_person,
            official_email,
            personal_email,
            phone_number,
            address,
            website_url,
            industry,
            // Include username only if it's different
            ...(username && username !== find_user.username ? { username } : {}),
        };

        // Check if the username is being changed and if it's already taken
        // if (username && username !== find_user.username) {
        //     const existingUser = await User.findOne({ username });
        //     if (existingUser) {
        //         return res.status(400).json({ message: 'Username already exists' });
        //     }
        // }

        // Update user details in the database
        const user = await User.findByIdAndUpdate(
            req.user_id, // Use the ID from the token (assumed to be req.user_id)
            updated_data,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export const delete_user = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findByIdAndDelete(id)
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user_id).populate('')
        console.log(user)
        const token = generate_jwt_token(user);
        res.status(200).json({ user: user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
}



// GET all users
export const getUsers = async (req, res) => {
    try {
        const usersWithPlans = await User.find({
            _id: { $in: await Purchase.distinct('user') } // Find users whose IDs are in the Plan collection
        });
        res.status(200).json(usersWithPlans);
    } catch (error) {
        console.error('Error fetching users with purchased plans:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}