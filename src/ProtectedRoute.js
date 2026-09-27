import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import BrandedLoading from './BrandedLoading';

const ProtectedRoute = ({ children }) => {
  const { user, token, ready } = useAuth();
  if (ready === false) return <BrandedLoading/>;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
