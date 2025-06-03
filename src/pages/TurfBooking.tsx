import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Star, Users, Clock, Wifi, Car, ShowerHead, Calendar, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/ui/header';
import { PaymentModal } from '@/components/ui/payment-modal';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import { usePayment, PaymentMethod } from '@/contexts/PaymentContext';
import { toast } from '@/hooks/use-toast';

const TurfBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { createBooking } = useBooking();
  const { getPaymentByBooking } = usePayment();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [teamName, setTeamName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingBookingData, setPendingBookingData] = useState<any>(null);

  const turf = {
    id: id || '1',
    name: 'Champions Arena',
    location: 'Gulshan 2, Dhaka',
    rating: 4.8,
    reviews: 124,
    price: 2500,
    images: ['/placeholder.svg'],
    amenities: ['WiFi', 'Parking', 'Changing Room', 'Flood Lights'],
    description: 'Premium football turf with state-of-the-art facilities...',
    owner: 'Champions Sports Complex',
    contact: '+880 1711-123456'
  };

  const availableSlots = [
    '06:00', '07:00', '08:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const handleBooking = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to make a booking",
        variant: "destructive"
      });
      navigate('/auth?returnTo=' + encodeURIComponent(window.location.pathname));
      return;
    }

    if (!selectedDate || !selectedTime || !teamName || !contactNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Store booking data and show payment modal
    setPendingBookingData({
      turfId: turf.id,
      turfName: turf.name,
      date: selectedDate,
      time: selectedTime,
      duration,
      playerName: user.name,
      playerEmail: user.email,
      totalAmount: turf.price * duration,
      status: 'pending'
    });
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = async (paymentId: string, method: PaymentMethod) => {
    setIsBooking(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const bookingId = createBooking({
        ...pendingBookingData,
        paymentId,
        status: method === 'sslcommerz' ? 'confirmed' : 'pending'
      });

      toast({
        title: "Booking Created!",
        description: `Your booking has been created. Booking ID: ${bookingId}`,
      });

      // Reset form
      setSelectedDate('');
      setSelectedTime('');
      setTeamName('');
      setContactNumber('');
      setSpecialRequests('');
      setPendingBookingData(null);

      // Navigate to dashboard
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/turfs')}
          className="mb-6 backdrop-blur-sm bg-white/60 hover:bg-white/80 rounded-xl border border-white/20 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Turfs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Turf Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl overflow-hidden shadow-xl">
              <div className="aspect-video bg-gradient-to-r from-emerald-100 to-teal-100 flex items-center justify-center">
                <img 
                  src={turf.images[0]} 
                  alt={turf.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Turf Info */}
            <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-800">{turf.name}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{turf.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm font-medium">{turf.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({turf.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">৳{turf.price}</div>
                    <div className="text-sm text-gray-500">per hour</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {turf.amenities.map((amenity, index) => (
                      <Badge key={index} className="bg-emerald-100 text-emerald-700 border border-emerald-200">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600">{turf.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                  Book This Turf
                </CardTitle>
                <CardDescription>
                  Fill in the details to confirm your booking
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="rounded-xl border-white/30 bg-white/20 focus:bg-white/40"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      max="4"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                      className="rounded-xl border-white/30 bg-white/20 focus:bg-white/40"
                    />
                  </div>
                </div>

                <div>
                  <Label>Available Time Slots</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedTime === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(slot)}
                        className={`rounded-xl transition-all duration-300 ${
                          selectedTime === slot 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
                            : 'border-white/30 bg-white/20 hover:bg-white/40'
                        }`}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input
                    id="teamName"
                    placeholder="Enter your team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="rounded-xl border-white/30 bg-white/20 focus:bg-white/40"
                  />
                </div>

                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    placeholder="+880 1XXX-XXXXXX"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="rounded-xl border-white/30 bg-white/20 focus:bg-white/40"
                  />
                </div>

                <div>
                  <Label htmlFor="requests">Special Requests (Optional)</Label>
                  <Textarea
                    id="requests"
                    placeholder="Any special requirements..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="rounded-xl border-white/30 bg-white/20 focus:bg-white/40"
                  />
                </div>

                {/* Booking Summary */}
                {selectedDate && selectedTime && (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Booking Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">{selectedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{duration} hour(s)</span>
                      </div>
                      <div className="flex justify-between border-t border-emerald-200 pt-2 mt-2">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-emerald-600">৳{turf.price * duration}</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleBooking}
                  disabled={isBooking || !selectedDate || !selectedTime || !teamName || !contactNumber}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl py-3 shadow-lg transition-all duration-300"
                >
                  {isBooking ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Proceed to Payment
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setPendingBookingData(null);
        }}
        amount={pendingBookingData?.totalAmount || 0}
        title="Complete Your Booking"
        description="Choose your payment method to confirm the turf booking"
        onPaymentComplete={handlePaymentComplete}
        bookingId={pendingBookingData?.id}
      />
    </div>
  );
};

export default TurfBooking;
