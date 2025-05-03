import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthData } from 'hooks/useAuthData';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthData();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
