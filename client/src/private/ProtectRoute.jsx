import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkToken, checkUserId, checkUserRole } from '../constant';

// ProtectedRoute Component
const ProtectedRoute = ({ element, adminOnly = false, userOnly = false, publicOnly = false }) => {
    const token = localStorage.getItem('token'); // Fetch token from local storage
    const userRole = localStorage.getItem('userRole'); // Fetch user role from local storage

    // Redirect to login if no token is found
    if (!token) {
        return <Navigate to="/sign-in" replace />;
    }

    // Admin-only route access logic
    if (adminOnly && userRole !== 'AD') {
        return <Navigate to="/plans" replace />;
    }

    // User-only route access logic
    if (userOnly && userRole !== 'US') {
        return <Navigate to="/dashboard" replace />;
    }

    // If the route is public and the user is authenticated, redirect to dashboard
    if (publicOnly && token) {
        return <Navigate to="/dashboard" replace />;
    }

    // If none of the above conditions block access, render the element
    return element;
};

export default ProtectedRoute;


// Auth Protected Routes Component
export const ProtectedRoutes = () => {
    const token = localStorage.getItem('token');

    // Check if user is logged in
    if (token) {
        return <Outlet />;
    } else {
        return <Navigate to="/sign-in" replace />;
    }
};

export const AuthProtectedRoutes = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    // Allow access to sign-up and sign-in pages only if the user is not authenticated
    if (!token && !userRole) {
        return <Outlet />;
    } else {
        return <Navigate to="/plans" replace />; // Redirect authenticated users to the dashboard
    }
};
export const AdminProtectedRoutes = () => {
    const token = localStorage.getItem('token'); // Fetch token from local storage
    const userRole = localStorage.getItem('role'); // Fetch user role from local storage

    // Check if user is authenticated and has admin role
    if (token && userRole === 'AD') {
        return <Outlet />;
    } else {
        return <Navigate to="/sign-in" replace />;
    }
};
export const UserProtectedRoutes = () => {
    const token = localStorage.getItem('token'); // Fetch token from local storage
    const userRole = localStorage.getItem('role'); // Fetch user role from local storage

    // Check if user is authenticated and has admin role
    if (token && userRole === 'US') {
        return <Outlet />;
    } else {
        return <Navigate to="/plans" replace />;
    }
};
