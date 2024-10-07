import { User } from "../models/user.models.js"
import { decrypt_jwt_token } from "../utils/jwt.js"

// export const auth_middleware = (roles) => async (req, res, next) => {
//     try {
//         const token = req.header('Authorization') || req.body.token
//         if (!token) return res.status(401).json(msg: 'Unauthorized user'))

//         const verify_token = decrypt_jwt_token(token, process.env.JWT_PRIVATE_KEY)
//         if (!verify_token) return res.status(401).json(msg: 'invalid token'))

//         const user = await User.findById(verify_token._id._id)
//         if (!user) return res.status(404).json(msg: 'user not found'))
//         console.log(user)

//         // if (!roles.includes(user.user_role)) return res.status(401).json(msg: 'unauthorized user'))
//         console.log(roles)
//         req.user_id = user._id
//         req.user_role = user.user_role

//         next()
//     } catch (error) {
//         res.status(401).json({ error: error, msg: 'auth error' })
//     }
// }

export const auth_middleware = (roles) => async (req, res, next) => {
    try {
        // Retrieve the token from the Authorization header
        const token = req.header('Authorization') || req.body.token;  // Expecting 'Bearer <token>'
        if (!token) {
            return res.status(401).json({ msg: 'Unauthorized: No token provided' });
        }

        // Decrypt and verify the token
        const verify_token = decrypt_jwt_token(token, process.env.JWT_PRIVATE_KEY); // Using jwt to verify
        if (!verify_token) {
            return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
        }

        // Find the user by ID from the decrypted token
        const user = await User.findById(verify_token._id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if the user's role is authorized
        if (roles && !roles.includes(user?.user_role)) {
            return res.status(403).json({ msg: 'Unauthorized: Insufficient role' });
        }

        // Attach user information to the request object for downstream use
        req.user_id = user._id;
        req.user_role = user.user_role;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Authentication error:', error); // Log the error for debugging
        return res.status(500).json({ error: 'Internal server error' });
    }
};


export const check_plan_buyer_or_not_middleware = () => async (req, res, next) => {
    try {
        const userId = req.user_id;
        const userRole = req.user_role;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' })
        }
        console.log(user)


        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Authentication error:', error); // Log the error for debugging
        return res.status(500).json({ error: 'Internal server error' }); // Handle errors gracefully
    }
}