
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Target, Clock, Calendar, MapPin, Star, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface MatchResult {
  id: string;
  date: string;
  time: string;
  turf: string;
  location: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  duration: string;
  playerRating?: number;
  review?: string;
  highlights: string[];
  mvp?: string;
}

interface MatchResultsProps {
  results: MatchResult[];
  onAddReview?: (matchId: string, rating: number, review: string) => void;
}

export const MatchResults = ({ results, onAddReview }: MatchResultsProps) => {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmitReview = (matchId: string) => {
    if (onAddReview && rating > 0) {
      onAddReview(matchId, rating, review);
      setSelectedMatch(null);
      setRating(0);
      setReview('');
    }
  };

  const getResultBadge = (teamA: string, teamB: string, scoreA: number, scoreB: number, userTeam: string) => {
    const isUserTeamA = teamA === userTeam;
    const userScore = isUserTeamA ? scoreA : scoreB;
    const opponentScore = isUserTeamA ? scoreB : scoreA;
    
    if (userScore > opponentScore) {
      return <Badge className="bg-green-100 text-green-700 border-green-200">Won</Badge>;
    } else if (userScore < opponentScore) {
      return <Badge className="bg-red-100 text-red-700 border-red-200">Lost</Badge>;
    } else {
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Draw</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Match Results</h3>
        <Badge variant="outline" className="text-emerald-600 border-emerald-200">
          {results.length} matches played
        </Badge>
      </div>

      <div className="grid gap-6">
        {results.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-3 rounded-2xl">
                      <Trophy className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-800">
                        {match.teamA} vs {match.teamB}
                      </CardTitle>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="text-sm">{match.date}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{match.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{match.turf}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {getResultBadge(match.teamA, match.teamB, match.scoreA, match.scoreB, match.teamA)}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Score Display */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
                  <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-800">{match.scoreA}</div>
                      <div className="text-sm font-medium text-gray-600">{match.teamA}</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-400">-</div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-800">{match.scoreB}</div>
                      <div className="text-sm font-medium text-gray-600">{match.teamB}</div>
                    </div>
                  </div>
                </div>

                {/* Match Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-2xl p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-800">Duration</span>
                    </div>
                    <div className="text-lg font-bold text-blue-900">{match.duration}</div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-2xl p-4">
                    <div className="flex items-center mb-2">
                      <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                      <span className="text-sm font-medium text-purple-800">Location</span>
                    </div>
                    <div className="text-lg font-bold text-purple-900">{match.location}</div>
                  </div>

                  {match.mvp && (
                    <div className="bg-yellow-50 rounded-2xl p-4">
                      <div className="flex items-center mb-2">
                        <Target className="w-4 h-4 text-yellow-600 mr-2" />
                        <span className="text-sm font-medium text-yellow-800">MVP</span>
                      </div>
                      <div className="text-lg font-bold text-yellow-900">{match.mvp}</div>
                    </div>
                  )}
                </div>

                {/* Match Highlights */}
                {match.highlights.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Match Highlights</h4>
                    <div className="space-y-2">
                      {match.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rating and Review */}
                <div className="border-t border-gray-200 pt-4">
                  {match.playerRating ? (
                    <div className="bg-emerald-50 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-emerald-800">Your Rating</span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= match.playerRating! ? 'text-yellow-500 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {match.review && (
                        <p className="text-sm text-emerald-700 italic">"{match.review}"</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      {selectedMatch === match.id ? (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                              Rate this match experience
                            </Label>
                            <div className="flex items-center space-x-1 mb-4">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => setRating(star)}
                                  className="focus:outline-none"
                                >
                                  <Star
                                    className={`w-6 h-6 ${
                                      star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                    } hover:text-yellow-400 transition-colors`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="review" className="text-sm font-medium text-gray-700 mb-2 block">
                              Share your experience (optional)
                            </Label>
                            <Textarea
                              id="review"
                              placeholder="How was the match? Any feedback about the turf or facilities?"
                              value={review}
                              onChange={(e) => setReview(e.target.value)}
                              className="rounded-xl border-gray-200 focus:border-emerald-500"
                            />
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleSubmitReview(match.id)}
                              disabled={rating === 0}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                            >
                              Submit Review
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedMatch(null);
                                setRating(0);
                                setReview('');
                              }}
                              className="rounded-xl border-gray-200"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          onClick={() => setSelectedMatch(match.id)}
                          variant="outline"
                          className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-xl"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Rate & Review Match
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {results.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No matches played yet</h3>
            <p className="text-gray-600">Your completed matches will appear here with results and ratings.</p>
          </div>
        )}
      </div>
    </div>
  );
};
