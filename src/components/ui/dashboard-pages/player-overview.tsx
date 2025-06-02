
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, Users, MapPin, Clock, Star, Target, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import { useNavigate } from 'react-router-dom';

export const PlayerOverview = () => {
  const { user } = useAuth();
  const { getBookingsByUser } = useBooking();
  const navigate = useNavigate();
  const userBookings = user ? getBookingsByUser(user.email) : [];

  const upcomingMatches = [
    {
      id: 1,
      opponent: "Lightning Strikers",
      time: "Today, 6:00 PM",
      venue: "Elite Sports Arena",
      type: "Friendly Match"
    },
    {
      id: 2,
      opponent: "Thunder Bolts FC",
      time: "Tomorrow, 4:00 PM", 
      venue: "Champions Ground",
      type: "League Match"
    }
  ];

  const achievements = [
    { title: "Hat-trick Hero", icon: Trophy, color: "text-yellow-600" },
    { title: "Team Player", icon: Users, color: "text-blue-600" },
    { title: "Regular Scorer", icon: Target, color: "text-emerald-600" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative">
        <Card className="backdrop-blur-xl bg-gradient-to-br from-emerald-50/60 via-white/40 to-teal-50/60 border border-white/30 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-teal-400/10 rounded-3xl"></div>
          <CardContent className="p-8 relative">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  Welcome back, {user?.name}! ⚽
                </h2>
                <p className="text-gray-600 text-lg">Ready for your next match?</p>
              </div>
              <Button
                onClick={() => navigate('/turfs')}
                className="bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-white rounded-2xl px-8 py-3 shadow-xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Book Turf
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-gray-800 flex items-center text-xl">
              <Calendar className="w-6 h-6 mr-3 text-emerald-600" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userBookings.length > 0 ? (
              userBookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="p-4 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">{booking.turfName}</h4>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {booking.date} at {booking.time}
                      </div>
                    </div>
                    <Badge className={`${
                      booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    } rounded-2xl px-3 py-1`}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">No bookings yet</p>
                <Button 
                  onClick={() => navigate('/turfs')}
                  variant="outline"
                  className="rounded-2xl border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                >
                  Book Your First Turf
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Matches */}
        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-gray-800 flex items-center text-xl">
              <Trophy className="w-6 h-6 mr-3 text-emerald-600" />
              Upcoming Matches
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="p-4 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">vs {match.opponent}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {match.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {match.venue}
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 rounded-2xl px-3 py-1">
                    {match.type}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-gray-800 flex items-center text-xl">
            <Star className="w-6 h-6 mr-3 text-emerald-600" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-4 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm text-center">
                <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${achievement.color}`} />
                <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
