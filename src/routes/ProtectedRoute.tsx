import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useAuthContext } from '../context/useAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
   allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
 const {user} = useAuthContext();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

    // If allowedRoles is provided, check role match
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
