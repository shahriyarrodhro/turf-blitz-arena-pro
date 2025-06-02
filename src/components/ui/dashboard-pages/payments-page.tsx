
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CreditCard, DollarSign, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Plus, Filter } from 'lucide-react';

export const PaymentsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const paymentStats = [
    { label: 'Total Spent', value: '৳12,500', icon: DollarSign, change: '+৳2,300 this month', color: 'from-blue-500 to-purple-600' },
    { label: 'Pending Payments', value: '৳1,800', icon: Clock, change: '3 pending', color: 'from-yellow-500 to-orange-600' },
    { label: 'Completed', value: '15', icon: CheckCircle, change: 'This month', color: 'from-emerald-500 to-teal-600' },
    { label: 'Failed', value: '1', icon: XCircle, change: 'Last 30 days', color: 'from-red-500 to-pink-600' }
  ];

  const transactions = [
    {
      id: 1,
      type: 'Turf Booking',
      description: 'Elite Sports Arena - Court 1',
      amount: '৳2,500',
      status: 'Completed',
      date: '2024-06-01',
      time: '14:30',
      method: 'bKash'
    },
    {
      id: 2,
      type: 'Tournament Registration',
      description: 'Summer Championship 2024',
      amount: '৳2,000',
      status: 'Completed',
      date: '2024-05-28',
      time: '10:15',
      method: 'Card'
    },
    {
      id: 3,
      type: 'Team Registration',
      description: 'Corporate League Entry Fee',
      amount: '৳5,000',
      status: 'Pending',
      date: '2024-06-02',
      time: '16:45',
      method: 'Bank Transfer'
    },
    {
      id: 4,
      type: 'Turf Booking',
      description: 'Champions Ground - Field A',
      amount: '৳3,000',
      status: 'Failed',
      date: '2024-05-30',
      time: '09:20',
      method: 'Nagad'
    }
  ];

  const paymentMethods = [
    { id: 1, name: 'bKash', type: 'Mobile Banking', last4: '1234', isDefault: true },
    { id: 2, name: 'Visa Card', type: 'Credit Card', last4: '5678', isDefault: false },
    { id: 3, name: 'Nagad', type: 'Mobile Banking', last4: '9876', isDefault: false }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Failed': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-green-50/60 via-white/40 to-emerald-50/60 border border-white/30 rounded-3xl shadow-2xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                Payment History 💳
              </h2>
              <p className="text-gray-600 text-lg">Track your spending and manage payment methods</p>
            </div>
            <Button
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl px-8 py-3 shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paymentStats.map((stat, index) => (
          <Card key={index} className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
              <div className="text-xs text-emerald-600">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transaction History */}
        <div className="lg:col-span-2">
          <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-800 flex items-center text-xl">
                <CreditCard className="w-6 h-6 mr-3 text-emerald-600" />
                Recent Transactions
              </CardTitle>
              <div className="flex gap-2">
                {['week', 'month', 'year'].map((period) => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(period)}
                    className="rounded-2xl capitalize"
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="p-4 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{transaction.type}</h4>
                        <p className="text-sm text-gray-600">{transaction.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <span>{transaction.date}</span>
                          <span>•</span>
                          <span>{transaction.time}</span>
                          <span>•</span>
                          <span>{transaction.method}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800">{transaction.amount}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(transaction.status)}
                        <Badge className={`${getStatusColor(transaction.status)} rounded-2xl px-3 py-1 text-xs`}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <div>
          <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center text-xl">
                <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="p-4 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{method.name}</h4>
                        <p className="text-sm text-gray-600">
                          {method.type} •••• {method.last4}
                        </p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <Badge className="bg-emerald-100 text-emerald-700 rounded-2xl px-3 py-1 text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              
              <Button
                variant="outline"
                className="w-full rounded-2xl border-dashed border-gray-300 hover:border-emerald-300 hover:bg-emerald-50/50 py-8"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Payment Method
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
