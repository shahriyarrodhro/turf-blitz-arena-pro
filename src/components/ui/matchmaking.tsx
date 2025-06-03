
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, MapPin, Calendar, Clock, Star, Search, Filter, Target, Trophy, Eye } from 'lucide-react';
import { MatchmakingDetails } from './matchmaking-details';

interface MatchDetails {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  type: 'casual' | 'competitive' | 'tournament';
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  playersNeeded: number;
  currentPlayers: number;
  fee: number;
  description: string;
  organizer: {
    name: string;
    rating: number;
    avatar: string;
  };
  players: Array<{
    id: string;
    name: string;
    position: string;
    rating: number;
    avatar: string;
  }>;
}

interface MatchmakingComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MatchmakingComponent: React.FC<MatchmakingComponentProps> = ({
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedMatch, setSelectedMatch] = useState<MatchDetails | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const availableMatches: MatchDetails[] = [
    {
      id: '1',
      title: 'Friday Evening Football',
      date: '2024-06-14',
      time: '18:00',
      venue: 'Champions Arena',
      type: 'casual',
      skillLevel: 'intermediate',
      playersNeeded: 10,
      currentPlayers: 7,
      fee: 500,
      description: 'Casual Friday evening football match. Perfect for unwinding after a long week. All skill levels welcome, but we recommend intermediate level for the best experience.',
      organizer: {
        name: 'Ahmed Rahman',
        rating: 4,
        avatar: 'AR'
      },
      players: [
        { id: '1', name: 'Ahmed Rahman', position: 'Captain', rating: 4, avatar: 'AR' },
        { id: '2', name: 'Sakib Hassan', position: 'Midfielder', rating: 4, avatar: 'SH' },
        { id: '3', name: 'Rafiq Ahmed', position: 'Defender', rating: 3, avatar: 'RA' },
        { id: '4', name: 'Karim Islam', position: 'Goalkeeper', rating: 5, avatar: 'KI' },
        { id: '5', name: 'Nasir Khan', position: 'Forward', rating: 4, avatar: 'NK' },
        { id: '6', name: 'Fahim Rahman', position: 'Midfielder', rating: 3, avatar: 'FR' },
        { id: '7', name: 'Tareq Ahmed', position: 'Defender', rating: 4, avatar: 'TA' }
      ]
    },
    {
      id: '2',
      title: 'Weekend Warriors Tournament',
      date: '2024-06-15',
      time: '15:00',
      venue: 'Elite Sports Complex',
      type: 'tournament',
      skillLevel: 'advanced',
      playersNeeded: 16,
      currentPlayers: 12,
      fee: 1200,
      description: 'Competitive tournament for skilled players. Winner takes all format with exciting prizes. Only experienced players should apply.',
      organizer: {
        name: 'Dhaka FC Club',
        rating: 5,
        avatar: 'DF'
      },
      players: [
        { id: '8', name: 'Mahmud Hassan', position: 'Captain', rating: 5, avatar: 'MH' },
        { id: '9', name: 'Shakil Ahmed', position: 'Forward', rating: 5, avatar: 'SA' },
        { id: '10', name: 'Riaz Khan', position: 'Midfielder', rating: 4, avatar: 'RK' },
        { id: '11', name: 'Faisal Islam', position: 'Defender', rating: 5, avatar: 'FI' },
        { id: '12', name: 'Javed Rahman', position: 'Goalkeeper', rating: 5, avatar: 'JR' },
        { id: '13', name: 'Salam Ahmed', position: 'Forward', rating: 4, avatar: 'SA2' },
        { id: '14', name: 'Hanif Khan', position: 'Midfielder', rating: 5, avatar: 'HK' },
        { id: '15', name: 'Irfan Hassan', position: 'Defender', rating: 4, avatar: 'IH' },
        { id: '16', name: 'Arif Islam', position: 'Forward', rating: 5, avatar: 'AI' },
        { id: '17', name: 'Bashir Rahman', position: 'Midfielder', rating: 4, avatar: 'BR' },
        { id: '18', name: 'Yusuf Ahmed', position: 'Defender', rating: 5, avatar: 'YA' },
        { id: '19', name: 'Zahir Khan', position: 'Forward', rating: 4, avatar: 'ZK' }
      ]
    },
    {
      id: '3',
      title: 'Beginners Friendly Match',
      date: '2024-06-16',
      time: '10:00',
      venue: 'Community Ground',
      type: 'casual',
      skillLevel: 'beginner',
      playersNeeded: 12,
      currentPlayers: 5,
      fee: 300,
      description: 'Perfect for new players and those looking to improve their skills. Coaching tips included during the match.',
      organizer: {
        name: 'Football Academy',
        rating: 5,
        avatar: 'FA'
      },
      players: [
        { id: '20', name: 'Aminul Islam', position: 'Coach', rating: 5, avatar: 'AI2' },
        { id: '21', name: 'Nazrul Rahman', position: 'Forward', rating: 2, avatar: 'NR' },
        { id: '22', name: 'Delwar Hassan', position: 'Midfielder', rating: 2, avatar: 'DH' },
        { id: '23', name: 'Kamrul Ahmed', position: 'Defender', rating: 1, avatar: 'KA' },
        { id: '24', name: 'Rubel Khan', position: 'Goalkeeper', rating: 2, avatar: 'RK2' }
      ]
    },
    {
      id: '4',
      title: 'Corporate League Match',
      date: '2024-06-17',
      time: '17:30',
      venue: 'Business Park Field',
      type: 'competitive',
      skillLevel: 'intermediate',
      playersNeeded: 14,
      currentPlayers: 8,
      fee: 800,
      description: 'Inter-company football match. Open to all corporate employees. Great networking opportunity while playing football.',
      organizer: {
        name: 'Corporate Sports Club',
        rating: 4,
        avatar: 'CS'
      },
      players: [
        { id: '25', name: 'Masud Rahman', position: 'Manager', rating: 3, avatar: 'MR' },
        { id: '26', name: 'Towhid Ahmed', position: 'Forward', rating: 4, avatar: 'TA2' },
        { id: '27', name: 'Mizanur Khan', position: 'Midfielder', rating: 3, avatar: 'MK' },
        { id: '28', name: 'Shahin Islam', position: 'Defender', rating: 4, avatar: 'SI' },
        { id: '29', name: 'Rashed Hassan', position: 'Goalkeeper', rating: 3, avatar: 'RH' },
        { id: '30', name: 'Asif Rahman', position: 'Forward', rating: 4, avatar: 'AR2' },
        { id: '31', name: 'Jahangir Ahmed', position: 'Midfielder', rating: 3, avatar: 'JA' },
        { id: '32', name: 'Selim Khan', position: 'Defender', rating: 4, avatar: 'SK' }
      ]
    }
  ];

  const filteredMatches = availableMatches.filter(match => {
    const matchesSearch = match.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = skillFilter === 'all' || match.skillLevel === skillFilter;
    const matchesType = typeFilter === 'all' || match.type === typeFilter;
    
    return matchesSearch && matchesSkill && matchesType;
  });

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getMatchTypeColor = (type: string) => {
    switch (type) {
      case 'casual': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'competitive': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'tournament': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleViewDetails = (match: MatchDetails) => {
    setSelectedMatch(match);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedMatch(null);
  };

  return (
    <>
      <Dialog open={isOpen && !showDetails} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto backdrop-blur-2xl bg-white/95 border border-white/30 rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Find Your Perfect Match
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 p-6">
            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search matches or venues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm"
                />
              </div>
              
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Skill Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Match Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="competitive">Competitive</SelectItem>
                  <SelectItem value="tournament">Tournament</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Found {filteredMatches.length} {filteredMatches.length === 1 ? 'match' : 'matches'}
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSkillFilter('all');
                  setTypeFilter('all');
                }}
                variant="outline"
                size="sm"
                className="rounded-2xl"
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>

            {/* Matches Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredMatches.map((match) => (
                <Card key={match.id} className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{match.title}</h3>
                          <div className="flex items-center space-x-3">
                            <Badge className={`${getMatchTypeColor(match.type)} rounded-2xl px-3 py-1`}>
                              {match.type}
                            </Badge>
                            <Badge className={`${getSkillLevelColor(match.skillLevel)} rounded-2xl px-3 py-1`}>
                              {match.skillLevel}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-emerald-600">৳{match.fee}</div>
                          <div className="text-xs text-gray-600">per player</div>
                        </div>
                      </div>

                      {/* Match Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{match.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{match.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{match.venue}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{match.currentPlayers}/{match.playersNeeded} players</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Players joined</span>
                          <span className="font-medium text-gray-800">
                            {match.currentPlayers}/{match.playersNeeded}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(match.currentPlayers / match.playersNeeded) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Organizer */}
                      <div className="flex items-center space-x-3 pt-2 border-t border-gray-200">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {match.organizer.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{match.organizer.name}</p>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < match.organizer.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 pt-4">
                        <Button
                          onClick={() => handleViewDetails(match)}
                          variant="outline"
                          className="flex-1 rounded-2xl border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          onClick={() => handleViewDetails(match)}
                          disabled={match.currentPlayers >= match.playersNeeded}
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                        >
                          <Target className="w-4 h-4 mr-2" />
                          {match.currentPlayers >= match.playersNeeded ? 'Full' : 'Join Now'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredMatches.length === 0 && (
              <div className="text-center py-16">
                <Trophy className="w-20 h-20 mx-auto mb-6 text-gray-400" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Matches Found</h3>
                <p className="text-gray-600 mb-8">Try adjusting your search criteria or check back later for new matches.</p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSkillFilter('all');
                    setTypeFilter('all');
                  }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl px-8 py-3"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Match Details Dialog */}
      <MatchmakingDetails
        isOpen={showDetails}
        onClose={handleCloseDetails}
        match={selectedMatch}
      />
    </>
  );
};
