
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, DollarSign, User, Phone, Search, Filter, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useBooking } from '@/contexts/BookingContext';

export const BookingManagement = () => {
  const { bookings, updateBookingStatus, updatePaymentStatus } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Mock bookings data for turf owner
  const turfBookings = [
    {
      id: '1',
      playerName: 'Ahmed Rahman',
      playerEmail: 'ahmed@example.com',
      playerPhone: '+880 1712-345678',
      date: '2024-12-15',
      time: '18:00-19:00',
      duration: 1,
      totalAmount: 2500,
      paidAmount: 2500,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'bKash',
      bookingType: 'full',
      createdAt: '2024-12-01T10:00:00Z'
    },
    {
      id: '2',
      playerName: 'Karim Hassan',
      playerEmail: 'karim@example.com',
      playerPhone: '+880 1798-765432',
      date: '2024-12-16',
      time: '19:00-20:00',
      duration: 1,
      totalAmount: 2500,
      paidAmount: 500,
      status: 'pending',
      paymentStatus: 'partial',
      paymentMethod: 'Nagad',
      bookingType: 'partial',
      createdAt: '2024-12-02T11:00:00Z'
    },
    {
      id: '3',
      playerName: 'Rashid Ali',
      playerEmail: 'rashid@example.com',
      playerPhone: '+880 1555-123456',
      date: '2024-12-17',
      time: '17:00-18:00',
      duration: 1,
      totalAmount: 2500,
      paidAmount: 0,
      status: 'pending',
      paymentStatus: 'unpaid',
      paymentMethod: 'pending',
      bookingType: 'partial',
      createdAt: '2024-12-03T09:00:00Z'
    },
    {
      id: '4',
      playerName: 'Fahim Ahmed',
      playerEmail: 'fahim@example.com',
      playerPhone: '+880 1611-789012',
      date: '2024-12-18',
      time: '20:00-21:00',
      duration: 1,
      totalAmount: 3000,
      paidAmount: 3000,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'Card',
      bookingType: 'full',
      createdAt: '2024-12-04T14:00:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'partial': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'unpaid': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredBookings = turfBookings.filter(booking => {
    const matchesSearch = booking.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.playerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (bookingId: string, newStatus: string) => {
    // Update booking status logic
    console.log(`Updating booking ${bookingId} to ${newStatus}`);
  };

  const handlePaymentStatusUpdate = (bookingId: string, newPaymentStatus: string) => {
    // Update payment status logic
    console.log(`Updating payment for booking ${bookingId} to ${newPaymentStatus}`);
  };

  const calculateRevenue = () => {
    const totalRevenue = filteredBookings.reduce((sum, booking) => sum + booking.paidAmount, 0);
    const pendingAmount = filteredBookings.reduce((sum, booking) => sum + (booking.totalAmount - booking.paidAmount), 0);
    return { totalRevenue, pendingAmount };
  };

  const { totalRevenue, pendingAmount } = calculateRevenue();

  return (
    <div className="space-y-8">
      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-100 p-3 rounded-2xl">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">৳{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-2xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold text-gray-800">৳{pendingAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-800">{filteredBookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by player name or email..."
                className="pl-12 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 rounded-2xl border-white/30 bg-white/50">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-gray-800 flex items-center text-xl">
            <Calendar className="w-6 h-6 mr-3 text-emerald-600" />
            Booking Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="p-6 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {/* Player Info */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="font-semibold text-gray-800">{booking.playerName}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>{booking.playerEmail}</p>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>{booking.playerPhone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-800">{booking.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">{booking.time}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {booking.bookingType} booking
                    </Badge>
                  </div>

                  {/* Payment Info */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-600" />
                      <span className="font-semibold text-gray-800">
                        ৳{booking.paidAmount} / ৳{booking.totalAmount}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                        {booking.paymentStatus}
                      </Badge>
                      <p className="text-xs text-gray-600">via {booking.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                    <div className="flex flex-col space-y-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                            className="border-red-300 text-red-600 hover:bg-red-50 rounded-xl"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {booking.paymentStatus === 'partial' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePaymentStatusUpdate(booking.id, 'paid')}
                          className="rounded-xl"
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Mark Paid
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="rounded-xl">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Booking Details</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium">Player Information</h4>
                                <p className="text-sm text-gray-600">{booking.playerName}</p>
                                <p className="text-sm text-gray-600">{booking.playerEmail}</p>
                                <p className="text-sm text-gray-600">{booking.playerPhone}</p>
                              </div>
                              <div>
                                <h4 className="font-medium">Booking Information</h4>
                                <p className="text-sm text-gray-600">Date: {booking.date}</p>
                                <p className="text-sm text-gray-600">Time: {booking.time}</p>
                                <p className="text-sm text-gray-600">Duration: {booking.duration} hour</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium">Payment Information</h4>
                              <p className="text-sm text-gray-600">Total Amount: ৳{booking.totalAmount}</p>
                              <p className="text-sm text-gray-600">Paid Amount: ৳{booking.paidAmount}</p>
                              <p className="text-sm text-gray-600">Payment Method: {booking.paymentMethod}</p>
                              <p className="text-sm text-gray-600">Booking Type: {booking.bookingType}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
