
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, MapPin, Phone, Mail, Zap, Users, Building, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [userType, setUserType] = useState('player');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const demoCredentials = {
    admin: { email: 'admin@example.com', password: 'admin123' },
    turf_owner: { email: 'turf@example.com', password: 'turf123' },
    player: { email: 'player@example.com', password: 'player123' }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful!",
        description: "Welcome back to TurfMaster",
      });
      
      // Redirect based on user type
      if (userType === 'admin') {
        navigate('/admin');
      } else if (userType === 'turf_owner') {
        navigate('/turf-owner');
      } else {
        navigate('/player');
      }
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration Successful!",
        description: "Welcome to TurfMaster community",
      });
      navigate('/player');
    }, 1500);
  };

  const handleDemoLogin = (type: keyof typeof demoCredentials) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Demo Login Successful!",
        description: `Logged in as ${type.replace('_', ' ')}`,
      });
      
      if (type === 'admin') {
        navigate('/admin');
      } else if (type === 'turf_owner') {
        navigate('/turf-owner');
      } else {
        navigate('/player');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="absolute top-6 left-6 text-slate-400 hover:text-lime-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-slate-900" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
                TurfMaster
              </span>
            </div>
            <p className="text-slate-400">Join the future of sports booking</p>
          </div>

          {/* Demo Credentials */}
          <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50 mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lime-400 text-sm">Demo Credentials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('admin')}
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  disabled={isLoading}
                >
                  <Building className="w-3 h-3 mr-1" />
                  Admin
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('turf_owner')}
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                  disabled={isLoading}
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  Turf Owner
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('player')}
                  className="border-lime-500/50 text-lime-400 hover:bg-lime-500/10"
                  disabled={isLoading}
                >
                  <Play className="w-3 h-3 mr-1" />
                  Player
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Auth Tabs */}
          <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                  <TabsTrigger value="login" className="data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-400">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-400">
                    Register
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userType" className="text-slate-300">Login as</Label>
                    <Select value={userType} onValueChange={setUserType}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="player">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Player
                          </div>
                        </SelectItem>
                        <SelectItem value="turf_owner">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            Turf Owner
                          </div>
                        </SelectItem>
                        <SelectItem value="admin">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-2" />
                            Admin
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-300">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="registerType" className="text-slate-300">Register as</Label>
                    <Select value={userType} onValueChange={setUserType}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="player">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Player
                          </div>
                        </SelectItem>
                        <SelectItem value="turf_owner">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            Turf Owner
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-slate-300">
                        {userType === 'turf_owner' ? 'Turf Name' : 'Full Name'}
                      </Label>
                      <Input
                        id="fullName"
                        placeholder={userType === 'turf_owner' ? 'Your Turf Name' : 'Your Full Name'}
                        required
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+880 1xxx-xxxxxx"
                        required
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    {userType === 'turf_owner' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-slate-300">Location</Label>
                          <Input
                            id="location"
                            placeholder="City, Area"
                            required
                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="turfType" className="text-slate-300">Turf Type</Label>
                          <Select>
                            <SelectTrigger className="bg-slate-700/50 border-slate-600">
                              <SelectValue placeholder="Select turf type" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="5v5">5v5</SelectItem>
                              <SelectItem value="7v7">7v7</SelectItem>
                              <SelectItem value="11v11">11v11</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {userType === 'player' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="age" className="text-slate-300">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            placeholder="25"
                            required
                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-slate-300">City</Label>
                          <Input
                            id="city"
                            placeholder="Dhaka"
                            required
                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                          />
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-300">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 hover:from-lime-500 hover:to-emerald-600"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
