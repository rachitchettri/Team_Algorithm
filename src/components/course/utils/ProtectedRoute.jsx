import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../Context/authContext";  // Import useAuth hook

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth(); // Get currentUser and loading state from AuthContext

  if (loading) {
    // Optionally render a loading spinner or placeholder while authentication is being checked
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        Loading user session...
      </div>
    );
  }

  // If there's no current user (not logged in), redirect to the login page
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // If a user is logged in, render the child components (the protected route)
  return children;
};

export default ProtectedRoute;
