
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Search, Filter, Eye, Edit, Ban, UserCheck, 
  Star, Trophy, Calendar, DollarSign, MessageCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const AdminPlayers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const players = [
    {
      id: 'PL001',
      name: 'Ahmed Rahman',
      email: 'ahmed@example.com',
      phone: '+880 1712-345678',
      rating: 4.7,
      totalMatches: 45,
      totalSpent: 125000,
      joinDate: '2024-08-15',
      lastActive: '2024-12-15',
      status: 'active',
      level: 'intermediate',
      position: 'Forward',
      favoriteTeam: 'Warriors FC',
      totalBookings: 32,
      achievements: ['Top Scorer', 'Fair Play Award']
    },
    {
      id: 'PL002',
      name: 'Sarah Khan',
      email: 'sarah@example.com',
      phone: '+880 1823-456789',
      rating: 4.5,
      totalMatches: 28,
      totalSpent: 67500,
      joinDate: '2024-09-22',
      lastActive: '2024-12-14',
      status: 'active',
      level: 'beginner',
      position: 'Midfielder',
      favoriteTeam: 'Lightning FC',
      totalBookings: 18,
      achievements: ['Best Newcomer']
    },
    {
      id: 'PL003',
      name: 'Karim Hassan',
      email: 'karim@example.com',
      phone: '+880 1934-567890',
      rating: 4.9,
      totalMatches: 78,
      totalSpent: 245000,
      joinDate: '2024-06-10',
      lastActive: '2024-12-13',
      status: 'premium',
      level: 'professional',
      position: 'Goalkeeper',
      favoriteTeam: 'Champions United',
      totalBookings: 56,
      achievements: ['MVP', 'Golden Glove', 'Captain']
    },
    {
      id: 'PL004',
      name: 'Rashid Ali',
      email: 'rashid@example.com',
      phone: '+880 1645-678901',
      rating: 3.8,
      totalMatches: 12,
      totalSpent: 28000,
      joinDate: '2024-11-05',
      lastActive: '2024-12-10',
      status: 'warned',
      level: 'beginner',
      position: 'Defender',
      favoriteTeam: 'City Stars',
      totalBookings: 8,
      achievements: []
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'premium':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'warned':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'banned':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-blue-100 text-blue-700';
      case 'intermediate':
        return 'bg-green-100 text-green-700';
      case 'professional':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || player.status === statusFilter;
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
          <h2 className="text-2xl font-bold text-gray-800">Manage Players</h2>
          <p className="text-gray-600">View, manage, and moderate player accounts</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Export Players
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
                  placeholder="Search players by name, email, or ID..."
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
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="warned">Warned</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Players Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredPlayers.map((player) => (
          <Card key={player.id} className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-gray-800">{player.name}</h3>
                    <p className="text-sm text-gray-600">{player.email}</p>
                    <p className="text-xs text-gray-500">{player.id}</p>
                  </div>
                </div>
                <Badge className={`${getStatusBadge(player.status)} rounded-2xl`}>
                  {player.status}
                </Badge>
              </div>

              {/* Player Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Level</span>
                  <Badge className={`${getLevelBadge(player.level)} rounded-lg`}>
                    {player.level}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Position</span>
                  <span className="text-sm font-medium text-gray-800">{player.position}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-800">{player.rating}</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Trophy className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold text-gray-800">{player.totalMatches}</span>
                  </div>
                  <p className="text-xs text-gray-600">Matches</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-gray-800">{player.totalBookings}</span>
                  </div>
                  <p className="text-xs text-gray-600">Bookings</p>
                </div>
              </div>

              {/* Financial Info */}
              <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Spent</span>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-emerald-700">৳{player.totalSpent.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">Member since</span>
                  <span className="text-xs text-gray-600">{player.joinDate}</span>
                </div>
              </div>

              {/* Achievements */}
              {player.achievements.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2">Achievements</p>
                  <div className="flex flex-wrap gap-1">
                    {player.achievements.map((achievement) => (
                      <Badge key={achievement} variant="outline" className="text-xs rounded-lg bg-yellow-50 text-yellow-700 border-yellow-200">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="rounded-xl">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="rounded-xl">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700 rounded-xl">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex space-x-2">
                  {player.status === 'active' ? (
                    <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl">
                      <Ban className="w-4 h-4 mr-1" />
                      Ban
                    </Button>
                  ) : player.status === 'banned' ? (
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                      <UserCheck className="w-4 h-4 mr-1" />
                      Unban
                    </Button>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};
