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
    // Check if token is valid
    const tokenValid = checkToken
    const userRole = checkUserRole // Assuming checkUserRole returns the role like 'US' or 'AD'

    if (!tokenValid) {
        // If not authenticated, redirect to sign-in
        return <Navigate to="/sign-in" replace />;
    }

    // Admin-only routes
    if (adminOnly && userRole !== 'AD') {
        // If a non-admin tries to access an admin-only route, redirect to a user page
        return <Navigate to="/plans" replace />;
    }

    // User-only routes
    if (adminOnly && userRole !== 'AD') {
        // If an admin tries to access a user-only route, redirect to the dashboard
        return <Navigate to="/dashboard" replace />;
    }

    // If role matches, render the component
    return element;
};



export default ProtectedRoute;
