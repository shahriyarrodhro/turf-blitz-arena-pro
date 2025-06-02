
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, MapPin, Trophy, Home, LogOut, Menu, Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface EnhancedHeaderProps {
  className?: string;
  showSearch?: boolean;
}

export const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({ 
  className = '', 
  showSearch = true 
}) => {
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
    <header className={`sticky top-0 z-50 backdrop-blur-2xl bg-white/20 border-b border-white/30 shadow-2xl ${className}`}>
      {/* Mobile floating bar effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-white/30 rounded-b-3xl md:rounded-none"></div>
      
      <div className="container mx-auto px-4 py-3 relative">
        <div className="flex items-center justify-between">
          {/* Logo with enhanced glassmorphism */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-sm border border-white/20 group-hover:scale-105 transition-all duration-300">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              TurfX
            </div>
          </div>

          {/* Search bar for mobile */}
          {showSearch && (
            <div className="flex-1 max-w-md mx-4 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10 rounded-2xl border-white/30 bg-white/20 backdrop-blur-md placeholder:text-gray-500"
                />
              </div>
            </div>
          )}

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className={`flex items-center space-x-2 rounded-2xl px-6 py-2 transition-all duration-300 backdrop-blur-sm ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-emerald-100/80 to-teal-100/80 text-emerald-700 shadow-lg border border-emerald-200/50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-white/40 border border-transparent hover:border-white/30'
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* Desktop Search */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-sm mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search turfs, tournaments..."
                  className="pl-10 rounded-2xl border-white/30 bg-white/20 backdrop-blur-md placeholder:text-gray-500"
                />
              </div>
            </div>
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/40 relative"
                >
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
                    3
                  </Badge>
                </Button>

                <Button
                  variant="outline"
                  className="rounded-2xl border-white/30 bg-white/20 hover:bg-white/40 backdrop-blur-md transition-all duration-300 hidden md:flex"
                  onClick={() => navigate(getDashboardPath())}
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>

                <Button
                  variant="ghost"
                  className="text-red-600 hover:bg-red-50/60 rounded-2xl transition-all duration-300 hidden md:flex"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>

                {/* Mobile menu button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <Button
                className="bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 hover:from-emerald-500 hover:via-teal-600 hover:to-blue-600 text-white rounded-2xl shadow-xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
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
