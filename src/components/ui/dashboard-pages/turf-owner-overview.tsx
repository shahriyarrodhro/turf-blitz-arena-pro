
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, TrendingUp, Users, Clock, Star, Trophy, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

export const TurfOwnerOverview = () => {
  const { user } = useAuth();
  const [turfs, setTurfs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    monthlyRevenue: 0,
    averageRating: 0,
    activeSlots: 0,
    occupancyRate: 0,
    pendingWithdrawals: 0
  });

  // Load turfs owned by current user
  useEffect(() => {
    loadOwnerTurfs();
    loadBookingStats();
  }, [user]);

  const loadOwnerTurfs = () => {
    // Get turfs from localStorage or initialize empty array
    const allTurfs = JSON.parse(localStorage.getItem('turfs') || '[]');
    const ownerTurfs = allTurfs.filter(turf => turf.ownerId === user?.id);
    setTurfs(ownerTurfs);
    
    // Calculate active slots
    const totalSlots = ownerTurfs.reduce((acc, turf) => acc + (turf.timeSlots?.length || 0), 0);
    setStats(prev => ({ ...prev, activeSlots: totalSlots }));
  };

  const loadBookingStats = () => {
    // Get bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const ownerBookings = allBookings.filter(booking => {
      const allTurfs = JSON.parse(localStorage.getItem('turfs') || '[]');
      const turf = allTurfs.find(t => t.id === booking.turfId);
      return turf?.ownerId === user?.id;
    });

    setBookings(ownerBookings);
    
    // Calculate stats
    const totalBookings = ownerBookings.length;
    const monthlyRevenue = ownerBookings
      .filter(b => b.status === 'confirmed')
      .reduce((acc, booking) => acc + booking.amount, 0);
    
    const occupancyRate = turfs.length > 0 ? Math.min((totalBookings / (turfs.length * 30)) * 100, 100) : 0;
    
    setStats(prev => ({
      ...prev,
      totalBookings,
      monthlyRevenue,
      occupancyRate: Math.round(occupancyRate),
      averageRating: 4.7,
      pendingWithdrawals: Math.round(monthlyRevenue * 0.3)
    }));
  };

  const recentBookings = bookings.slice(0, 3).map(booking => {
    const allTurfs = JSON.parse(localStorage.getItem('turfs') || '[]');
    const turf = allTurfs.find(t => t.id === booking.turfId);
    return {
      ...booking,
      turfName: turf?.name || 'Unknown Turf'
    };
  });

  const upcomingMatches = [
    {
      id: '1',
      tournament: 'Summer Championship',
      teams: 'Warriors FC vs Thunder Bolts',
      date: '2024-12-20',
      time: '16:00',
      prize: '৳50,000'
    },
    {
      id: '2',
      tournament: 'Corporate League',
      teams: 'Tech Giants vs Sports Club',
      date: '2024-12-22',
      time: '18:00',
      prize: '৳30,000'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="backdrop-blur-sm bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border border-emerald-200/30 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Welcome {user?.name || 'Turf Owner'}! ⚽
            </CardTitle>
            <CardDescription className="text-gray-600">
              Your turf management dashboard - Track bookings, revenue, and grow your business.
            </CardDescription>
            {turfs.length === 0 && (
              <div className="mt-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Turf
                </Button>
              </div>
            )}
          </CardHeader>
        </Card>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalBookings}</p>
                <p className="text-xs text-emerald-600">+12% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-2xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-800">৳{stats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-xs text-emerald-600">+18% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-2xl">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">My Turfs</p>
                <p className="text-2xl font-bold text-gray-800">{turfs.length}</p>
                <p className="text-xs text-emerald-600">Active properties</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Occupancy Rate</span>
                  <span className="text-sm text-gray-800">{stats.occupancyRate}%</span>
                </div>
                <Progress value={stats.occupancyRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Customer Satisfaction</span>
                  <span className="text-sm text-gray-800">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Active Turfs</span>
                  <span className="text-sm text-gray-800">{turfs.length}</span>
                </div>
                <Progress value={Math.min((turfs.length / 5) * 100, 100)} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <DollarSign className="w-5 h-5 mr-2 text-emerald-600" />
              Financial Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Available Balance</span>
                <span className="text-lg font-semibold text-gray-800">৳{(stats.monthlyRevenue - stats.pendingWithdrawals).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Withdrawals</span>
                <span className="text-lg font-semibold text-orange-600">৳{stats.pendingWithdrawals.toLocaleString()}</span>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                Request Withdrawal
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentBookings.length > 0 ? (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-100 p-2 rounded-xl">
                        <Users className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{booking.playerName}</p>
                        <p className="text-sm text-gray-600">{booking.turfName}</p>
                        <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">৳{booking.amount}</p>
                      <Badge className={`${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      } border-none`}>
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">No bookings yet</p>
                <p className="text-sm text-gray-400">Add a turf to start receiving bookings</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* My Turfs Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
              My Turfs
            </CardTitle>
          </CardHeader>
          <CardContent>
            {turfs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {turfs.map((turf) => (
                  <div key={turf.id} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/30">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">{turf.name}</h3>
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                        Active
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{turf.location}</p>
                    <p className="text-sm text-gray-600 mb-3">{turf.timeSlots?.length || 0} time slots</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-600">৳{turf.price}/hour</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">{turf.rating || 4.5}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">No turfs added yet</p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Turf
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
