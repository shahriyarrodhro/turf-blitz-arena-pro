
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Calendar, MapPin, Users, DollarSign, Plus, Star, Clock, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const TurfOwnerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Revenue', value: '৳45,000', icon: DollarSign, change: '+12% this month', color: 'text-emerald-400' },
    { label: 'Bookings Today', value: '8', icon: Calendar, change: '3 pending', color: 'text-blue-400' },
    { label: 'Total Turfs', value: '3', icon: MapPin, change: '1 premium', color: 'text-purple-400' },
    { label: 'Rating', value: '4.8', icon: Star, change: '124 reviews', color: 'text-yellow-400' }
  ];

  const todayBookings = [
    {
      id: 1,
      time: "16:00 - 17:00",
      turf: "Arena 1",
      team: "Thunder Bolts FC",
      contact: "+880 1711-123456",
      status: "Confirmed",
      payment: "Paid"
    },
    {
      id: 2,
      time: "18:00 - 19:00", 
      turf: "Arena 1",
      team: "Victory Eagles",
      contact: "+880 1812-987654",
      status: "Confirmed",
      payment: "Paid"
    },
    {
      id: 3,
      time: "20:00 - 21:00",
      turf: "Arena 2", 
      team: "Lightning Strikers",
      contact: "+880 1911-555666",
      status: "Pending",
      payment: "Pending"
    }
  ];

  const turfs = [
    {
      id: 1,
      name: "Champions Arena 1",
      type: "7v7",
      status: "Active",
      bookingsToday: 5,
      revenue: 12500,
      rating: 4.8,
      nextBooking: "16:00"
    },
    {
      id: 2,
      name: "Champions Arena 2", 
      type: "5v5",
      status: "Active",
      bookingsToday: 3,
      revenue: 7500,
      rating: 4.6,
      nextBooking: "20:00"
    },
    {
      id: 3,
      name: "Champions Arena 3",
      type: "11v11", 
      status: "Maintenance",
      bookingsToday: 0,
      revenue: 0,
      rating: 4.9,
      nextBooking: "N/A"
    }
  ];

  const recentReviews = [
    {
      id: 1,
      customer: "Ahmed Rahman",
      rating: 5,
      comment: "Excellent turf quality and facilities. Will definitely book again!",
      date: "2024-05-30",
      turf: "Arena 1"
    },
    {
      id: 2,
      customer: "Sakib Hassan", 
      rating: 4,
      comment: "Good experience overall. Could improve lighting in evening slots.",
      date: "2024-05-29",
      turf: "Arena 2"
    }
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
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                Turf Owner
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-blue-500 text-white">TO</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-white font-medium">Champions Sports</div>
                  <div className="text-slate-400 text-sm">Turf Owner</div>
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
          <h1 className="text-3xl font-bold text-white mb-2">Champions Sports Dashboard 🏟️</h1>
          <p className="text-slate-400">Manage your turfs and track your business performance.</p>
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
                <TabsTrigger value="bookings" className="data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-400">
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="turfs" className="data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-400">
                  My Turfs
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-400">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Quick Stats */}
                  <Card className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-lime-400" />
                        Today's Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Total Bookings</span>
                        <span className="text-white font-semibold">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Revenue</span>
                        <span className="text-emerald-400 font-semibold">৳20,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Occupancy Rate</span>
                        <span className="text-yellow-400 font-semibold">75%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Pending Approvals</span>
                        <span className="text-orange-400 font-semibold">3</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Plus className="w-5 h-5 mr-2 text-lime-400" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Turf
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        Create Tournament
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Analytics
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Today's Bookings</h3>
                  <Button className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    View All Bookings
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {todayBookings.map((booking) => (
                    <Card key={booking.id} className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-lime-400" />
                              <span className="text-white font-semibold text-lg">{booking.time}</span>
                            </div>
                            <Badge className="bg-slate-600/50 text-slate-300">
                              {booking.turf}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={booking.status === 'Confirmed' ? 
                              'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
                              'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            }>
                              {booking.status}
                            </Badge>
                            <Badge className={booking.payment === 'Paid' ? 
                              'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
                              'bg-orange-500/20 text-orange-400 border-orange-500/30'
                            }>
                              {booking.payment}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Team:</span>
                            <span className="text-white ml-2">{booking.team}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Contact:</span>
                            <span className="text-white ml-2">{booking.contact}</span>
                          </div>
                        </div>

                        {booking.status === 'Pending' && (
                          <div className="mt-4 pt-4 border-t border-slate-600 flex space-x-2">
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                              Decline
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="turfs" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Manage Turfs</h3>
                  <Button className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Turf
                  </Button>
                </div>

                <div className="grid gap-6">
                  {turfs.map((turf) => (
                    <Card key={turf.id} className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h4 className="text-white font-semibold text-lg">{turf.name}</h4>
                              <p className="text-slate-400">{turf.type} Football Turf</p>
                            </div>
                            <Badge className={turf.status === 'Active' ? 
                              'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
                              'bg-orange-500/20 text-orange-400 border-orange-500/30'
                            }>
                              {turf.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white">{turf.rating}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-slate-400">Bookings Today:</span>
                            <div className="text-white font-semibold">{turf.bookingsToday}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Revenue:</span>
                            <div className="text-emerald-400 font-semibold">৳{turf.revenue.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Next Booking:</span>
                            <div className="text-white font-semibold">{turf.nextBooking}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Rating:</span>
                            <div className="text-yellow-400 font-semibold">{turf.rating}/5</div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                            Edit Details
                          </Button>
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                            View Schedule
                          </Button>
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                            Analytics
                          </Button>
                          {turf.status === 'Maintenance' && (
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              Mark Active
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Recent Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">4.8 Average Rating</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <Card key={review.id} className="backdrop-blur-sm bg-slate-700/30 border-slate-600/50">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-lime-500 text-slate-900">
                                {review.customer.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-white font-medium">{review.customer}</div>
                              <div className="text-slate-400 text-sm">{review.turf} • {review.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-300">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TurfOwnerDashboard;
