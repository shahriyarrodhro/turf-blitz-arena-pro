import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Trophy, DollarSign, Shield, AlertTriangle, TrendingUp, Activity, Settings, Home, LogOut, Bell, Search, Filter, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { ChatComponent } from '@/components/ui/chat-component';
import { NotificationsComponent } from '@/components/ui/notifications';
import { SettingsComponent } from '@/components/ui/settings';

const AdminDashboard = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex">
      {/* Sidebar */}
      <AppSidebar
        userRole="admin"
        userName="System Admin"
        userAvatar="AD"
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
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600">Monitor platform performance and manage the TurfMaster ecosystem 🛡️</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search users, turfs..."
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
                <TabsList className="grid w-full grid-cols-6 bg-gray-100/50 rounded-xl p-1 mb-8">
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
                  <TabsTrigger 
                    value="reports" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Reports
                  </TabsTrigger>
                  <TabsTrigger 
                    value="revenue" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Revenue
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
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-100 text-emerald-600">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="text-gray-800 text-sm font-medium">New turf registered</div>
                            <div className="text-gray-600 text-xs">Champions Ground in Mirpur</div>
                            <div className="text-gray-500 text-xs">2 minutes ago • Sports Arena Ltd</div>
                          </div>
                        </div>
                        {/* Add more activity items */}
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
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-gray-800 font-medium">Total Players</div>
                            <div className="text-xs text-blue-600">+156</div>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-800 font-bold text-lg">10,234</div>
                          </div>
                        </div>
                        {/* Add more user stats */}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="approvals" className="space-y-6">
                  <div className="text-center py-16">
                    <Shield className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Pending Approvals</h3>
                    <p className="text-gray-600">Review and approve platform submissions</p>
                  </div>
                </TabsContent>

                <TabsContent value="users" className="space-y-6">
                  <div className="text-center py-16">
                    <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">User & Turf Management</h3>
                    <p className="text-gray-600">Manage users, turfs, and platform entities</p>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <div className="text-center py-16">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Platform Analytics</h3>
                    <p className="text-gray-600">Detailed insights and performance metrics</p>
                  </div>
                </TabsContent>

                <TabsContent value="reports" className="space-y-6">
                  <div className="text-center py-16">
                    <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Reports & Issues</h3>
                    <p className="text-gray-600">Handle user reports and platform issues</p>
                  </div>
                </TabsContent>

                <TabsContent value="revenue" className="space-y-6">
                  <div className="text-center py-16">
                    <DollarSign className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Revenue Management</h3>
                    <p className="text-gray-600">Track platform revenue and financial metrics</p>
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
    </div>
  );
};

export default AdminDashboard;
