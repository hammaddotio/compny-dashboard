import { User } from "../../models/user.models.js"
import Joi from "joi"
import { compare_password, encrypt_password } from "../../utils/bcrypt.js"
import { generate_jwt_token } from "../../utils/jwt.js"

export const register = async (req, res) => {
    try {
        const {
            // salutation,
            username,
            // first_name,
            // last_name,
            email,
            password,
            // phone_number,
            // birthday,
            // street,
            // city,
            // state,
            // zip,
            // country,
            // referral
        } = req.body;

        // Validation schema using Joi
        const user_registration_schema = Joi.object({
            // salutation: Joi.string().valid('mr', 'mrs', 'miss', 'ms').required('Salutation is required'),
            // first_name: Joi.string().required('First name is required'),
            username: Joi.string().required('username is required'),
            // last_name: Joi.string().required('Last name is required'),
            email: Joi.string().email().required('Email is required'),
            password: Joi.string().min(6).max(20).required('Password is required'),  // Adjust password length as per your preference
            // phone_number: Joi.string().min(11).max(13).required('Phone number is required'),
            // birthday: Joi.date(),
            // street: Joi.string().required('Street is required'),
            // city: Joi.string().required('City is required'),
            // state: Joi.string().required('State is required'),
            // zip: Joi.string().required('Zip is required'),
            // country: Joi.string().required('Country is required'),
            // referral: Joi.string().optional()  // Optional field
        });

        // Validate the request body against the schema
        const { error } = user_registration_schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.message });

        // Check if the user is already registered
        const check_already_registered = await User.findOne({ email });
        if (check_already_registered) return res.status(401).json({ error: 'User already registered' });

        // Encrypt the password
        const encrypted_password = await encrypt_password(password);

        // Create a new user with the encrypted password
        const user = await User.create({
            // salutation,
            username,
            // first_name,
            // last_name,
            email,
            password: encrypted_password,
            // phone_number,
            // birthday,
            // street,
            // city,
            // state,
            // zip,
            // country,
            // referral
        });

        // Return the newly created user
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
};


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Define validation schema using Joi
        const user_login_schema = Joi.object({
            username: Joi.string().required('Username is required'),
            password: Joi.string().min(6).max(20).required('Password is required')  // Adjust min and max as per your rules
        });

        // Validate the request body
        const { error } = user_login_schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.message });

        // Find user by username
        const find_user = await User.findOne({ username });
        if (!find_user) return res.status(401).json({ error: 'User not found' });

        // Compare provided password with the stored hashed password
        const is_password_valid = await compare_password(password, find_user.password);
        if (!is_password_valid) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate JWT token for the user
        const token = generate_jwt_token(find_user);

        // Return user data (excluding password) and token
        const { password: _, ...user_data } = find_user._doc;  // Exclude password from the response
        res.status(200).json({ user_role: user_data.user_role, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
};
