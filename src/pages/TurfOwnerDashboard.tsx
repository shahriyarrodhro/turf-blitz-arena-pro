
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Calendar, MapPin, Users, DollarSign, Plus, Star, Clock, TrendingUp, Bell, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { ChatComponent } from '@/components/ui/chat-component';
import { NotificationsComponent } from '@/components/ui/notifications';
import { SettingsComponent } from '@/components/ui/settings';
import { PaymentsPage } from '@/components/ui/dashboard-pages/payments-page';
import { TurfOwnerOverview } from '@/components/ui/dashboard-pages/turf-owner-overview';
import { TurfManagement } from '@/components/ui/dashboard-pages/turf-management';
import { BookingManagement } from '@/components/ui/dashboard-pages/booking-management';
import { AnalyticsDashboard } from '@/components/ui/dashboard-pages/analytics-dashboard';
import { useAuth } from '@/contexts/AuthContext';

const TurfOwnerDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { user } = useAuth();

  // Check for tab parameter in URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const [stats, setStats] = useState({
    totalRevenue: 0,
    bookingsToday: 0,
    totalTurfs: 0,
    rating: 4.8
  });

  useEffect(() => {
    loadStats();
  }, [user]);

  const loadStats = () => {
    if (!user) return;

    // Load turfs owned by current user
    const allTurfs = JSON.parse(localStorage.getItem('turfs') || '[]');
    const ownerTurfs = allTurfs.filter(turf => turf.ownerId === user.id);
    
    // Load bookings for owner's turfs
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const ownerBookings = allBookings.filter(booking => {
      const turf = allTurfs.find(t => t.id === booking.turfId);
      return turf?.ownerId === user.id;
    });

    // Calculate today's bookings
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = ownerBookings.filter(booking => booking.date === today);

    // Calculate total revenue
    const totalRevenue = ownerBookings
      .filter(b => b.status === 'confirmed')
      .reduce((acc, booking) => acc + booking.amount, 0);

    setStats({
      totalRevenue,
      bookingsToday: todayBookings.length,
      totalTurfs: ownerTurfs.length,
      rating: 4.8
    });
  };

  const statsData = [
    { 
      label: 'Total Revenue', 
      value: `৳${stats.totalRevenue.toLocaleString()}`, 
      icon: DollarSign, 
      change: '+12% this month', 
      color: 'from-emerald-500 to-teal-600' 
    },
    { 
      label: 'Bookings Today', 
      value: stats.bookingsToday.toString(), 
      icon: Calendar, 
      change: '3 pending', 
      color: 'from-blue-500 to-purple-600' 
    },
    { 
      label: 'Total Turfs', 
      value: stats.totalTurfs.toString(), 
      icon: MapPin, 
      change: `${stats.totalTurfs > 0 ? '1 premium' : 'Add first turf'}`, 
      color: 'from-purple-500 to-pink-600' 
    },
    { 
      label: 'Rating', 
      value: stats.rating.toString(), 
      icon: Star, 
      change: '124 reviews', 
      color: 'from-yellow-500 to-orange-600' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30 flex">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-emerald-200/15 to-teal-200/15 rounded-full opacity-60 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-blue-200/15 to-purple-200/15 rounded-full opacity-60 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Sidebar */}
      <AppSidebar
        userRole="turf-owner"
        userName={user?.name || "Turf Owner"}
        userAvatar="TO"
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
                  Turf Owner Dashboard
                </h1>
                <p className="text-gray-600">Welcome {user?.name || "Turf Owner"} 🏟️</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search bookings..."
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
            {statsData.map((stat, index) => (
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
                    value="turfs" 
                    className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 transition-all duration-300"
                  >
                    My Turfs
                  </TabsTrigger>
                  <TabsTrigger 
                    value="bookings" 
                    className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 transition-all duration-300"
                  >
                    Bookings
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analytics" 
                    className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 transition-all duration-300"
                  >
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger 
                    value="revenue" 
                    className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 transition-all duration-300"
                  >
                    Revenue
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 transition-all duration-300"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <TurfOwnerOverview />
                </TabsContent>

                <TabsContent value="turfs" className="space-y-6">
                  <TurfManagement />
                </TabsContent>

                <TabsContent value="bookings" className="space-y-6">
                  <BookingManagement />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <AnalyticsDashboard />
                </TabsContent>

                <TabsContent value="revenue" className="space-y-6">
                  <PaymentsPage />
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <div className="text-center py-16">
                    <Star className="w-20 h-20 mx-auto mb-6 text-gray-400" />
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Reviews & Ratings</h3>
                    <p className="text-gray-600 text-lg">View and respond to customer reviews</p>
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
    </div>
  );
};

export default TurfOwnerDashboard;
