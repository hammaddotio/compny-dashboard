import { User } from "../../models/user.models.js"
import Joi from "joi"
import { compare_password, encrypt_password } from "../../utils/bcrypt.js"
import { generate_jwt_token } from "../../utils/jwt.js"

export const register = async (req, res) => {
    try {
        const {
            username,
            personal_email,
            password,
        } = req.body;

        // Validation schema using Joi
        const user_registration_schema = Joi.object({
            username: Joi.string().required().messages({
                'any.required': 'Username is required',
                'string.empty': 'Username cannot be empty',
            }),
            personal_email: Joi.string().email().required().messages({
                'any.required': 'Email is required',
                'string.empty': 'Email cannot be empty',
                'string.email': 'Email must be a valid email address',
            }),
            password: Joi.string().min(6).max(20).required().messages({
                'any.required': 'Password is required',
                'string.empty': 'Password cannot be empty',
                'string.min': 'Password must be at least 6 characters long',
                'string.max': 'Password must be at most 20 characters long',
            }),
        });

        // Validate the request body against the schema
        const { error } = user_registration_schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.message });

        // Check if the user is already registered
        const check_already_registered = await User.findOne({ username });
        if (check_already_registered) return res.status(409).json({ error: 'User already registered' });

        // Encrypt the password
        const encrypted_password = await encrypt_password(password);

        // Create a new user with the encrypted password
        const user = await User.create({
            username,
            personal_email,
            password: encrypted_password,
        });
        console.log(user)

        // Return the newly created user, but you may want to omit the password in the response
        const { password: _, ...userResponse } = user._doc; // Omit password
        res.status(201).json(userResponse);
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
        res.status(200).json({ user_role: user_data.user_role, token, _id: user_data._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
}