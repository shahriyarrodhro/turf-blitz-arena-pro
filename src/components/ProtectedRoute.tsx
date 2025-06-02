
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('player' | 'turf-owner' | 'admin')[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles,
  redirectTo = '/auth' 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-white to-gray-50">
        <div className="text-center backdrop-blur-sm bg-white/60 p-8 rounded-3xl border border-white/20 shadow-xl">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={`${redirectTo}?returnTo=${location.pathname}`} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const dashboardRoutes = {
      'player': '/player',
      'turf-owner': '/turf-owner',
      'admin': '/admin'
    };
    return <Navigate to={dashboardRoutes[user.role]} replace />;
  }

  return <>{children}</>;
};
