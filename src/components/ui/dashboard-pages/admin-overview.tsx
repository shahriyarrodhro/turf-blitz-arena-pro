
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, MapPin, Calendar, DollarSign, TrendingUp, Clock, 
  AlertTriangle, Trophy, Activity, CheckCircle, XCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export const AdminOverview = () => {
  const platformStats = [
    {
      title: 'Total Turfs',
      value: '156',
      change: '+12 this month',
      icon: MapPin,
      color: 'from-emerald-500 to-teal-600',
      trend: 'up'
    },
    {
      title: 'Total Players',
      value: '12,458',
      change: '+245 this month',
      icon: Users,
      color: 'from-blue-500 to-purple-600',
      trend: 'up'
    },
    {
      title: 'Bookings Today',
      value: '89',
      change: '+15 vs yesterday',
      icon: Calendar,
      color: 'from-orange-500 to-red-600',
      trend: 'up'
    },
    {
      title: 'Revenue Today',
      value: '৳45,670',
      change: '+18% vs last week',
      icon: DollarSign,
      color: 'from-purple-500 to-pink-600',
      trend: 'up'
    }
  ];

  const pendingApprovals = [
    {
      id: '1',
      type: 'Turf Registration',
      name: 'Green Valley Sports Complex',
      location: 'Uttara, Dhaka',
      submittedBy: 'Karim Ahmed',
      date: '2024-12-15',
      status: 'pending'
    },
    {
      id: '2',
      type: 'Tournament Request',
      name: 'Winter Championship 2024',
      location: 'Multiple Venues',
      submittedBy: 'Sports Club BD',
      date: '2024-12-14',
      status: 'review'
    },
    {
      id: '3',
      type: 'Turf Verification',
      name: 'Champions Arena Extension',
      location: 'Gulshan, Dhaka',
      submittedBy: 'Rahman Sports',
      date: '2024-12-13',
      status: 'pending'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'booking',
      user: 'Ahmed Rahman',
      action: 'booked Victory Ground for 6:00 PM',
      time: '2 minutes ago',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'complaint',
      user: 'Sarah Khan',
      action: 'reported issue with Champions Arena',
      time: '15 minutes ago',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      id: '3',
      type: 'tournament',
      user: 'Football Club BD',
      action: 'registered for Winter Cup',
      time: '1 hour ago',
      icon: Trophy,
      color: 'text-blue-600'
    },
    {
      id: '4',
      type: 'payment',
      user: 'Turf Owner',
      action: 'withdrawal request of ৳25,000',
      time: '2 hours ago',
      icon: DollarSign,
      color: 'text-purple-600'
    }
  ];

  const popularTurfs = [
    { name: 'Champions Arena', bookings: 45, revenue: '৳67,500', rating: 4.8 },
    { name: 'Victory Ground', bookings: 38, revenue: '৳57,000', rating: 4.7 },
    { name: 'Green Valley', bookings: 32, revenue: '৳48,000', rating: 4.6 },
    { name: 'Sports Complex', bookings: 28, revenue: '৳42,000', rating: 4.5 }
  ];

  return (
    <div className="space-y-8">
      {/* Platform Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {platformStats.map((stat, index) => (
          <Card key={stat.title} className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-1">{stat.title}</div>
              <div className="text-xs text-emerald-600">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Approvals */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Clock className="w-5 h-5 mr-2 text-orange-600" />
                Pending Approvals ({pendingApprovals.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{approval.name}</h3>
                        <p className="text-sm text-gray-600">{approval.type}</p>
                      </div>
                      <Badge className={`${
                        approval.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                      } border-none`}>
                        {approval.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        <p>{approval.location}</p>
                        <p>By {approval.submittedBy} • {approval.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity Feed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center`}>
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Popular Turfs Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
              Popular Turfs Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularTurfs.map((turf, index) => (
                <div key={turf.name} className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200/50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">{turf.name}</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-xs text-gray-600">{turf.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bookings</span>
                      <span className="font-medium text-gray-800">{turf.bookings}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Revenue</span>
                      <span className="font-medium text-emerald-600">{turf.revenue}</span>
                    </div>
                    <Progress value={(turf.bookings / 50) * 100} className="h-2" />
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
