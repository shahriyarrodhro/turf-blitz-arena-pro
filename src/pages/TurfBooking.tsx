
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Users, MapPin, Star, Shield, Wifi, Car, Camera, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import { toast } from '@/hooks/use-toast';

const TurfBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { createBooking } = useBooking();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

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

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to book a turf",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    if (!selectedDate || !selectedSlot) {
      toast({
        title: "Incomplete Selection",
        description: "Please select both date and time slot",
        variant: "destructive"
      });
      return;
    }

    setIsBooking(true);

    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));

      const bookingId = createBooking({
        turfId: turf.id.toString(),
        turfName: turf.name,
        date: selectedDate,
        time: selectedSlot,
        duration: selectedDuration,
        playerName: user?.name || '',
        playerEmail: user?.email || '',
        totalAmount: calculateTotal(),
        status: 'confirmed'
      });

      toast({
        title: "Booking Confirmed!",
        description: `Your booking ${bookingId} has been confirmed for ${selectedDate} at ${selectedSlot}`,
      });

      // Redirect to player dashboard
      navigate('/player?tab=bookings');
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/turfs')}
              className="text-stone-600 hover:text-stone-900 p-2 rounded-2xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-stone-900">
              Book Turf
            </h1>
            <Button
              variant="ghost"
              className="text-stone-600 hover:text-red-500 p-2 rounded-2xl"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    className="w-full h-64 md:h-80 object-cover rounded-3xl"
                  />
                  <Badge className="absolute top-4 left-4 bg-lime-100 text-lime-700 border-lime-200 rounded-full px-3 py-1">
                    {turf.type}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {turf.images.slice(1).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${turf.name} ${idx + 2}`}
                      className="w-full h-[152px] md:h-[152px] object-cover rounded-3xl"
                    />
                  ))}
                  <div className="relative bg-stone-100 rounded-3xl flex items-center justify-center border border-stone-200">
                    <div className="text-center">
                      <Camera className="w-6 h-6 text-stone-600 mx-auto mb-2" />
                      <span className="text-stone-600 text-sm font-medium">+5 more</span>
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
              <Card className="bg-white border border-stone-200 rounded-3xl shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-stone-900 mb-2">{turf.name}</CardTitle>
                      <div className="flex items-center space-x-4 text-stone-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {turf.location}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                          {turf.rating} ({turf.reviews} reviews)
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-stone-900">৳{turf.price}</div>
                      <div className="text-sm text-stone-600">per hour</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600 mb-6">{turf.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {turf.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2 text-stone-700">
                        <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-stone-200 pt-6">
                    <h4 className="text-stone-900 font-semibold mb-3">Rules & Guidelines</h4>
                    <ul className="space-y-2">
                      {turf.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-stone-600 text-sm">
                          <Shield className="w-3 h-3 text-lime-600" />
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
              <Card className="bg-white border border-stone-200 rounded-3xl shadow-sm sticky top-24">
                <CardHeader>
                  <CardTitle className="text-stone-900">Reserve Your Slot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!isAuthenticated && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                      <p className="text-yellow-800 text-sm">
                        Please login to make a booking
                      </p>
                    </div>
                  )}

                  {/* Date Selection */}
                  <div>
                    <label className="block text-stone-900 font-medium mb-3">Select Date</label>
                    <div className="grid grid-cols-7 gap-2">
                      {dates.map((date) => (
                        <button
                          key={date.date}
                          onClick={() => setSelectedDate(date.date)}
                          className={`p-3 rounded-2xl text-center transition-all ${
                            selectedDate === date.date
                              ? 'bg-lime-400 text-stone-900'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
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
                      <label className="block text-stone-900 font-medium mb-3">Available Time Slots</label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            disabled={!slot.available}
                            onClick={() => setSelectedSlot(slot.time)}
                            className={`p-3 rounded-2xl text-center transition-all relative ${
                              selectedSlot === slot.time
                                ? 'bg-lime-400 text-stone-900'
                                : slot.available
                                ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                : 'bg-stone-50 text-stone-400 cursor-not-allowed'
                            }`}
                          >
                            <div className="font-medium">{slot.time}</div>
                            {slot.prime && (
                              <Badge className="absolute -top-1 -right-1 bg-yellow-100 text-yellow-700 border-yellow-200 text-xs rounded-full">
                                Prime
                              </Badge>
                            )}
                            {!slot.available && (
                              <div className="text-xs text-red-500">Booked</div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Duration */}
                  {selectedSlot && (
                    <div>
                      <label className="block text-stone-900 font-medium mb-3">Duration (hours)</label>
                      <div className="flex items-center justify-center space-x-4 bg-stone-100 rounded-2xl p-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDuration(Math.max(1, selectedDuration - 1))}
                          className="border-stone-300 text-stone-700 rounded-xl"
                        >
                          -
                        </Button>
                        <span className="text-stone-900 font-bold text-lg px-4">{selectedDuration}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDuration(Math.min(4, selectedDuration + 1))}
                          className="border-stone-300 text-stone-700 rounded-xl"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  {selectedSlot && (
                    <div className="border-t border-stone-200 pt-6">
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-stone-600">
                          <span>Base Price ({selectedDuration}h)</span>
                          <span>৳{turf.price * selectedDuration}</span>
                        </div>
                        {timeSlots.find(s => s.time === selectedSlot)?.prime && (
                          <div className="flex justify-between text-stone-600">
                            <span>Prime Time (50%)</span>
                            <span>৳{(turf.price * selectedDuration * 0.5)}</span>
                          </div>
                        )}
                        <div className="border-t border-stone-200 pt-3">
                          <div className="flex justify-between text-stone-900 font-bold text-lg">
                            <span>Total</span>
                            <span className="text-lime-600">৳{calculateTotal()}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleBooking}
                        disabled={isBooking || !isAuthenticated}
                        className="w-full bg-lime-400 hover:bg-lime-500 text-stone-900 font-semibold py-4 rounded-2xl"
                      >
                        {isBooking ? 'Processing...' : isAuthenticated ? 'Reserve Now' : 'Login to Book'}
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
