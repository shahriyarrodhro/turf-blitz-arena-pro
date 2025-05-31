
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, Users, Star, Play, ArrowRight, Shield, Zap, Target, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

  const nearbyTurfs = [
    {
      id: 1,
      name: "Champions Arena",
      location: "Dhanmondi, Dhaka",
      type: "7v7",
      rating: 4.8,
      price: 2500,
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      available: true
    },
    {
      id: 2,
      name: "Victory Ground",
      location: "Gulshan, Dhaka",
      type: "5v5", 
      rating: 4.6,
      price: 1800,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      available: true
    },
    {
      id: 3,
      name: "Elite Football Hub",
      location: "Banani, Dhaka",
      type: "11v11",
      rating: 4.9,
      price: 4500,
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
      available: false
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
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/90 border-b border-lime-500/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
                TurfMaster
              </span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => navigate('/turfs')}
                className="text-slate-300 hover:text-lime-400 transition-colors font-medium"
              >
                Browse Turfs
              </button>
              <button 
                onClick={() => navigate('/tournaments')}
                className="text-slate-300 hover:text-lime-400 transition-colors font-medium"
              >
                Tournaments
              </button>
              <a href="#nearby" className="text-slate-300 hover:text-lime-400 transition-colors font-medium">Nearby</a>
              <a href="#features" className="text-slate-300 hover:text-lime-400 transition-colors font-medium">Features</a>
            </div>

            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/auth')}
                className="text-slate-300 hover:text-lime-400 hover:bg-lime-500/10 hidden sm:flex"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600 font-semibold px-4 py-2 text-sm"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <Badge className="mb-4 bg-lime-500/20 text-lime-400 border-lime-500/30 text-xs">
                🚀 #1 Sports Booking Platform
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-lime-200 to-emerald-300 bg-clip-text text-transparent">
                  Choose Your Turf.
                </span>
                <br />
                <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
                  Play Your Game.
                </span>
              </h1>
              
              <p className="text-lg text-slate-400 mb-8 max-w-xl">
                Book premium turfs across Bangladesh. Join tournaments. Connect with players. 
                All in one platform.
              </p>

              {/* Quick Search */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-slate-700/50">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search turfs, location..."
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <Button 
                    onClick={() => navigate('/turfs')}
                    className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600 px-6"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/turfs')}
                  className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600 font-semibold px-8"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/tournaments')}
                  className="border-lime-500/50 text-lime-400 hover:bg-lime-500/10 px-8"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  Tournaments
                </Button>
              </div>
            </motion.div>

            {/* Right Content - Mobile Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="w-72 h-[600px] bg-slate-900 rounded-[3rem] p-6 border border-slate-700/50 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2rem] p-4 relative overflow-hidden">
                    <div className="text-white text-center mb-4">
                      <h3 className="text-lg font-bold text-lime-400">TurfMaster</h3>
                    </div>
                    <div className="space-y-3">
                      {nearbyTurfs.slice(0, 2).map((turf, idx) => (
                        <div key={idx} className="bg-slate-700/50 rounded-xl p-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-lime-400 rounded-lg"></div>
                            <div className="flex-1">
                              <h4 className="text-white text-sm font-medium">{turf.name}</h4>
                              <p className="text-slate-400 text-xs">{turf.location}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-lime-400 text-xs">৳{turf.price}/hr</span>
                                <span className="text-yellow-400 text-xs">★ {turf.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="backdrop-blur-sm bg-slate-800/30 rounded-2xl p-4 text-center border border-slate-700/30"
              >
                <stat.icon className="w-6 h-6 text-lime-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nearby Turfs Section */}
      <section id="nearby" className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Nearby Turfs
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Discover premium turfs in your area and book instantly
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {nearbyTurfs.map((turf, index) => (
              <motion.div
                key={turf.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => navigate('/turfs')}
              >
                <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50 hover:border-lime-500/50 transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={turf.image}
                      alt={turf.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${turf.available ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                        {turf.available ? 'Available' : 'Booked'}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-slate-900/80 text-white">
                        ৳{turf.price}/hr
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-white group-hover:text-lime-400 transition-colors">
                      {turf.name}
                    </CardTitle>
                    <CardDescription className="flex items-center text-slate-400">
                      <MapPin className="w-4 h-4 mr-1" />
                      {turf.location}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-medium">{turf.rating}</span>
                        <Badge variant="secondary" className="ml-2 bg-slate-700/50 text-slate-300">
                          {turf.type}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        disabled={!turf.available}
                        className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600 disabled:opacity-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/auth');
                        }}
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate('/turfs')}
              variant="outline"
              className="border-lime-500/50 text-lime-400 hover:bg-lime-500/10"
            >
              View All Turfs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Why Choose TurfMaster?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
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
                <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50 hover:border-lime-500/30 transition-all duration-300 h-full text-center">
                  <CardHeader>
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-full h-full text-slate-900" />
                    </div>
                    <CardTitle className="text-white group-hover:text-lime-400 transition-colors text-lg">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-400">
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
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Loved by the Community
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
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
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
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
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-slate-800/50 rounded-3xl p-8 md:p-12 border border-slate-700/50"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Ready to Play?
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Join the TurfMaster community and experience the future of sports booking today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600 font-semibold px-8"
              >
                Start Playing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/turfs')}
                className="border-lime-500/50 text-lime-400 hover:bg-lime-500/10 px-8"
              >
                Browse Turfs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
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
            <div className="flex items-center space-x-6 text-slate-400 text-sm">
              <a href="#" className="hover:text-lime-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-lime-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-lime-400 transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>&copy; 2024 TurfMaster. All rights reserved. Built for the future of sports.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
