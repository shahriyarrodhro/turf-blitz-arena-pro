
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Building, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('login');
  const [userType, setUserType] = useState('player');

  const handleLogin = (role: string) => {
    // Simulate login and redirect based on role
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'turf-owner':
        navigate('/turf-owner');
        break;
      default:
        navigate('/player');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-stone-600 hover:text-stone-900 p-2 rounded-2xl"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white border border-stone-200 rounded-3xl shadow-lg">
            <CardHeader className="text-center pb-6">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <User className="w-8 h-8 text-stone-900" />
              </motion.div>
              <CardTitle className="text-2xl font-bold text-stone-900">
                {authMode === 'login' ? 'Welcome Back' : 'Join TurfMaster'}
              </CardTitle>
              <CardDescription className="text-stone-600">
                {authMode === 'login' 
                  ? 'Sign in to book turfs and join tournaments' 
                  : 'Create an account to get started'
                }
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={authMode} onValueChange={setAuthMode} className="mb-6">
                <TabsList className="grid w-full grid-cols-2 bg-stone-100 rounded-2xl p-1">
                  <TabsTrigger 
                    value="login" 
                    className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="register" 
                    className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-6 mt-6">
                  {/* Demo Login Buttons */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-stone-700 mb-3">Demo Accounts:</h3>
                    
                    <Button
                      onClick={() => handleLogin('player')}
                      variant="outline"
                      className="w-full justify-start border-stone-300 hover:bg-stone-50 rounded-2xl py-3"
                    >
                      <User className="w-4 h-4 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Player Demo</div>
                        <div className="text-xs text-stone-600">player@example.com</div>
                      </div>
                    </Button>

                    <Button
                      onClick={() => handleLogin('turf-owner')}
                      variant="outline"
                      className="w-full justify-start border-stone-300 hover:bg-stone-50 rounded-2xl py-3"
                    >
                      <Building className="w-4 h-4 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Turf Owner Demo</div>
                        <div className="text-xs text-stone-600">turf@example.com</div>
                      </div>
                    </Button>

                    <Button
                      onClick={() => handleLogin('admin')}
                      variant="outline"
                      className="w-full justify-start border-stone-300 hover:bg-stone-50 rounded-2xl py-3"
                    >
                      <User className="w-4 h-4 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Admin Demo</div>
                        <div className="text-xs text-stone-600">admin@example.com</div>
                      </div>
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-stone-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-stone-500">Or continue with</span>
                    </div>
                  </div>

                  {/* Regular Login Form */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-stone-700">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="mt-1 border-stone-300 rounded-2xl py-3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-stone-700">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="mt-1 border-stone-300 rounded-2xl py-3"
                      />
                    </div>
                    <Button 
                      onClick={() => handleLogin('player')}
                      className="w-full bg-lime-400 hover:bg-lime-500 text-stone-900 font-semibold rounded-2xl py-3"
                    >
                      Sign In
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="register" className="space-y-6 mt-6">
                  {/* User Type Selection */}
                  <div>
                    <Label className="text-stone-700 mb-3 block">I want to join as:</Label>
                    <Select value={userType} onValueChange={setUserType}>
                      <SelectTrigger className="border-stone-300 rounded-2xl py-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-stone-200 rounded-2xl">
                        <SelectItem value="player">Player</SelectItem>
                        <SelectItem value="turf-owner">Turf Owner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Registration Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="firstName" className="text-stone-700">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="mt-1 border-stone-300 rounded-2xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-stone-700">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          className="mt-1 border-stone-300 rounded-2xl"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-stone-700">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="mt-1 border-stone-300 rounded-2xl"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-stone-700">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+880 1xxx-xxxxxx"
                        className="mt-1 border-stone-300 rounded-2xl"
                      />
                    </div>

                    {userType === 'player' && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="age" className="text-stone-700">Age</Label>
                            <Input
                              id="age"
                              type="number"
                              placeholder="25"
                              className="mt-1 border-stone-300 rounded-2xl"
                            />
                          </div>
                          <div>
                            <Label htmlFor="city" className="text-stone-700">City</Label>
                            <Select>
                              <SelectTrigger className="border-stone-300 rounded-2xl">
                                <SelectValue placeholder="Select city" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-stone-200 rounded-2xl">
                                <SelectItem value="dhaka">Dhaka</SelectItem>
                                <SelectItem value="chittagong">Chittagong</SelectItem>
                                <SelectItem value="sylhet">Sylhet</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    {userType === 'turf-owner' && (
                      <>
                        <div>
                          <Label htmlFor="turfName" className="text-stone-700">Turf Name</Label>
                          <Input
                            id="turfName"
                            placeholder="Champions Arena"
                            className="mt-1 border-stone-300 rounded-2xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location" className="text-stone-700">Location</Label>
                          <Input
                            id="location"
                            placeholder="Dhanmondi, Dhaka"
                            className="mt-1 border-stone-300 rounded-2xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="turfType" className="text-stone-700">Turf Type</Label>
                          <Select>
                            <SelectTrigger className="border-stone-300 rounded-2xl">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-stone-200 rounded-2xl">
                              <SelectItem value="5v5">5v5</SelectItem>
                              <SelectItem value="7v7">7v7</SelectItem>
                              <SelectItem value="11v11">11v11</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    <div>
                      <Label htmlFor="password" className="text-stone-700">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        className="mt-1 border-stone-300 rounded-2xl"
                      />
                    </div>

                    <Button 
                      onClick={() => handleLogin(userType === 'turf-owner' ? 'turf-owner' : 'player')}
                      className="w-full bg-lime-400 hover:bg-lime-500 text-stone-900 font-semibold rounded-2xl py-3"
                    >
                      Create Account
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="text-center text-sm text-stone-600">
                By continuing, you agree to our{' '}
                <a href="#" className="text-lime-600 hover:underline font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-lime-600 hover:underline font-medium">
                  Privacy Policy
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
