import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Bypass authentication - directly render children
  return <>{children}</>;
};

export default ProtectedRoute;