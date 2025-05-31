
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Users, MapPin, Star, Shield, Wifi, Car, Camera, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useParams } from 'react-router-dom';

const TurfBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(1);

  const turf = {
    id: 1,
    name: "Champions Arena",
    location: "Dhanmondi, Dhaka",
    type: "7v7",
    rating: 4.8,
    reviews: 124,
    price: 2500,
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    images: [
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff"
    ],
    features: ["Floodlights", "Parking", "Changing Room", "WiFi", "Security", "First Aid"],
    description: "Premium synthetic turf with professional-grade facilities. Perfect for competitive matches and training sessions.",
    rules: [
      "No outside food or drinks",
      "Sports shoes mandatory",
      "Maximum 14 players",
      "No smoking on premises"
    ]
  };

  const timeSlots = [
    { time: "06:00", available: true, prime: false },
    { time: "08:00", available: true, prime: false },
    { time: "10:00", available: false, prime: false },
    { time: "12:00", available: true, prime: false },
    { time: "14:00", available: true, prime: false },
    { time: "16:00", available: true, prime: true },
    { time: "18:00", available: true, prime: true },
    { time: "20:00", available: false, prime: true },
    { time: "22:00", available: true, prime: true }
  ];

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en', { weekday: 'short' }),
      dayNumber: date.getDate()
    };
  });

  const calculateTotal = () => {
    if (!selectedSlot) return 0;
    const slot = timeSlots.find(s => s.time === selectedSlot);
    const basePrice = slot?.prime ? turf.price * 1.5 : turf.price;
    return basePrice * selectedDuration;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 border-b border-lime-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/turfs')}
              className="text-slate-400 hover:text-lime-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-bold bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
              Book Turf
            </h1>
            <Button
              variant="ghost"
              className="text-slate-400 hover:text-red-400"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Turf Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <img
                    src={turf.images[0]}
                    alt={turf.name}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl"
                  />
                  <Badge className="absolute top-4 left-4 bg-lime-500/20 text-lime-400 border-lime-500/30">
                    {turf.type}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {turf.images.slice(1).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${turf.name} ${idx + 2}`}
                      className="w-full h-[152px] md:h-[152px] object-cover rounded-2xl"
                    />
                  ))}
                  <div className="relative bg-slate-800/50 rounded-2xl flex items-center justify-center border border-slate-700/50">
                    <div className="text-center">
                      <Camera className="w-6 h-6 text-lime-400 mx-auto mb-2" />
                      <span className="text-lime-400 text-sm font-medium">+5 more</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Turf Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-white mb-2">{turf.name}</CardTitle>
                      <div className="flex items-center space-x-4 text-slate-400">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {turf.location}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                          {turf.rating} ({turf.reviews} reviews)
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-lime-400">৳{turf.price}</div>
                      <div className="text-sm text-slate-400">per hour</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-6">{turf.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {turf.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2 text-slate-300">
                        <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-700/50 pt-6">
                    <h4 className="text-white font-semibold mb-3">Rules & Guidelines</h4>
                    <ul className="space-y-2">
                      {turf.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-slate-400 text-sm">
                          <Shield className="w-3 h-3 text-lime-400" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white">Reserve Your Slot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-white font-medium mb-3">Select Date</label>
                    <div className="grid grid-cols-7 gap-2">
                      {dates.map((date) => (
                        <button
                          key={date.date}
                          onClick={() => setSelectedDate(date.date)}
                          className={`p-3 rounded-xl text-center transition-all ${
                            selectedDate === date.date
                              ? 'bg-lime-500 text-slate-900'
                              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          <div className="text-xs font-medium">{date.day}</div>
                          <div className="text-lg font-bold">{date.dayNumber}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <div>
                      <label className="block text-white font-medium mb-3">Available Time Slots</label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            disabled={!slot.available}
                            onClick={() => setSelectedSlot(slot.time)}
                            className={`p-3 rounded-xl text-center transition-all relative ${
                              selectedSlot === slot.time
                                ? 'bg-lime-500 text-slate-900'
                                : slot.available
                                ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                                : 'bg-slate-800/50 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            <div className="font-medium">{slot.time}</div>
                            {slot.prime && (
                              <Badge className="absolute -top-1 -right-1 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                                Prime
                              </Badge>
                            )}
                            {!slot.available && (
                              <div className="text-xs text-red-400">Booked</div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Duration */}
                  {selectedSlot && (
                    <div>
                      <label className="block text-white font-medium mb-3">Duration (hours)</label>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDuration(Math.max(1, selectedDuration - 1))}
                          className="border-slate-600 text-slate-300"
                        >
                          -
                        </Button>
                        <span className="text-white font-bold text-lg px-4">{selectedDuration}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDuration(Math.min(4, selectedDuration + 1))}
                          className="border-slate-600 text-slate-300"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  {selectedSlot && (
                    <div className="border-t border-slate-700/50 pt-6">
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-slate-300">
                          <span>Base Price ({selectedDuration}h)</span>
                          <span>৳{turf.price * selectedDuration}</span>
                        </div>
                        {timeSlots.find(s => s.time === selectedSlot)?.prime && (
                          <div className="flex justify-between text-slate-300">
                            <span>Prime Time (50%)</span>
                            <span>৳{(turf.price * selectedDuration * 0.5)}</span>
                          </div>
                        )}
                        <div className="border-t border-slate-700/50 pt-3">
                          <div className="flex justify-between text-white font-bold text-lg">
                            <span>Total</span>
                            <span className="text-lime-400">৳{calculateTotal()}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => navigate('/auth')}
                        className="w-full bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600 font-semibold py-3"
                      >
                        Reserve Now
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurfBooking;
