import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleRoute({ roles, children }){
  const { role } = useAuth();
  if (!role) return <Navigate to="/dashboard" replace />;
  const allowed = Array.isArray(roles) ? roles.map(r => r.toLowerCase()) : [String(roles || '').toLowerCase()];
  if (!allowed.includes(role.toLowerCase())) return <Navigate to="/dashboard" replace />;
  return children;
}


