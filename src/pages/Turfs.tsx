
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, MapPin, Clock, Users, Calendar, ArrowLeft, Play, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const Turfs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const turfs = [
    {
      id: 1,
      name: "Champions Arena",
      location: "Dhanmondi, Dhaka",
      type: "7v7",
      rating: 4.8,
      reviews: 124,
      price: 2500,
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      features: ["Floodlights", "Parking", "Changing Room"],
      availableSlots: 8,
      nextAvailable: "6:00 PM",
      distance: "1.2 km"
    },
    {
      id: 2,
      name: "Victory Ground",
      location: "Gulshan, Dhaka", 
      type: "5v5",
      rating: 4.6,
      reviews: 89,
      price: 1800,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      features: ["Air Conditioning", "Canteen", "First Aid"],
      availableSlots: 12,
      nextAvailable: "7:00 PM",
      distance: "2.1 km"
    },
    {
      id: 3,
      name: "Elite Football Hub",
      location: "Banani, Dhaka",
      type: "11v11", 
      rating: 4.9,
      reviews: 203,
      price: 4500,
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
      features: ["Professional Grass", "Stadium Seating", "Scoreboard"],
      availableSlots: 4,
      nextAvailable: "8:00 PM",
      distance: "3.5 km"
    },
    {
      id: 4,
      name: "Urban Sports Complex",
      location: "Uttara, Dhaka",
      type: "7v7",
      rating: 4.5,
      reviews: 156,
      price: 2200,
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      features: ["Synthetic Turf", "Lighting", "Security"],
      availableSlots: 6,
      nextAvailable: "5:30 PM",
      distance: "5.2 km"
    },
    {
      id: 5,
      name: "Premier League Ground",
      location: "Mirpur, Dhaka",
      type: "5v5",
      rating: 4.7,
      reviews: 198,
      price: 1900,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      features: ["Indoor", "Air Conditioning", "Refreshments"],
      availableSlots: 10,
      nextAvailable: "6:30 PM",
      distance: "4.8 km"
    },
    {
      id: 6,
      name: "Grassroots Arena",
      location: "Wari, Dhaka",
      type: "7v7",
      rating: 4.4,
      reviews: 87,
      price: 2100,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      features: ["Natural Grass", "Coaching Available", "Equipment Rental"],
      availableSlots: 7,
      nextAvailable: "7:30 PM",
      distance: "6.1 km"
    }
  ];

  const filteredTurfs = turfs.filter(turf => {
    const matchesSearch = turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         turf.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || turf.location.includes(selectedLocation);
    const matchesType = selectedType === 'all' || turf.type === selectedType;
    
    return matchesSearch && matchesLocation && matchesType;
  });

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
                Browse Turfs
              </h1>
            </div>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-lime-400 hover:bg-lime-500 text-stone-900 font-semibold rounded-2xl px-6"
            >
              <Play className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Main Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
            <Input
              placeholder="Search turfs, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 bg-white border-stone-200 text-stone-900 placeholder:text-stone-500 rounded-2xl text-lg shadow-sm"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-3 mb-6 overflow-x-auto pb-2">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="border-0 bg-transparent rounded-2xl min-w-fit px-4 py-3">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-white border-stone-200 rounded-2xl shadow-lg">
                  <SelectItem value="all">All Areas</SelectItem>
                  <SelectItem value="Dhanmondi">Dhanmondi</SelectItem>
                  <SelectItem value="Gulshan">Gulshan</SelectItem>
                  <SelectItem value="Banani">Banani</SelectItem>
                  <SelectItem value="Uttara">Uttara</SelectItem>
                  <SelectItem value="Mirpur">Mirpur</SelectItem>
                  <SelectItem value="Wari">Wari</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="border-0 bg-transparent rounded-2xl min-w-fit px-4 py-3">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-stone-200 rounded-2xl shadow-lg">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="5v5">5v5</SelectItem>
                  <SelectItem value="7v7">7v7</SelectItem>
                  <SelectItem value="11v11">11v11</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-0 bg-transparent rounded-2xl min-w-fit px-4 py-3">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="bg-white border-stone-200 rounded-2xl shadow-lg">
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="distance">Nearest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              className="border-stone-300 text-stone-700 hover:bg-stone-100 rounded-2xl px-4 py-3 font-medium"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-stone-600">
              <span className="font-semibold text-stone-900">{filteredTurfs.length}</span> turfs found
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-stone-600 text-sm">View:</span>
              <Button variant="ghost" size="sm" className="text-lime-600 bg-lime-50 rounded-xl">Grid</Button>
              <Button variant="ghost" size="sm" className="text-stone-600 rounded-xl">List</Button>
            </div>
          </div>
        </motion.div>

        {/* Turf Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTurfs.map((turf, index) => (
            <motion.div
              key={turf.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/turf/${turf.id}`)}
            >
              <Card className="bg-white border border-stone-200 hover:shadow-2xl transition-all duration-300 overflow-hidden h-full rounded-3xl">
                <div className="relative">
                  <img
                    src={turf.image}
                    alt={turf.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <Badge className="bg-lime-100 text-lime-700 border-lime-200 rounded-full px-3 py-1 font-medium">
                      {turf.type}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 rounded-full px-3 py-1 font-medium">
                      {turf.distance}
                    </Badge>
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/95 text-stone-900 rounded-full px-3 py-1 font-bold shadow-sm">
                      ৳{turf.price}/hr
                    </Badge>
                  </div>

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-bold text-stone-900">{turf.rating}</span>
                          <span className="text-stone-600 text-sm">({turf.reviews})</span>
                        </div>
                        <div className="flex items-center text-green-600 text-sm font-medium">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{turf.availableSlots} slots</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-stone-900 group-hover:text-lime-600 transition-colors text-xl">
                    {turf.name}
                  </CardTitle>
                  <CardDescription className="flex items-center text-stone-600">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{turf.location}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {turf.features.slice(0, 3).map((feature) => (
                        <Badge 
                          key={feature}
                          variant="secondary"
                          className="text-xs bg-stone-100 text-stone-700 border-stone-200 rounded-full px-3 py-1"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Next Available & Book Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-stone-600 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Next: {turf.nextAvailable}</span>
                      </div>
                      
                      <Button
                        size="sm"
                        className="bg-lime-400 hover:bg-lime-500 text-stone-900 font-semibold rounded-xl px-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/turf/${turf.id}`);
                        }}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results State */}
        {filteredTurfs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-stone-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-stone-400" />
            </div>
            <h3 className="text-2xl font-semibold text-stone-900 mb-3">No turfs found</h3>
            <p className="text-stone-600 mb-8 max-w-md mx-auto">
              Try adjusting your search criteria or browse all available turfs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLocation('all');
                  setSelectedType('all');
                }}
                variant="outline"
                className="border-stone-300 text-stone-700 hover:bg-stone-100 rounded-2xl"
              >
                Clear Filters
              </Button>
              <Button
                onClick={() => navigate('/')}
                className="bg-lime-400 hover:bg-lime-500 text-stone-900 rounded-2xl"
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        )}

        {/* Load More */}
        {filteredTurfs.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-stone-300 text-stone-700 hover:bg-stone-100 rounded-2xl px-8 py-3 font-semibold"
            >
              Load More Turfs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Turfs;
