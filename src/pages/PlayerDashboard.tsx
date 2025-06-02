import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Users, MapPin, Clock, Star, Plus, Bell, Target, Award, Search, Filter, Home, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { ChatComponent } from '@/components/ui/chat-component';
import { NotificationsComponent } from '@/components/ui/notifications';
import { SettingsComponent } from '@/components/ui/settings';
import { MatchmakingComponent } from '@/components/ui/matchmaking';

const PlayerDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Check for tab parameter in URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const stats = [
    { label: 'Matches Played', value: '24', icon: Trophy, change: '+3 this month', color: 'from-blue-500 to-purple-600' },
    { label: 'Goals Scored', value: '18', icon: Target, change: '+5 this month', color: 'from-emerald-500 to-teal-600' },
    { label: 'Tournaments Won', value: '2', icon: Award, change: 'Last win: Spring Cup', color: 'from-orange-500 to-red-600' },
    { label: 'TurfMaster Points', value: '1,250', icon: Star, change: '+150 this month', color: 'from-purple-500 to-pink-600' }
  ];

  const upcomingBookings = [
    {
      id: 1,
      turf: "Champions Arena",
      date: "2024-06-15",
      time: "18:00 - 19:00",
      location: "Dhanmondi, Dhaka",
      status: "Confirmed",
      team: "Thunder Bolts FC",
      opponent: "Lightning Strikers",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      turf: "Victory Ground", 
      date: "2024-06-18",
      time: "20:00 - 21:00",
      location: "Gulshan, Dhaka",
      status: "Pending",
      team: "Thunder Bolts FC",
      opponent: "TBD",
      image: "/placeholder.svg"
    }
  ];

  const teamMembers = [
    { name: "Ahmed Rahman", position: "Captain", avatar: "AR", status: "online" },
    { name: "Sakib Hassan", position: "Goalkeeper", avatar: "SH", status: "offline" },
    { name: "Rafiq Ahmed", position: "Defender", avatar: "RA", status: "online" },
    { name: "Karim Sheikh", position: "Midfielder", avatar: "KS", status: "online" },
    { name: "Nasir Khan", position: "Forward", avatar: "NK", status: "offline" }
  ];

  const achievements = [
    { title: "Spring Champion", date: "April 2024", icon: "🏆", description: "Won Spring Championship 2024" },
    { title: "Goal Scorer", date: "March 2024", icon: "⚽", description: "Scored 10+ goals in tournament" },
    { title: "Team Player", date: "February 2024", icon: "🤝", description: "Played 50+ matches" },
    { title: "Rising Star", date: "January 2024", icon: "⭐", description: "Top performer of the month" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex">
      {/* Sidebar */}
      <AppSidebar
        userRole="player"
        userName="Ahmed Rahman"
        userAvatar="AR"
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
                <p className="text-gray-600">Welcome back, Ahmed! ⚽</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search..."
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
              <Card key={stat.label} className="backdrop-blur-sm bg-white/60 border-gray-200/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      #{index + 1}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
                  <div className="text-xs text-emerald-600">{stat.change}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Main Content */}
          <Card className="backdrop-blur-sm bg-white/60 border-gray-200/50">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5 bg-gray-100/50 rounded-xl p-1 mb-8">
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
                    value="team" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    My Team
                  </TabsTrigger>
                  <TabsTrigger 
                    value="achievements" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Achievements
                  </TabsTrigger>
                  <TabsTrigger 
                    value="matchmaking" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Find Match
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Quick Actions */}
                    <Card className="backdrop-blur-sm bg-white/40 border-gray-200/30">
                      <CardHeader>
                        <CardTitle className="text-gray-800 flex items-center">
                          <Plus className="w-5 h-5 mr-2 text-emerald-600" />
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button 
                          className="w-full justify-start bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 rounded-xl"
                          onClick={() => navigate('/turfs')}
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          Book a Turf
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl"
                          onClick={() => navigate('/tournaments')}
                        >
                          <Trophy className="w-4 h-4 mr-2" />
                          Join Tournament
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl"
                          onClick={() => setActiveTab('matchmaking')}
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Find Opponents
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Next Match */}
                    <Card className="backdrop-blur-sm bg-white/40 border-gray-200/30">
                      <CardHeader>
                        <CardTitle className="text-gray-800 flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                          Next Match
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {upcomingBookings[0] && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                                {upcomingBookings[0].status}
                              </Badge>
                              <span className="text-gray-500 text-sm">June 15, 2024</span>
                            </div>
                            <h3 className="text-gray-800 font-semibold">{upcomingBookings[0].turf}</h3>
                            <div className="text-gray-600 text-sm space-y-1">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                {upcomingBookings[0].time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {upcomingBookings[0].location}
                              </div>
                            </div>
                            <div className="pt-2">
                              <div className="text-xs text-gray-500 mb-1">vs</div>
                              <div className="text-gray-800 font-medium">{upcomingBookings[0].opponent}</div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="bookings" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">My Bookings</h3>
                    <Button 
                      onClick={() => navigate('/turfs')}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 rounded-xl"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Book New Turf
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <Card key={booking.id} className="backdrop-blur-sm bg-white/40 border-gray-200/30 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-gray-800 font-semibold text-lg">{booking.turf}</h4>
                            <Badge className={booking.status === 'Confirmed' ? 
                              'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                              'bg-yellow-100 text-yellow-700 border-yellow-200'
                            }>
                              {booking.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              {new Date(booking.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2" />
                              {booking.time}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              {booking.location}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Users className="w-4 h-4 mr-2" />
                              {booking.team}
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Opponent: {booking.opponent}</span>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 rounded-lg">
                                  Details
                                </Button>
                                {booking.status === 'Confirmed' && (
                                  <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-lg">
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="team" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">Thunder Bolts FC</h3>
                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 rounded-xl">
                      <Users className="w-4 h-4 mr-2" />
                      Invite Player
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {teamMembers.map((member, index) => (
                      <Card key={index} className="backdrop-blur-sm bg-white/40 border-gray-200/30">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">{member.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-gray-800 font-medium">{member.name}</div>
                                <div className="text-gray-600 text-sm">{member.position}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-emerald-400' : 'bg-gray-400'}`}></div>
                              <span className="text-gray-600 text-sm capitalize">{member.status}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Your Achievements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <Card key={index} className="backdrop-blur-sm bg-white/40 border-gray-200/30">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <div className="text-3xl">{achievement.icon}</div>
                              <div className="flex-1">
                                <h4 className="text-gray-800 font-semibold mb-1">{achievement.title}</h4>
                                <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                                <div className="text-xs text-gray-500">{achievement.date}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="matchmaking" className="space-y-6">
                  <MatchmakingComponent />
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
    </div>
  );
};

export default PlayerDashboard;
