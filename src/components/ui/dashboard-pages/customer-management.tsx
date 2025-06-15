
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, Eye, Ban, Star, MessageCircle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';

export const CustomerManagement = () => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, [user]);

  const loadCustomers = () => {
    if (!user) return;

    // Get all bookings for this turf owner
    const allTurfs = JSON.parse(localStorage.getItem('turfs') || '[]');
    const ownerTurfs = allTurfs.filter(turf => turf.ownerId === user.id);
    
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const ownerBookings = allBookings.filter(booking => {
      return ownerTurfs.some(turf => turf.id === booking.turfId);
    });

    // Group bookings by customer
    const customerMap = {};
    ownerBookings.forEach(booking => {
      if (!customerMap[booking.playerId]) {
        customerMap[booking.playerId] = {
          id: booking.playerId,
          name: booking.playerName,
          email: booking.playerEmail || `${booking.playerName.toLowerCase().replace(' ', '')}@example.com`,
          totalBookings: 0,
          totalSpent: 0,
          lastBooking: booking.date,
          status: 'active',
          rating: 4.5,
          bookings: []
        };
      }
      
      customerMap[booking.playerId].totalBookings++;
      if (booking.status === 'confirmed') {
        customerMap[booking.playerId].totalSpent += booking.amount;
      }
      customerMap[booking.playerId].bookings.push(booking);
      
      // Update last booking date if this booking is more recent
      if (booking.date > customerMap[booking.playerId].lastBooking) {
        customerMap[booking.playerId].lastBooking = booking.date;
      }
    });

    setCustomers(Object.values(customerMap));
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'banned':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleBanCustomer = (customerId) => {
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === customerId 
          ? { ...customer, status: customer.status === 'banned' ? 'active' : 'banned' }
          : customer
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
          <p className="text-gray-600">Manage your customers and their booking history</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-800">{customers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-2xl">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-800">
                  {customers.reduce((acc, customer) => acc + customer.totalBookings, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-100 p-3 rounded-2xl">
                <Star className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-gray-800">
                  {customers.filter(c => c.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search customers by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-2xl border-white/30 bg-white/40"
                />
              </div>
              <Button variant="outline" className="rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-800">
              Customers ({filteredCustomers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredCustomers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total Bookings</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Last Booking</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-gray-50/50">
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-800">{customer.name}</p>
                            <p className="text-xs text-gray-500">{customer.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{customer.totalBookings}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-emerald-600">৳{customer.totalSpent.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{customer.lastBooking}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm">{customer.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusBadge(customer.status)} rounded-2xl`}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="rounded-xl"
                                  onClick={() => setSelectedCustomer(customer)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Customer Details - {customer.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium text-gray-600">Email</p>
                                      <p className="text-gray-800">{customer.email}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                                      <p className="text-gray-800">{customer.totalBookings}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600">Total Spent</p>
                                      <p className="text-emerald-600 font-semibold">৳{customer.totalSpent.toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600">Rating</p>
                                      <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <span>{customer.rating}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium text-gray-800 mb-3">Recent Bookings</h4>
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                      {customer.bookings.slice(0, 5).map((booking, index) => (
                                        <div key={index} className="p-3 bg-gray-50 rounded-xl">
                                          <div className="flex justify-between items-center">
                                            <div>
                                              <p className="font-medium text-sm">{booking.date} at {booking.time}</p>
                                              <p className="text-xs text-gray-600">Booking ID: {booking.id}</p>
                                            </div>
                                            <div className="text-right">
                                              <p className="font-medium">৳{booking.amount}</p>
                                              <Badge className={`text-xs ${
                                                booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                              }`}>
                                                {booking.status}
                                              </Badge>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="rounded-xl"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className={`rounded-xl ${customer.status === 'banned' ? 'text-green-600' : 'text-red-600'}`}
                              onClick={() => handleBanCustomer(customer.id)}
                            >
                              <Ban className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-2">No customers found</p>
                <p className="text-sm text-gray-400">Add turfs and start receiving bookings to see customers here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
