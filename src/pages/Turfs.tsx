
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, MapPin, Clock, Users, Calendar, ArrowLeft, Play } from 'lucide-react';
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
      nextAvailable: "6:00 PM"
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
      nextAvailable: "7:00 PM"
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
      nextAvailable: "8:00 PM"
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
      nextAvailable: "5:30 PM"
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
      nextAvailable: "6:30 PM"
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
      nextAvailable: "7:30 PM"
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
                Browse Turfs
              </h1>
            </div>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600"
            >
              <Play className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search turfs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Dhanmondi">Dhanmondi</SelectItem>
                    <SelectItem value="Gulshan">Gulshan</SelectItem>
                    <SelectItem value="Banani">Banani</SelectItem>
                    <SelectItem value="Uttara">Uttara</SelectItem>
                    <SelectItem value="Mirpur">Mirpur</SelectItem>
                    <SelectItem value="Wari">Wari</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600">
                    <SelectValue placeholder="Turf Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="5v5">5v5</SelectItem>
                    <SelectItem value="7v7">7v7</SelectItem>
                    <SelectItem value="11v11">11v11</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="border-lime-500/50 text-lime-400 hover:bg-lime-500/10"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-slate-400">
            Found {filteredTurfs.length} turfs available
          </p>
        </motion.div>

        {/* Turf Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTurfs.map((turf, index) => (
            <motion.div
              key={turf.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/turf/${turf.id}`)}
            >
              <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50 hover:border-lime-500/50 transition-all duration-300 overflow-hidden h-full">
                <div className="relative">
                  <img
                    src={turf.image}
                    alt={turf.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-lime-500/20 text-lime-400 border-lime-500/30">
                      {turf.type}
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

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{turf.rating}</span>
                      <span className="text-slate-400">({turf.reviews})</span>
                    </div>
                    <div className="flex items-center text-slate-400">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">Next: {turf.nextAvailable}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {turf.features.slice(0, 3).map((feature) => (
                      <Badge 
                        key={feature}
                        variant="secondary"
                        className="text-xs bg-slate-700/50 text-slate-300"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center text-emerald-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">
                        {turf.availableSlots} slots available
                      </span>
                    </div>
                    
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600"
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

        {filteredTurfs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-slate-800/50 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No turfs found</h3>
            <p className="text-slate-400 mb-6">Try adjusting your search criteria</p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('all');
                setSelectedType('all');
              }}
              variant="outline"
              className="border-lime-500/50 text-lime-400 hover:bg-lime-500/10"
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
