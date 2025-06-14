
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Calendar, Users, Trophy, CreditCard, Award } from 'lucide-react';

interface DashboardContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode: boolean;
  userRole: string;
  children: React.ReactNode;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  activeTab,
  onTabChange,
  isDarkMode,
  userRole,
  children
}) => {
  const getTabsForRole = () => {
    switch (userRole) {
      case 'player':
        return [
          { value: 'overview', label: 'Overview', icon: Activity },
          { value: 'bookings', label: 'Bookings', icon: Calendar },
          { value: 'team', label: 'My Team', icon: Users },
          { value: 'tournaments', label: 'Tournaments', icon: Trophy },
          { value: 'payments', label: 'Payments', icon: CreditCard },
          { value: 'achievements', label: 'Achievements', icon: Award }
        ];
      case 'turf-owner':
        return [
          { value: 'overview', label: 'Overview', icon: Activity },
          { value: 'schedule', label: 'Schedule', icon: Calendar },
          { value: 'orders', label: 'Orders', icon: Users },
          { value: 'tournaments', label: 'Tournaments', icon: Trophy },
          { value: 'analytics', label: 'Analytics', icon: Award },
          { value: 'wallet', label: 'Wallet', icon: CreditCard }
        ];
      case 'admin':
        return [
          { value: 'overview', label: 'Overview', icon: Activity },
          { value: 'players', label: 'Players', icon: Users },
          { value: 'turfs', label: 'Turfs', icon: Calendar },
          { value: 'payments', label: 'Payments', icon: CreditCard },
          { value: 'tournaments', label: 'Tournaments', icon: Trophy },
          { value: 'system', label: 'System', icon: Award }
        ];
      case 'superadmin':
        return [
          { value: 'overview', label: 'Overview', icon: Activity },
          { value: 'users', label: 'Users', icon: Users },
          { value: 'content', label: 'Content', icon: Calendar },
          { value: 'reports', label: 'Reports', icon: CreditCard },
          { value: 'settings', label: 'Settings', icon: Award },
          { value: 'system', label: 'System', icon: Trophy }
        ];
      default:
        return [];
    }
  };

  const tabs = getTabsForRole();

  return (
    <Card className={`backdrop-blur-2xl border shadow-xl transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/30 border-gray-700/30' 
        : 'bg-white/30 border-white/30'
    }`}>
      <CardContent className="p-4 lg:p-8">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className={`grid w-full grid-cols-3 lg:grid-cols-6 rounded-2xl p-1 mb-6 lg:mb-8 shadow-lg border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/40 backdrop-blur-sm border-gray-700/20' 
              : 'bg-white/40 backdrop-blur-sm border-white/20'
          }`}>
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value}
                className={`rounded-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg data-[state=active]:text-emerald-400 text-gray-300'
                    : 'data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 text-gray-600'
                }`}
              >
                <span className="hidden lg:inline">{tab.label}</span>
                <tab.icon className="w-4 h-4 lg:hidden" />
              </TabsTrigger>
            ))}
          </TabsList>

          {children}
        </Tabs>
      </CardContent>
    </Card>
  );
};
