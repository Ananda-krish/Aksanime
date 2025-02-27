import React from "react";
import { Navigate } from "react-router-dom";
const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (token && user) {
      // If user is already logged in, redirect based on role
      return user.role === 'admin' ? 
        <Navigate to="/admin-dashboard" replace /> : 
        <Navigate to="/" replace />;
    }
  
    return children;
  };
  export default PublicRoute;