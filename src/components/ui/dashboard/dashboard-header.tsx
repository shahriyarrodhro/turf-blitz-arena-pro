
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bell, Settings, Globe, Moon, Sun, Target } from 'lucide-react';

interface DashboardHeaderProps {
  userRole: string;
  userName: string;
  isDarkMode: boolean;
  language: string;
  isMobile: boolean;
  onToggleDarkMode: () => void;
  onToggleLanguage: () => void;
  onOpenMatchmaking: () => void;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userRole,
  userName,
  isDarkMode,
  language,
  isMobile,
  onToggleDarkMode,
  onToggleLanguage,
  onOpenMatchmaking,
  onOpenNotifications,
  onOpenSettings
}) => {
  const getRoleTitle = () => {
    switch (userRole) {
      case 'player': return 'Player Dashboard';
      case 'turf-owner': return 'Turf Owner Panel';
      case 'admin': return 'Admin Panel';
      case 'superadmin': return 'SuperAdmin Panel';
      default: return 'Dashboard';
    }
  };

  return (
    <div className={`sticky top-0 z-40 backdrop-blur-2xl border-b shadow-xl transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/30 border-gray-700/40' 
        : 'bg-white/30 border-white/40'
    }`}>
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-gray-800 via-emerald-600 to-teal-600 bg-clip-text text-transparent'
              }`}>
                {getRoleTitle()}
              </h1>
              <p className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Welcome back, {userName} ⚽
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleLanguage}
              className={`rounded-xl transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/20 border-gray-600/30 hover:bg-gray-700/40 text-gray-200'
                  : 'bg-white/20 border-white/30 hover:bg-white/40 text-gray-700'
              }`}
            >
              <Globe className="w-4 h-4 mr-1" />
              {language}
            </Button>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleDarkMode}
              className={`rounded-xl transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/20 border-gray-600/30 hover:bg-gray-700/40 text-gray-200'
                  : 'bg-white/20 border-white/30 hover:bg-white/40 text-gray-700'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Find Match Button - Player only */}
            {userRole === 'player' && (
              <Button
                onClick={onOpenMatchmaking}
                className="bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-white font-semibold rounded-2xl px-3 lg:px-6 py-2 lg:py-3 shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Target className="w-4 h-4 lg:w-5 lg:h-5 lg:mr-2" />
                <span className="hidden lg:inline">Find Match</span>
              </Button>
            )}

            {/* Search - Hidden on mobile */}
            {!isMobile && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search..."
                  className={`pl-10 w-48 lg:w-64 rounded-2xl transition-colors duration-300 ${
                    isDarkMode 
                      ? 'border-gray-600/30 bg-gray-800/40 backdrop-blur-md placeholder:text-gray-400 text-gray-200'
                      : 'border-white/30 bg-white/40 backdrop-blur-md placeholder:text-gray-500 text-gray-700'
                  }`}
                />
              </div>
            )}

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon" 
              className={`rounded-2xl transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/20 border-gray-600/30 hover:bg-gray-700/40'
                  : 'bg-white/20 border-white/30 hover:bg-white/40'
              }`}
              onClick={onOpenNotifications}
            >
              <Bell className="w-5 h-5" />
            </Button>

            {/* Settings */}
            <Button 
              variant="ghost" 
              size="icon" 
              className={`rounded-2xl transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/20 border-gray-600/30 hover:bg-gray-700/40'
                  : 'bg-white/20 border-white/30 hover:bg-white/40'
              }`}
              onClick={onOpenSettings}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
