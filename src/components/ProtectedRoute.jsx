// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const loggedInUser = localStorage.getItem('loggedInUser');

  // If user is NOT logged in, redirect to /login
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render nested routes (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
