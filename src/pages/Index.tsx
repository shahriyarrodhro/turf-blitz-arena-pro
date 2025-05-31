
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, Users, Star, Play, ArrowRight, Shield, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: "Find Perfect Turfs",
      description: "Discover premium football turfs near you with real-time availability",
      color: "from-lime-400 to-emerald-500"
    },
    {
      icon: Trophy,
      title: "Join Tournaments",
      description: "Compete in exciting tournaments and climb the leaderboards",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Users,
      title: "Find Opponents",
      description: "Smart matchmaking system to find teams and players",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Calendar,
      title: "Instant Booking",
      description: "Book turf slots instantly with our real-time booking system",
      color: "from-blue-400 to-cyan-500"
    }
  ];

  const testimonials = [
    {
      name: "Ahmed Rahman",
      role: "Team Captain",
      content: "Best platform for booking turfs in Dhaka. Super easy and reliable!",
      rating: 5,
      avatar: "🏃‍♂️"
    },
    {
      name: "Turf Paradise",
      role: "Turf Owner",
      content: "Increased our bookings by 300% since joining TurfMaster!",
      rating: 5,
      avatar: "🏟️"
    },
    {
      name: "Samira Khan",
      role: "Tournament Organizer",
      content: "Managing tournaments has never been this smooth and professional.",
      rating: 5,
      avatar: "🏆"
    }
  ];

  const stats = [
    { label: "Active Turfs", value: "150+", icon: MapPin },
    { label: "Tournaments", value: "50+", icon: Trophy },
    { label: "Happy Players", value: "10K+", icon: Users },
    { label: "Cities", value: "8", icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-lime-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
                TurfMaster
              </span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-lime-400 transition-colors">Features</a>
              <a href="#turfs" className="text-slate-300 hover:text-lime-400 transition-colors">Browse Turfs</a>
              <a href="#tournaments" className="text-slate-300 hover:text-lime-400 transition-colors">Tournaments</a>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/auth')}
                className="text-slate-300 hover:text-lime-400 hover:bg-lime-500/10"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600 font-semibold"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-lime-500/20 text-lime-400 border-lime-500/30">
              🚀 The Future of Sports Booking
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-lime-200 to-emerald-300 bg-clip-text text-transparent leading-tight">
              Book Turfs.<br />
              Join Tournaments.<br />
              <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
                Play Football.
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              The ultimate platform for football enthusiasts in Bangladesh. Book premium turfs, 
              join exciting tournaments, and connect with players nationwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg"
                onClick={() => navigate('/turfs')}
                className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600 font-semibold px-8 py-6 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Book a Turf Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/tournaments')}
                className="border-lime-500/50 text-lime-400 hover:bg-lime-500/10 px-8 py-6 text-lg"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Join Tournament
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="backdrop-blur-sm bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
                >
                  <stat.icon className="w-8 h-8 text-lime-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Why Choose TurfMaster?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Experience the most advanced sports booking platform designed for modern football culture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50 hover:border-lime-500/50 transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-full h-full text-slate-900" />
                    </div>
                    <CardTitle className="text-white group-hover:text-lime-400 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-400 text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Loved by the Community
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Join thousands of satisfied players, turf owners, and tournament organizers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50 hover:border-lime-500/30 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-300 mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full flex items-center justify-center text-2xl mr-3">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-slate-400 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-slate-800/50 rounded-3xl p-12 border border-slate-700/50"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Ready to Play?
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Join the TurfMaster community and experience the future of sports booking today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600 font-semibold px-8 py-6 text-lg"
              >
                Start Playing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/turfs')}
                className="border-lime-500/50 text-lime-400 hover:bg-lime-500/10 px-8 py-6 text-lg"
              >
                Browse Turfs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
                TurfMaster
              </span>
            </div>
            <div className="flex items-center space-x-6 text-slate-400">
              <a href="#" className="hover:text-lime-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-lime-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-lime-400 transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>&copy; 2024 TurfMaster. All rights reserved. Built for the future of sports.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
