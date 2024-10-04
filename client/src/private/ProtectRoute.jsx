import React from 'react';
import { Navigate } from 'react-router-dom';
import { checkToken, checkUserRole } from '../constant'; // Assuming these are functions that validate token and role

// const ProtectedRoute = ({ element, adminOnly = false }) => {

//     // Check if token is valid
//     if (!checkToken || !checkUserRole) {
//         // Redirect to sign-in if not authenticated
//         return <Navigate to="/sign-in" replace />;
//     }

//     // Check role-based access
//     // Assuming checkUserRole returns 'US' for user and 'AD' for admin

//     // If adminOnly is true, restrict access to admins
//     if (adminOnly && checkUserRole !== 'AD') {
//         // If a non-admin tries to access an admin-only route, redirect to the appropriate user page
//         return <Navigate to="/dashboard" replace />;
//     }

//     // If the user role is 'US' and the route is not admin-only, redirect them accordingly
//     if (checkUserRole === 'US') {
//         // Non-admins cannot access admin routes
//         return <Navigate to="/plans" replace />;
//     }

//     // If everything checks out, render the requested component
//     return element;
// };

const ProtectedRoute = ({ element, adminOnly = false, userOnly = false }) => {
    const token = checkToken;
    const userRole = checkUserRole;

    // Redirect to login if no token is found
    if (!token) {
        return <Navigate to="/sign-in" replace />;
    }

    // Admin-only routes logic
    if (adminOnly && userRole !== 'AD') {
        // Redirect non-admin users to user plans page
        return <Navigate to="/plans" replace />;
    }

    // User-only routes logic
    if (userOnly && userRole !== 'US') {
        // Redirect admins to dashboard if trying to access user-only routes
        return <Navigate to="/dashboard" replace />;
    }

    // If none of the above, render the component
    return element;
};



export default ProtectedRoute;
