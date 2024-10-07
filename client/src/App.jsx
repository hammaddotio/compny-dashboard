import React from 'react';
// Importing CSS files
import './assets/styles/main.css';
import './assets/styles/responsive.css';

import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import UserPurchasedServices from './pages/UserPurchasedServices';
import Billing from './pages/Billing';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import PlansList from './pages/PlansList';
import ProtectedRoute, { AdminProtectedRoutes, AuthProtectedRoutes, UserProtectedRoutes } from './private/ProtectRoute';
import AdminChat from './pages/AdminChat';
import TicketsTableAdmin from './pages/TicketsTableAdmin';
import MyTickets from './pages/MyTickets..';
import PaymentStripe from './components/PaymentStripe';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISH_KEY } from './constant';

// Load Stripe with the publishable key
const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);

const App = () => {
  return (
    // Wrap the entire application with Stripe Elements
    <Elements stripe={stripePromise}>
      <Routes>
        {/* Public-Only Routes */}
        <Route path='' element={<AuthProtectedRoutes />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>

        {/* Admin-Only Routes */}
        <Route path='' element={<AdminProtectedRoutes />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/chats" element={<AdminChat />} />
          <Route path="/tickets" element={<TicketsTableAdmin />} />
        </Route>

        {/* User-Only Routes */}
        <Route path='' element={<UserProtectedRoutes />}>
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/purchased-services" element={<UserPurchasedServices />} />
          <Route path="/payment/stripe" element={<PaymentStripe />} />
        </Route>

        {/* Payment Route (User-Only) */}

        {/* Mixed Role Routes */}
        <Route path="/plans" element={<ProtectedRoute element={<PlansList />} />} />
        <Route path="/" element={<ProtectedRoute element={<PlansList />} />} />

        {/* Profile Route - Accessible only to logged-in users */}
        <Route element={<AuthProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Default Route */}


        {/* Redirect for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Elements>

  );
};

export default App;
