
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, DollarSign, Settings, Plus, Edit, Trash2, Upload, Star, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export const TurfManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAddTurfOpen, setIsAddTurfOpen] = useState(false);
  const [isEditTurfOpen, setIsEditTurfOpen] = useState(false);
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [turfs, setTurfs] = useState([]);
  const [editingSlot, setEditingSlot] = useState(null);

  // Form states
  const [newTurf, setNewTurf] = useState({
    name: '',
    location: '',
    type: '11v11 Football Field',
    description: '',
    price: '',
    amenities: '',
    status: 'Open'
  });

  const [newSlot, setNewSlot] = useState({
    startTime: '',
    endTime: '',
    price: '',
    status: 'available'
  });

  useEffect(() => {
    loadOwnerTurfs();
  }, [user]);

  const loadOwnerTurfs = () => {
    const allTurfs = JSON.parse(localStorage.getItem('turfs') || '[]');
    const ownerTurfs = allTurfs.filter(turf => turf.ownerId === user?.id);
    setTurfs(ownerTurfs);
    if (ownerTurfs.length > 0 && !selectedTurf) {
      setSelectedTurf(ownerTurfs[0]);
    }
  };

  const handleAddTurf = () => {
    if (!newTurf.name || !newTurf.location || !newTurf.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const turfData = {
      id: Date.now().toString(),
      ...newTurf,
      price: parseInt(newTurf.price),
      amenities: newTurf.amenities.split(',').map(a => a.trim()).filter(a => a),
      ownerId: user?.id,
      ownerName: user?.name,
      rating: 4.5,
      totalReviews: 0,
      timeSlots: [],
      images: ["/placeholder.svg"],
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const allTurfs = JSON.parse(localStorage.getItem('turfs') || '[]');
    allTurfs.push(turfData);
    localStorage.setItem('turfs', JSON.stringify(allTurfs));

    // Update state
    setTurfs(prev => [...prev, turfData]);
    setSelectedTurf(turfData);
    
    // Reset form and close dialog
    setNewTurf({
      name: '',
      location: '',
      type: '11v11 Football Field',
      description: '',
      price: '',
      amenities: '',
      status: 'Open'
    });
    setIsAddTurfOpen(false);

    toast({
      title: "Success",
      description: "Turf added successfully!"
    });
  };

  const handleUpdateTurf = () => {
    if (!selectedTurf) return;

    const allTurfs = JSON.parse(localStorage.getItem('turfs') || '[]');
    const updatedTurfs = allTurfs.map(turf => 
      turf.id === selectedTurf.id ? selectedTurf : turf
    );
    localStorage.setItem('turfs', JSON.stringify(updatedTurfs));
    
    loadOwnerTurfs();
    setIsEditTurfOpen(false);
    
    toast({
      title: "Success",
      description: "Turf updated successfully!"
    });
  };

  const handleDeleteTurf = (turfId) => {
    const allTurfs = JSON.parse(localStorage.getItem('turfs') || '[]');
    const updatedTurfs = allTurfs.filter(turf => turf.id !== turfId);
    localStorage.setItem('turfs', JSON.stringify(updatedTurfs));
    
    loadOwnerTurfs();
    if (selectedTurf?.id === turfId) {
      setSelectedTurf(turfs.find(t => t.id !== turfId) || null);
    }
    
    toast({
      title: "Success",
      description: "Turf deleted successfully!"
    });
  };

  const handleAddTimeSlot = () => {
    if (!newSlot.startTime || !newSlot.endTime || !newSlot.price) {
      toast({
        title: "Error",
        description: "Please fill in all slot details",
        variant: "destructive"
      });
      return;
    }

    if (!selectedTurf) {
      toast({
        title: "Error",
        description: "Please select a turf first",
        variant: "destructive"
      });
      return;
    }

    const slotData = {
      id: Date.now().toString(),
      time: `${newSlot.startTime}-${newSlot.endTime}`,
      price: parseInt(newSlot.price),
      status: newSlot.status,
      bookedBy: null
    };

    // Update turf with new slot
    const allTurfs = JSON.parse(localStorage.getItem('turfs') || '[]');
    const updatedTurfs = allTurfs.map(turf => {
      if (turf.id === selectedTurf.id) {
        return {
          ...turf,
          timeSlots: [...(turf.timeSlots || []), slotData]
        };
      }
      return turf;
    });
    
    localStorage.setItem('turfs', JSON.stringify(updatedTurfs));
    loadOwnerTurfs();
    
    // Reset form
    setNewSlot({
      startTime: '',
      endTime: '',
      price: '',
      status: 'available'
    });
    setIsAddSlotOpen(false);

    toast({
      title: "Success",
      description: "Time slot added successfully!"
    });
  };

  const handleDeleteSlot = (slotId) => {
    if (!selectedTurf) return;

    const allTurfs = JSON.parse(localStorage.getItem('turfs') || '[]');
    const updatedTurfs = allTurfs.map(turf => {
      if (turf.id === selectedTurf.id) {
        return {
          ...turf,
          timeSlots: turf.timeSlots?.filter(slot => slot.id !== slotId) || []
        };
      }
      return turf;
    });
    
    localStorage.setItem('turfs', JSON.stringify(updatedTurfs));
    loadOwnerTurfs();

    toast({
      title: "Success",
      description: "Time slot deleted successfully!"
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'booked': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'maintenance': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Turf Selection */}
      {turfs.length > 0 && (
        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center text-xl">
              <MapPin className="w-6 h-6 mr-3 text-emerald-600" />
              Select Turf to Manage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {turfs.map((turf) => (
                <div 
                  key={turf.id}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedTurf?.id === turf.id 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-white/20 bg-white/50 hover:border-emerald-300'
                  }`}
                  onClick={() => setSelectedTurf(turf)}
                >
                  <h3 className="font-semibold text-gray-800 mb-2">{turf.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{turf.location}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 font-semibold">৳{turf.price}/hour</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTurf(turf.id);
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Turf */}
      <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-800 flex items-center text-xl">
              <Plus className="w-6 h-6 mr-3 text-emerald-600" />
              Add New Turf
            </CardTitle>
            <Dialog open={isAddTurfOpen} onOpenChange={setIsAddTurfOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Turf
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Turf</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Turf Name *</Label>
                      <Input 
                        id="name" 
                        value={newTurf.name}
                        onChange={(e) => setNewTurf(prev => ({...prev, name: e.target.value}))}
                        className="rounded-xl" 
                        placeholder="Champions Arena"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input 
                        id="location" 
                        value={newTurf.location}
                        onChange={(e) => setNewTurf(prev => ({...prev, location: e.target.value}))}
                        className="rounded-xl" 
                        placeholder="Gulshan, Dhaka"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Turf Type</Label>
                      <Select value={newTurf.type} onValueChange={(value) => setNewTurf(prev => ({...prev, type: value}))}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="11v11 Football Field">11v11 Football Field</SelectItem>
                          <SelectItem value="7v7 Football Field">7v7 Football Field</SelectItem>
                          <SelectItem value="5v5 Football Field">5v5 Football Field</SelectItem>
                          <SelectItem value="Cricket Ground">Cricket Ground</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Hourly Price (৳) *</Label>
                      <Input 
                        id="price" 
                        type="number"
                        value={newTurf.price}
                        onChange={(e) => setNewTurf(prev => ({...prev, price: e.target.value}))}
                        className="rounded-xl" 
                        placeholder="2500"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      value={newTurf.description}
                      onChange={(e) => setNewTurf(prev => ({...prev, description: e.target.value}))}
                      className="rounded-xl" 
                      placeholder="Premium football turf with natural grass..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="amenities">Amenities (comma separated)</Label>
                    <Input 
                      id="amenities" 
                      value={newTurf.amenities}
                      onChange={(e) => setNewTurf(prev => ({...prev, amenities: e.target.value}))}
                      className="rounded-xl" 
                      placeholder="Parking, Changing Room, Water, First Aid"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddTurfOpen(false)} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button onClick={handleAddTurf} className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
                      Add Turf
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {turfs.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-4">No turfs added yet</p>
              <p className="text-sm text-gray-400">Add your first turf to start managing bookings</p>
            </div>
          ) : (
            <p className="text-gray-600">Manage your existing turfs above or add a new one.</p>
          )}
        </CardContent>
      </Card>

      {/* Time Slots Management */}
      {selectedTurf && (
        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-800 flex items-center text-xl">
                <Clock className="w-6 h-6 mr-3 text-emerald-600" />
                Time Slots - {selectedTurf.name}
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
                        <Input 
                          id="startTime" 
                          type="time" 
                          value={newSlot.startTime}
                          onChange={(e) => setNewSlot(prev => ({...prev, startTime: e.target.value}))}
                          className="rounded-xl" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="endTime">End Time</Label>
                        <Input 
                          id="endTime" 
                          type="time" 
                          value={newSlot.endTime}
                          onChange={(e) => setNewSlot(prev => ({...prev, endTime: e.target.value}))}
                          className="rounded-xl" 
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="slotPrice">Price (৳)</Label>
                      <Input 
                        id="slotPrice" 
                        type="number" 
                        value={newSlot.price}
                        onChange={(e) => setNewSlot(prev => ({...prev, price: e.target.value}))}
                        placeholder="2500" 
                        className="rounded-xl" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="slotStatus">Status</Label>
                      <Select value={newSlot.status} onValueChange={(value) => setNewSlot(prev => ({...prev, status: value}))}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
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
                      <Button onClick={handleAddTimeSlot} className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
                        Add Slot
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {selectedTurf.timeSlots && selectedTurf.timeSlots.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedTurf.timeSlots.map((slot) => (
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
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-1 h-auto text-red-600"
                          onClick={() => handleDeleteSlot(slot.id)}
                        >
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
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">No time slots added yet</p>
                <p className="text-sm text-gray-400">Add time slots to allow bookings</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Turf Information Edit */}
      {selectedTurf && (
        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-800 flex items-center text-xl">
                <Settings className="w-6 h-6 mr-3 text-emerald-600" />
                Turf Information - {selectedTurf.name}
              </CardTitle>
              <Button 
                onClick={handleUpdateTurf}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editName">Turf Name</Label>
                  <Input 
                    id="editName" 
                    value={selectedTurf.name}
                    onChange={(e) => setSelectedTurf(prev => ({...prev, name: e.target.value}))}
                    className="rounded-xl" 
                  />
                </div>
                <div>
                  <Label htmlFor="editLocation">Location</Label>
                  <Input 
                    id="editLocation" 
                    value={selectedTurf.location}
                    onChange={(e) => setSelectedTurf(prev => ({...prev, location: e.target.value}))}
                    className="rounded-xl" 
                  />
                </div>
                <div>
                  <Label htmlFor="editPrice">Hourly Price (৳)</Label>
                  <Input 
                    id="editPrice" 
                    type="number"
                    value={selectedTurf.price}
                    onChange={(e) => setSelectedTurf(prev => ({...prev, price: parseInt(e.target.value)}))}
                    className="rounded-xl" 
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editDescription">Description</Label>
                  <Textarea 
                    id="editDescription" 
                    value={selectedTurf.description}
                    onChange={(e) => setSelectedTurf(prev => ({...prev, description: e.target.value}))}
                    className="rounded-xl" 
                  />
                </div>
                <div>
                  <Label htmlFor="editAmenities">Amenities</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTurf.amenities?.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="rounded-xl">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
