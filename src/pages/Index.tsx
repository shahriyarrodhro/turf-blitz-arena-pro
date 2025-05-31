
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, Users, Star, Play, ArrowRight, Shield, Zap, Target, Search, Filter, ChevronRight } from 'lucide-react';
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
      color: "bg-green-100"
    },
    {
      icon: Trophy,
      title: "Join Tournaments",
      description: "Compete in exciting tournaments and climb the leaderboards",
      color: "bg-blue-100"
    },
    {
      icon: Users,
      title: "Find Opponents",
      description: "Smart matchmaking system to find teams and players",
      color: "bg-purple-100"
    },
    {
      icon: Calendar,
      title: "Instant Booking",
      description: "Book turf slots instantly with our real-time booking system",
      color: "bg-orange-100"
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
      available: true,
      distance: "1.2 km"
    },
    {
      id: 2,
      name: "Victory Ground",
      location: "Gulshan, Dhaka",
      type: "5v5", 
      rating: 4.6,
      price: 1800,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      available: true,
      distance: "2.1 km"
    },
    {
      id: 3,
      name: "Elite Football Hub",
      location: "Banani, Dhaka",
      type: "11v11",
      rating: 4.9,
      price: 4500,
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
      available: false,
      distance: "3.5 km"
    }
  ];

  const stats = [
    { label: "Active Turfs", value: "150+", icon: MapPin },
    { label: "Tournaments", value: "50+", icon: Trophy },
    { label: "Happy Players", value: "10K+", icon: Users },
    { label: "Cities", value: "8", icon: Target }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-lime-400 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-stone-900" />
              </div>
              <span className="text-xl font-bold text-stone-900">TurfMaster</span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigate('/turfs')}
                className="text-stone-600 hover:text-stone-900 font-medium transition-colors"
              >
                Browse Turfs
              </button>
              <button 
                onClick={() => navigate('/tournaments')}
                className="text-stone-600 hover:text-stone-900 font-medium transition-colors"
              >
                Tournaments
              </button>
              <a href="#nearby" className="text-stone-600 hover:text-stone-900 font-medium transition-colors">Nearby</a>
              <a href="#features" className="text-stone-600 hover:text-stone-900 font-medium transition-colors">Features</a>
            </div>

            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/auth')}
                className="text-stone-600 hover:text-stone-900 hidden sm:flex"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-lime-400 hover:bg-lime-500 text-stone-900 font-semibold rounded-2xl px-6"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-12 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <Badge className="mb-6 bg-lime-100 text-lime-700 border-lime-200 text-sm px-4 py-2 rounded-full">
                🚀 #1 Sports Booking Platform
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-stone-900">
                Choose Your Turf.
                <br />
                <span className="text-lime-600">Play Your Game.</span>
              </h1>
              
              <p className="text-lg text-stone-600 mb-8 max-w-xl">
                Book premium turfs across Bangladesh. Join tournaments. Connect with players. 
                All in one platform.
              </p>

              {/* Quick Search */}
              <div className="bg-white rounded-3xl p-6 mb-8 shadow-lg border border-stone-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-4 w-5 h-5 text-stone-400" />
                    <Input
                      placeholder="Search turfs, location..."
                      className="pl-12 py-4 bg-stone-50 border-stone-200 rounded-2xl text-stone-900 placeholder:text-stone-500"
                    />
                  </div>
                  <Button 
                    onClick={() => navigate('/turfs')}
                    className="bg-lime-400 hover:bg-lime-500 text-stone-900 px-8 py-4 rounded-2xl font-semibold"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/turfs')}
                  className="bg-stone-900 hover:bg-stone-800 text-white font-semibold px-8 py-4 rounded-2xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/tournaments')}
                  className="border-stone-300 text-stone-700 hover:bg-stone-100 px-8 py-4 rounded-2xl font-semibold"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  Tournaments
                </Button>
              </div>
            </motion.div>

            {/* Mobile Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-[640px] bg-white rounded-[3rem] p-8 shadow-2xl border border-stone-200">
                  <div className="w-full h-full bg-stone-50 rounded-[2rem] p-6 relative overflow-hidden">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-stone-900">TurfMaster</h3>
                      <p className="text-stone-600 text-sm">Find & Book Turfs</p>
                    </div>
                    <div className="space-y-4">
                      {nearbyTurfs.slice(0, 2).map((turf, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-16 h-16 bg-lime-100 rounded-xl flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-lime-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-stone-900 font-semibold">{turf.name}</h4>
                              <p className="text-stone-600 text-sm">{turf.location}</p>
                              <div className="flex items-center space-x-3 mt-2">
                                <span className="text-lime-600 font-semibold">৳{turf.price}/hr</span>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-stone-600 text-sm ml-1">{turf.rating}</span>
                                </div>
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
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white rounded-3xl p-6 text-center shadow-lg border border-stone-200"
              >
                <stat.icon className="w-8 h-8 text-lime-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-stone-900 mb-1">{stat.value}</div>
                <div className="text-stone-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nearby Turfs Section */}
      <section id="nearby" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-stone-900">
              Nearby Turfs
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              Discover premium turfs in your area and book instantly
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {nearbyTurfs.map((turf, index) => (
              <motion.div
                key={turf.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => navigate('/turfs')}
              >
                <Card className="bg-white border border-stone-200 hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-3xl">
                  <div className="relative">
                    <img
                      src={turf.image}
                      alt={turf.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${turf.available ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'} rounded-full px-3 py-1`}>
                        {turf.available ? 'Available' : 'Booked'}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-stone-900 rounded-full px-3 py-1 font-semibold">
                        ৳{turf.price}/hr
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-stone-900 group-hover:text-lime-600 transition-colors text-xl">
                      {turf.name}
                    </CardTitle>
                    <CardDescription className="flex items-center text-stone-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {turf.location} • {turf.distance}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-stone-900 font-semibold ml-1">{turf.rating}</span>
                        </div>
                        <Badge variant="secondary" className="bg-stone-100 text-stone-700 rounded-full">
                          {turf.type}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        disabled={!turf.available}
                        className="bg-lime-400 hover:bg-lime-500 text-stone-900 disabled:opacity-50 rounded-xl font-semibold"
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
              className="border-stone-300 text-stone-700 hover:bg-stone-100 rounded-2xl px-8 py-3 font-semibold"
            >
              View All Turfs
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-stone-900">
              Why Choose TurfMaster?
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              Experience the most advanced sports booking platform designed for modern football culture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <Card className="bg-white border border-stone-200 hover:shadow-lg transition-all duration-300 h-full text-center rounded-3xl">
                  <CardHeader>
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-full h-full text-stone-700" />
                    </div>
                    <CardTitle className="text-stone-900 group-hover:text-lime-600 transition-colors text-lg">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-stone-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-lime-50 rounded-3xl p-12 border border-lime-200"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-stone-900">
              Ready to Play?
            </h2>
            <p className="text-stone-600 mb-8 max-w-2xl mx-auto text-lg">
              Join the TurfMaster community and experience the future of sports booking today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-stone-900 hover:bg-stone-800 text-white font-semibold px-8 py-4 rounded-2xl"
              >
                Start Playing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/turfs')}
                className="border-stone-300 text-stone-700 hover:bg-stone-100 px-8 py-4 rounded-2xl font-semibold"
              >
                Browse Turfs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-lime-400 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-stone-900" />
              </div>
              <span className="text-xl font-bold text-white">TurfMaster</span>
            </div>
            <div className="flex items-center space-x-8 text-stone-400 text-sm">
              <a href="#" className="hover:text-lime-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-lime-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-lime-400 transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-stone-800 text-center text-stone-500 text-sm">
            <p>&copy; 2024 TurfMaster. All rights reserved. Built for the future of sports.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
