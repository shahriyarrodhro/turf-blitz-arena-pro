
import React, { useState } from 'react';
import { X, User, Bell, Shield, Palette, Globe, Save, Camera, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsComponent = ({ isOpen, onClose }: SettingsProps) => {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile settings
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [matchUpdates, setMatchUpdates] = useState(true);
  const [teamInvites, setTeamInvites] = useState(true);
  const [tournamentNews, setTournamentNews] = useState(true);
  
  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [allowInvites, setAllowInvites] = useState(true);
  
  // Appearance settings
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('english');

  const bangladeshCities = [
    'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh',
    'Comilla', 'Narayanganj', 'Gazipur', 'Tongi', 'Bogra', 'Jessore'
  ];

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      await updateProfile({
        name,
        email,
        phone,
        location
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotifications = () => {
    // Save notification preferences (mock implementation)
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated",
    });
  };

  const handleSavePrivacy = () => {
    // Save privacy settings (mock implementation)
    toast({
      title: "Privacy Settings Saved",
      description: "Your privacy preferences have been updated",
    });
  };

  const handleSaveAppearance = () => {
    // Save appearance settings (mock implementation)
    toast({
      title: "Appearance Settings Saved",
      description: "Your appearance preferences have been updated",
    });
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[90vh] bg-white/95 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-white/30 bg-gradient-to-r from-white/50 to-white/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Settings</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-2xl hover:bg-red-50/80 hover:text-red-600 transition-all duration-300">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <div className="flex h-[calc(100%-100px)]">
          {/* Sidebar */}
          <div className="w-1/3 border-r border-white/30 bg-gradient-to-b from-white/40 to-white/20 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={`w-full justify-start rounded-2xl transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-blue-100/80 to-purple-100/80 text-blue-700 shadow-lg' 
                      : 'text-gray-700 hover:bg-white/40'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.label}
                </Button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-50/30 to-white/20">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 shadow-2xl">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold">
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <Button size="icon" className="absolute -bottom-2 -right-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                      <Camera className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mt-3">{user?.name}</h4>
                  <p className="text-gray-600 capitalize">{user?.role?.replace('-', ' ')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="pl-10 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm"
                        placeholder="+880 1XXX-XXXXXX"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger className="pl-10 rounded-2xl border-white/30 bg-white/50">
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                          {bangladeshCities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl py-3 shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Notification Channels</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/20">
                      <div>
                        <h5 className="font-medium text-gray-800">Email Notifications</h5>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/20">
                      <div>
                        <h5 className="font-medium text-gray-800">Push Notifications</h5>
                        <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                      </div>
                      <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/20">
                      <div>
                        <h5 className="font-medium text-gray-800">SMS Notifications</h5>
                        <p className="text-sm text-gray-600">Receive important updates via SMS</p>
                      </div>
                      <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Notification Types</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/20">
                      <div>
                        <h5 className="font-medium text-gray-800">Match Updates</h5>
                        <p className="text-sm text-gray-600">Get notified about match schedules and results</p>
                      </div>
                      <Switch checked={matchUpdates} onCheckedChange={setMatchUpdates} />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/20">
                      <div>
                        <h5 className="font-medium text-gray-800">Team Invites</h5>
                        <p className="text-sm text-gray-600">Receive team invitation notifications</p>
                      </div>
                      <Switch checked={teamInvites} onCheckedChange={setTeamInvites} />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/20">
                      <div>
                        <h5 className="font-medium text-gray-800">Tournament News</h5>
                        <p className="text-sm text-gray-600">Stay updated with tournament announcements</p>
                      </div>
                      <Switch checked={tournamentNews} onCheckedChange={setTournamentNews} />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleSaveNotifications}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl py-3 shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Notification Settings
                </Button>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Profile Visibility</h4>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white/50 rounded-2xl border border-white/20">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Who can see your profile?</label>
                      <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                        <SelectTrigger className="rounded-2xl border-white/30 bg-white/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Everyone</SelectItem>
                          <SelectItem value="friends">Friends Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/20">
                      <div>
                        <h5 className="font-medium text-gray-800">Show Email</h5>
                        <p className="text-sm text-gray-600">Allow others to see your email address</p>
                      </div>
                      <Switch checked={showEmail} onCheckedChange={setShowEmail} />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/20">
                      <div>
                        <h5 className="font-medium text-gray-800">Show Phone</h5>
                        <p className="text-sm text-gray-600">Allow others to see your phone number</p>
                      </div>
                      <Switch checked={showPhone} onCheckedChange={setShowPhone} />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/20">
                      <div>
                        <h5 className="font-medium text-gray-800">Allow Invites</h5>
                        <p className="text-sm text-gray-600">Allow others to invite you to teams and matches</p>
                      </div>
                      <Switch checked={allowInvites} onCheckedChange={setAllowInvites} />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleSavePrivacy}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-2xl py-3 shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Privacy Settings
                </Button>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Theme & Language</h4>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white/50 rounded-2xl border border-white/20">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                      <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger className="rounded-2xl border-white/30 bg-white/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light Mode</SelectItem>
                          <SelectItem value="dark">Dark Mode</SelectItem>
                          <SelectItem value="auto">Auto (System)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="p-4 bg-white/50 rounded-2xl border border-white/20">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="rounded-2xl border-white/30 bg-white/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="bangla">বাংলা (Bangla)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleSaveAppearance}
                  className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-2xl py-3 shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Appearance Settings
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
