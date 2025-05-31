
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Trophy, DollarSign, Shield, AlertTriangle, TrendingUp, Activity, Zap, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const platformStats = [
    { label: 'Total Users', value: '12,458', icon: Users, change: '+245 this month', color: 'text-blue-400' },
    { label: 'Active Turfs', value: '156', icon: MapPin, change: '+12 verified', color: 'text-emerald-400' },
    { label: 'Tournaments', value: '89', icon: Trophy, change: '24 ongoing', color: 'text-yellow-400' },
    { label: 'Platform Revenue', value: '৳2.4M', icon: DollarSign, change: '+18% this month', color: 'text-purple-400' }
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: 'Turf Verification',
      name: 'Elite Sports Arena',
      owner: 'Rafiq Ahmed',
      location: 'Uttara, Dhaka',
      submitted: '2024-05-30',
      priority: 'High'
    },
    {
      id: 2,
      type: 'Tournament Creation',
      name: 'Summer Championship 2024',
      organizer: 'Sports Club BD',
      location: 'Gulshan, Dhaka', 
      submitted: '2024-05-29',
      priority: 'Medium'
    },
    {
      id: 3,
      type: 'Dispute Resolution',
      name: 'Booking Cancellation Issue',
      complainant: 'Ahmed Hassan',
      location: 'Dhanmondi, Dhaka',
      submitted: '2024-05-28',
      priority: 'High'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New turf registered',
      details: 'Champions Ground in Mirpur',
      time: '2 minutes ago',
      type: 'turf'
    },
    {
      id: 2,
      action: 'Tournament completed',
      details: 'Spring Cup 2024 - Winners announced',
      time: '1 hour ago',
      type: 'tournament'
    },
    {
      id: 3,
      action: 'User reported',
      details: 'Inappropriate behavior during match',
      time: '3 hours ago',
      type: 'report'
    },
    {
      id: 4,
      action: 'Payment processed',
      details: '৳15,000 commission received',
      time: '6 hours ago',
      type: 'payment'
    }
  ];

  const topPerformers = [
    {
      name: 'Champions Arena',
      type: 'Turf',
      metric: '₹45K revenue',
      growth: '+23%',
      avatar: 'CA'
    },
    {
      name: 'Thunder Bolts FC',
      type: 'Team',
      metric: '12 wins',
      growth: '+8 matches',
      avatar: 'TB'
    },
    {
      name: 'Dhaka Premier League',
      type: 'Tournament',
      metric: '64 teams',
      growth: '+12 teams',
      avatar: 'DL'
    }
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'turf': return <MapPin className="w-4 h-4" />;
      case 'tournament': return <Trophy className="w-4 h-4" />;
      case 'report': return <AlertTriangle className="w-4 h-4" />;
      case 'payment': return <DollarSign className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'turf': return 'text-emerald-400';
      case 'tournament': return 'text-yellow-400';
      case 'report': return 'text-red-400';
      case 'payment': return 'text-purple-400';
      default: return 'text-slate-400';
    }
  };

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
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-slate-300 hover:text-lime-400">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-red-500 text-white">AD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-white font-medium">System Admin</div>
                  <div className="text-slate-400 text-sm">Administrator</div>
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
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard 🛡️</h1>
          <p className="text-slate-400">Monitor platform performance and manage the TurfMaster ecosystem.</p>
        </motion.div>

        {/* Platform Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {platformStats.map((stat, index) => (
            <Card key={stat.label} className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
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
                <TabsTrigger value="approvals" className="data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-400">
                  Approvals
                </TabsTrigger>
                <TabsTrigger value="users" className="data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-400">
                  Users & Turfs
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-400">
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <Card className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-lime-400" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentActivity.slice(0, 4).map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className={`mt-1 ${getActionColor(activity.type)}`}>
                            {getActionIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium">{activity.action}</div>
                            <div className="text-slate-400 text-xs">{activity.details}</div>
                            <div className="text-slate-500 text-xs">{activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Top Performers */}
                  <Card className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-lime-400" />
                        Top Performers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {topPerformers.map((performer, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-lime-500 text-slate-900 text-xs">
                                {performer.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-white text-sm font-medium">{performer.name}</div>
                              <div className="text-slate-400 text-xs">{performer.type}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white text-sm font-medium">{performer.metric}</div>
                            <div className="text-emerald-400 text-xs">{performer.growth}</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="approvals" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Pending Approvals</h3>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    {pendingApprovals.length} Pending
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {pendingApprovals.map((approval) => (
                    <Card key={approval.id} className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              {approval.type}
                            </Badge>
                            <Badge className={approval.priority === 'High' ? 
                              'bg-red-500/20 text-red-400 border-red-500/30' : 
                              'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            }>
                              {approval.priority} Priority
                            </Badge>
                          </div>
                          <span className="text-slate-400 text-sm">{approval.submitted}</span>
                        </div>
                        
                        <h4 className="text-white font-semibold text-lg mb-2">{approval.name}</h4>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-slate-400">
                              {approval.owner ? 'Owner:' : approval.organizer ? 'Organizer:' : 'Complainant:'}
                            </span>
                            <span className="text-white ml-2">
                              {approval.owner || approval.organizer || approval.complainant}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">Location:</span>
                            <span className="text-white ml-2">{approval.location}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                            Reject
                          </Button>
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">User Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Total Players</span>
                        <span className="text-blue-400 font-semibold">10,234</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Turf Owners</span>
                        <span className="text-emerald-400 font-semibold">156</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Banned Users</span>
                        <span className="text-red-400 font-semibold">12</span>
                      </div>
                      <Button className="w-full mt-4 bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900">
                        Manage Users
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Turf Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Active Turfs</span>
                        <span className="text-emerald-400 font-semibold">142</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Pending Verification</span>
                        <span className="text-yellow-400 font-semibold">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Suspended</span>
                        <span className="text-red-400 font-semibold">6</span>
                      </div>
                      <Button className="w-full mt-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                        Manage Turfs
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Disputes & Reports</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Open Disputes</span>
                        <span className="text-red-400 font-semibold">5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">User Reports</span>
                        <span className="text-yellow-400 font-semibold">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Resolved</span>
                        <span className="text-emerald-400 font-semibold">234</span>
                      </div>
                      <Button className="w-full mt-4 bg-gradient-to-r from-red-400 to-pink-500 text-white">
                        Handle Reports
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 bg-slate-800/50 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-10 h-10 text-lime-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
                  <p className="text-slate-400 mb-6">Detailed platform analytics and reporting coming soon</p>
                  <Button className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600">
                    Enable Analytics
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
