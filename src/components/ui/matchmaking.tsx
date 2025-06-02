
import React, { useState } from 'react';
import { Search, MapPin, Clock, Users, Star, Trophy, Target, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MatchmakingProps {
  className?: string;
}

interface Match {
  id: number;
  title: string;
  organizer: string;
  location: string;
  date: string;
  time: string;
  playersNeeded: number;
  totalPlayers: number;
  skillLevel: string;
  gameType: string;
  fee: string;
  description: string;
  organizer_avatar: string;
}

interface Player {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  position: string;
  location: string;
  availability: string;
  gamesPlayed: number;
}

export const MatchmakingComponent = ({ className }: MatchmakingProps) => {
  const [activeTab, setActiveTab] = useState('find-matches');
  const [searchTerm, setSearchTerm] = useState('');

  const availableMatches: Match[] = [
    {
      id: 1,
      title: "Evening Football Match",
      organizer: "Ahmed Rahman",
      location: "Champions Arena, Dhanmondi",
      date: "2024-06-15",
      time: "18:00 - 19:00",
      playersNeeded: 3,
      totalPlayers: 11,
      skillLevel: "Intermediate",
      gameType: "11v11",
      fee: "৳500",
      description: "Looking for 3 more players for a friendly match. All skill levels welcome!",
      organizer_avatar: "AR"
    },
    {
      id: 2,
      title: "Quick 7v7 Game",
      organizer: "Sakib Hassan",
      location: "Victory Ground, Gulshan",
      date: "2024-06-16",
      time: "20:00 - 21:00",
      playersNeeded: 2,
      totalPlayers: 7,
      skillLevel: "Beginner",
      gameType: "7v7",
      fee: "৳300",
      description: "Casual evening game, perfect for beginners and intermediate players.",
      organizer_avatar: "SH"
    },
    {
      id: 3,
      title: "Weekend Tournament Prep",
      organizer: "Lightning FC",
      location: "Elite Sports Complex, Uttara",
      date: "2024-06-17",
      time: "16:00 - 18:00",
      playersNeeded: 5,
      totalPlayers: 11,
      skillLevel: "Advanced",
      gameType: "11v11",
      fee: "৳800",
      description: "Training match before the weekend tournament. Competitive players only.",
      organizer_avatar: "LF"
    }
  ];

  const availablePlayers: Player[] = [
    {
      id: 1,
      name: "Rafiq Ahmed",
      avatar: "RA",
      rating: 4.5,
      position: "Midfielder",
      location: "Dhanmondi",
      availability: "Available today",
      gamesPlayed: 45
    },
    {
      id: 2,
      name: "Karim Sheikh",
      avatar: "KS",
      rating: 4.2,
      position: "Forward",
      location: "Gulshan",
      availability: "Available this week",
      gamesPlayed: 32
    },
    {
      id: 3,
      name: "Nasir Khan",
      avatar: "NK",
      rating: 4.7,
      position: "Defender",
      location: "Uttara",
      availability: "Available weekends",
      gamesPlayed: 67
    }
  ];

  const getSkillBadgeColor = (skill: string) => {
    switch (skill.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className={className}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <Target className="w-6 h-6 mr-2 text-emerald-600" />
              Find Your Match
            </h3>
            <p className="text-gray-600 mt-1">Connect with players and join games in your area</p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 rounded-xl">
            <Trophy className="w-4 h-4 mr-2" />
            Create Match
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search matches or players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-gray-200"
            />
          </div>
          <Button variant="outline" className="border-gray-200 rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-gray-100/50 rounded-xl p-1">
            <TabsTrigger 
              value="find-matches" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Find Matches
            </TabsTrigger>
            <TabsTrigger 
              value="find-players" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Find Players
            </TabsTrigger>
            <TabsTrigger 
              value="my-requests" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              My Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="find-matches" className="space-y-4 mt-6">
            {availableMatches.map((match) => (
              <Card key={match.id} className="backdrop-blur-sm bg-white/40 border-gray-200/30 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          {match.organizer_avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-gray-800 font-semibold text-lg">{match.title}</h4>
                        <p className="text-gray-600 text-sm">Organized by {match.organizer}</p>
                        <p className="text-gray-700 text-sm mt-1">{match.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSkillBadgeColor(match.skillLevel)}>
                        {match.skillLevel}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        {match.gameType}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{match.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{match.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{match.playersNeeded} spots left</span>
                    </div>
                    <div className="flex items-center text-emerald-600">
                      <span className="font-semibold">{match.fee}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {match.totalPlayers - match.playersNeeded}/{match.totalPlayers} players joined
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 rounded-lg">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
                        Join Match
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="find-players" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {availablePlayers.map((player) => (
                <Card key={player.id} className="backdrop-blur-sm bg-white/40 border-gray-200/30 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-14 h-14">
                          <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                            {player.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-gray-800 font-semibold text-lg">{player.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{player.position}</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                              <span>{player.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{player.gamesPlayed} games</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm mt-1">
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-1" />
                              {player.location}
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                              {player.availability}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 rounded-lg">
                          View Profile
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                          Invite
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-requests" className="space-y-4 mt-6">
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                <Users className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Requests</h3>
              <p className="text-gray-600 mb-6">Your match and player requests will appear here</p>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 rounded-xl">
                Create Your First Request
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
