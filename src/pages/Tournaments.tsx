
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, MapPin, Star, Clock, ArrowLeft, Play, Filter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

const Tournaments = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  const tournaments = [
    {
      id: 1,
      name: "Dhaka Champions League",
      type: "7v7",
      format: "Knockout",
      prize: "৳50,000",
      entryFee: "৳5,000",
      date: "Dec 15, 2024",
      time: "9:00 AM",
      location: "Champions Arena, Dhanmondi",
      participants: 16,
      maxParticipants: 32,
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      status: "upcoming",
      organizer: "TurfMaster",
      description: "Premier 7v7 tournament featuring the best teams in Dhaka"
    },
    {
      id: 2,
      name: "Weekend Warriors Cup",
      type: "5v5",
      format: "League",
      prize: "৳25,000",
      entryFee: "৳3,000",
      date: "Dec 22, 2024",
      time: "10:00 AM",
      location: "Victory Ground, Gulshan",
      participants: 12,
      maxParticipants: 16,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      status: "upcoming",
      organizer: "Victory Sports",
      description: "Fast-paced 5v5 league for weekend football enthusiasts"
    },
    {
      id: 3,
      name: "Corporate Football Championship",
      type: "11v11",
      format: "Round Robin + Playoffs",
      prize: "৳100,000",
      entryFee: "৳15,000",
      date: "Jan 5, 2025",
      time: "8:00 AM",
      location: "Elite Football Hub, Banani",
      participants: 8,
      maxParticipants: 12,
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
      status: "upcoming",
      organizer: "Corporate Sports League",
      description: "Professional tournament for corporate teams across Bangladesh"
    },
    {
      id: 4,
      name: "Gulshan Winter Cup",
      type: "7v7",
      format: "Knockout",
      prize: "৳30,000",
      entryFee: "৳4,000",
      date: "Nov 28, 2024",
      time: "3:00 PM",
      location: "Urban Sports Complex, Uttara",
      participants: 32,
      maxParticipants: 32,
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      status: "ongoing",
      organizer: "Gulshan FC",
      description: "Winter tournament with teams from northern Dhaka"
    },
    {
      id: 5,
      name: "Young Guns Tournament",
      type: "5v5",
      format: "League",
      prize: "৳20,000",
      entryFee: "৳2,500",
      date: "Nov 15, 2024",
      time: "4:00 PM",
      location: "Premier League Ground, Mirpur",
      participants: 16,
      maxParticipants: 16,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      status: "completed",
      organizer: "Youth Sports Foundation",
      description: "Under-21 tournament to discover young talent"
    }
  ];

  const filteredTournaments = tournaments.filter(tournament => tournament.status === activeTab);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-stone-600 hover:text-stone-900 p-2 rounded-2xl"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-stone-900">
                Tournaments
              </h1>
            </div>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-lime-400 hover:bg-lime-500 text-stone-900 font-semibold rounded-2xl px-6"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Join Tournament
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-stone-900">
            Football Tournaments
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            Compete with the best teams, win amazing prizes, and showcase your skills
          </p>
        </motion.div>

        {/* Tournament Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <div className="flex justify-center">
              <TabsList className="bg-white border border-stone-200 rounded-2xl p-2">
                <TabsTrigger 
                  value="upcoming" 
                  className="rounded-xl px-6 py-3 data-[state=active]:bg-lime-400 data-[state=active]:text-stone-900 font-semibold"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger 
                  value="ongoing" 
                  className="rounded-xl px-6 py-3 data-[state=active]:bg-lime-400 data-[state=active]:text-stone-900 font-semibold"
                >
                  Ongoing
                </TabsTrigger>
                <TabsTrigger 
                  value="completed" 
                  className="rounded-xl px-6 py-3 data-[state=active]:bg-lime-400 data-[state=active]:text-stone-900 font-semibold"
                >
                  Completed
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredTournaments.map((tournament, index) => (
                  <motion.div
                    key={tournament.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer"
                    onClick={() => navigate('/auth')}
                  >
                    <Card className="bg-white border border-stone-200 hover:shadow-2xl transition-all duration-300 overflow-hidden h-full rounded-3xl">
                      <div className="relative">
                        <img
                          src={tournament.image}
                          alt={tournament.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Status Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge className={`
                            ${tournament.status === 'upcoming' ? 'bg-blue-100 text-blue-700 border-blue-200' : ''}
                            ${tournament.status === 'ongoing' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                            ${tournament.status === 'completed' ? 'bg-stone-100 text-stone-700 border-stone-200' : ''}
                            rounded-full px-3 py-1 font-medium capitalize
                          `}>
                            {tournament.status}
                          </Badge>
                        </div>

                        {/* Prize Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/95 text-stone-900 rounded-full px-3 py-1 font-bold shadow-sm">
                            🏆 {tournament.prize}
                          </Badge>
                        </div>

                        {/* Tournament Type */}
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-lime-100 text-lime-700 border-lime-200 rounded-full px-3 py-1 font-medium">
                            {tournament.type} • {tournament.format}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="pb-3">
                        <CardTitle className="text-stone-900 group-hover:text-lime-600 transition-colors text-xl">
                          {tournament.name}
                        </CardTitle>
                        <CardDescription className="text-stone-600">
                          {tournament.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Tournament Details */}
                        <div className="space-y-3">
                          <div className="flex items-center text-stone-600 text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{tournament.date} at {tournament.time}</span>
                          </div>
                          
                          <div className="flex items-center text-stone-600 text-sm">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{tournament.location}</span>
                          </div>

                          <div className="flex items-center text-stone-600 text-sm">
                            <Users className="w-4 h-4 mr-2" />
                            <span>{tournament.participants}/{tournament.maxParticipants} teams</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-stone-200 rounded-full h-2">
                          <div 
                            className="bg-lime-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                          ></div>
                        </div>

                        {/* Entry Fee and Action */}
                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <span className="text-stone-600 text-sm">Entry Fee:</span>
                            <div className="text-stone-900 font-bold">{tournament.entryFee}</div>
                          </div>
                          
                          <Button
                            size="sm"
                            disabled={tournament.status === 'completed' || tournament.participants >= tournament.maxParticipants}
                            className="bg-lime-400 hover:bg-lime-500 text-stone-900 disabled:opacity-50 rounded-xl font-semibold"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate('/auth');
                            }}
                          >
                            {tournament.status === 'completed' ? 'View Results' : 
                             tournament.participants >= tournament.maxParticipants ? 'Full' : 'Join Now'}
                          </Button>
                        </div>

                        {/* Organizer */}
                        <div className="pt-3 border-t border-stone-200">
                          <div className="flex items-center justify-between">
                            <span className="text-stone-600 text-sm">Organized by</span>
                            <span className="text-stone-900 font-medium text-sm">{tournament.organizer}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Empty State */}
        {filteredTournaments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-stone-100 rounded-full flex items-center justify-center">
              <Trophy className="w-12 h-12 text-stone-400" />
            </div>
            <h3 className="text-2xl font-semibold text-stone-900 mb-3">No tournaments found</h3>
            <p className="text-stone-600 mb-8 max-w-md mx-auto">
              {activeTab === 'upcoming' && "No upcoming tournaments at the moment. Check back soon!"}
              {activeTab === 'ongoing' && "No tournaments currently in progress."}
              {activeTab === 'completed' && "No completed tournaments to show."}
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-lime-400 hover:bg-lime-500 text-stone-900 rounded-2xl font-semibold"
            >
              Back to Home
            </Button>
          </motion.div>
        )}

        {/* Load More */}
        {filteredTournaments.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-stone-300 text-stone-700 hover:bg-stone-100 rounded-2xl px-8 py-3 font-semibold"
            >
              Load More Tournaments
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tournaments;
