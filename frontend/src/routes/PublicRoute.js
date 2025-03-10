import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists

  // If the user is authenticated, redirect to the dashboard, else render the public page
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;
