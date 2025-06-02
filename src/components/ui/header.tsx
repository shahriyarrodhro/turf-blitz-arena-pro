
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, MapPin, Trophy, Home, LogOut } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Turfs', path: '/turfs', icon: MapPin },
    { label: 'Tournaments', path: '/tournaments', icon: Trophy },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/auth';
    
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'turf-owner':
        return '/turf-owner';
      case 'player':
        return '/player';
      default:
        return '/auth';
    }
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              TurfX
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className={`flex items-center space-x-2 rounded-xl transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-white/60'
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  className="rounded-xl border-white/30 bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all duration-300"
                  onClick={() => navigate(getDashboardPath())}
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:bg-red-50/60 rounded-xl transition-all duration-300"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                className="bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 hover:from-emerald-500 hover:via-teal-600 hover:to-blue-600 text-white rounded-xl shadow-lg transition-all duration-300"
                onClick={() => navigate('/auth')}
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
