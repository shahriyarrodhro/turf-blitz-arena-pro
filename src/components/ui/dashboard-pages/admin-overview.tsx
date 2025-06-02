
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Trophy, DollarSign, TrendingUp, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

export const AdminOverview = () => {
  const platformStats = [
    { label: 'Total Users', value: '12,458', icon: Users, change: '+245 this month', color: 'from-blue-500 to-purple-600' },
    { label: 'Active Turfs', value: '156', icon: MapPin, change: '+12 verified', color: 'from-emerald-500 to-teal-600' },
    { label: 'Tournaments', value: '89', icon: Trophy, change: '24 ongoing', color: 'from-yellow-500 to-orange-600' },
    { label: 'Platform Revenue', value: '৳2.4M', icon: DollarSign, change: '+18% this month', color: 'from-purple-500 to-pink-600' }
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

  const pendingApprovals = [
    {
      id: 1,
      type: 'Turf Verification',
      name: 'Elite Sports Arena',
      owner: 'Rafiq Ahmed',
      submitted: '2024-05-30',
      priority: 'High'
    },
    {
      id: 2,
      type: 'Tournament Creation',
      name: 'Summer Championship 2024',
      organizer: 'Sports Club BD',
      submitted: '2024-05-29',
      priority: 'Medium'
    },
    {
      id: 3,
      type: 'Dispute Resolution',
      name: 'Booking Cancellation Issue',
      complainant: 'Ahmed Hassan',
      submitted: '2024-05-28',
      priority: 'High'
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
      case 'turf': return 'text-emerald-600 bg-emerald-100';
      case 'tournament': return 'text-yellow-600 bg-yellow-100';
      case 'report': return 'text-red-600 bg-red-100';
      case 'payment': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformStats.map((stat, index) => (
          <Card key={index} className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center text-xl">
              <Activity className="w-6 h-6 mr-3 text-emerald-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${getActionColor(activity.type)}`}>
                  {getActionIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="text-gray-800 text-sm font-medium">{activity.action}</div>
                  <div className="text-gray-600 text-xs">{activity.details}</div>
                  <div className="text-gray-500 text-xs mt-1">{activity.time} • {activity.user}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center text-xl">
              <CheckCircle className="w-6 h-6 mr-3 text-blue-600" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="p-4 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{approval.type}</h4>
                  <Badge className={`${getPriorityColor(approval.priority)} rounded-2xl px-3 py-1 text-xs`}>
                    {approval.priority}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 mb-2">{approval.name}</div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Submitted: {approval.submitted}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="rounded-xl text-xs px-3 py-1">
                      Review
                    </Button>
                    <Button size="sm" className="rounded-xl text-xs px-3 py-1 bg-emerald-500 hover:bg-emerald-600">
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-gray-800 text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6 h-auto flex-col">
              <Users className="w-8 h-8 mb-2" />
              <span>Manage Users</span>
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-6 h-auto flex-col">
              <MapPin className="w-8 h-8 mb-2" />
              <span>Verify Turfs</span>
            </Button>
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-2xl p-6 h-auto flex-col">
              <Trophy className="w-8 h-8 mb-2" />
              <span>Monitor Tournaments</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
