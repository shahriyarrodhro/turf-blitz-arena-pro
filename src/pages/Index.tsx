import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Trophy, Users, Star, Play, ArrowRight, Shield, Zap, Target, Search, Filter, ChevronRight, Clock, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const locations = ['All', 'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna'];
  const formats = ['All', '5v5', '7v7', '11v11'];

  const features = [
    {
      icon: MapPin,
      title: "Smart Location Search",
      description: "Find perfect turfs near you with AI-powered recommendations",
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      icon: Trophy,
      title: "Tournament System",
      description: "Join competitive tournaments with live scoring and prizes",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Create teams, find players, and manage your squad easily",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Book slots in real-time with flexible payment options",
      gradient: "from-orange-400 to-red-500"
    }
  ];

  const featuredTurfs = [
    {
      id: 1,
      name: "Champions Arena",
      location: "Dhanmondi, Dhaka",
      rating: 4.8,
      reviews: 124,
      price: 1500,
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=500",
      format: "11v11",
      availability: "Available Now",
      features: ["Floodlights", "Parking", "Changing Rooms"]
    },
    {
      id: 2,
      name: "Victory Ground",
      location: "Gulshan, Dhaka",
      rating: 4.6,
      reviews: 89,
      price: 1200,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
      format: "7v7",
      availability: "Available Tomorrow",
      features: ["Cafeteria", "WiFi", "Security"]
    },
    {
      id: 3,
      name: "Elite Sports Hub",
      location: "Uttara, Dhaka",
      rating: 4.9,
      reviews: 156,
      price: 2000,
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500",
      format: "11v11",
      availability: "Available Now",
      features: ["Premium", "Full Facility", "Pro Level"]
    }
  ];

  const upcomingTournaments = [
    {
      id: 1,
      name: "Dhaka Premier League",
      prize: "৳50,000",
      teams: "16 Teams",
      startDate: "Dec 25, 2024",
      format: "11v11",
      status: "Registration Open"
    },
    {
      id: 2,
      name: "Weekend Warriors Cup",
      prize: "৳25,000",
      teams: "8 Teams",
      startDate: "Jan 5, 2025",
      format: "7v7",
      status: "Almost Full"
    }
  ];

  const testimonials = [
    {
      name: "Ahmed Rahman",
      role: "Team Captain",
      content: "TurfX transformed how we book venues. The payment system is seamless and the tournament features are amazing!",
      rating: 5
    },
    {
      name: "Fatima Khan",
      role: "Football Enthusiast",
      content: "Best platform for finding quality turfs in Dhaka. The real-time availability feature saved us so much time.",
      rating: 5
    },
    {
      name: "Karim Hassan",
      role: "Tournament Organizer",
      content: "Managing tournaments has never been easier. The live scoring and team management tools are top-notch.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Glassmorphism Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Zap className="w-5 md:w-7 h-5 md:h-7 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-emerald-600 bg-clip-text text-transparent">TurfX</span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigate('/turfs')}
                className="text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 relative group"
              >
                Browse Turfs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => navigate('/tournaments')}
                className="text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 relative group"
              >
                Tournaments
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <a href="#features" className="text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/auth')}
                className="text-gray-700 hover:text-emerald-600 backdrop-blur-sm"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 hover:from-emerald-500 hover:via-teal-600 hover:to-blue-600 text-white font-semibold rounded-2xl px-6 shadow-xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/40"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden backdrop-blur-2xl bg-white/90 border-t border-white/20"
            >
              <div className="px-4 py-6 space-y-4">
                <button 
                  onClick={() => {
                    navigate('/turfs');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                >
                  Browse Turfs
                </button>
                <button 
                  onClick={() => {
                    navigate('/tournaments');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                >
                  Tournaments
                </button>
                <a 
                  href="#features" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                >
                  Features
                </a>
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate('/auth');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full rounded-2xl border-white/30 bg-white/20 backdrop-blur-md"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate('/auth');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 text-white rounded-2xl shadow-lg"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content with top margin for fixed header */}
      <main className="pt-16 md:pt-20">
        {/* Banner Section with Rounded Cards */}
        <section className="relative py-12 md:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left side - Text content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <Badge className="mb-6 bg-gradient-to-r from-emerald-100/80 to-teal-100/80 text-emerald-700 border border-emerald-200/50 text-sm px-6 py-3 rounded-full backdrop-blur-md shadow-lg">
                  🚀 #1 Sports Booking Platform in Bangladesh
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-gray-800 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Your Perfect Game
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
                    Starts Here
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  Book premium turfs, join tournaments, and connect with players across Bangladesh. 
                  The most advanced sports booking platform designed for the modern football community.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="lg"
                    onClick={() => navigate('/turfs')}
                    className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-900 hover:to-gray-800 text-white font-bold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Book Now
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/tournaments')}
                    className="border-white/30 bg-white/20 backdrop-blur-md text-gray-700 hover:bg-white/40 px-8 py-4 rounded-2xl font-bold shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Join Tournament
                  </Button>
                </div>
              </motion.div>

              {/* Right side - Banner Cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Main Banner Card */}
                <Card className="backdrop-blur-2xl bg-gradient-to-br from-white/40 to-white/20 border border-white/30 rounded-3xl shadow-2xl overflow-hidden">
                  <div className="relative h-48 md:h-64">
                    <img
                      src="https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800"
                      alt="Premium Turf"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-2">Premium Turfs Available</h3>
                      <p className="text-sm opacity-90">Book your slot in 30+ premium venues</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-emerald-400/90 to-teal-500/90 text-white rounded-full px-3 py-1 backdrop-blur-md">
                        Available Now
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Half Expanded Card */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -bottom-8 -right-4 md:-right-8 w-3/4"
                >
                  <Card className="backdrop-blur-2xl bg-gradient-to-br from-blue-400/30 to-purple-400/20 border border-white/30 rounded-3xl shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">Live Tournaments</h4>
                          <p className="text-sm text-gray-600">Join competitive matches</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Small floating card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute top-4 -left-4 md:-left-8"
                >
                  <Card className="backdrop-blur-2xl bg-gradient-to-br from-emerald-400/30 to-teal-400/20 border border-white/30 rounded-2xl shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">2,500+</p>
                          <p className="text-xs text-gray-600">Active Players</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Advanced Search Section */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="backdrop-blur-2xl bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-6 md:p-8">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Find Your Perfect Match</h2>
                  <p className="text-gray-600">Search and book turfs instantly</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <Input
                      placeholder="Search turfs, areas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-12 md:h-14 rounded-2xl border-white/30 bg-white/40 backdrop-blur-md text-lg placeholder:text-gray-500 shadow-lg"
                    />
                  </div>
                  
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="h-12 md:h-14 rounded-2xl border-white/30 bg-white/40 backdrop-blur-md shadow-lg">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent className="backdrop-blur-2xl bg-white/90 border border-white/30 rounded-2xl">
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger className="h-12 md:h-14 rounded-2xl border-white/30 bg-white/40 backdrop-blur-md shadow-lg">
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent className="backdrop-blur-2xl bg-white/90 border border-white/30 rounded-2xl">
                      {formats.map(format => (
                        <SelectItem key={format} value={format}>{format}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    onClick={() => navigate('/turfs')}
                    className="h-12 md:h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-semibold text-lg shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Featured Turfs Section */}
        <section className="py-16 md:py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-emerald-600 bg-clip-text text-transparent">
                Featured Turfs
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Discover premium venues with top-rated facilities
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {featuredTurfs.map((turf, index) => (
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
                  <Card className="backdrop-blur-2xl bg-white/30 border border-white/30 hover:bg-white/40 transition-all duration-500 overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl">
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <img
                        src={turf.image}
                        alt={turf.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-emerald-400/90 to-teal-500/90 text-white rounded-full px-3 py-1 backdrop-blur-md shadow-lg">
                          {turf.availability}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Button size="icon" variant="ghost" className="backdrop-blur-md bg-white/20 hover:bg-white/40 rounded-full">
                          <Heart className="w-4 h-4 text-white" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Badge className="bg-gradient-to-r from-blue-400/90 to-purple-500/90 text-white rounded-full px-3 py-1 backdrop-blur-md shadow-lg font-bold">
                          ৳{turf.price}/hr
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-gray-800 group-hover:text-emerald-600 transition-colors text-xl">
                        {turf.name}
                      </CardTitle>
                      <CardDescription className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                        {turf.location}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-gray-800 font-semibold ml-1">{turf.rating}</span>
                            <span className="text-gray-600 text-sm ml-1">({turf.reviews})</span>
                          </div>
                          <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full px-3 py-1">
                            {turf.format}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {turf.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-gray-100/80 text-gray-700 rounded-full text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/auth');
                        }}
                      >
                        Book Now
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={() => navigate('/turfs')}
                variant="outline"
                className="border-white/30 bg-white/20 backdrop-blur-md text-gray-700 hover:bg-white/40 rounded-2xl px-8 py-3 font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              >
                View All Turfs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Upcoming Tournaments */}
        <section className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                Upcoming Tournaments
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Join competitive tournaments and win exciting prizes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {upcomingTournaments.map((tournament, index) => (
                <motion.div
                  key={tournament.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                  onClick={() => navigate('/tournaments')}
                >
                  <Card className="backdrop-blur-2xl bg-white/30 border border-white/30 hover:bg-white/40 transition-all duration-500 rounded-3xl shadow-2xl group-hover:shadow-3xl p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{tournament.name}</h3>
                        <div className="flex items-center space-x-4 text-gray-600">
                          <span className="flex items-center">
                            <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
                            {tournament.prize}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1 text-blue-500" />
                            {tournament.teams}
                          </span>
                        </div>
                      </div>
                      <Badge className={`${tournament.status === 'Registration Open' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-orange-400 to-red-500'} text-white rounded-full px-3 py-1`}>
                        {tournament.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Format:</span>
                        <Badge className="bg-purple-100 text-purple-700 rounded-full">{tournament.format}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Start Date:</span>
                        <span className="font-semibold text-gray-800">{tournament.startDate}</span>
                      </div>
                    </div>
                    
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/tournaments');
                      }}
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Join Tournament
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-emerald-600 bg-clip-text text-transparent">
                Why Choose TurfX?
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
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
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card className="backdrop-blur-2xl bg-white/30 border border-white/30 hover:bg-white/40 transition-all duration-500 h-full text-center rounded-3xl shadow-2xl group-hover:shadow-3xl p-8">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r ${feature.gradient} p-5 group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                      <feature.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-emerald-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-emerald-600 bg-clip-text text-transparent">
                What Players Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Join thousands of satisfied players across Bangladesh
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="backdrop-blur-2xl bg-white/30 border border-white/30 hover:bg-white/40 transition-all duration-500 rounded-3xl shadow-2xl p-8 h-full">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-emerald-600 font-medium">{testimonial.role}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-2xl bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-blue-400/20 border border-white/30 rounded-3xl p-16 shadow-2xl"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-emerald-600 bg-clip-text text-transparent">
                Ready to Play?
              </h2>
              <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                Join the TurfX community and experience the future of sports booking today. 
                Book your first game and discover why we're Bangladesh's #1 choice.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg"
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-900 hover:to-gray-800 text-white font-bold px-10 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Playing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/turfs')}
                  className="border-white/30 bg-white/20 backdrop-blur-md text-gray-700 hover:bg-white/40 px-10 py-4 rounded-2xl font-bold shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Browse Turfs
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 backdrop-blur-2xl bg-gray-900/80 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">TurfX</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Bangladesh's premier sports booking platform. Book turfs, join tournaments, and connect with players.
                </p>
              </div>
              
              <div>
                <h3 className="text-white font-bold mb-4">Platform</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">Browse Turfs</a>
                  <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">Tournaments</a>
                  <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">Find Players</a>
                  <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">Mobile App</a>
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-bold mb-4">Support</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">Help Center</a>
                  <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">Contact Us</a>
                  <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">Community</a>
                  <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">FAQ</a>
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-bold mb-4">Legal</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">Privacy Policy</a>
                  <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">Terms of Service</a>
                  <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">Cookie Policy</a>
                  <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">Refund Policy</a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-500 text-sm mb-4 md:mb-0">
                <p>&copy; 2024 TurfX. All rights reserved. Built for the future of sports in Bangladesh.</p>
              </div>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Twitter</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
