
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Users, MapPin, Clock, Star, Plus, Bell, Target, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const PlayerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Matches Played', value: '24', icon: Trophy, change: '+3 this month' },
    { label: 'Goals Scored', value: '18', icon: Target, change: '+5 this month' },
    { label: 'Tournaments Won', value: '2', icon: Award, change: 'Last win: Spring Cup' },
    { label: 'TurfMaster Points', value: '1,250', icon: Star, change: '+150 this month' }
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
      opponent: "Lightning Strikers"
    },
    {
      id: 2,
      turf: "Victory Ground", 
      date: "2024-06-18",
      time: "20:00 - 21:00",
      location: "Gulshan, Dhaka",
      status: "Pending",
      team: "Thunder Bolts FC",
      opponent: "TBD"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-lime-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-slate-900" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
                  TurfMaster
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-slate-300 hover:text-lime-400">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-lime-500 text-slate-900">AR</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-white font-medium">Ahmed Rahman</div>
                  <div className="text-slate-400 text-sm">Player</div>
                </div>
              </div>
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Ahmed! ⚽</h1>
          <p className="text-slate-400">Ready for your next match? Let's see what's coming up.</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-8 h-8 text-lime-400" />
                  <Badge variant="secondary" className="bg-lime-500/20 text-lime-400 text-xs">
                    +{index + 1}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm mb-1">{stat.label}</div>
                <div className="text-xs text-emerald-400">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 bg-slate-700/50 mb-8">
                <TabsTrigger value="overview" className="data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-400">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="bookings" className="data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-400">
                  My Bookings
                </TabsTrigger>
                <TabsTrigger value="team" className="data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-400">
                  My Team
                </TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-400">
                  Achievements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Quick Actions */}
                  <Card className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Plus className="w-5 h-5 mr-2 text-lime-400" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        className="w-full justify-start bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600"
                        onClick={() => navigate('/turfs')}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Book a Turf
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                        onClick={() => navigate('/tournaments')}
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        Join Tournament
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Find Opponents
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Next Match */}
                  <Card className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-lime-400" />
                        Next Match
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {upcomingBookings[0] && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                              {upcomingBookings[0].status}
                            </Badge>
                            <span className="text-slate-400 text-sm">June 15, 2024</span>
                          </div>
                          <h3 className="text-white font-semibold">{upcomingBookings[0].turf}</h3>
                          <div className="text-slate-400 text-sm space-y-1">
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
                            <div className="text-xs text-slate-500 mb-1">vs</div>
                            <div className="text-white font-medium">{upcomingBookings[0].opponent}</div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">My Bookings</h3>
                  <Button 
                    onClick={() => navigate('/turfs')}
                    className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Book New Turf
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-white font-semibold text-lg">{booking.turf}</h4>
                          <Badge className={booking.status === 'Confirmed' ? 
                            'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
                            'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          }>
                            {booking.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center text-slate-400">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-slate-400">
                            <Clock className="w-4 h-4 mr-2" />
                            {booking.time}
                          </div>
                          <div className="flex items-center text-slate-400">
                            <MapPin className="w-4 h-4 mr-2" />
                            {booking.location}
                          </div>
                          <div className="flex items-center text-slate-400">
                            <Users className="w-4 h-4 mr-2" />
                            {booking.team}
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-600">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Opponent: {booking.opponent}</span>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                                Details
                              </Button>
                              {booking.status === 'Confirmed' && (
                                <Button size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
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
                  <h3 className="text-xl font-semibold text-white">Thunder Bolts FC</h3>
                  <Button className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600">
                    <Users className="w-4 h-4 mr-2" />
                    Invite Player
                  </Button>
                </div>

                <div className="grid gap-4">
                  {teamMembers.map((member, index) => (
                    <Card key={index} className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-lime-500 text-slate-900">{member.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-white font-medium">{member.name}</div>
                              <div className="text-slate-400 text-sm">{member.position}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-emerald-400' : 'bg-slate-500'}`}></div>
                            <span className="text-slate-400 text-sm capitalize">{member.status}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Your Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <Card key={index} className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="text-3xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h4 className="text-white font-semibold mb-1">{achievement.title}</h4>
                              <p className="text-slate-400 text-sm mb-2">{achievement.description}</p>
                              <div className="text-xs text-slate-500">{achievement.date}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlayerDashboard;
