
import React, { useState, useEffect } from 'react';
import { 
  Calendar, Trophy, Users, MapPin, Target, Plus, UserPlus, Zap,
  Clock, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TabsContent } from '@/components/ui/tabs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { ChatComponent } from '@/components/ui/chat-component';
import { NotificationsComponent } from '@/components/ui/notifications';
import { SettingsComponent } from '@/components/ui/settings';
import { MatchmakingComponent } from '@/components/ui/matchmaking';
import { PlayerOverview } from '@/components/ui/dashboard-pages/player-overview';
import { PlayerTeam } from '@/components/ui/dashboard-pages/player-team';
import { TournamentsPage } from '@/components/ui/dashboard-pages/tournaments-page';
import { PaymentsPage } from '@/components/ui/dashboard-pages/payments-page';
import { StatsOverview } from '@/components/ui/dashboard/stats-overview';
import { QuickActions } from '@/components/ui/dashboard/quick-actions';
import { DashboardHeader } from '@/components/ui/dashboard/dashboard-header';
import { DashboardContent } from '@/components/ui/dashboard/dashboard-content';

const PlayerDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { getBookingsByUser } = useBooking();
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMatchmakingOpen, setIsMatchmakingOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [isMobile, setIsMobile] = useState(false);

  const userBookings = user ? getBookingsByUser(user.email) : [];

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check for tab parameter in URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const quickActions = [
    {
      title: 'Book Turf',
      description: 'Find and book available turfs',
      icon: Calendar,
      color: 'from-emerald-500 to-teal-600',
      action: () => navigate('/turfs')
    },
    {
      title: 'Find Match',
      description: 'Connect with other players',
      icon: Target,
      color: 'from-blue-500 to-purple-600',
      action: () => setIsMatchmakingOpen(true)
    },
    {
      title: 'Join Tournament',
      description: 'Compete in tournaments',
      icon: Trophy,
      color: 'from-purple-500 to-pink-600',
      action: () => navigate('/tournaments')
    },
    {
      title: 'My Team',
      description: 'Manage your team',
      icon: Users,
      color: 'from-orange-500 to-red-600',
      action: () => setActiveTab('team')
    }
  ];

  const stats = [
    { 
      label: 'Total Matches', 
      value: '24', 
      icon: Trophy, 
      change: '+3 this month', 
      trend: 'up' as const,
      color: 'text-emerald-600' 
    },
    { 
      label: 'Active Bookings', 
      value: userBookings.length.toString(), 
      icon: Calendar, 
      change: `${userBookings.filter(b => b.status === 'confirmed').length} confirmed`, 
      trend: 'stable' as const,
      color: 'text-blue-600' 
    },
    { 
      label: 'Team Rank', 
      value: '#12', 
      icon: Users, 
      change: 'Division 2', 
      trend: 'up' as const,
      color: 'text-purple-600' 
    },
    { 
      label: 'XP Points', 
      value: '1,247', 
      icon: Zap, 
      change: 'Level 8', 
      trend: 'up' as const,
      color: 'text-yellow-600' 
    }
  ];

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50'
    }`}>
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse ${
          isDarkMode ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gradient-to-r from-emerald-200 to-teal-200'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse delay-1000 ${
          isDarkMode ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'bg-gradient-to-r from-blue-200 to-purple-200'
        }`}></div>
      </div>

      {/* Sidebar */}
      <AppSidebar
        userRole="player"
        userName={user?.name || 'Player'}
        userAvatar={user?.name?.charAt(0) || 'P'}
        onChatOpen={() => setIsChatOpen(true)}
        onNotificationsOpen={() => setIsNotificationsOpen(true)}
        onSettingsOpen={() => setIsSettingsOpen(true)}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative">
        {/* Header */}
        <DashboardHeader
          userRole="player"
          userName={user?.name || 'Player'}
          isDarkMode={isDarkMode}
          language={language}
          isMobile={isMobile}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onToggleLanguage={() => setLanguage(language === 'EN' ? 'বাংলা' : 'EN')}
          onOpenMatchmaking={() => setIsMatchmakingOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <div className="p-4 lg:p-6 space-y-6">
          {/* Stats Overview */}
          <StatsOverview stats={stats} isDarkMode={isDarkMode} />

          {/* Quick Actions */}
          <QuickActions quickActions={quickActions} isDarkMode={isDarkMode} />

          {/* Main Content Tabs */}
          <DashboardContent
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isDarkMode={isDarkMode}
            userRole="player"
          >
            <TabsContent value="overview" className="space-y-6">
              <PlayerOverview />
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <div className="space-y-4">
                {userBookings.length > 0 ? (
                  userBookings.map((booking) => (
                    <Card key={booking.id} className={`backdrop-blur-xl border shadow-xl hover:shadow-2xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800/40 border-gray-700/30' 
                        : 'bg-white/40 border-white/30'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-3xl flex items-center justify-center shadow-lg">
                              <MapPin className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <h3 className={`font-semibold text-lg transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-100' : 'text-gray-800'
                              }`}>
                                {booking.turfName}
                              </h3>
                              <div className={`flex items-center space-x-4 text-sm mt-1 transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {booking.date}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {booking.time} ({booking.duration}h)
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-xl font-bold transition-colors duration-300 ${
                              isDarkMode ? 'text-gray-100' : 'text-gray-800'
                            }`}>
                              ৳{booking.totalAmount}
                            </div>
                            <Badge className={`${
                              booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            } rounded-2xl px-4 py-2 mt-2`}>
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <Calendar className={`w-20 h-20 mx-auto mb-6 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-600' : 'text-gray-400'
                    }`} />
                    <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      No Bookings Yet
                    </h3>
                    <p className={`mb-8 text-lg transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Start booking turfs to see them here
                    </p>
                    <Button 
                      onClick={() => navigate('/turfs')}
                      className="bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-white rounded-3xl font-semibold px-8 py-4 shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Browse Turfs
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <PlayerTeam />
            </TabsContent>

            <TabsContent value="tournaments" className="space-y-6">
              <TournamentsPage />
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <PaymentsPage />
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="text-center py-16">
                <Star className={`w-20 h-20 mx-auto mb-6 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  Achievements & Trophies
                </h3>
                <p className={`text-lg transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Your football journey and accomplishments
                </p>
              </div>
            </TabsContent>
          </DashboardContent>
        </div>
      </div>

      {/* Enhanced Overlays */}
      <ChatComponent isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <NotificationsComponent isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <SettingsComponent isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <MatchmakingComponent isOpen={isMatchmakingOpen} onClose={() => setIsMatchmakingOpen(false)} />
    </div>
  );
};

export default PlayerDashboard;
