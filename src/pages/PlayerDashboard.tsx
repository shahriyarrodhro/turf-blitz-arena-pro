
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Users, MapPin, TrendingUp, Search, Bell, Settings, Clock, Star, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

  const userBookings = user ? getBookingsByUser(user.email) : [];

  // Check for tab parameter in URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const stats = [
    { label: 'Matches Played', value: '24', icon: Trophy, change: '+3 this month', color: 'from-emerald-500 to-teal-600' },
    { label: 'Bookings', value: userBookings.length.toString(), icon: Calendar, change: `${userBookings.filter(b => b.status === 'confirmed').length} confirmed`, color: 'from-blue-500 to-purple-600' },
    { label: 'Team Rank', value: '#12', icon: Users, change: 'Division 2', color: 'from-purple-500 to-pink-600' },
    { label: 'XP Points', value: '1,247', icon: TrendingUp, change: 'Level 8', color: 'from-yellow-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full opacity-60 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full opacity-60 blur-3xl animate-pulse delay-1000"></div>
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
        <div className="sticky top-0 z-40 backdrop-blur-2xl bg-white/30 border-b border-white/40 shadow-2xl">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Player Dashboard
                </h1>
                <p className="text-gray-600">Welcome back, {user?.name} ⚽</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setIsMatchmakingOpen(true)}
                  className="bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-white font-semibold rounded-3xl px-6 py-3 shadow-xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Find Match
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search matches..."
                    className="pl-10 w-64 rounded-2xl border-white/30 bg-white/40 backdrop-blur-md placeholder:text-gray-500"
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/40"
                  onClick={() => setIsNotificationsOpen(true)}
                >
                  <Bell className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/40"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Enhanced Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <Card key={stat.label} className="backdrop-blur-2xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
                  <div className="text-xs text-emerald-600">{stat.change}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Enhanced Main Content */}
          <Card className="backdrop-blur-2xl bg-white/30 border border-white/30 rounded-3xl shadow-2xl">
            <CardContent className="p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-6 bg-white/40 backdrop-blur-sm rounded-2xl p-1 mb-8 shadow-lg border border-white/20">
                  <TabsTrigger 
                    value="overview" 
                    className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 transition-all duration-300"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="bookings" 
                    className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 transition-all duration-300"
                  >
                    Bookings
                  </TabsTrigger>
                  <TabsTrigger 
                    value="team" 
                    className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 transition-all duration-300"
                  >
                    My Team
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tournaments" 
                    className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 transition-all duration-300"
                  >
                    Tournaments
                  </TabsTrigger>
                  <TabsTrigger 
                    value="payments" 
                    className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 transition-all duration-300"
                  >
                    Payments
                  </TabsTrigger>
                  <TabsTrigger 
                    value="achievements" 
                    className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 transition-all duration-300"
                  >
                    Achievements
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <PlayerOverview />
                </TabsContent>

                <TabsContent value="bookings" className="space-y-6">
                  <div className="space-y-4">
                    {userBookings.length > 0 ? (
                      userBookings.map((booking) => (
                        <Card key={booking.id} className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-14 h-14 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-3xl flex items-center justify-center shadow-lg">
                                  <MapPin className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-800 text-lg">{booking.turfName}</h3>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
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
                                <div className="text-xl font-bold text-gray-800">৳{booking.totalAmount}</div>
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
                        <Calendar className="w-20 h-20 mx-auto mb-6 text-gray-400" />
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Bookings Yet</h3>
                        <p className="text-gray-600 mb-8 text-lg">Start booking turfs to see them here</p>
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
                    <Star className="w-20 h-20 mx-auto mb-6 text-gray-400" />
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Achievements & Trophies</h3>
                    <p className="text-gray-600 text-lg">Your football journey and accomplishments</p>
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
