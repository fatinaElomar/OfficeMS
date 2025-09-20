import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleRoute({ children, roles }) {
  const { role } = useAuth();
  
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  
  if (!roles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}