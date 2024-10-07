import React from 'react';
import './App.css';
// import { Routes, Route } from 'react-router-dom';
import Plans from './pages/Plans';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PaymentStripe from './components/PaymentStripe';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISH_KEY } from './constant';
import { Elements } from '@stripe/react-stripe-js';
import PaymentPaypal from './components/PaymentPaypal';
import ProtectedRoute from './private/ProtectRoute';
import Navbar from './components/Navbar';

// -------------------------------------------------------
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import UserPurchasedServices from "./pages/UserPurchasedServices";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PlansList from "./pages/PlansList";
import Main from "./components/layout/Main";
// import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import TicketsTableAdmin from './pages/TicketsTableAdmin';
import MyTickets from './pages/MyTickets..';
import AdminChat from './pages/AdminChat';
import AllUserList from './pages/AllUsersList';

const App = () => {
  const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);

  return (
    <>
      {/* <Navbar /> */}
      <Elements stripe={stripePromise}>
        <Routes>
          {/* Protected Routes */}
          {/* <Route path="/" element={<ProtectedRoute element={<Plans />} />} />
           <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} /> 
          <Route path="/payment/stripe" element={<ProtectedRoute element={<PaymentForm />} />} />
          <Route path="/payment/paypal" element={<PaymentPaypal />} />
          <Route path="/scope-form" element={<ProtectedRoute element={<ScopeForm />} />} /> */}

          <>
            {/* Admin-Only Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/chats" element={<AdminChat />} />
            <Route path="/all-users" element={<AllUserList />} />

            {/* User-Only Routes */}
            <Route path="/purchased-services" element={<ProtectedRoute element={<UserPurchasedServices />} userOnly={true} />} />
            <Route path="/payment" element={<ProtectedRoute element={<PaymentStripe />} userOnly={true} />} />
            <Route path="/tickets" element={<TicketsTableAdmin />} />

            {/* Mixed Role Routes */}
            {/* <Route path="/profile" element={<ProtectedRoute element={<Profile />} userOnly={true} adminOnly={true} />} /> */}
            <Route path="/profile" element={<Profile />} />

            {/* Public Routes */}
            <Route path="/plans" element={<PlansList />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </>

          {/* <Route path="/sign-up" element={<ProtectedRoute element={<SignUp />} />} />
          <Route path="/sign-in" element={<ProtectedRoute element={<SignIn />} />} /> */}
          {/* <Route path="/sign-up" element={<ProtectedRoute element={<SignUp />} userOnly={false} adminOnly={false} />} />
          <Route path="/sign-in" element={<ProtectedRoute element={<SignIn />} userOnly={false} adminOnly={false} />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}

          {/* Redirect for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Elements>
    </>
  );
};

export default App;
