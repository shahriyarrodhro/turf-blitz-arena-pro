
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Trophy, Calendar, MapPin, Users, Clock, Search, Filter, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const TournamentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

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
      organizer: "Dhaka Football Association"
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
      organizer: "Corporate Sports BD"
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
      organizer: "Youth Sports Foundation"
    }
  ];

  const myTournaments = [
    {
      id: 1,
      tournament: "Summer Championship 2024",
      status: "Registered",
      team: "Thunder Bolts FC",
      position: "Quarter Finals",
      nextMatch: "2024-07-20"
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
    const matchesFilter = selectedFilter === 'all' || tournament.status.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-yellow-50/60 via-white/40 to-orange-50/60 border border-white/30 rounded-3xl shadow-2xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
                Football Tournaments 🏆
              </h2>
              <p className="text-gray-600 text-lg">Join competitive tournaments and showcase your skills</p>
            </div>
            <Button
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-2xl px-8 py-3 shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Create Tournament
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tournaments..."
                className="pl-12 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'open', 'ongoing', 'completed'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  onClick={() => setSelectedFilter(filter)}
                  className="rounded-2xl capitalize"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Tournaments */}
      {myTournaments.length > 0 && (
        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center text-xl">
              <Star className="w-6 h-6 mr-3 text-yellow-600" />
              My Tournaments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myTournaments.map((tournament) => (
              <div key={tournament.id} className="p-6 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{tournament.tournament}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span>Team: {tournament.team}</span>
                      <span>Position: {tournament.position}</span>
                      <span>Next Match: {tournament.nextMatch}</span>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 rounded-2xl px-4 py-2">
                    {tournament.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Available Tournaments */}
      <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-gray-800 flex items-center text-xl">
            <Trophy className="w-6 h-6 mr-3 text-emerald-600" />
            Available Tournaments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {filteredTournaments.map((tournament) => (
            <div key={tournament.id} className="p-6 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">{tournament.name}</h3>
                    <Badge className={`${getStatusColor(tournament.status)} rounded-2xl px-3 py-1`}>
                      {tournament.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {tournament.startDate} - {tournament.endDate}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {tournament.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {tournament.teams}/{tournament.maxTeams} teams
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Trophy className="w-4 h-4 mr-2" />
                      Prize: {tournament.prize}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Format:</span> {tournament.format} | 
                      <span className="font-medium"> Fee:</span> {tournament.registrationFee} |
                      <span className="font-medium"> By:</span> {tournament.organizer}
                    </div>
                  </div>
                </div>
                
                <div className="ml-6">
                  <Button
                    onClick={() => handleJoinTournament(tournament.id, tournament.name)}
                    disabled={tournament.teams >= tournament.maxTeams}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl px-6 py-2 shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    {tournament.teams >= tournament.maxTeams ? 'Full' : 'Join Tournament'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
