
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Calendar, MapPin, Users, DollarSign, Plus, Star, Clock, TrendingUp, Home, Settings, LogOut, Bell, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const TurfOwnerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Revenue', value: '৳45,000', icon: DollarSign, change: '+12% this month', color: 'from-emerald-500 to-teal-600' },
    { label: 'Bookings Today', value: '8', icon: Calendar, change: '3 pending', color: 'from-blue-500 to-purple-600' },
    { label: 'Total Turfs', value: '3', icon: MapPin, change: '1 premium', color: 'from-purple-500 to-pink-600' },
    { label: 'Rating', value: '4.8', icon: Star, change: '124 reviews', color: 'from-yellow-500 to-orange-600' }
  ];

  const todayBookings = [
    {
      id: 1,
      time: "16:00 - 17:00",
      turf: "Arena 1",
      team: "Thunder Bolts FC",
      contact: "+880 1711-123456",
      status: "Confirmed",
      payment: "Paid",
      amount: "৳2,500"
    },
    {
      id: 2,
      time: "18:00 - 19:00", 
      turf: "Arena 1",
      team: "Victory Eagles",
      contact: "+880 1812-987654",
      status: "Confirmed",
      payment: "Paid",
      amount: "৳2,500"
    },
    {
      id: 3,
      time: "20:00 - 21:00",
      turf: "Arena 2", 
      team: "Lightning Strikers",
      contact: "+880 1911-555666",
      status: "Pending",
      payment: "Pending",
      amount: "৳3,000"
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
      nextBooking: "16:00",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Champions Arena 2", 
      type: "5v5",
      status: "Active",
      bookingsToday: 3,
      revenue: 7500,
      rating: 4.6,
      nextBooking: "20:00",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Champions Arena 3",
      type: "11v11", 
      status: "Maintenance",
      bookingsToday: 0,
      revenue: 0,
      rating: 4.9,
      nextBooking: "N/A",
      image: "/placeholder.svg"
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
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                Turf Owner
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search bookings..."
                  className="pl-10 w-64 rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm"
                />
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">CS</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <div className="text-gray-800 font-medium">Champions Sports</div>
                  <div className="text-gray-500 text-sm">Turf Owner</div>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Champions Sports Dashboard 🏟️</h1>
          <p className="text-gray-600">Manage your turfs and track your business performance.</p>
        </motion.div>

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
                  value="bookings" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Bookings
                </TabsTrigger>
                <TabsTrigger 
                  value="turfs" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  My Turfs
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Today's Performance */}
                  <Card className="backdrop-blur-sm bg-white/40 border-gray-200/30">
                    <CardHeader>
                      <CardTitle className="text-gray-800 flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
                        Today's Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Bookings</span>
                        <span className="text-gray-800 font-semibold">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Revenue</span>
                        <span className="text-emerald-600 font-semibold">৳20,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Occupancy Rate</span>
                        <span className="text-blue-600 font-semibold">75%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Pending Approvals</span>
                        <span className="text-orange-600 font-semibold">3</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="backdrop-blur-sm bg-white/40 border-gray-200/30">
                    <CardHeader>
                      <CardTitle className="text-gray-800 flex items-center">
                        <Plus className="w-5 h-5 mr-2 text-emerald-600" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 rounded-xl">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Turf
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl">
                        <Calendar className="w-4 h-4 mr-2" />
                        Create Tournament
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Analytics
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">Today's Bookings</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" className="rounded-xl border-gray-200">
                      <Filter className="w-4 h-4" />
                    </Button>
                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 rounded-xl">
                      <Calendar className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {todayBookings.map((booking) => (
                    <Card key={booking.id} className="backdrop-blur-sm bg-white/40 border-gray-200/30 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-emerald-600" />
                              <span className="text-gray-800 font-semibold text-lg">{booking.time}</span>
                            </div>
                            <Badge className="bg-gray-100 text-gray-700">
                              {booking.turf}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={booking.status === 'Confirmed' ? 
                              'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                              'bg-yellow-100 text-yellow-700 border-yellow-200'
                            }>
                              {booking.status}
                            </Badge>
                            <Badge className={booking.payment === 'Paid' ? 
                              'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                              'bg-orange-100 text-orange-700 border-orange-200'
                            }>
                              {booking.payment}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-gray-500">Team:</span>
                            <div className="text-gray-800 font-medium">{booking.team}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Contact:</span>
                            <div className="text-gray-800 font-medium">{booking.contact}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Amount:</span>
                            <div className="text-emerald-600 font-bold">{booking.amount}</div>
                          </div>
                        </div>

                        {booking.status === 'Pending' && (
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-lg">
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
                  <h3 className="text-xl font-semibold text-gray-800">Manage Turfs</h3>
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 rounded-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Turf
                  </Button>
                </div>

                <div className="grid gap-6">
                  {turfs.map((turf) => (
                    <Card key={turf.id} className="backdrop-blur-sm bg-white/40 border-gray-200/30 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <img 
                            src={turf.image} 
                            alt={turf.name}
                            className="w-20 h-20 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="text-gray-800 font-semibold text-lg">{turf.name}</h4>
                                <p className="text-gray-600">{turf.type} Football Turf</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={turf.status === 'Active' ? 
                                  'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                                  'bg-orange-100 text-orange-700 border-orange-200'
                                }>
                                  {turf.status}
                                </Badge>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-gray-800 font-medium">{turf.rating}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                              <div>
                                <span className="text-gray-500">Today's Bookings:</span>
                                <div className="text-gray-800 font-semibold">{turf.bookingsToday}</div>
                              </div>
                              <div>
                                <span className="text-gray-500">Revenue:</span>
                                <div className="text-emerald-600 font-semibold">৳{turf.revenue.toLocaleString()}</div>
                              </div>
                              <div>
                                <span className="text-gray-500">Next Booking:</span>
                                <div className="text-gray-800 font-semibold">{turf.nextBooking}</div>
                              </div>
                              <div>
                                <span className="text-gray-500">Rating:</span>
                                <div className="text-yellow-600 font-semibold">{turf.rating}/5</div>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 rounded-lg">
                                Edit Details
                              </Button>
                              <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 rounded-lg">
                                View Schedule
                              </Button>
                              <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 rounded-lg">
                                Analytics
                              </Button>
                              {turf.status === 'Maintenance' && (
                                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
                                  Mark Active
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

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">Recent Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-gray-800 font-semibold">4.8 Average Rating</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <Card key={review.id} className="backdrop-blur-sm bg-white/40 border-gray-200/30">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                {review.customer.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-gray-800 font-medium">{review.customer}</div>
                              <div className="text-gray-500 text-sm">{review.turf} • {review.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
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
