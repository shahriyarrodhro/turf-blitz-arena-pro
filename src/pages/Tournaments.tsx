
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, MapPin, Clock, DollarSign, ArrowLeft, Play, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

const Tournaments = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  const tournaments = {
    upcoming: [
      {
        id: 1,
        name: "Dhaka Champions League 2024",
        type: "League",
        format: "7v7",
        location: "Champions Arena, Dhanmondi",
        startDate: "2024-06-15",
        endDate: "2024-07-20",
        entryFee: 5000,
        prizePool: 100000,
        maxTeams: 16,
        registeredTeams: 12,
        status: "Registration Open",
        image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
        organizer: "TurfMaster",
        description: "The biggest 7v7 league tournament in Dhaka with exciting prizes and professional organization."
      },
      {
        id: 2,
        name: "Weekend Warriors Cup",
        type: "Knockout",
        format: "5v5",
        location: "Victory Ground, Gulshan", 
        startDate: "2024-06-01",
        endDate: "2024-06-02",
        entryFee: 2500,
        prizePool: 25000,
        maxTeams: 8,
        registeredTeams: 6,
        status: "Registration Open",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        organizer: "Victory Sports Club",
        description: "Fast-paced weekend knockout tournament for recreational players."
      },
      {
        id: 3,
        name: "Corporate Football Challenge",
        type: "Round Robin",
        format: "11v11",
        location: "Elite Football Hub, Banani",
        startDate: "2024-06-10",
        endDate: "2024-06-11",
        entryFee: 8000,
        prizePool: 150000,
        maxTeams: 12,
        registeredTeams: 8,
        status: "Registration Open",
        image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
        organizer: "Corporate Sports BD",
        description: "Exclusive tournament for corporate teams with networking opportunities."
      }
    ],
    ongoing: [
      {
        id: 4,
        name: "Summer Fever Tournament",
        type: "League",
        format: "7v7",
        location: "Urban Sports Complex, Uttara",
        startDate: "2024-05-20",
        endDate: "2024-06-05",
        entryFee: 4000,
        prizePool: 80000,
        maxTeams: 12,
        registeredTeams: 12,
        status: "Ongoing - Week 3",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
        organizer: "Urban FC",
        description: "Currently in week 3 of exciting league matches with live updates."
      }
    ],
    completed: [
      {
        id: 5,
        name: "Spring Championship 2024",
        type: "Knockout",
        format: "5v5",
        location: "Premier League Ground, Mirpur",
        startDate: "2024-04-15",
        endDate: "2024-04-20",
        entryFee: 3000,
        prizePool: 50000,
        maxTeams: 16,
        registeredTeams: 16,
        status: "Completed",
        winner: "Thunder Bolts FC",
        image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
        organizer: "Spring Sports",
        description: "Successfully completed with 16 teams and exciting final match."
      }
    ]
  };

  const getStatusColor = (status: string) => {
    if (status.includes('Open')) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (status.includes('Ongoing')) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (status === 'Completed') return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  const TournamentCard = ({ tournament, showWinner = false }: { tournament: any, showWinner?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={() => navigate(`/tournament/${tournament.id}`)}
    >
      <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50 hover:border-lime-500/50 transition-all duration-300 overflow-hidden h-full">
        <div className="relative">
          <img
            src={tournament.image}
            alt={tournament.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 space-y-2">
            <Badge className={getStatusColor(tournament.status)}>
              {tournament.status}
            </Badge>
            <Badge className="bg-slate-900/80 text-white">
              {tournament.format}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              <Trophy className="w-3 h-3 mr-1" />
              ৳{tournament.prizePool.toLocaleString()}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-white group-hover:text-lime-400 transition-colors text-lg">
                {tournament.name}
              </CardTitle>
              <CardDescription className="flex items-center text-slate-400 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {tournament.location}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-slate-700/50 text-slate-300">
              {tournament.type}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-slate-400 text-sm line-clamp-2">
            {tournament.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-slate-400">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-slate-400">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>৳{tournament.entryFee}</span>
            </div>
            <div className="flex items-center text-slate-400">
              <Users className="w-4 h-4 mr-2" />
              <span>{tournament.registeredTeams}/{tournament.maxTeams} teams</span>
            </div>
            <div className="flex items-center text-slate-400">
              <Clock className="w-4 h-4 mr-2" />
              <span>{tournament.organizer}</span>
            </div>
          </div>

          {showWinner && tournament.winner && (
            <div className="flex items-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <Award className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-yellow-400 font-medium">Winner: {tournament.winner}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-500">
              Organized by {tournament.organizer}
            </div>
            
            <Button
              size="sm"
              className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/auth');
              }}
            >
              {tournament.status.includes('Open') ? 'Register' : 'View Details'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-lime-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-slate-400 hover:text-lime-400"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
                Tournaments
              </h1>
            </div>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Join Tournament
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Compete in Epic Tournaments
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Join exciting football tournaments, compete against skilled teams, and win amazing prizes
          </p>
        </motion.div>

        {/* Tournament Tabs */}
        <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 bg-slate-700/50 mb-8">
                <TabsTrigger 
                  value="upcoming" 
                  className="data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-400"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Upcoming ({tournaments.upcoming.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="ongoing" 
                  className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Ongoing ({tournaments.ongoing.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="completed" 
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Completed ({tournaments.completed.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tournaments.upcoming.map((tournament) => (
                    <TournamentCard key={tournament.id} tournament={tournament} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ongoing" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tournaments.ongoing.map((tournament) => (
                    <TournamentCard key={tournament.id} tournament={tournament} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tournaments.completed.map((tournament) => (
                    <TournamentCard key={tournament.id} tournament={tournament} showWinner />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-12">
              <Trophy className="w-16 h-16 text-lime-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Want to Organize a Tournament?
              </h3>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Create and manage your own tournaments with our comprehensive tournament management system
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600 px-8"
              >
                Create Tournament
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Tournaments;
