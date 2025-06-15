
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Search, Filter, Plus, Eye, Edit, Trash2, 
  MapPin, Clock, Users, DollarSign 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const AdminBookings = () => {
  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const bookings = [
    {
      id: 'BK001',
      playerName: 'Ahmed Rahman',
      playerEmail: 'ahmed@example.com',
      turfName: 'Champions Arena',
      date: '2024-12-15',
      time: '18:00-19:00',
      duration: 1,
      amount: 2500,
      status: 'confirmed',
      paymentMethod: 'bKash',
      createdAt: '2024-12-10 14:30'
    },
    {
      id: 'BK002',
      playerName: 'Sarah Khan',
      playerEmail: 'sarah@example.com',
      turfName: 'Victory Ground',
      date: '2024-12-16',
      time: '19:00-20:00',
      duration: 1,
      amount: 2000,
      status: 'pending',
      paymentMethod: 'Card',
      createdAt: '2024-12-11 09:15'
    },
    {
      id: 'BK003',
      playerName: 'Karim Hassan',
      playerEmail: 'karim@example.com',
      turfName: 'Green Valley',
      date: '2024-12-14',
      time: '17:00-19:00',
      duration: 2,
      amount: 4000,
      status: 'cancelled',
      paymentMethod: 'Nagad',
      createdAt: '2024-12-09 16:45'
    },
    {
      id: 'BK004',
      playerName: 'Rashid Ali',
      playerEmail: 'rashid@example.com',
      turfName: 'Sports Complex',
      date: '2024-12-17',
      time: '20:00-21:00',
      duration: 1,
      amount: 2200,
      status: 'confirmed',
      paymentMethod: 'Cash',
      createdAt: '2024-12-12 11:20'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.turfName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Bookings</h2>
          <p className="text-gray-600">View, edit, and manage all booking requests</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Create Booking
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setViewMode(viewMode === 'table' ? 'calendar' : 'table')}
            className="rounded-xl"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {viewMode === 'table' ? 'Calendar View' : 'Table View'}
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search bookings, players, turfs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-2xl border-white/30 bg-white/40"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48 rounded-2xl border-white/30 bg-white/40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-800">
              Bookings ({filteredBookings.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Turf</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-800">{booking.playerName}</p>
                          <p className="text-xs text-gray-500">{booking.playerEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{booking.turfName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.date}</p>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{booking.time} ({booking.duration}h)</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium">৳{booking.amount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusBadge(booking.status)} rounded-2xl`}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{booking.paymentMethod}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="rounded-xl">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="rounded-xl">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 rounded-xl">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
