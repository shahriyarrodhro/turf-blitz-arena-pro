import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Users, Search, Filter, ChevronRight, Calendar, Trophy, Wifi, Car, Coffee, Eye, Shield, Zap, Phone, Heart, CheckCircle } from 'lucide-react';
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
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const bangladeshCities = [
    'All', 'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'
  ];

  const priceRanges = [
    'All', '৳500-1000', '৳1000-2000', '৳2000-3000', '৳3000+'
  ];

  const formats = ['All', '5v5', '7v7', '11v11'];

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
      features: ["Floodlights", "Parking", "Changing Rooms", "WiFi", "Security", "Equipment Rental"],
      availability: "Available Today",
      type: "Premium",
      size: "Full Size (11v11)",
      contact: "+880 1712-345678",
      operatingHours: "6:00 AM - 11:00 PM",
      surface: "Artificial Grass",
      capacity: "22 Players",
      description: "Professional-grade football turf with state-of-the-art facilities and excellent drainage system. Perfect for tournaments and professional matches.",
      isVerified: true,
      totalBookings: 248,
      responseTime: "5 mins",
      cancellationPolicy: "Free cancellation up to 2 hours before"
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
      features: ["Floodlights", "Cafeteria", "Parking", "WiFi"],
      availability: "Available Tomorrow",
      type: "Standard",
      size: "7v7",
      contact: "+880 1798-765432",
      operatingHours: "7:00 AM - 10:00 PM",
      surface: "Natural Grass",
      capacity: "14 Players",
      description: "Well-maintained natural grass field perfect for casual and competitive matches. Features modern amenities and excellent accessibility.",
      isVerified: true,
      totalBookings: 156,
      responseTime: "10 mins",
      cancellationPolicy: "Free cancellation up to 4 hours before"
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
      features: ["Floodlights", "Parking", "Changing Rooms", "WiFi", "Cafeteria", "Equipment Rental", "Security", "First Aid"],
      availability: "Available Now",
      type: "Premium",
      size: "Full Size (11v11)",
      contact: "+880 1555-999888",
      operatingHours: "5:00 AM - 12:00 AM",
      surface: "Hybrid Grass",
      capacity: "22 Players",
      description: "Premium sports complex with multiple fields, professional lighting, and comprehensive facilities. Home to several professional tournaments.",
      isVerified: true,
      totalBookings: 312,
      responseTime: "2 mins",
      cancellationPolicy: "Free cancellation up to 1 hour before"
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
      size: "5v5",
      contact: "+880 1666-777888",
      operatingHours: "6:00 AM - 9:00 PM",
      surface: "Artificial Grass",
      capacity: "10 Players",
      description: "Affordable option for small group matches with basic facilities."
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
      features: ["Floodlights", "Parking", "Changing Rooms", "Cafeteria", "Security"],
      availability: "Available Today",
      type: "Premium",
      size: "Full Size (11v11)",
      contact: "+880 1777-888999",
      operatingHours: "6:00 AM - 11:00 PM",
      surface: "Artificial Grass",
      capacity: "22 Players",
      description: "Modern stadium with excellent facilities and sea view ambiance."
    },
    {
      id: 6,
      name: "Sylhet Sports Arena",
      location: "Sylhet",
      city: "Sylhet",
      rating: 4.5,
      reviews: 72,
      price: "৳1,000/hour",
      priceValue: 1000,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
      features: ["Floodlights", "Parking", "WiFi", "Equipment Rental"],
      availability: "Available Now",
      type: "Standard",
      size: "7v7",
      contact: "+880 1888-999000",
      operatingHours: "7:00 AM - 10:00 PM",
      surface: "Natural Grass",
      capacity: "14 Players",
      description: "Scenic location with well-maintained natural grass and mountain views."
    }
  ];

  // Filter turfs
  const filteredTurfs = turfs.filter(turf => {
    const matchesSearch = turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         turf.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || turf.city === selectedCity;
    const matchesFormat = selectedFormat === 'All' || turf.size.includes(selectedFormat);
    
    let matchesPrice = true;
    if (selectedPrice !== 'All') {
      const [min, max] = selectedPrice.replace('৳', '').split('-').map(p => 
        p.includes('+') ? Infinity : parseInt(p)
      );
      matchesPrice = turf.priceValue >= min && (max === Infinity || turf.priceValue <= max);
    }
    
    return matchesSearch && matchesCity && matchesPrice && matchesFormat;
  });

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'floodlights': return <Zap className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'cafeteria': return <Coffee className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'changing rooms': return <Users className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Premium': return 'bg-gradient-to-r from-purple-400 to-pink-500 text-white';
      case 'Standard': return 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white';
      case 'Budget': return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
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

        {/* Advanced Search and Filters */}
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
                    placeholder="Search turfs by name, location, or features..."
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
                  {(selectedCity !== 'All' || selectedPrice !== 'All' || selectedFormat !== 'All') && (
                    <Badge className="ml-2 bg-emerald-500 text-white w-3 h-3 p-0 rounded-full" />
                  )}
                </Button>
              </div>

              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/20"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="h-12 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent className="backdrop-blur-2xl bg-white/90 border border-white/30 rounded-2xl">
                        {bangladeshCities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                      <SelectTrigger className="h-12 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent className="backdrop-blur-2xl bg-white/90 border border-white/30 rounded-2xl">
                        {formats.map(format => (
                          <SelectItem key={format} value={format}>{format}</SelectItem>
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
                      <SelectContent className="backdrop-blur-2xl bg-white/90 border border-white/30 rounded-2xl">
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
            <h2 className="text-3xl font-bold text-gray-800">Available Turfs</h2>
            <p className="text-gray-600 text-lg">{filteredTurfs.length} turfs found matching your criteria</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="rounded-2xl border-white/30 bg-white/20 hover:bg-white/40 backdrop-blur-sm">
              <Calendar className="w-4 h-4 mr-2" />
              Sort by Date
            </Button>
            <Button variant="outline" className="rounded-2xl border-white/30 bg-white/20 hover:bg-white/40 backdrop-blur-sm">
              <Trophy className="w-4 h-4 mr-2" />
              Sort by Rating
            </Button>
          </div>
        </motion.div>

        {/* Enhanced Turfs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTurfs.map((turf, index) => (
            <motion.div
              key={turf.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="backdrop-blur-2xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group overflow-hidden">
                <div className="relative h-52 overflow-hidden rounded-t-3xl">
                  <img
                    src={turf.image}
                    alt={turf.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <Badge className={`${getTypeBadgeColor(turf.type)} rounded-2xl px-3 py-1 font-semibold shadow-lg backdrop-blur-sm`}>
                      {turf.type}
                    </Badge>
                    {turf.isVerified && (
                      <Badge className="bg-blue-500/90 text-white rounded-2xl px-3 py-1 font-semibold shadow-lg backdrop-blur-sm">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <Button size="icon" variant="ghost" className="backdrop-blur-md bg-white/20 hover:bg-white/40 rounded-full text-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-emerald-500/90 text-white rounded-2xl px-3 py-1 font-semibold shadow-lg backdrop-blur-sm">
                      {turf.availability}
                    </Badge>
                  </div>
                  
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-2xl px-3 py-1 font-bold shadow-lg backdrop-blur-sm">
                      {turf.price}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800 leading-tight">{turf.name}</h3>
                      <div className="flex items-center ml-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm font-semibold text-gray-800">{turf.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-sm">{turf.location}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Format:</span>
                        <Badge className="bg-purple-100 text-purple-700 rounded-full px-2 py-1 text-xs">
                          {turf.size.includes('11v11') ? '11v11' : turf.size.includes('7v7') ? '7v7' : '5v5'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Surface:</span>
                        <span className="font-medium text-gray-800 text-xs">{turf.surface}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-medium text-gray-800 text-xs">{turf.capacity}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Response:</span>
                        <span className="font-medium text-emerald-600 text-xs">{turf.responseTime}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{turf.description}</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {turf.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center bg-gray-100/80 rounded-2xl px-3 py-1 text-xs">
                          {getFeatureIcon(feature)}
                          <span className="text-gray-700 ml-1">{feature}</span>
                        </div>
                      ))}
                      {turf.features.length > 4 && (
                        <div className="flex items-center bg-gray-100/80 rounded-2xl px-3 py-1">
                          <span className="text-xs text-gray-700">+{turf.features.length - 4} more</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-1" />
                      <span>{turf.contact}</span>
                    </div>
                    <div className="text-emerald-600 font-medium">
                      {turf.totalBookings} bookings
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/turf/${turf.id}`)}
                      variant="outline"
                      className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-2xl"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Details
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
                setSelectedFormat('All');
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
