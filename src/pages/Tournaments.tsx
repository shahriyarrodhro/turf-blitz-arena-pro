
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, MapPin, Star, Clock, Search, Filter, ChevronRight, DollarSign, Medal, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { EnhancedHeader } from '@/components/ui/enhanced-header';
import { toast } from '@/hooks/use-toast';

const Tournaments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const bangladeshCities = [
    'All', 'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'
  ];

  const tournamentTypes = ['All', 'Knockout', 'League', 'Round Robin', 'Mixed'];
  const tournamentStatus = ['All', 'Open', 'Ongoing', 'Completed', 'Upcoming'];

  const tournaments = [
    {
      id: 1,
      name: "Dhaka Premier League",
      location: "Multiple Venues, Dhaka",
      city: "Dhaka",
      startDate: "2024-07-01",
      endDate: "2024-08-15",
      registrationDeadline: "2024-06-25",
      teamsRegistered: 24,
      maxTeams: 32,
      entryFee: "৳15,000",
      entryFeeValue: 15000,
      prizePool: "৳500,000",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500",
      type: "League",
      status: "Open",
      format: "11v11",
      organizer: "Dhaka Football Association",
      description: "The biggest football tournament in Dhaka with teams from across the city competing for glory.",
      difficulty: "Professional",
      features: ["Live Streaming", "Referees", "Medical Support", "Trophies"]
    },
    {
      id: 2,
      name: "Chittagong Cup",
      location: "Port City Stadium, Chittagong",
      city: "Chittagong",
      startDate: "2024-06-20",
      endDate: "2024-06-25",
      registrationDeadline: "2024-06-15",
      teamsRegistered: 16,
      maxTeams: 16,
      entryFee: "৳8,000",
      entryFeeValue: 8000,
      prizePool: "৳200,000",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
      type: "Knockout",
      status: "Ongoing",
      format: "11v11",
      organizer: "Chittagong Sports Club",
      description: "Fast-paced knockout tournament with intense competition.",
      difficulty: "Advanced",
      features: ["Referees", "Medical Support", "Trophies", "Medals"]
    },
    {
      id: 3,
      name: "Summer 7s Championship",
      location: "Elite Sports Complex, Dhaka",
      city: "Dhaka",
      startDate: "2024-06-30",
      endDate: "2024-07-02",
      registrationDeadline: "2024-06-20",
      teamsRegistered: 12,
      maxTeams: 20,
      entryFee: "৳5,000",
      entryFeeValue: 5000,
      prizePool: "৳100,000",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500",
      type: "Round Robin",
      status: "Open",
      format: "7v7",
      organizer: "Elite Sports",
      description: "Weekend tournament perfect for smaller teams and quick games.",
      difficulty: "Intermediate",
      features: ["Referees", "Refreshments", "Trophies"]
    },
    {
      id: 4,
      name: "Youth Development Cup",
      location: "Various Grounds, Sylhet",
      city: "Sylhet",
      startDate: "2024-07-10",
      endDate: "2024-07-20",
      registrationDeadline: "2024-06-30",
      teamsRegistered: 8,
      maxTeams: 16,
      entryFee: "৳3,000",
      entryFeeValue: 3000,
      prizePool: "৳75,000",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500",
      type: "Mixed",
      status: "Upcoming",
      format: "11v11",
      organizer: "Sylhet Youth Academy",
      description: "Tournament focused on developing young talent under 21.",
      difficulty: "Beginner",
      features: ["Coaching Clinics", "Scouts", "Certificates", "Training Sessions"]
    },
    {
      id: 5,
      name: "Corporate League",
      location: "Champions Arena, Dhaka",
      city: "Dhaka",
      startDate: "2024-05-15",
      endDate: "2024-05-30",
      registrationDeadline: "2024-05-10",
      teamsRegistered: 20,
      maxTeams: 20,
      entryFee: "৳10,000",
      entryFeeValue: 10000,
      prizePool: "৳250,000",
      image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=500",
      type: "League",
      status: "Completed",
      format: "7v7",
      organizer: "Corporate Sports Network",
      description: "Tournament exclusively for corporate teams and office leagues.",
      difficulty: "Intermediate",
      features: ["Networking Events", "Awards Ceremony", "Live Coverage"]
    },
    {
      id: 6,
      name: "Weekend Warriors",
      location: "Victory Ground, Dhaka",
      city: "Dhaka",
      startDate: "2024-06-22",
      endDate: "2024-06-23",
      registrationDeadline: "2024-06-18",
      teamsRegistered: 6,
      maxTeams: 8,
      entryFee: "৳2,000",
      entryFeeValue: 2000,
      prizePool: "৳30,000",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
      type: "Knockout",
      status: "Open",
      format: "5v5",
      organizer: "Weekend Football Club",
      description: "Quick and fun tournament for weekend players.",
      difficulty: "Beginner",
      features: ["BBQ", "Music", "Fun Activities"]
    }
  ];

  // Filter tournaments
  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || tournament.city === selectedCity;
    const matchesType = selectedType === 'All' || tournament.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || tournament.status === selectedStatus;
    
    return matchesSearch && matchesCity && matchesType && matchesStatus;
  });

  const handleJoinTournament = (tournamentId: number) => {
    const tournament = tournaments.find(t => t.id === tournamentId);
    if (tournament) {
      if (tournament.status === 'Open') {
        toast({
          title: "Registration Successful!",
          description: `You have successfully registered for ${tournament.name}`,
        });
      } else {
        toast({
          title: "Registration Closed",
          description: `Registration for ${tournament.name} is currently not available`,
          variant: "destructive"
        });
      }
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200';
      case 'Ongoing':
        return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200';
      case 'Completed':
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border-gray-200';
      case 'Upcoming':
        return 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200';
      case 'Intermediate':
        return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-yellow-200';
      case 'Advanced':
        return 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-200';
      case 'Professional':
        return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'live streaming': return <Target className="w-3 h-3" />;
      case 'referees': return <Medal className="w-3 h-3" />;
      case 'medical support': return <Star className="w-3 h-3" />;
      case 'trophies': return <Trophy className="w-3 h-3" />;
      default: return <Star className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-blue-50/30">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full opacity-60 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full opacity-60 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <EnhancedHeader showSearch={true} />
      
      <div className="container mx-auto px-4 py-8 relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Join Epic Tournaments
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Compete in exciting football tournaments across Bangladesh. From local competitions to professional leagues.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-2xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl p-6">
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search tournaments by name, location, or organizer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm text-lg placeholder:text-gray-500"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-14 px-8 border-white/30 bg-white/20 hover:bg-white/40 rounded-2xl backdrop-blur-sm transition-all duration-300"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                  {(selectedCity !== 'All' || selectedType !== 'All' || selectedStatus !== 'All') && (
                    <Badge className="ml-2 bg-purple-500 text-white w-3 h-3 p-0 rounded-full" />
                  )}
                </Button>
              </div>

              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/20"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="h-12 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {bangladeshCities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="h-12 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {tournamentTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="h-12 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {tournamentStatus.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Available Tournaments</h2>
            <p className="text-gray-600">{filteredTournaments.length} tournaments found</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="rounded-2xl border-white/30 bg-white/20 hover:bg-white/40">
              <Calendar className="w-4 h-4 mr-2" />
              Sort by Date
            </Button>
            <Button variant="outline" className="rounded-2xl border-white/30 bg-white/20 hover:bg-white/40">
              <DollarSign className="w-4 h-4 mr-2" />
              Sort by Prize
            </Button>
          </div>
        </motion.div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTournaments.map((tournament, index) => (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="backdrop-blur-2xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group overflow-hidden">
                <div className="relative h-48 overflow-hidden rounded-t-3xl">
                  <img
                    src={tournament.image}
                    alt={tournament.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <Badge className={`${getStatusBadgeColor(tournament.status)} rounded-2xl px-3 py-1 font-semibold shadow-lg backdrop-blur-sm`}>
                      {tournament.status}
                    </Badge>
                    <Badge className={`${getDifficultyBadgeColor(tournament.difficulty)} rounded-2xl px-3 py-1 font-semibold shadow-lg backdrop-blur-sm`}>
                      {tournament.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-100/90 text-blue-700 rounded-2xl px-3 py-1 font-semibold shadow-lg backdrop-blur-sm">
                      {tournament.format}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{tournament.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{tournament.description}</p>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="text-sm">{tournament.location}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                        <span>{tournament.startDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-green-600" />
                        <span>Reg: {tournament.registrationDeadline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {tournament.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center bg-gray-100/80 rounded-2xl px-3 py-1">
                          {getFeatureIcon(feature)}
                          <span className="text-xs text-gray-700 ml-1">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-xs text-gray-500">Entry Fee</p>
                        <p className="text-lg font-bold text-gray-800">{tournament.entryFee}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Prize Pool</p>
                        <p className="text-lg font-bold text-purple-600">{tournament.prizePool}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Teams</p>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-gray-600" />
                        <span className="text-sm font-semibold text-gray-800">
                          {tournament.teamsRegistered}/{tournament.maxTeams}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-2xl border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={() => handleJoinTournament(tournament.id)}
                      disabled={tournament.status !== 'Open'}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {tournament.status === 'Open' ? (
                        <>
                          Join Now
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </>
                      ) : tournament.status === 'Ongoing' ? 'In Progress' : 
                        tournament.status === 'Completed' ? 'Completed' : 'Coming Soon'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTournaments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl flex items-center justify-center">
              <Trophy className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No tournaments found</h3>
            <p className="text-gray-600 mb-8 text-lg">Try adjusting your search criteria or check back later for new tournaments</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCity('All');
                setSelectedType('All');
                setSelectedStatus('All');
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl px-8 py-3"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Tournaments;
