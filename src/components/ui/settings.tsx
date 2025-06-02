
import React, { useState } from 'react';
import { X, User, Shield, Bell, CreditCard, Globe, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsComponent = ({ isOpen, onClose }: SettingsProps) => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false
    },
    privacy: {
      profileVisibility: true,
      showActivity: true,
      showStats: false
    },
    preferences: {
      darkMode: false,
      language: 'en',
      timezone: 'Asia/Dhaka'
    }
  });

  const updateNotificationSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const updatePrivacySetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const updatePreferenceSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-4xl h-[700px] bg-white/95 backdrop-blur-md border-gray-200/50">
        <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-gray-200/50">
          <h3 className="text-xl font-semibold text-gray-800">Settings</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="p-0 h-[calc(100%-88px)]">
          <Tabs defaultValue="profile" className="h-full flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200/50 bg-gray-50/30">
              <TabsList className="flex flex-col h-full w-full bg-transparent p-4 space-y-2">
                <TabsTrigger value="profile" className="w-full justify-start rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="w-full justify-start rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Bell className="w-4 h-4 mr-3" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="w-full justify-start rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Shield className="w-4 h-4 mr-3" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="billing" className="w-full justify-start rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <CreditCard className="w-4 h-4 mr-3" />
                  Billing
                </TabsTrigger>
                <TabsTrigger value="preferences" className="w-full justify-start rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Globe className="w-4 h-4 mr-3" />
                  Preferences
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <TabsContent value="profile" className="m-0 p-6 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h4>
                  
                  <div className="flex items-center space-x-6 mb-6">
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl">
                        AR
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl mb-2">
                        Change Photo
                      </Button>
                      <p className="text-sm text-gray-600">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 space-y-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                      <Input id="firstName" defaultValue="Ahmed" className="rounded-xl mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                      <Input id="lastName" defaultValue="Rahman" className="rounded-xl mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700">Email</Label>
                      <Input id="email" type="email" defaultValue="ahmed@example.com" className="rounded-xl mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-700">Phone</Label>
                      <Input id="phone" defaultValue="+880 1711-123456" className="rounded-xl mt-1" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="m-0 p-6 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h4>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-gray-800 font-medium">Email Notifications</h5>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) => updateNotificationSetting('email', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-gray-800 font-medium">Push Notifications</h5>
                        <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                      </div>
                      <Switch
                        checked={settings.notifications.push}
                        onCheckedChange={(checked) => updateNotificationSetting('push', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-gray-800 font-medium">SMS Notifications</h5>
                        <p className="text-sm text-gray-600">Receive important updates via SMS</p>
                      </div>
                      <Switch
                        checked={settings.notifications.sms}
                        onCheckedChange={(checked) => updateNotificationSetting('sms', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-gray-800 font-medium">Marketing Communications</h5>
                        <p className="text-sm text-gray-600">Receive promotional offers and updates</p>
                      </div>
                      <Switch
                        checked={settings.notifications.marketing}
                        onCheckedChange={(checked) => updateNotificationSetting('marketing', checked)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="privacy" className="m-0 p-6 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Privacy Settings</h4>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-gray-800 font-medium">Profile Visibility</h5>
                        <p className="text-sm text-gray-600">Make your profile visible to other players</p>
                      </div>
                      <Switch
                        checked={settings.privacy.profileVisibility}
                        onCheckedChange={(checked) => updatePrivacySetting('profileVisibility', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-gray-800 font-medium">Show Activity Status</h5>
                        <p className="text-sm text-gray-600">Let others see when you're online</p>
                      </div>
                      <Switch
                        checked={settings.privacy.showActivity}
                        onCheckedChange={(checked) => updatePrivacySetting('showActivity', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-gray-800 font-medium">Show Statistics</h5>
                        <p className="text-sm text-gray-600">Display your game statistics publicly</p>
                      </div>
                      <Switch
                        checked={settings.privacy.showStats}
                        onCheckedChange={(checked) => updatePrivacySetting('showStats', checked)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="billing" className="m-0 p-6 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Billing & Subscription</h4>
                  
                  <Card className="bg-emerald-50 border-emerald-200 rounded-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-emerald-800 font-medium">Premium Plan</h5>
                          <p className="text-sm text-emerald-600">Active until July 15, 2024</p>
                        </div>
                        <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-100 rounded-xl">
                          Manage Plan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <h5 className="text-gray-800 font-medium">Payment Method</h5>
                    <Card className="border-gray-200 rounded-xl">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">VISA</span>
                            </div>
                            <div>
                              <p className="text-gray-800 font-medium">•••• •••• •••• 4242</p>
                              <p className="text-sm text-gray-600">Expires 12/25</p>
                            </div>
                          </div>
                          <Button variant="outline" className="rounded-xl">Edit</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="m-0 p-6 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">App Preferences</h4>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-gray-800 font-medium">Dark Mode</h5>
                        <p className="text-sm text-gray-600">Switch to dark theme</p>
                      </div>
                      <Switch
                        checked={settings.preferences.darkMode}
                        onCheckedChange={(checked) => updatePreferenceSetting('darkMode', checked)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="language" className="text-gray-700 font-medium">Language</Label>
                      <select 
                        id="language"
                        className="mt-2 w-full p-2 border border-gray-300 rounded-xl bg-white"
                        value={settings.preferences.language}
                        onChange={(e) => updatePreferenceSetting('language', e.target.value)}
                      >
                        <option value="en">English</option>
                        <option value="bn">বাংলা</option>
                        <option value="hi">हिन्दी</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="timezone" className="text-gray-700 font-medium">Timezone</Label>
                      <select 
                        id="timezone"
                        className="mt-2 w-full p-2 border border-gray-300 rounded-xl bg-white"
                        value={settings.preferences.timezone}
                        onChange={(e) => updatePreferenceSetting('timezone', e.target.value)}
                      >
                        <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                        <option value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</option>
                        <option value="UTC">UTC (GMT+0)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
