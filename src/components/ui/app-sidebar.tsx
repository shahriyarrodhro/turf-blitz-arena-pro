
import React from 'react';
import { Home, Calendar, MapPin, Trophy, Users, MessageCircle, Settings, Bell, Star, Target, Award, BarChart3, Shield, AlertTriangle, DollarSign, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

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

  const menuItems = getMenuItems();

  return (
    <div className="w-64 h-screen bg-white/80 backdrop-blur-md border-r border-gray-200/50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-800">TurfMaster</div>
            <div className="text-sm text-gray-500 capitalize">{userRole.replace('-', ' ')}</div>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200/50">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              {userAvatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-gray-800 font-medium text-sm">{userName}</div>
            <div className="text-gray-500 text-xs">Online</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl"
            onClick={() => handleNavigation(item.path, item.section)}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>

      <Separator className="mx-4" />

      {/* Action Items */}
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl"
          onClick={onChatOpen}
        >
          <MessageCircle className="w-5 h-5 mr-3" />
          Messages
          <Badge className="ml-auto bg-emerald-100 text-emerald-700">3</Badge>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 rounded-xl"
          onClick={onNotificationsOpen}
        >
          <Bell className="w-5 h-5 mr-3" />
          Notifications
          <Badge className="ml-auto bg-red-100 text-red-700">5</Badge>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-50 rounded-xl"
          onClick={onSettingsOpen}
        >
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </Button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200/50">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 rounded-xl"
          onClick={() => navigate('/')}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};
