import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie";

const UnauthenticatedRoute: React.FC = () => {
  const authStatus = Cookies.get('auth_status') ?? '';
  const isAuthenticated: boolean = authStatus === 'authenticated'

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default UnauthenticatedRoute;
