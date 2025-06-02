
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Star, Users, Clock, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { EnhancedHeader } from '@/components/ui/enhanced-header';

const Turfs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const turfs = [
    {
      id: 1,
      name: "Elite Sports Arena",
      location: "Gulshan, Dhaka",
      rating: 4.8,
      reviews: 124,
      pricePerHour: 2500,
      images: ["/placeholder.svg"],
      amenities: ["Parking", "Changing Rooms", "Floodlights", "Refreshments"],
      type: "7v7",
      available: true,
      description: "Premium football turf with state-of-the-art facilities"
    },
    {
      id: 2,
      name: "Champions Ground",
      location: "Dhanmondi, Dhaka", 
      rating: 4.6,
      reviews: 89,
      pricePerHour: 2000,
      images: ["/placeholder.svg"],
      amenities: ["Parking", "Changing Rooms", "Floodlights"],
      type: "5v5",
      available: true,
      description: "Perfect for smaller teams and quick matches"
    },
    {
      id: 3,
      name: "Victory Sports Complex",
      location: "Uttara, Dhaka",
      rating: 4.9,
      reviews: 156,
      pricePerHour: 3000,
      images: ["/placeholder.svg"],
      amenities: ["Parking", "Changing Rooms", "Floodlights", "Refreshments", "AC Lounge"],
      type: "11v11",
      available: false,
      description: "Full-size professional football ground"
    },
    {
      id: 4,
      name: "Street Football Court",
      location: "Mirpur, Dhaka",
      rating: 4.4,
      reviews: 67,
      pricePerHour: 1500,
      images: ["/placeholder.svg"],
      amenities: ["Parking", "Floodlights"],
      type: "5v5",
      available: true,
      description: "Affordable option for casual games"
    }
  ];

  const locations = ['all', 'Gulshan', 'Dhanmondi', 'Uttara', 'Mirpur'];
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ৳2,000', value: 'under-2000' },
    { label: '৳2,000 - ৳2,500', value: '2000-2500' },
    { label: 'Above ৳2,500', value: 'above-2500' }
  ];

  const toggleFavorite = (turfId: number) => {
    setFavorites(prev => 
      prev.includes(turfId) 
        ? prev.filter(id => id !== turfId)
        : [...prev, turfId]
    );
  };

  const filteredTurfs = turfs.filter(turf => {
    const matchesSearch = turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         turf.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === 'all' || 
                           turf.location.includes(selectedLocation);
    
    const matchesPrice = selectedPrice === 'all' ||
                        (selectedPrice === 'under-2000' && turf.pricePerHour < 2000) ||
                        (selectedPrice === '2000-2500' && turf.pricePerHour >= 2000 && turf.pricePerHour <= 2500) ||
                        (selectedPrice === 'above-2500' && turf.pricePerHour > 2500);

    return matchesSearch && matchesLocation && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full opacity-60 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full opacity-60 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <EnhancedHeader />

      <div className="container mx-auto px-4 py-8 relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Find Your Perfect Turf ⚽
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover premium football turfs across Dhaka with world-class facilities
          </p>
        </motion.div>

        {/* Search and Filters */}
        <Card className="backdrop-blur-2xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search turfs by name or location..."
                  className="pl-12 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm text-lg py-6"
                />
              </div>

              {/* Location Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-white/30 bg-white/50 backdrop-blur-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-white/30 bg-white/50 backdrop-blur-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTurfs.map((turf) => (
            <motion.div
              key={turf.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="backdrop-blur-2xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden h-full">
                <div className="relative">
                  <img
                    src={turf.images[0]}
                    alt={turf.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(turf.id)}
                      className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/40"
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(turf.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </Button>
                    {!turf.available && (
                      <Badge className="bg-red-500 text-white rounded-2xl px-3 py-1">
                        Booked
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-emerald-500 text-white rounded-2xl px-3 py-1">
                      {turf.type}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-gray-800 group-hover:text-emerald-600 transition-colors">
                        {turf.name}
                      </CardTitle>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{turf.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-600">
                        ৳{turf.pricePerHour.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">per hour</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 mb-4">
                    {turf.description}
                  </CardDescription>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium">{turf.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({turf.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{turf.type}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {turf.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="rounded-2xl text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {turf.amenities.length > 3 && (
                      <Badge variant="outline" className="rounded-2xl text-xs">
                        +{turf.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <Button
                    onClick={() => navigate(`/turf/${turf.id}`)}
                    disabled={!turf.available}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl py-3 shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {turf.available ? (
                      <>
                        Book Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 mr-2" />
                        Currently Booked
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTurfs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No turfs found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your search criteria</p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('all');
                setSelectedPrice('all');
              }}
              variant="outline"
              className="rounded-2xl border-emerald-200 text-emerald-600 hover:bg-emerald-50"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Turfs;
