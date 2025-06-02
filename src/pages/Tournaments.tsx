
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, MapPin, Users, Star, Clock, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { EnhancedHeader } from '@/components/ui/enhanced-header';
import { toast } from '@/hooks/use-toast';

const Tournaments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tournaments = [
    {
      id: 1,
      name: "Summer Championship 2024",
      status: "Open",
      startDate: "2024-07-15",
      endDate: "2024-07-28",
      teams: 16,
      maxTeams: 32,
      prize: "৳50,000",
      location: "Dhaka Sports Complex",
      format: "Knockout",
      registrationFee: "৳2,000",
      organizer: "Dhaka Football Association",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Corporate Football League",
      status: "Ongoing",
      startDate: "2024-06-01",
      endDate: "2024-08-30",
      teams: 24,
      maxTeams: 24,
      prize: "৳1,00,000",
      location: "Various Venues",
      format: "League",
      registrationFee: "৳5,000",
      organizer: "Corporate Sports BD",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Youth Football Cup",
      status: "Open",
      startDate: "2024-08-01",
      endDate: "2024-08-15",
      teams: 8,
      maxTeams: 16,
      prize: "৳25,000",
      location: "Youth Sports Center",
      format: "Knockout",
      registrationFee: "৳1,500",
      organizer: "Youth Sports Foundation",
      image: "/placeholder.svg"
    }
  ];

  const handleJoinTournament = (tournamentId: number, tournamentName: string) => {
    toast({
      title: "Tournament Registration",
      description: `Successfully registered for ${tournamentName}!`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-emerald-100 text-emerald-700';
      case 'Ongoing': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || tournament.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50/30 via-white to-orange-50/30">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full opacity-60 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-red-200/20 to-pink-200/20 rounded-full opacity-60 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <EnhancedHeader />

      <div className="container mx-auto px-4 py-8 relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Football Tournaments 🏆
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join competitive tournaments and showcase your football skills
          </p>
        </motion.div>

        {/* Search and Filters */}
        <Card className="backdrop-blur-2xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tournaments..."
                  className="pl-12 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm text-lg py-6"
                />
              </div>
              <div className="lg:w-48">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-white/30 bg-white/50 backdrop-blur-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tournament Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTournaments.map((tournament) => (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="backdrop-blur-2xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden h-full">
                <div className="relative">
                  <img
                    src={tournament.image}
                    alt={tournament.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getStatusColor(tournament.status)} rounded-2xl px-4 py-2 font-medium`}>
                      {tournament.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-yellow-500 text-white rounded-2xl px-3 py-1">
                      {tournament.format}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-gray-800 group-hover:text-yellow-600 transition-colors">
                    {tournament.name}
                  </CardTitle>
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{tournament.location}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {tournament.startDate}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {tournament.endDate}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {tournament.teams}/{tournament.maxTeams} teams
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Trophy className="w-4 h-4 mr-2" />
                      Prize: {tournament.prize}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <div><span className="font-medium">Registration Fee:</span> {tournament.registrationFee}</div>
                    <div><span className="font-medium">Organized by:</span> {tournament.organizer}</div>
                  </div>

                  <Button
                    onClick={() => handleJoinTournament(tournament.id, tournament.name)}
                    disabled={tournament.teams >= tournament.maxTeams}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-2xl py-3 shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {tournament.teams >= tournament.maxTeams ? 'Tournament Full' : 'Join Tournament'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="w-24 h-24 mx-auto mb-6 text-gray-400" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No tournaments found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your search criteria</p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('all');
              }}
              variant="outline"
              className="rounded-2xl border-yellow-200 text-yellow-600 hover:bg-yellow-50"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tournaments;
