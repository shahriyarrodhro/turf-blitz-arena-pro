
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Star, Users, Clock, Wifi, Car, ShowerHead, Calendar, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/ui/header';

const TurfDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const turf = {
    id: id || '1',
    name: 'Champions Arena',
    location: 'Gulshan 2, Dhaka',
    rating: 4.8,
    reviews: 124,
    price: 2500,
    images: ['/placeholder.svg'],
    amenities: ['WiFi', 'Parking', 'Changing Room', 'Flood Lights'],
    description: 'Premium football turf with state-of-the-art facilities. Our field features the latest artificial grass technology, professional lighting system, and comprehensive facilities including changing rooms, parking, and refreshment area.',
    owner: 'Champions Sports Complex',
    contact: '+880 1711-123456',
    size: 'Full Size (11v11)',
    surface: 'Artificial Grass',
    timings: '6:00 AM - 11:00 PM'
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
                    <CardTitle className="text-3xl font-bold text-gray-800">{turf.name}</CardTitle>
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
                    <div className="text-3xl font-bold text-emerald-600">৳{turf.price}</div>
                    <div className="text-sm text-gray-500">per hour</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{turf.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Field Size</h4>
                    <p className="text-gray-600">{turf.size}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Surface</h4>
                    <p className="text-gray-600">{turf.surface}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Operating Hours</h4>
                    <p className="text-gray-600">{turf.timings}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Contact</h4>
                    <p className="text-gray-600">{turf.contact}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {turf.amenities.map((amenity, index) => (
                      <Badge key={index} className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-sm px-3 py-1">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                  Quick Booking
                </CardTitle>
                <CardDescription>
                  Ready to book this turf?
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Button
                  onClick={() => navigate(`/turf/${turf.id}/book`)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl py-3 shadow-lg transition-all duration-300"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
                
                <div className="text-center text-sm text-gray-600">
                  <p>Owned by <span className="font-medium">{turf.owner}</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Available Today */}
            <Card className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-800">Available Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {['18:00', '19:00', '20:00', '21:00'].map((time) => (
                    <Badge key={time} variant="outline" className="justify-center py-2 text-emerald-700 border-emerald-200">
                      {time}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurfDetails;
