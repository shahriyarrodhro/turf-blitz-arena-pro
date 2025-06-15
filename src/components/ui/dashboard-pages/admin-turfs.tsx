
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Search, Filter, Plus, Eye, Edit, Trash2, 
  Star, Clock, DollarSign, Users, CheckCircle, XCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const AdminTurfs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const turfs = [
    {
      id: 'TF001',
      name: 'Champions Arena',
      owner: 'Rahman Sports',
      ownerEmail: 'rahman@example.com',
      location: 'Gulshan, Dhaka',
      type: 'Synthetic Grass',
      capacity: '11v11',
      hourlyRate: 2500,
      rating: 4.8,
      totalBookings: 156,
      revenue: 89750,
      status: 'active',
      verified: true,
      features: ['Lights', 'Parking', 'Changing Room'],
      images: 3,
      createdAt: '2024-10-15'
    },
    {
      id: 'TF002',
      name: 'Victory Ground',
      owner: 'Sports Complex Ltd',
      ownerEmail: 'victory@example.com',
      location: 'Dhanmondi, Dhaka',
      type: 'Natural Grass',
      capacity: '7v7',
      hourlyRate: 2000,
      rating: 4.7,
      totalBookings: 134,
      revenue: 67500,
      status: 'active',
      verified: true,
      features: ['Lights', 'Cafeteria'],
      images: 5,
      createdAt: '2024-09-22'
    },
    {
      id: 'TF003',
      name: 'Green Valley Sports',
      owner: 'Karim Ahmed',
      ownerEmail: 'karim@example.com',
      location: 'Uttara, Dhaka',
      type: 'Synthetic Grass',
      capacity: '5v5',
      hourlyRate: 1800,
      rating: 4.6,
      totalBookings: 98,
      revenue: 45200,
      status: 'pending',
      verified: false,
      features: ['Parking', 'Changing Room'],
      images: 2,
      createdAt: '2024-12-10'
    },
    {
      id: 'TF004',
      name: 'Elite Sports Complex',
      owner: 'Elite Sports BD',
      ownerEmail: 'elite@example.com',
      location: 'Mirpur, Dhaka',
      type: 'Synthetic Grass',
      capacity: '11v11',
      hourlyRate: 3000,
      rating: 4.9,
      totalBookings: 201,
      revenue: 125400,
      status: 'maintenance',
      verified: true,
      features: ['Lights', 'Parking', 'Changing Room', 'Cafeteria'],
      images: 8,
      createdAt: '2024-08-05'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'maintenance':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'suspended':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredTurfs = turfs.filter(turf => {
    const matchesSearch = turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         turf.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         turf.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || turf.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || turf.location.includes(locationFilter);
    return matchesSearch && matchesStatus && matchesLocation;
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
          <h2 className="text-2xl font-bold text-gray-800">Manage Turfs</h2>
          <p className="text-gray-600">View, verify, and manage all turf facilities</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Add New Turf
          </Button>
          <Button variant="outline" className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Export Data
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
                  placeholder="Search turfs, owners, locations..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full lg:w-48 rounded-2xl border-white/30 bg-white/40">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Gulshan">Gulshan</SelectItem>
                  <SelectItem value="Dhanmondi">Dhanmondi</SelectItem>
                  <SelectItem value="Uttara">Uttara</SelectItem>
                  <SelectItem value="Mirpur">Mirpur</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Turfs Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredTurfs.map((turf) => (
          <Card key={turf.id} className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-gray-800">{turf.name}</h3>
                    {turf.verified && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{turf.owner}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{turf.location}</span>
                  </div>
                </div>
                <Badge className={`${getStatusBadge(turf.status)} rounded-2xl`}>
                  {turf.status}
                </Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold text-gray-800">{turf.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="font-semibold text-gray-800 mb-1">{turf.totalBookings}</div>
                  <p className="text-xs text-gray-600">Bookings</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium text-gray-800">{turf.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-medium text-gray-800">{turf.capacity}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rate/Hour</span>
                  <span className="font-medium text-emerald-600">৳{turf.hourlyRate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Revenue</span>
                  <span className="font-medium text-purple-600">৳{turf.revenue.toLocaleString()}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">Features</p>
                <div className="flex flex-wrap gap-1">
                  {turf.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs rounded-lg">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
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
                <div className="flex space-x-2">
                  {turf.status === 'pending' && (
                    <>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};
