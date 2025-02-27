import React from "react";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const checkAuth = () => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
  
        if (token && user) {
          setIsAuthenticated(true);
          setUserRole(user.role);
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
        }
        setIsLoading(false);
      };
  
      checkAuth();
    }, []);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };
 export default ProtectedRoute;