
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Users, MapPin, Calendar, Clock, Star, Crown, Shield, Trophy, Target, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

interface MatchmakingDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  match: MatchDetails | null;
}

export const MatchmakingDetails: React.FC<MatchmakingDetailsProps> = ({
  isOpen,
  onClose,
  match
}) => {
  const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  if (!match) return null;

  const handleJoinMatch = async () => {
    setIsJoining(true);
    
    // Simulate joining process
    setTimeout(() => {
      toast({
        title: "Match Joined!",
        description: `You've successfully joined ${match.title}`,
      });
      setIsJoining(false);
      setShowJoinConfirmation(false);
      onClose();
    }, 1500);
  };

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

  const getRoleIcon = (position: string) => {
    switch (position.toLowerCase()) {
      case 'captain': return <Crown className="w-4 h-4 text-yellow-600" />;
      case 'goalkeeper': return <Shield className="w-4 h-4 text-blue-600" />;
      default: return <Star className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <>
      {/* Main Details Dialog */}
      <Dialog open={isOpen && !showJoinConfirmation} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-2xl bg-white/95 border border-white/30 rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Match Details
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8 p-6">
            {/* Header Info */}
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">{match.title}</h2>
                <div className="flex items-center space-x-4">
                  <Badge className={`${getMatchTypeColor(match.type)} rounded-2xl px-4 py-2`}>
                    {match.type}
                  </Badge>
                  <Badge className={`${getSkillLevelColor(match.skillLevel)} rounded-2xl px-4 py-2`}>
                    {match.skillLevel}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-600">৳{match.fee}</div>
                <div className="text-sm text-gray-600">per player</div>
              </div>
            </div>

            {/* Match Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                  <div className="font-semibold text-gray-800">{match.date}</div>
                  <div className="text-sm text-gray-600">Date</div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                  <div className="font-semibold text-gray-800">{match.time}</div>
                  <div className="text-sm text-gray-600">Time</div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-3 text-emerald-600" />
                  <div className="font-semibold text-gray-800">{match.venue}</div>
                  <div className="text-sm text-gray-600">Venue</div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 mx-auto mb-3 text-orange-600" />
                  <div className="font-semibold text-gray-800">{match.currentPlayers}/{match.playersNeeded}</div>
                  <div className="text-sm text-gray-600">Players</div>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">About This Match</h3>
                <p className="text-gray-600 leading-relaxed">{match.description}</p>
              </CardContent>
            </Card>

            {/* Organizer */}
            <Card className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Organizer</h3>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16 shadow-lg">
                    <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-semibold">
                      {match.organizer.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">{match.organizer.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < match.organizer.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({match.organizer.rating}/5)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Players */}
            <Card className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Players ({match.currentPlayers})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {match.players.map((player) => (
                    <div key={player.id} className="flex items-center space-x-3 p-4 bg-white/70 rounded-2xl border border-white/20">
                      <Avatar className="w-12 h-12 shadow-md">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                          {player.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-800">{player.name}</h4>
                          {getRoleIcon(player.position)}
                        </div>
                        <p className="text-sm text-gray-600">{player.position}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-500">{player.rating}/5</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={() => setShowJoinConfirmation(true)}
                disabled={match.currentPlayers >= match.playersNeeded}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >
                <Target className="w-5 h-5 mr-2" />
                {match.currentPlayers >= match.playersNeeded ? 'Match Full' : 'Join Match'}
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="px-8 py-4 rounded-2xl border-gray-200 text-lg"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Join Confirmation Dialog */}
      <Dialog open={showJoinConfirmation} onOpenChange={() => !isJoining && setShowJoinConfirmation(false)}>
        <DialogContent className="max-w-md backdrop-blur-2xl bg-white/95 border border-white/30 rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Confirm Join Match
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 p-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{match.title}</h3>
              <p className="text-gray-600">Are you sure you want to join this match?</p>
            </div>

            <Card className="backdrop-blur-xl bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border border-emerald-200/50 rounded-2xl">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="font-medium text-gray-800">{match.date} at {match.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Venue:</span>
                    <span className="font-medium text-gray-800">{match.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fee:</span>
                    <span className="font-medium text-emerald-600">৳{match.fee}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button
                onClick={handleJoinMatch}
                disabled={isJoining}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl py-3 font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >
                {isJoining ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Joining...
                  </div>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Confirm Join
                  </>
                )}
              </Button>
              <Button
                onClick={() => setShowJoinConfirmation(false)}
                disabled={isJoining}
                variant="outline"
                className="px-6 py-3 rounded-2xl border-gray-200"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
