import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, DollarSign, Calendar, Users, Target, BarChart3, PieChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

export const AnalyticsDashboard = () => {
  const revenueData = [
    { month: 'Jan', revenue: 45000, bookings: 89 },
    { month: 'Feb', revenue: 52000, bookings: 102 },
    { month: 'Mar', revenue: 48000, bookings: 95 },
    { month: 'Apr', revenue: 61000, bookings: 118 },
    { month: 'May', revenue: 55000, bookings: 108 },
    { month: 'Jun', revenue: 67000, bookings: 125 },
    { month: 'Jul', revenue: 73000, bookings: 142 },
    { month: 'Aug', revenue: 69000, bookings: 135 },
    { month: 'Sep', revenue: 78000, bookings: 156 },
    { month: 'Oct', revenue: 85000, bookings: 168 },
    { month: 'Nov', revenue: 82000, bookings: 162 },
    { month: 'Dec', revenue: 91000, bookings: 178 }
  ];

  const hourlyBookings = [
    { hour: '6AM', bookings: 12 },
    { hour: '7AM', bookings: 18 },
    { hour: '8AM', bookings: 25 },
    { hour: '9AM', bookings: 22 },
    { hour: '10AM', bookings: 15 },
    { hour: '5PM', bookings: 45 },
    { hour: '6PM', bookings: 52 },
    { hour: '7PM', bookings: 48 },
    { hour: '8PM', bookings: 41 },
    { hour: '9PM', bookings: 35 },
    { hour: '10PM', bookings: 28 }
  ];

  const customerSegments = [
    { name: 'Regular Players', value: 45, color: '#10B981' },
    { name: 'Tournament Teams', value: 30, color: '#3B82F6' },
    { name: 'Corporate Bookings', value: 15, color: '#F59E0B' },
    { name: 'One-time Players', value: 10, color: '#EF4444' }
  ];

  const conversionData = [
    { metric: 'Total Visits', value: 2450, percentage: 100 },
    { metric: 'Booking Inquiries', value: 1225, percentage: 50 },
    { metric: 'Confirmed Bookings', value: 980, percentage: 40 },
    { metric: 'Repeat Customers', value: 656, percentage: 27 }
  ];

  const keyMetrics = {
    totalRevenue: 945000,
    totalBookings: 1567,
    averageBookingValue: 2850,
    occupancyRate: 78,
    customerSatisfaction: 4.7,
    repeatCustomerRate: 67
  };

  return (
    <div className="space-y-8">
      {/* Time Period Selector */}
      <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
            <Select defaultValue="12months">
              <SelectTrigger className="w-48 rounded-2xl border-white/30 bg-white/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="12months">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-100 p-3 rounded-2xl">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">৳{keyMetrics.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-emerald-600">+12% from last period</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-800">{keyMetrics.totalBookings}</p>
                <p className="text-xs text-emerald-600">+8% from last period</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-2xl">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Booking Value</p>
                <p className="text-2xl font-bold text-gray-800">৳{keyMetrics.averageBookingValue}</p>
                <p className="text-xs text-emerald-600">+5% from last period</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and Booking Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`৳${value.toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Peak Hours Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyBookings}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segments and Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <PieChart className="w-5 h-5 mr-2 text-purple-600" />
              Customer Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {customerSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <Target className="w-5 h-5 mr-2 text-orange-600" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionData.map((step, index) => (
                <div key={step.metric} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{step.metric}</span>
                    <span className="text-sm text-gray-600">{step.value} ({step.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${step.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-gray-800">Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/50 rounded-2xl">
              <div className="text-3xl font-bold text-emerald-600 mb-2">{keyMetrics.occupancyRate}%</div>
              <div className="text-sm text-gray-600">Occupancy Rate</div>
              <div className="text-xs text-emerald-600 mt-1">+3% from last month</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-2xl">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{keyMetrics.customerSatisfaction}</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
              <div className="text-xs text-emerald-600 mt-1">+0.2 from last month</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-2xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">{keyMetrics.repeatCustomerRate}%</div>
              <div className="text-sm text-gray-600">Repeat Customers</div>
              <div className="text-xs text-emerald-600 mt-1">+5% from last month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
