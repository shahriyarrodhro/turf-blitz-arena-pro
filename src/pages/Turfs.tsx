import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Users, Search, Filter, ChevronRight, Calendar, Trophy, Wifi, Car, Coffee, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { EnhancedHeader } from '@/components/ui/enhanced-header';

const Turfs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const bangladeshCities = [
    'All', 'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'
  ];

  const priceRanges = [
    'All', '৳500-1000', '৳1000-2000', '৳2000-3000', '৳3000+'
  ];

  const turfs = [
    {
      id: 1,
      name: "Champions Arena",
      location: "Dhanmondi, Dhaka",
      city: "Dhaka",
      rating: 4.8,
      reviews: 124,
      price: "৳1,500/hour",
      priceValue: 1500,
      image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=500",
      features: ["Floodlights", "Parking", "Changing Rooms", "WiFi"],
      availability: "Available Today",
      type: "Premium",
      size: "Full Size (11v11)"
    },
    {
      id: 2,
      name: "Victory Ground",
      location: "Gulshan, Dhaka",
      city: "Dhaka",
      rating: 4.6,
      reviews: 89,
      price: "৳1,200/hour",
      priceValue: 1200,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
      features: ["Floodlights", "Cafeteria", "Parking"],
      availability: "Available Tomorrow",
      type: "Standard",
      size: "7v7"
    },
    {
      id: 3,
      name: "Elite Sports Complex",
      location: "Uttara, Dhaka",
      city: "Dhaka",
      rating: 4.9,
      reviews: 156,
      price: "৳2,000/hour",
      priceValue: 2000,
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500",
      features: ["Floodlights", "Parking", "Changing Rooms", "WiFi", "Cafeteria", "Equipment Rental"],
      availability: "Available Now",
      type: "Premium",
      size: "Full Size (11v11)"
    },
    {
      id: 4,
      name: "Green Field",
      location: "Wari, Dhaka",
      city: "Dhaka",
      rating: 4.3,
      reviews: 67,
      price: "৳800/hour",
      priceValue: 800,
      image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=500",
      features: ["Basic Lighting", "Parking"],
      availability: "Available Tomorrow",
      type: "Budget",
      size: "5v5"
    },
    {
      id: 5,
      name: "Port City Stadium",
      location: "Chittagong",
      city: "Chittagong",
      rating: 4.7,
      reviews: 98,
      price: "৳1,800/hour",
      priceValue: 1800,
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500",
      features: ["Floodlights", "Parking", "Changing Rooms", "Cafeteria"],
      availability: "Available Today",
      type: "Premium",
      size: "Full Size (11v11)"
    },
    {
      id: 6,
      name: "Sylhet Sports Arena",
      location: "Sylhet",
      city: "Sylhet",
      rating: 4.5,
      reviews: 72,
      price: "₺1,000/hour",
      priceValue: 1000,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
      features: ["Floodlights", "Parking", "WiFi"],
      availability: "Available Now",
      type: "Standard",
      size: "7v7"
    }
  ];

  // Filter turfs
  const filteredTurfs = turfs.filter(turf => {
    const matchesSearch = turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         turf.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || turf.city === selectedCity;
    
    let matchesPrice = true;
    if (selectedPrice !== 'All') {
      const [min, max] = selectedPrice.replace('৳', '').split('-').map(p => 
        p.includes('+') ? Infinity : parseInt(p)
      );
      matchesPrice = turf.priceValue >= min && (max === Infinity || turf.priceValue <= max);
    }
    
    return matchesSearch && matchesCity && matchesPrice;
  });

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'floodlights': return <Clock className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'cafeteria': return <Coffee className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Premium': return 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200';
      case 'Standard': return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200';
      case 'Budget': return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full opacity-60 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full opacity-60 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <EnhancedHeader showSearch={true} />
      
      <div className="container mx-auto px-4 py-8 relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Find Your Perfect Turf
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover and book premium football turfs across Bangladesh. From casual 5v5 games to professional tournaments.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-2xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl p-6">
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search turfs by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm text-lg placeholder:text-gray-500"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-14 px-8 border-white/30 bg-white/20 hover:bg-white/40 rounded-2xl backdrop-blur-sm transition-all duration-300"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                  {(selectedCity !== 'All' || selectedPrice !== 'All') && (
                    <Badge className="ml-2 bg-emerald-500 text-white w-3 h-3 p-0 rounded-full" />
                  )}
                </Button>
              </div>

              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/20"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="h-12 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {bangladeshCities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                      <SelectTrigger className="h-12 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm">
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map(range => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Available Turfs</h2>
            <p className="text-gray-600">{filteredTurfs.length} turfs found</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="rounded-2xl border-white/30 bg-white/20 hover:bg-white/40">
              <Calendar className="w-4 h-4 mr-2" />
              Sort by Date
            </Button>
            <Button variant="outline" className="rounded-2xl border-white/30 bg-white/20 hover:bg-white/40">
              <Trophy className="w-4 h-4 mr-2" />
              Sort by Rating
            </Button>
          </div>
        </motion.div>

        {/* Turfs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTurfs.map((turf, index) => (
            <motion.div
              key={turf.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="backdrop-blur-2xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group overflow-hidden">
                <div className="relative h-48 overflow-hidden rounded-t-3xl">
                  <img
                    src={turf.image}
                    alt={turf.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getTypeBadgeColor(turf.type)} rounded-2xl px-3 py-1 font-semibold shadow-lg backdrop-blur-sm`}>
                      {turf.type}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-emerald-100/90 text-emerald-700 rounded-2xl px-3 py-1 font-semibold shadow-lg backdrop-blur-sm">
                      {turf.availability}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{turf.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-sm">{turf.location}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm font-semibold text-gray-800">{turf.rating}</span>
                        <span className="text-sm text-gray-600 ml-1">({turf.reviews})</span>
                      </div>
                      <Badge className="bg-blue-100/80 text-blue-700 rounded-2xl px-3 py-1 text-xs">
                        {turf.size}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {turf.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center bg-gray-100/80 rounded-2xl px-3 py-1">
                          {getFeatureIcon(feature)}
                          <span className="text-xs text-gray-700 ml-1">{feature}</span>
                        </div>
                      ))}
                      {turf.features.length > 3 && (
                        <div className="flex items-center bg-gray-100/80 rounded-2xl px-3 py-1">
                          <span className="text-xs text-gray-700">+{turf.features.length - 3} more</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-800">{turf.price}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/turf/${turf.id}`)}
                      variant="outline"
                      className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-2xl"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button
                      onClick={() => navigate(`/turf/${turf.id}/book`)}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Book Now
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTurfs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center">
              <MapPin className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No turfs found</h3>
            <p className="text-gray-600 mb-8 text-lg">Try adjusting your search criteria or explore different locations</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCity('All');
                setSelectedPrice('All');
              }}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl px-8 py-3"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Turfs;
