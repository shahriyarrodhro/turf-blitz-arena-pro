
import React from 'react';
import { Home, Calendar, MapPin, Trophy, Users, MessageCircle, Settings, Bell, Star, Target, Award, BarChart3, Shield, AlertTriangle, DollarSign, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  userRole: 'player' | 'turf-owner' | 'admin';
  userName: string;
  userAvatar: string;
  onChatOpen: () => void;
  onNotificationsOpen: () => void;
  onSettingsOpen: () => void;
}

export const AppSidebar = ({ userRole, userName, userAvatar, onChatOpen, onNotificationsOpen, onSettingsOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const getMenuItems = () => {
    switch (userRole) {
      case 'player':
        return [
          { icon: Home, label: 'Overview', path: '/player', section: 'overview' },
          { icon: Calendar, label: 'My Bookings', path: '/player', section: 'bookings' },
          { icon: Users, label: 'My Team', path: '/player', section: 'team' },
          { icon: Trophy, label: 'Achievements', path: '/player', section: 'achievements' },
          { icon: Target, label: 'Find Match', path: '/player', section: 'matchmaking' },
          { icon: MapPin, label: 'Browse Turfs', path: '/turfs' },
          { icon: Trophy, label: 'Tournaments', path: '/tournaments' },
        ];
      case 'turf-owner':
        return [
          { icon: Home, label: 'Overview', path: '/turf-owner', section: 'overview' },
          { icon: Calendar, label: 'Bookings', path: '/turf-owner', section: 'bookings' },
          { icon: MapPin, label: 'My Turfs', path: '/turf-owner', section: 'turfs' },
          { icon: Star, label: 'Reviews', path: '/turf-owner', section: 'reviews' },
          { icon: BarChart3, label: 'Analytics', path: '/turf-owner', section: 'analytics' },
          { icon: DollarSign, label: 'Revenue', path: '/turf-owner', section: 'revenue' },
        ];
      case 'admin':
        return [
          { icon: Home, label: 'Overview', path: '/admin', section: 'overview' },
          { icon: Shield, label: 'Approvals', path: '/admin', section: 'approvals' },
          { icon: Users, label: 'Users & Turfs', path: '/admin', section: 'users' },
          { icon: BarChart3, label: 'Analytics', path: '/admin', section: 'analytics' },
          { icon: AlertTriangle, label: 'Reports', path: '/admin', section: 'reports' },
          { icon: DollarSign, label: 'Revenue', path: '/admin', section: 'revenue' },
        ];
      default:
        return [];
    }
  };

  const handleNavigation = (path: string, section?: string) => {
    if (section) {
      navigate(`${path}?tab=${section}`);
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 h-screen backdrop-blur-md bg-white/70 border-r border-white/20 flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-white/20 bg-gradient-to-b from-white/50 to-transparent">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <div>
            <div className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">TurfX</div>
            <div className="text-sm text-gray-500 capitalize">{userRole.replace('-', ' ')}</div>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-white/20 bg-gradient-to-b from-white/30 to-transparent">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10 shadow-md">
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              {userAvatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-gray-800 font-medium text-sm">{userName}</div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
              <div className="text-gray-500 text-xs">Online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path && (!item.section || location.search.includes(item.section));
          return (
            <Button
              key={index}
              variant="ghost"
              className={`w-full justify-start rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 shadow-md' 
                  : 'text-gray-700 hover:bg-white/60 hover:text-emerald-700'
              }`}
              onClick={() => handleNavigation(item.path, item.section)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <Separator className="mx-4 bg-white/30" />

      {/* Action Items */}
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-blue-50/60 hover:text-blue-700 rounded-xl transition-all duration-300"
          onClick={onChatOpen}
        >
          <MessageCircle className="w-5 h-5 mr-3" />
          Messages
          <Badge className="ml-auto bg-emerald-100 text-emerald-700 border border-emerald-200">3</Badge>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-yellow-50/60 hover:text-yellow-700 rounded-xl transition-all duration-300"
          onClick={onNotificationsOpen}
        >
          <Bell className="w-5 h-5 mr-3" />
          Notifications
          <Badge className="ml-auto bg-red-100 text-red-700 border border-red-200">5</Badge>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-50/60 rounded-xl transition-all duration-300"
          onClick={onSettingsOpen}
        >
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </Button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-white/20 bg-gradient-to-t from-white/30 to-transparent">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50/60 rounded-xl transition-all duration-300"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};
