
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Trophy, DollarSign, Shield, AlertTriangle, TrendingUp, Activity, Settings, Home, LogOut, Bell, Search, Filter, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const platformStats = [
    { label: 'Total Users', value: '12,458', icon: Users, change: '+245 this month', color: 'from-blue-500 to-purple-600' },
    { label: 'Active Turfs', value: '156', icon: MapPin, change: '+12 verified', color: 'from-emerald-500 to-teal-600' },
    { label: 'Tournaments', value: '89', icon: Trophy, change: '24 ongoing', color: 'from-yellow-500 to-orange-600' },
    { label: 'Platform Revenue', value: '৳2.4M', icon: DollarSign, change: '+18% this month', color: 'from-purple-500 to-pink-600' }
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: 'Turf Verification',
      name: 'Elite Sports Arena',
      owner: 'Rafiq Ahmed',
      location: 'Uttara, Dhaka',
      submitted: '2024-05-30',
      priority: 'High',
      description: 'New turf registration with premium facilities'
    },
    {
      id: 2,
      type: 'Tournament Creation',
      name: 'Summer Championship 2024',
      organizer: 'Sports Club BD',
      location: 'Gulshan, Dhaka', 
      submitted: '2024-05-29',
      priority: 'Medium',
      description: 'City-wide football tournament with 64 teams'
    },
    {
      id: 3,
      type: 'Dispute Resolution',
      name: 'Booking Cancellation Issue',
      complainant: 'Ahmed Hassan',
      location: 'Dhanmondi, Dhaka',
      submitted: '2024-05-28',
      priority: 'High',
      description: 'Customer complaint about unfair cancellation policy'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New turf registered',
      details: 'Champions Ground in Mirpur',
      time: '2 minutes ago',
      type: 'turf',
      user: 'Sports Arena Ltd'
    },
    {
      id: 2,
      action: 'Tournament completed',
      details: 'Spring Cup 2024 - Winners announced',
      time: '1 hour ago',
      type: 'tournament',
      user: 'Tournament Organizer'
    },
    {
      id: 3,
      action: 'User reported',
      details: 'Inappropriate behavior during match',
      time: '3 hours ago',
      type: 'report',
      user: 'Ahmed Rahman'
    },
    {
      id: 4,
      action: 'Payment processed',
      details: '৳15,000 commission received',
      time: '6 hours ago',
      type: 'payment',
      user: 'System'
    }
  ];

  const userStats = [
    { type: 'Total Players', count: 10234, change: '+156', color: 'text-blue-600' },
    { type: 'Turf Owners', count: 156, change: '+8', color: 'text-emerald-600' },
    { type: 'Active Today', count: 2847, change: '+12%', color: 'text-purple-600' },
    { type: 'Banned Users', count: 12, change: '-3', color: 'text-red-600' }
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
      case 'turf': return 'text-emerald-600 bg-emerald-100';
      case 'tournament': return 'text-yellow-600 bg-yellow-100';
      case 'report': return 'text-red-600 bg-red-100';
      case 'payment': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="rounded-xl hover:bg-gray-100"
              >
                <Home className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <span className="text-xl font-bold text-gray-800">TurfMaster</span>
              </div>
              <Badge className="bg-red-100 text-red-700 border-red-200">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users, turfs..."
                  className="pl-10 w-64 rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm"
                />
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-red-500 to-pink-600 text-white">AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <div className="text-gray-800 font-medium">System Admin</div>
                  <div className="text-gray-500 text-sm">Administrator</div>
                </div>
              </div>
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="rounded-xl hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5" />
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard 🛡️</h1>
          <p className="text-gray-600">Monitor platform performance and manage the TurfMaster ecosystem.</p>
        </motion.div>

        {/* Platform Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {platformStats.map((stat, index) => (
            <Card key={stat.label} className="backdrop-blur-sm bg-white/60 border-gray-200/50 hover:shadow-lg transition-all duration-300">
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
        <Card className="backdrop-blur-sm bg-white/60 border-gray-200/50">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 bg-gray-100/50 rounded-xl p-1 mb-8">
                <TabsTrigger 
                  value="overview" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="approvals" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Approvals
                </TabsTrigger>
                <TabsTrigger 
                  value="users" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Users & Turfs
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <Card className="backdrop-blur-sm bg-white/40 border-gray-200/30">
                    <CardHeader>
                      <CardTitle className="text-gray-800 flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-emerald-600" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentActivity.slice(0, 4).map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getActionColor(activity.type)}`}>
                            {getActionIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="text-gray-800 text-sm font-medium">{activity.action}</div>
                            <div className="text-gray-600 text-xs">{activity.details}</div>
                            <div className="text-gray-500 text-xs">{activity.time} • {activity.user}</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* User Statistics */}
                  <Card className="backdrop-blur-sm bg-white/40 border-gray-200/30">
                    <CardHeader>
                      <CardTitle className="text-gray-800 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-emerald-600" />
                        User Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {userStats.map((stat, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="text-gray-800 font-medium">{stat.type}</div>
                            <div className={`text-xs ${stat.color}`}>{stat.change}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-800 font-bold text-lg">{stat.count.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="approvals" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">Pending Approvals</h3>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-red-100 text-red-700 border-red-200">
                      {pendingApprovals.length} Pending
                    </Badge>
                    <Button variant="outline" size="icon" className="rounded-xl border-gray-200">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {pendingApprovals.map((approval) => (
                    <Card key={approval.id} className="backdrop-blur-sm bg-white/40 border-gray-200/30 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                              {approval.type.includes('Turf') ? <MapPin className="w-6 h-6 text-white" /> : 
                               approval.type.includes('Tournament') ? <Trophy className="w-6 h-6 text-white" /> :
                               <AlertTriangle className="w-6 h-6 text-white" />}
                            </div>
                            <div>
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-2">
                                {approval.type}
                              </Badge>
                              <h4 className="text-gray-800 font-semibold text-lg">{approval.name}</h4>
                              <p className="text-gray-600 text-sm">{approval.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={approval.priority === 'High' ? 
                              'bg-red-100 text-red-700 border-red-200' : 
                              'bg-yellow-100 text-yellow-700 border-yellow-200'
                            }>
                              {approval.priority} Priority
                            </Badge>
                            <span className="text-gray-500 text-sm">{approval.submitted}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-gray-500">
                              {approval.owner ? 'Owner:' : approval.organizer ? 'Organizer:' : 'Complainant:'}
                            </span>
                            <div className="text-gray-800 font-medium">
                              {approval.owner || approval.organizer || approval.complainant}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Location:</span>
                            <div className="text-gray-800 font-medium">{approval.location}</div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-lg">
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 rounded-lg">
                            <Eye className="w-4 h-4 mr-1" />
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
                  <Card className="backdrop-blur-sm bg-white/40 border-gray-200/30">
                    <CardHeader>
                      <CardTitle className="text-gray-800 text-lg flex items-center">
                        <Users className="w-5 h-5 mr-2 text-blue-600" />
                        User Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Total Players</span>
                          <span className="text-blue-600 font-semibold">10,234</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Turf Owners</span>
                          <span className="text-emerald-600 font-semibold">156</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Banned Users</span>
                          <span className="text-red-600 font-semibold">12</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl">
                        Manage Users
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="backdrop-blur-sm bg-white/40 border-gray-200/30">
                    <CardHeader>
                      <CardTitle className="text-gray-800 text-lg flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                        Turf Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Active Turfs</span>
                          <span className="text-emerald-600 font-semibold">142</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Pending Verification</span>
                          <span className="text-yellow-600 font-semibold">8</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Suspended</span>
                          <span className="text-red-600 font-semibold">6</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl">
                        Manage Turfs
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="backdrop-blur-sm bg-white/40 border-gray-200/30">
                    <CardHeader>
                      <CardTitle className="text-gray-800 text-lg flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                        Disputes & Reports
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Open Disputes</span>
                          <span className="text-red-600 font-semibold">5</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">User Reports</span>
                          <span className="text-yellow-600 font-semibold">12</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Resolved</span>
                          <span className="text-emerald-600 font-semibold">234</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl">
                        Handle Reports
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Advanced Analytics</h3>
                  <p className="text-gray-600 mb-6">Detailed platform analytics and reporting dashboard</p>
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 rounded-xl">
                    View Full Analytics
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
