
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Users, Target, Star, TrendingUp, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import { MatchResults } from '@/components/ui/match-results';

export const PlayerOverview = () => {
  const { user } = useAuth();
  const { getBookingsByUser } = useBooking();
  
  const userBookings = user ? getBookingsByUser(user.email) : [];
  const completedBookings = userBookings.filter(booking => booking.status === 'confirmed');

  // Mock match results data
  const matchResults = [
    {
      id: '1',
      date: '2024-12-10',
      time: '6:00 PM',
      turf: 'Champions Arena',
      location: 'Gulshan, Dhaka',
      teamA: "Ahmed's Team",
      teamB: 'Warriors FC',
      scoreA: 3,
      scoreB: 2,
      duration: '90 minutes',
      playerRating: 4,
      review: 'Great match! The turf was in excellent condition and the facilities were top-notch.',
      highlights: [
        'Goal scored in 25th minute',
        'Assist in 67th minute',
        'Clean sheet until 80th minute'
      ],
      mvp: 'Ahmed Rahman'
    },
    {
      id: '2',
      date: '2024-12-05',
      time: '4:00 PM',
      turf: 'Victory Ground',
      location: 'Dhanmondi, Dhaka',
      teamA: "Ahmed's Team",
      teamB: 'Lightning FC',
      scoreA: 1,
      scoreB: 1,
      duration: '60 minutes',
      highlights: [
        'Goal scored in 45th minute',
        'Saved penalty in 78th minute'
      ]
    }
  ];

  const stats = {
    matchesPlayed: matchResults.length,
    wins: matchResults.filter(match => {
      const userTeam = "Ahmed's Team";
      return (match.teamA === userTeam && match.scoreA > match.scoreB) ||
             (match.teamB === userTeam && match.scoreB > match.scoreA);
    }).length,
    goals: 5,
    assists: 3,
    rating: 4.2
  };

  const winRate = stats.matchesPlayed > 0 ? (stats.wins / stats.matchesPlayed) * 100 : 0;

  const handleAddReview = (matchId: string, rating: number, review: string) => {
    console.log('Adding review:', { matchId, rating, review });
    // Here you would typically update the match results data
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="backdrop-blur-sm bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border border-emerald-200/30 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Welcome back, {user?.name || 'Player'}! ⚽
            </CardTitle>
            <CardDescription className="text-gray-600">
              Ready to dominate the field? Here's your football journey overview.
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Matches Played</p>
                <p className="text-2xl font-bold text-gray-800">{stats.matchesPlayed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Win Rate</p>
                <p className="text-2xl font-bold text-gray-800">{winRate.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-2xl">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Goals</p>
                <p className="text-2xl font-bold text-gray-800">{stats.goals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-2xl">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-800">{stats.rating}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Goals per Match</span>
                  <span className="text-sm text-gray-800">{(stats.goals / Math.max(stats.matchesPlayed, 1)).toFixed(1)}</span>
                </div>
                <Progress value={(stats.goals / Math.max(stats.matchesPlayed, 1)) * 20} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Win Rate</span>
                  <span className="text-sm text-gray-800">{winRate.toFixed(0)}%</span>
                </div>
                <Progress value={winRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Player Rating</span>
                  <span className="text-sm text-gray-800">{stats.rating}/5.0</span>
                </div>
                <Progress value={(stats.rating / 5) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedBookings.length > 0 ? (
              <div className="space-y-4">
                {completedBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-100 p-2 rounded-xl">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{booking.turfName}</p>
                        <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No recent bookings</p>
                <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                  Book Your First Turf
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Match Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <MatchResults results={matchResults} onAddReview={handleAddReview} />
      </motion.div>
    </div>
  );
};
