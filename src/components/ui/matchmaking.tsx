
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Users, Star, Trophy, Target, Filter, X, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface MatchmakingProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

interface Match {
  id: number;
  title: string;
  organizer: string;
  location: string;
  city: string;
  date: string;
  time: string;
  playersNeeded: number;
  totalPlayers: number;
  skillLevel: string;
  gameType: string;
  fee: string;
  description: string;
  organizer_avatar: string;
  status: 'open' | 'full' | 'ongoing' | 'completed';
}

interface Player {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  position: string;
  location: string;
  city: string;
  availability: string;
  gamesPlayed: number;
  skillLevel: string;
}

interface MatchRequest {
  id: number;
  title: string;
  requester: string;
  type: 'match' | 'player';
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

// Bangladesh cities
const bangladeshCities = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh',
  'Comilla', 'Narayanganj', 'Gazipur', 'Tongi', 'Bogra', 'Jessore', 'Dinajpur', 'Cox\'s Bazar'
];

const skillLevels = ['Any', 'Beginner', 'Intermediate', 'Advanced', 'Professional'];
const gameTypes = ['Any', '5v5', '7v7', '11v11'];

export const MatchmakingComponent = ({ className, isOpen, onClose }: MatchmakingProps) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('find-matches');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('Any');
  const [selectedSkill, setSelectedSkill] = useState('Any');
  const [selectedGameType, setSelectedGameType] = useState('Any');
  const [showFilters, setShowFilters] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [myRequests, setMyRequests] = useState<MatchRequest[]>([]);

  // Initialize data
  useEffect(() => {
    const initialMatches: Match[] = [
      {
        id: 1,
        title: "Evening Football Match",
        organizer: "Ahmed Rahman",
        location: "Champions Arena, Dhanmondi",
        city: "Dhaka",
        date: "2024-06-15",
        time: "18:00 - 19:00",
        playersNeeded: 3,
        totalPlayers: 11,
        skillLevel: "Intermediate",
        gameType: "11v11",
        fee: "৳500",
        description: "Looking for 3 more players for a friendly match. All skill levels welcome!",
        organizer_avatar: "AR",
        status: "open"
      },
      {
        id: 2,
        title: "Quick 7v7 Game",
        organizer: "Sakib Hassan",
        location: "Victory Ground, Gulshan",
        city: "Dhaka",
        date: "2024-06-16",
        time: "20:00 - 21:00",
        playersNeeded: 2,
        totalPlayers: 7,
        skillLevel: "Beginner",
        gameType: "7v7",
        fee: "৳300",
        description: "Casual evening game, perfect for beginners and intermediate players.",
        organizer_avatar: "SH",
        status: "open"
      },
      {
        id: 3,
        title: "Weekend Tournament Prep",
        organizer: "Lightning FC",
        location: "Elite Sports Complex, Uttara",
        city: "Dhaka",
        date: "2024-06-17",
        time: "16:00 - 18:00",
        playersNeeded: 5,
        totalPlayers: 11,
        skillLevel: "Advanced",
        gameType: "11v11",
        fee: "৳800",
        description: "Training match before the weekend tournament. Competitive players only.",
        organizer_avatar: "LF",
        status: "open"
      },
      {
        id: 4,
        title: "Morning 5v5 Session",
        organizer: "Football Lovers",
        location: "Green Field, Wari",
        city: "Dhaka",
        date: "2024-06-18",
        time: "07:00 - 08:00",
        playersNeeded: 1,
        totalPlayers: 5,
        skillLevel: "Intermediate",
        gameType: "5v5",
        fee: "৳200",
        description: "Early morning session for working professionals.",
        organizer_avatar: "FL",
        status: "open"
      },
      {
        id: 5,
        title: "Chittagong Derby",
        organizer: "Port City FC",
        location: "MA Aziz Stadium, Chittagong",
        city: "Chittagong",
        date: "2024-06-19",
        time: "17:00 - 19:00",
        playersNeeded: 4,
        totalPlayers: 11,
        skillLevel: "Professional",
        gameType: "11v11",
        fee: "৳1000",
        description: "High-level competitive match in Chittagong.",
        organizer_avatar: "PC",
        status: "open"
      }
    ];

    const initialPlayers: Player[] = [
      {
        id: 1,
        name: "Rafiq Ahmed",
        avatar: "RA",
        rating: 4.5,
        position: "Midfielder",
        location: "Dhanmondi",
        city: "Dhaka",
        availability: "Available today",
        gamesPlayed: 45,
        skillLevel: "Intermediate"
      },
      {
        id: 2,
        name: "Karim Sheikh",
        avatar: "KS",
        rating: 4.2,
        position: "Forward",
        location: "Gulshan",
        city: "Dhaka",
        availability: "Available this week",
        gamesPlayed: 32,
        skillLevel: "Advanced"
      },
      {
        id: 3,
        name: "Nasir Khan",
        avatar: "NK",
        rating: 4.7,
        position: "Defender",
        location: "Uttara",
        city: "Dhaka",
        availability: "Available weekends",
        gamesPlayed: 67,
        skillLevel: "Professional"
      },
      {
        id: 4,
        name: "Habib Rahman",
        avatar: "HR",
        rating: 3.9,
        position: "Goalkeeper",
        location: "Mirpur",
        city: "Dhaka",
        availability: "Available evenings",
        gamesPlayed: 28,
        skillLevel: "Beginner"
      },
      {
        id: 5,
        name: "Faisal Ahmed",
        avatar: "FA",
        rating: 4.4,
        position: "Midfielder",
        location: "Agrabad",
        city: "Chittagong",
        availability: "Available weekends",
        gamesPlayed: 51,
        skillLevel: "Intermediate"
      }
    ];

    const initialRequests: MatchRequest[] = [
      {
        id: 1,
        title: "Join Thunder Bolts FC",
        requester: "Team Captain",
        type: "player",
        status: "pending",
        createdAt: "2024-06-01"
      },
      {
        id: 2,
        title: "Evening Match Request",
        requester: user?.name || "You",
        type: "match",
        status: "accepted",
        createdAt: "2024-05-30"
      }
    ];

    setMatches(initialMatches);
    setPlayers(initialPlayers);
    setMyRequests(initialRequests);
  }, [user]);

  // Filter matches
  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'Any' || match.city === selectedCity;
    const matchesSkill = selectedSkill === 'Any' || match.skillLevel === selectedSkill;
    const matchesGameType = selectedGameType === 'Any' || match.gameType === selectedGameType;
    
    return matchesSearch && matchesCity && matchesSkill && matchesGameType;
  });

  // Filter players
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'Any' || player.city === selectedCity;
    const matchesSkill = selectedSkill === 'Any' || player.skillLevel === selectedSkill;
    
    return matchesSearch && matchesCity && matchesSkill;
  });

  const handleJoinMatch = (matchId: number) => {
    setMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { ...match, playersNeeded: Math.max(0, match.playersNeeded - 1), status: match.playersNeeded === 1 ? 'full' : 'open' }
        : match
    ));
    
    toast({
      title: "Match Joined!",
      description: "You have successfully joined the match",
    });
  };

  const handleInvitePlayer = (playerId: number) => {
    const player = players.find(p => p.id === playerId);
    if (player) {
      toast({
        title: "Invitation Sent!",
        description: `Invitation sent to ${player.name}`,
      });
    }
  };

  const handleCreateMatch = () => {
    toast({
      title: "Create Match",
      description: "Match creation feature will be available soon",
    });
  };

  const getSkillBadgeColor = (skill: string) => {
    switch (skill.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'professional':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'full':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'ongoing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Component content
  const MatchmakingContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center">
            <Target className="w-7 h-7 mr-3 text-emerald-600" />
            Find Your Match
          </h3>
          <p className="text-gray-600 mt-1">Connect with players and join games in your area</p>
        </div>
        <Button 
          onClick={handleCreateMatch}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Trophy className="w-4 h-4 mr-2" />
          Create Match
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search matches, players, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="border-white/30 bg-white/20 hover:bg-white/40 rounded-2xl backdrop-blur-sm"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {(selectedCity !== 'Any' || selectedSkill !== 'Any' || selectedGameType !== 'Any') && (
              <Badge className="ml-2 bg-emerald-500 text-white w-2 h-2 p-0 rounded-full" />
            )}
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="rounded-xl border-white/30 bg-white/50">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Any City</SelectItem>
                  {bangladeshCities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger className="rounded-xl border-white/30 bg-white/50">
                  <SelectValue placeholder="Select skill level" />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Game Type</label>
              <Select value={selectedGameType} onValueChange={setSelectedGameType}>
                <SelectTrigger className="rounded-xl border-white/30 bg-white/50">
                  <SelectValue placeholder="Select game type" />
                </SelectTrigger>
                <SelectContent>
                  {gameTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-white/40 backdrop-blur-sm rounded-2xl p-1 shadow-lg border border-white/20">
          <TabsTrigger 
            value="find-matches" 
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 transition-all duration-300"
          >
            Find Matches ({filteredMatches.length})
          </TabsTrigger>
          <TabsTrigger 
            value="find-players" 
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 transition-all duration-300"
          >
            Find Players ({filteredPlayers.length})
          </TabsTrigger>
          <TabsTrigger 
            value="my-requests" 
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700 transition-all duration-300"
          >
            My Requests ({myRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="find-matches" className="space-y-4 mt-6">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match: Match) => (
              <Card key={match.id} className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-14 h-14 shadow-lg">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                          {match.organizer_avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-gray-800 font-bold text-lg">{match.title}</h4>
                        <p className="text-gray-600 text-sm">Organized by {match.organizer}</p>
                        <p className="text-gray-700 text-sm mt-1">{match.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getStatusBadgeColor(match.status)} rounded-2xl px-3 py-1`}>
                        {match.status}
                      </Badge>
                      <Badge className={`${getSkillBadgeColor(match.skillLevel)} rounded-2xl px-3 py-1`}>
                        {match.skillLevel}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200 rounded-2xl px-3 py-1">
                        {match.gameType}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-sm">{match.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-sm">{match.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="text-sm">{match.time}</span>
                    </div>
                    <div className="flex items-center text-emerald-600">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{match.fee}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">{match.playersNeeded} spots left</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {match.totalPlayers - match.playersNeeded}/{match.totalPlayers} players joined
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50"
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleJoinMatch(match.id)}
                        disabled={match.status !== 'open' || match.playersNeeded === 0}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl disabled:opacity-50"
                      >
                        {match.status === 'full' ? 'Full' : 'Join Match'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-16">
              <Target className="w-20 h-20 mx-auto mb-6 text-gray-400" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">No matches found</h3>
              <p className="text-gray-600 text-lg mb-6">Try adjusting your search criteria or create a new match</p>
              <Button 
                onClick={handleCreateMatch}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl"
              >
                Create Your First Match
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="find-players" className="space-y-4 mt-6">
          {filteredPlayers.length > 0 ? (
            <div className="grid gap-4">
              {filteredPlayers.map((player) => (
                <Card key={player.id} className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16 shadow-lg">
                          <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-lg">
                            {player.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-gray-800 font-bold text-lg">{player.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="font-medium">{player.position}</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                              <span className="font-semibold">{player.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{player.gamesPlayed} games</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm mt-2">
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-1 text-emerald-600" />
                              {player.location}, {player.city}
                            </div>
                            <Badge className={`${getSkillBadgeColor(player.skillLevel)} rounded-2xl px-3 py-1 text-xs`}>
                              {player.skillLevel}
                            </Badge>
                            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 rounded-2xl px-3 py-1 text-xs">
                              {player.availability}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50"
                        >
                          View Profile
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleInvitePlayer(player.id)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl"
                        >
                          Invite
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Users className="w-20 h-20 mx-auto mb-6 text-gray-400" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">No players found</h3>
              <p className="text-gray-600 text-lg mb-6">Try adjusting your search criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-requests" className="space-y-4 mt-6">
          {myRequests.length > 0 ? (
            <div className="space-y-4">
              {myRequests.map((request) => (
                <Card key={request.id} className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-gray-800 font-semibold text-lg">{request.title}</h4>
                        <p className="text-gray-600 text-sm">From: {request.requester}</p>
                        <p className="text-gray-500 text-xs mt-1">Created: {request.createdAt}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={`rounded-2xl px-4 py-2 ${
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                          request.status === 'accepted' ? 'bg-green-100 text-green-700 border-green-200' :
                          'bg-red-100 text-red-700 border-red-200'
                        }`}>
                          {request.status}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 rounded-2xl px-3 py-1">
                          {request.type}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center shadow-lg">
                <Users className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Pending Requests</h3>
              <p className="text-gray-600 text-lg mb-6">Your match and player requests will appear here</p>
              <Button 
                onClick={handleCreateMatch}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl"
              >
                Create Your First Request
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );

  // If used as a modal/overlay
  if (isOpen !== undefined) {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-7xl h-[90vh] bg-white/95 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl mx-4 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-white/30 bg-gradient-to-r from-white/50 to-white/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Find Your Match</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-2xl hover:bg-red-50/80 hover:text-red-600 transition-all duration-300">
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-6 h-[calc(100%-100px)] overflow-y-auto">
            <MatchmakingContent />
          </CardContent>
        </Card>
      </div>
    );
  }

  // If used as a regular component
  return (
    <div className={className}>
      <MatchmakingContent />
    </div>
  );
};
