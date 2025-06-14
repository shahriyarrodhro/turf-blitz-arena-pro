
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, DollarSign, Settings, Plus, Edit, Trash2, Upload, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const TurfManagement = () => {
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);
  const [isEditTurfOpen, setIsEditTurfOpen] = useState(false);

  const turfInfo = {
    name: "Champions Arena",
    location: "Gulshan, Dhaka",
    type: "11v11 Football Field",
    rating: 4.7,
    totalReviews: 234,
    status: "Open",
    description: "Premium football turf with natural grass and professional lighting system.",
    amenities: ["Parking", "Changing Room", "Water", "First Aid", "Security"],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  };

  const timeSlots = [
    { id: 1, time: "06:00-07:00", price: 2000, status: "available", bookedBy: null },
    { id: 2, time: "07:00-08:00", price: 2000, status: "available", bookedBy: null },
    { id: 3, time: "08:00-09:00", price: 2500, status: "booked", bookedBy: "Ahmed Rahman" },
    { id: 4, time: "09:00-10:00", price: 2500, status: "available", bookedBy: null },
    { id: 5, time: "10:00-11:00", price: 2500, status: "maintenance", bookedBy: null },
    { id: 6, time: "17:00-18:00", price: 3000, status: "booked", bookedBy: "Karim Hassan" },
    { id: 7, time: "18:00-19:00", price: 3000, status: "available", bookedBy: null },
    { id: 8, time: "19:00-20:00", price: 3500, status: "booked", bookedBy: "Rashid Ali" },
    { id: 9, time: "20:00-21:00", price: 3500, status: "available", bookedBy: null },
    { id: 10, time: "21:00-22:00", price: 3000, status: "available", bookedBy: null }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'booked': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'maintenance': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Turf Information */}
      <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-800 flex items-center text-xl">
              <MapPin className="w-6 h-6 mr-3 text-emerald-600" />
              Turf Information
            </CardTitle>
            <Dialog open={isEditTurfOpen} onOpenChange={setIsEditTurfOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-2xl">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Turf Information</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Turf Name</Label>
                      <Input id="name" defaultValue={turfInfo.name} className="rounded-xl" />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue={turfInfo.location} className="rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" defaultValue={turfInfo.description} className="rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="amenities">Amenities (comma separated)</Label>
                    <Input id="amenities" defaultValue={turfInfo.amenities.join(", ")} className="rounded-xl" />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditTurfOpen(false)} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button onClick={() => setIsEditTurfOpen(false)} className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{turfInfo.name}</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{turfInfo.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Settings className="w-4 h-4 mr-2" />
                  <span>{turfInfo.type}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>{turfInfo.rating} ({turfInfo.totalReviews} reviews)</span>
                </div>
                <Badge className={`${
                  turfInfo.status === 'Open' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                } border-none`}>
                  {turfInfo.status}
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {turfInfo.amenities.map((amenity, index) => (
                  <Badge key={index} variant="outline" className="rounded-xl">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-gray-600">{turfInfo.description}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">Turf Images</h4>
            <div className="flex space-x-4">
              {turfInfo.images.map((image, index) => (
                <div key={index} className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
              ))}
              <Button variant="outline" className="w-24 h-24 rounded-xl border-2 border-dashed">
                <Plus className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Slots Management */}
      <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-800 flex items-center text-xl">
              <Clock className="w-6 h-6 mr-3 text-emerald-600" />
              Time Slots & Pricing
            </CardTitle>
            <Dialog open={isAddSlotOpen} onOpenChange={setIsAddSlotOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Slot
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Time Slot</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input id="startTime" type="time" className="rounded-xl" />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input id="endTime" type="time" className="rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="price">Price (৳)</Label>
                    <Input id="price" type="number" placeholder="2500" className="rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddSlotOpen(false)} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddSlotOpen(false)} className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
                      Add Slot
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timeSlots.map((slot) => (
              <div key={slot.id} className="p-4 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-800">{slot.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1 h-auto text-red-600">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="font-semibold text-gray-800">৳{slot.price}</span>
                  </div>
                  
                  <Badge className={`${getStatusColor(slot.status)} w-full justify-center`}>
                    {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                  </Badge>
                  
                  {slot.bookedBy && (
                    <div className="text-xs text-gray-600">
                      Booked by: {slot.bookedBy}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Control */}
      <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-gray-800 flex items-center text-xl">
            <Settings className="w-6 h-6 mr-3 text-emerald-600" />
            Turf Status Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl">
            <div>
              <h3 className="font-medium text-gray-800">Turf Status</h3>
              <p className="text-sm text-gray-600">Control turf availability for bookings</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div>
            <Label htmlFor="statusMessage">Custom Status Message</Label>
            <Textarea 
              id="statusMessage" 
              placeholder="Enter a custom message for players (e.g., 'Temporary maintenance until 6 PM')"
              className="rounded-xl mt-2"
            />
          </div>
          
          <div className="flex space-x-4">
            <Button variant="outline" className="rounded-xl">
              Set to Maintenance
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
              Update Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
