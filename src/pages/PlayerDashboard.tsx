
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Trophy, Users, MapPin, TrendingUp, Search, Bell, Settings, 
  Clock, Star, Target, Plus, Edit, User, CreditCard, Globe, Moon, Sun,
  ChevronDown, Filter, MoreHorizontal, Activity, Award, GamepadIcon,
  PlusCircle, UserPlus, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
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
import { Switch } from '@/components/ui/switch';

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
      trend: 'up',
      color: 'text-emerald-600' 
    },
    { 
      label: 'Active Bookings', 
      value: userBookings.length.toString(), 
      icon: Calendar, 
      change: `${userBookings.filter(b => b.status === 'confirmed').length} confirmed`, 
      trend: 'stable',
      color: 'text-blue-600' 
    },
    { 
      label: 'Team Rank', 
      value: '#12', 
      icon: Users, 
      change: 'Division 2', 
      trend: 'up',
      color: 'text-purple-600' 
    },
    { 
      label: 'XP Points', 
      value: '1,247', 
      icon: Zap, 
      change: 'Level 8', 
      trend: 'up',
      color: 'text-yellow-600' 
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'booking',
      title: 'Booked Champions Arena',
      description: 'Dec 15, 2024 at 6:00 PM',
      icon: Calendar,
      status: 'confirmed'
    },
    {
      id: 2,
      type: 'match',
      title: 'Won vs Thunder Bolts',
      description: 'Score: 3-2',
      icon: Trophy,
      status: 'completed'
    },
    {
      id: 3,
      type: 'team',
      title: 'New team member joined',
      description: 'Sakib Hassan joined your team',
      icon: UserPlus,
      status: 'new'
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
        {/* Enhanced Header */}
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
                    Player Dashboard
                  </h1>
                  <p className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Welcome back, {user?.name} ⚽
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 lg:space-x-4">
                {/* Language Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'EN' ? 'বাংলা' : 'EN')}
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
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`rounded-xl transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800/20 border-gray-600/30 hover:bg-gray-700/40 text-gray-200'
                      : 'bg-white/20 border-white/30 hover:bg-white/40 text-gray-700'
                  }`}
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>

                {/* Find Match Button */}
                <Button
                  onClick={() => setIsMatchmakingOpen(true)}
                  className="bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-white font-semibold rounded-2xl px-3 lg:px-6 py-2 lg:py-3 shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Target className="w-4 h-4 lg:w-5 lg:h-5 lg:mr-2" />
                  <span className="hidden lg:inline">Find Match</span>
                </Button>

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
                  onClick={() => setIsNotificationsOpen(true)}
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
                  onClick={() => setIsSettingsOpen(true)}
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {stats.map((stat, index) => (
              <Card key={stat.label} className={`backdrop-blur-2xl border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group ${
                isDarkMode 
                  ? 'bg-gray-800/40 border-gray-700/30' 
                  : 'bg-white/40 border-white/30'
              }`}>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-r ${
                      index === 0 ? 'from-emerald-500 to-teal-600' :
                      index === 1 ? 'from-blue-500 to-purple-600' :
                      index === 2 ? 'from-purple-500 to-pink-600' :
                      'from-yellow-500 to-orange-600'
                    } flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}>
                      <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <TrendingUp className={`w-3 h-3 lg:w-4 lg:h-4 ${stat.color}`} />
                  </div>
                  <div className={`text-lg lg:text-2xl font-bold mb-1 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs lg:text-sm mb-1 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                  <div className={`text-xs ${stat.color}`}>
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={`backdrop-blur-2xl border shadow-xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/30 border-gray-700/30' 
                : 'bg-white/30 border-white/30'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  <Zap className="w-5 h-5 mr-2 text-emerald-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={action.title}
                      onClick={action.action}
                      variant="ghost"
                      className={`h-auto p-4 flex flex-col items-center space-y-2 rounded-2xl transition-all duration-300 hover:scale-105 ${
                        isDarkMode 
                          ? 'hover:bg-gray-700/30 text-gray-200' 
                          : 'hover:bg-gray-50/50 text-gray-700'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center shadow-lg`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-sm">{action.title}</div>
                        <div className={`text-xs transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {action.description}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Tabs */}
          <Card className={`backdrop-blur-2xl border shadow-xl transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/30 border-gray-700/30' 
              : 'bg-white/30 border-white/30'
          }`}>
            <CardContent className="p-4 lg:p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className={`grid w-full grid-cols-3 lg:grid-cols-6 rounded-2xl p-1 mb-6 lg:mb-8 shadow-lg border transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/40 backdrop-blur-sm border-gray-700/20' 
                    : 'bg-white/40 backdrop-blur-sm border-white/20'
                }`}>
                  <TabsTrigger 
                    value="overview" 
                    className={`rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg data-[state=active]:text-emerald-400 text-gray-300'
                        : 'data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 text-gray-600'
                    }`}
                  >
                    <span className="hidden lg:inline">Overview</span>
                    <Activity className="w-4 h-4 lg:hidden" />
                  </TabsTrigger>
                  <TabsTrigger 
                    value="bookings" 
                    className={`rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg data-[state=active]:text-emerald-400 text-gray-300'
                        : 'data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 text-gray-600'
                    }`}
                  >
                    <span className="hidden lg:inline">Bookings</span>
                    <Calendar className="w-4 h-4 lg:hidden" />
                  </TabsTrigger>
                  <TabsTrigger 
                    value="team" 
                    className={`rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg data-[state=active]:text-emerald-400 text-gray-300'
                        : 'data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 text-gray-600'
                    }`}
                  >
                    <span className="hidden lg:inline">My Team</span>
                    <Users className="w-4 h-4 lg:hidden" />
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tournaments" 
                    className={`rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg data-[state=active]:text-emerald-400 text-gray-300'
                        : 'data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 text-gray-600'
                    }`}
                  >
                    <span className="hidden lg:inline">Tournaments</span>
                    <Trophy className="w-4 h-4 lg:hidden" />
                  </TabsTrigger>
                  <TabsTrigger 
                    value="payments" 
                    className={`rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg data-[state=active]:text-emerald-400 text-gray-300'
                        : 'data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 text-gray-600'
                    }`}
                  >
                    <span className="hidden lg:inline">Payments</span>
                    <CreditCard className="w-4 h-4 lg:hidden" />
                  </TabsTrigger>
                  <TabsTrigger 
                    value="achievements" 
                    className={`rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg data-[state=active]:text-emerald-400 text-gray-300'
                        : 'data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 text-gray-600'
                    }`}
                  >
                    <span className="hidden lg:inline">Achievements</span>
                    <Award className="w-4 h-4 lg:hidden" />
                  </TabsTrigger>
                </TabsList>

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
              </Tabs>
            </CardContent>
          </Card>
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
