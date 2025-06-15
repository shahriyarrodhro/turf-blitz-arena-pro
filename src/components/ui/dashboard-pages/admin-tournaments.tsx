
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Search, Filter, Plus, Eye, Edit, Trash2, 
  Calendar, Users, DollarSign, MapPin, Crown, Medal 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

export const AdminTournaments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const tournaments = [
    {
      id: 'TR001',
      name: 'Winter Championship 2024',
      organizer: 'Sports Club BD',
      format: 'Knockout',
      teams: 16,
      maxTeams: 16,
      entryFee: 5000,
      prizePool: 50000,
      venue: 'Multiple Venues',
      startDate: '2024-12-20',
      endDate: '2024-12-25',
      status: 'upcoming',
      registrationDeadline: '2024-12-18',
      gameFormat: '11v11',
      category: 'Professional',
      winner: null,
      runnerUp: null,
      progress: 85
    },
    {
      id: 'TR002',
      name: 'Corporate League',
      organizer: 'Corporate Sports BD',
      format: 'League',
      teams: 8,
      maxTeams: 10,
      entryFee: 3000,
      prizePool: 25000,
      venue: 'Champions Arena',
      startDate: '2024-12-15',
      endDate: '2024-12-30',
      status: 'ongoing',
      registrationDeadline: '2024-12-12',
      gameFormat: '7v7',
      category: 'Corporate',
      winner: null,
      runnerUp: null,
      progress: 45
    },
    {
      id: 'TR003',
      name: 'Youth Championship',
      organizer: 'Youth Sports Foundation',
      format: 'Knockout',
      teams: 12,
      maxTeams: 12,
      entryFee: 2000,
      prizePool: 15000,
      venue: 'Victory Ground',
      startDate: '2024-11-20',
      endDate: '2024-11-28',
      status: 'completed',
      registrationDeadline: '2024-11-15',
      gameFormat: '7v7',
      category: 'Youth',
      winner: 'Young Lions FC',
      runnerUp: 'Future Stars',
      progress: 100
    },
    {
      id: 'TR004',
      name: 'Amateur Cup 2024',
      organizer: 'Football Association',
      format: 'Group + Knockout',
      teams: 6,
      maxTeams: 16,
      entryFee: 1500,
      prizePool: 12000,
      venue: 'Green Valley',
      startDate: '2024-12-22',
      endDate: '2024-12-29',
      status: 'registration',
      registrationDeadline: '2024-12-20',
      gameFormat: '5v5',
      category: 'Amateur',
      winner: null,
      runnerUp: null,
      progress: 25
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'registration':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'ongoing':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'completed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Professional':
        return 'bg-purple-100 text-purple-700';
      case 'Corporate':
        return 'bg-orange-100 text-orange-700';
      case 'Youth':
        return 'bg-teal-100 text-teal-700';
      case 'Amateur':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tournament.status === statusFilter;
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
          <h2 className="text-2xl font-bold text-gray-800">Tournament Management</h2>
          <p className="text-gray-600">Create, manage, and oversee tournament competitions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Create Tournament
          </Button>
          <Button variant="outline" className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Export Results
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
                  placeholder="Search tournaments by name, organizer, or ID..."
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
                  <SelectItem value="registration">Registration</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tournaments Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {filteredTournaments.map((tournament) => (
          <Card key={tournament.id} className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-bold text-gray-800">{tournament.name}</h3>
                    <Badge className={`${getCategoryBadge(tournament.category)} rounded-lg`}>
                      {tournament.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{tournament.organizer}</p>
                  <p className="text-xs text-gray-500">{tournament.id}</p>
                </div>
                <Badge className={`${getStatusBadge(tournament.status)} rounded-2xl`}>
                  {tournament.status}
                </Badge>
              </div>

              {/* Tournament Details */}
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Format</span>
                    <span className="text-sm font-medium text-gray-800">{tournament.format}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Game</span>
                    <span className="text-sm font-medium text-gray-800">{tournament.gameFormat}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Teams</span>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-800">
                      {tournament.teams}/{tournament.maxTeams}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Prize Pool</span>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-600">৳{tournament.prizePool.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Entry Fee</span>
                  <span className="text-sm font-medium text-gray-800">৳{tournament.entryFee}</span>
                </div>
              </div>

              {/* Venue and Dates */}
              <div className="p-3 bg-gray-50 rounded-xl mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{tournament.venue}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {tournament.startDate} - {tournament.endDate}
                  </span>
                </div>
              </div>

              {/* Progress Bar (for ongoing tournaments) */}
              {tournament.status === 'ongoing' && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Tournament Progress</span>
                    <span className="text-sm font-medium text-gray-800">{tournament.progress}%</span>
                  </div>
                  <Progress value={tournament.progress} className="h-2" />
                </div>
              )}

              {/* Winners (for completed tournaments) */}
              {tournament.status === 'completed' && tournament.winner && (
                <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Crown className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{tournament.winner}</p>
                        <p className="text-xs text-gray-600">Champion</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Medal className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">{tournament.runnerUp}</p>
                        <p className="text-xs text-gray-500">Runner-up</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Registration Status (for upcoming tournaments) */}
              {tournament.status === 'registration' && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Registration</span>
                    <span className="text-sm font-medium text-gray-800">
                      {tournament.teams}/{tournament.maxTeams} teams
                    </span>
                  </div>
                  <Progress value={(tournament.teams / tournament.maxTeams) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    Deadline: {tournament.registrationDeadline}
                  </p>
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
                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 rounded-xl">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex space-x-2">
                  {tournament.status === 'ongoing' && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                      Update Scores
                    </Button>
                  )}
                  {tournament.status === 'completed' && (
                    <Button size="sm" variant="outline" className="rounded-xl">
                      <Trophy className="w-4 h-4 mr-1" />
                      View Results
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
