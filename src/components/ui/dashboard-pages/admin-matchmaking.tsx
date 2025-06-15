
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, Search, Filter, Eye, CheckCircle, XCircle, 
  Clock, Users, MapPin, Calendar, MessageCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const AdminMatchmaking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const matchRequests = [
    {
      id: 'MR001',
      type: 'Looking for Players',
      requestedBy: 'Ahmed Rahman',
      teamName: 'Warriors FC',
      playersNeeded: 3,
      preferredDate: '2024-12-20',
      preferredTime: '18:00',
      preferredTurf: 'Champions Arena',
      skillLevel: 'intermediate',
      gameFormat: '7v7',
      status: 'open',
      responses: 5,
      createdAt: '2024-12-15 14:30',
      description: 'Need 3 more players for friendly match. All skill levels welcome!'
    },
    {
      id: 'MR002',
      type: 'Team vs Team',
      requestedBy: 'Karim Hassan',
      teamName: 'Lightning FC',
      opponentTeam: 'Thunder Bolts',
      preferredDate: '2024-12-18',
      preferredTime: '19:00',
      preferredTurf: 'Victory Ground',
      skillLevel: 'professional',
      gameFormat: '11v11',
      status: 'matched',
      responses: 1,
      createdAt: '2024-12-14 16:45',
      description: 'Looking for competitive match against similar level team.'
    },
    {
      id: 'MR003',
      type: 'Solo Player',
      requestedBy: 'Sarah Khan',
      teamName: null,
      playersNeeded: 1,
      preferredDate: '2024-12-16',
      preferredTime: '17:00',
      preferredTurf: 'Green Valley',
      skillLevel: 'beginner',
      gameFormat: '5v5',
      status: 'pending',
      responses: 3,
      createdAt: '2024-12-13 09:20',
      description: 'New player looking to join any team for casual game.'
    },
    {
      id: 'MR004',
      type: 'Tournament Team',
      requestedBy: 'Rahman Sports Club',
      teamName: 'Champions United',
      playersNeeded: 2,
      preferredDate: '2024-12-25',
      preferredTime: '16:00',
      preferredTurf: 'Elite Sports Complex',
      skillLevel: 'professional',
      gameFormat: '11v11',
      status: 'completed',
      responses: 8,
      createdAt: '2024-12-10 11:15',
      description: 'Need 2 substitute players for upcoming tournament.'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'matched':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Looking for Players':
        return 'bg-purple-100 text-purple-700';
      case 'Team vs Team':
        return 'bg-orange-100 text-orange-700';
      case 'Solo Player':
        return 'bg-teal-100 text-teal-700';
      case 'Tournament Team':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredRequests = matchRequests.filter(request => {
    const matchesSearch = request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
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
          <h2 className="text-2xl font-bold text-gray-800">Matchmaking Requests</h2>
          <p className="text-gray-600">Monitor and manage player matchmaking requests</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Auto-Match
          </Button>
          <Button variant="outline" className="rounded-xl">
            <Target className="w-4 h-4 mr-2" />
            Match Statistics
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
                  placeholder="Search requests by player, team, or ID..."
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
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="matched">Matched</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Match Requests Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {filteredRequests.map((request) => (
          <Card key={request.id} className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {request.requestedBy.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-gray-800">{request.requestedBy}</h3>
                    {request.teamName && (
                      <p className="text-sm text-gray-600">{request.teamName}</p>
                    )}
                    <p className="text-xs text-gray-500">{request.id}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={`${getStatusBadge(request.status)} rounded-2xl`}>
                    {request.status}
                  </Badge>
                  <Badge className={`${getTypeBadge(request.type)} rounded-lg`}>
                    {request.type}
                  </Badge>
                </div>
              </div>

              {/* Request Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Game Format</span>
                  <span className="text-sm font-medium text-gray-800">{request.gameFormat}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Skill Level</span>
                  <Badge variant="outline" className="text-xs rounded-lg">
                    {request.skillLevel}
                  </Badge>
                </div>
                {request.playersNeeded && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Players Needed</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-800">{request.playersNeeded}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Match Details */}
              <div className="p-3 bg-gray-50 rounded-xl mb-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{request.preferredDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{request.preferredTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 col-span-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{request.preferredTurf}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-xl">
                  "{request.description}"
                </p>
              </div>

              {/* Responses */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">{request.responses} responses</span>
                </div>
                <span className="text-xs text-gray-500">
                  Created {request.createdAt}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="rounded-xl">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700 rounded-xl">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex space-x-2">
                  {request.status === 'open' && (
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
                  {request.status === 'pending' && (
                    <Button size="sm" variant="outline" className="rounded-xl">
                      <Target className="w-4 h-4 mr-1" />
                      Auto-Match
                    </Button>
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
