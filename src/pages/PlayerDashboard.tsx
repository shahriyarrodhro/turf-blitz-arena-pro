
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Users, MapPin, TrendingUp, Search, Bell, Settings, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex">
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
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-gray-200/50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Player Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user?.name} ⚽</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setIsMatchmakingOpen(true)}
                  className="bg-lime-400 hover:bg-lime-500 text-stone-900 font-semibold rounded-2xl"
                >
                  Find Match
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search matches..."
                    className="pl-10 w-64 rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl hover:bg-gray-100"
                  onClick={() => setIsNotificationsOpen(true)}
                >
                  <Bell className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl hover:bg-gray-100"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <Card key={stat.label} className="backdrop-blur-sm bg-white/60 border-gray-200/50 hover:shadow-lg transition-all duration-300 rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
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

          {/* Main Content */}
          <Card className="backdrop-blur-sm bg-white/60 border-gray-200/50 rounded-3xl">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-6 bg-gray-100/50 rounded-xl p-1 mb-8">
                  <TabsTrigger 
                    value="overview" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="bookings" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    My Bookings
                  </TabsTrigger>
                  <TabsTrigger 
                    value="matches" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Matches
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tournaments" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Tournaments
                  </TabsTrigger>
                  <TabsTrigger 
                    value="teams" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Teams
                  </TabsTrigger>
                  <TabsTrigger 
                    value="profile" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Profile
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Bookings */}
                    <Card className="backdrop-blur-sm bg-white/40 border-gray-200/30 rounded-3xl">
                      <CardHeader>
                        <CardTitle className="text-gray-800 flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                          Recent Bookings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {userBookings.length > 0 ? (
                          userBookings.slice(0, 3).map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-4 bg-white/50 rounded-2xl">
                              <div>
                                <h4 className="font-medium text-gray-800">{booking.turfName}</h4>
                                <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
                              </div>
                              <Badge className={`${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              } rounded-full`}>
                                {booking.status}
                              </Badge>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-600">No bookings yet</p>
                            <Button 
                              onClick={() => navigate('/turfs')}
                              className="mt-2 bg-lime-400 hover:bg-lime-500 text-stone-900 rounded-xl"
                            >
                              Book a Turf
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Upcoming Matches */}
                    <Card className="backdrop-blur-sm bg-white/40 border-gray-200/30 rounded-3xl">
                      <CardHeader>
                        <CardTitle className="text-gray-800 flex items-center">
                          <Trophy className="w-5 h-5 mr-2 text-emerald-600" />
                          Upcoming Matches
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-gray-600">No upcoming matches</p>
                          <Button 
                            onClick={() => setIsMatchmakingOpen(true)}
                            className="mt-2 bg-lime-400 hover:bg-lime-500 text-stone-900 rounded-xl"
                          >
                            Find Match
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="bookings" className="space-y-6">
                  <div className="space-y-4">
                    {userBookings.length > 0 ? (
                      userBookings.map((booking) => (
                        <Card key={booking.id} className="backdrop-blur-sm bg-white/40 border-gray-200/30 rounded-3xl">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-lime-100 rounded-2xl flex items-center justify-center">
                                  <MapPin className="w-6 h-6 text-lime-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-800">{booking.turfName}</h3>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600">
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
                                <div className="text-lg font-bold text-gray-800">৳{booking.totalAmount}</div>
                                <Badge className={`${
                                  booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                } rounded-full`}>
                                  {booking.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-16">
                        <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Bookings Yet</h3>
                        <p className="text-gray-600 mb-8">Start booking turfs to see them here</p>
                        <Button 
                          onClick={() => navigate('/turfs')}
                          className="bg-lime-400 hover:bg-lime-500 text-stone-900 rounded-2xl font-semibold"
                        >
                          Browse Turfs
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="matches" className="space-y-6">
                  <div className="text-center py-16">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Match History</h3>
                    <p className="text-gray-600">Your match history and statistics</p>
                  </div>
                </TabsContent>

                <TabsContent value="tournaments" className="space-y-6">
                  <div className="text-center py-16">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Tournament History</h3>
                    <p className="text-gray-600">View your tournament participation and achievements</p>
                  </div>
                </TabsContent>

                <TabsContent value="teams" className="space-y-6">
                  <div className="text-center py-16">
                    <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Team Management</h3>
                    <p className="text-gray-600">Create and manage your teams</p>
                  </div>
                </TabsContent>

                <TabsContent value="profile" className="space-y-6">
                  <div className="text-center py-16">
                    <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Profile Settings</h3>
                    <p className="text-gray-600">Manage your profile and preferences</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Overlays */}
      <ChatComponent isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <NotificationsComponent isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <SettingsComponent isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <MatchmakingComponent isOpen={isMatchmakingOpen} onClose={() => setIsMatchmakingOpen(false)} />
    </div>
  );
};

export default PlayerDashboard;
