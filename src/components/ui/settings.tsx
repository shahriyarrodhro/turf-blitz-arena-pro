
import React, { useState } from 'react';
import { X, User, Bell, Shield, Palette, Globe, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsComponent = ({ isOpen, onClose }: SettingsProps) => {
  const { user, updateUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profilePublic: true,
      showOnlineStatus: true
    },
    theme: 'light'
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (category: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user context
      updateUser({
        name: formData.name,
        email: formData.email
      });
      
      // Save to localStorage (in real app, this would be API call)
      localStorage.setItem('turfx_settings', JSON.stringify(formData));
      
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-4xl h-[80vh] bg-white/95 backdrop-blur-md border-gray-200/50 mx-4 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-white/60 to-gray-50/60">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Settings</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent className="p-0 h-[calc(100%-80px)] overflow-y-auto">
          <Tabs defaultValue="profile" className="h-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100/50 rounded-none">
              <TabsTrigger value="profile" className="data-[state=active]:bg-white">Profile</TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-white">Notifications</TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-white">Privacy</TabsTrigger>
              <TabsTrigger value="appearance" className="data-[state=active]:bg-white">Appearance</TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="profile" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Profile Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="rounded-xl border-gray-200 bg-white/60"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="rounded-xl border-gray-200 bg-white/60"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+880 1XXX-XXXXXX"
                      className="rounded-xl border-gray-200 bg-white/60"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="w-full p-3 border border-gray-200 rounded-xl bg-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Notification Preferences</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="font-medium">Email Notifications</div>
                          <div className="text-sm text-gray-500">Receive notifications via email</div>
                        </div>
                      </div>
                      <Switch
                        checked={formData.notifications.email}
                        onCheckedChange={(checked) => handleNestedChange('notifications', 'email', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="font-medium">Push Notifications</div>
                          <div className="text-sm text-gray-500">Receive push notifications</div>
                        </div>
                      </div>
                      <Switch
                        checked={formData.notifications.push}
                        onCheckedChange={(checked) => handleNestedChange('notifications', 'push', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="font-medium">SMS Notifications</div>
                          <div className="text-sm text-gray-500">Receive notifications via SMS</div>
                        </div>
                      </div>
                      <Switch
                        checked={formData.notifications.sms}
                        onCheckedChange={(checked) => handleNestedChange('notifications', 'sms', checked)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Privacy Settings</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="font-medium">Public Profile</div>
                          <div className="text-sm text-gray-500">Make your profile visible to others</div>
                        </div>
                      </div>
                      <Switch
                        checked={formData.privacy.profilePublic}
                        onCheckedChange={(checked) => handleNestedChange('privacy', 'profilePublic', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="font-medium">Show Online Status</div>
                          <div className="text-sm text-gray-500">Let others see when you're online</div>
                        </div>
                      </div>
                      <Switch
                        checked={formData.privacy.showOnlineStatus}
                        onCheckedChange={(checked) => handleNestedChange('privacy', 'showOnlineStatus', checked)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Appearance</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Theme</Label>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {['light', 'dark', 'auto'].map((theme) => (
                          <Button
                            key={theme}
                            variant={formData.theme === theme ? "default" : "outline"}
                            onClick={() => handleInputChange('theme', theme)}
                            className="capitalize rounded-xl"
                          >
                            <Palette className="w-4 h-4 mr-2" />
                            {theme}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Save Button */}
              <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-gray-200/50 p-4 mt-8">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl py-3 shadow-lg transition-all duration-300"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
