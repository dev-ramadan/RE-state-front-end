import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface RoleBasedRouteProps {
  allowedRoles: string[];
  children?: React.ReactElement;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles, children }) => {
  const { isAuthenticated, roles } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const hasAccess = roles?.some((role) => allowedRoles.includes(role));
  if (!hasAccess) return <Navigate to="/unAuthorized" replace />;

  if (children) return children;
  return <Outlet />;
};

export default RoleBasedRoute;
