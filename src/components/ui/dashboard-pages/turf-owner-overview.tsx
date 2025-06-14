
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, TrendingUp, Users, Clock, Star, Trophy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export const TurfOwnerOverview = () => {
  const stats = {
    totalBookings: 156,
    monthlyRevenue: 85000,
    averageRating: 4.7,
    activeSlots: 12,
    occupancyRate: 78,
    pendingWithdrawals: 25000
  };

  const recentBookings = [
    {
      id: '1',
      playerName: 'Ahmed Rahman',
      date: '2024-12-15',
      time: '18:00-19:00',
      amount: 2500,
      status: 'confirmed'
    },
    {
      id: '2',
      playerName: 'Karim Hassan',
      date: '2024-12-15',
      time: '19:00-20:00',
      amount: 2500,
      status: 'pending'
    },
    {
      id: '3',
      playerName: 'Rashid Ali',
      date: '2024-12-16',
      time: '17:00-18:00',
      amount: 2500,
      status: 'confirmed'
    }
  ];

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
              Welcome to Champions Arena! ⚽
            </CardTitle>
            <CardDescription className="text-gray-600">
              Your turf management dashboard - Track bookings, revenue, and grow your business.
            </CardDescription>
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
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-800">{stats.averageRating}</p>
                <p className="text-xs text-emerald-600">+0.2 this month</p>
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
                  <span className="text-sm font-medium text-gray-600">Repeat Customers</span>
                  <span className="text-sm text-gray-800">67%</span>
                </div>
                <Progress value={67} className="h-2" />
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
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 p-2 rounded-xl">
                      <Users className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{booking.playerName}</p>
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
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Tournaments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <Trophy className="w-5 h-5 mr-2 text-emerald-600" />
              Upcoming Tournament Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMatches.map((match) => (
                <div key={match.id} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{match.tournament}</h3>
                      <p className="text-sm text-gray-600">{match.teams}</p>
                      <p className="text-xs text-gray-500">{match.date} at {match.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-yellow-600">{match.prize}</p>
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                        Tournament
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
