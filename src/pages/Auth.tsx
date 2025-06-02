
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isLoading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const returnTo = searchParams.get('returnTo');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (returnTo) {
        navigate(returnTo);
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, navigate, returnTo]);

  const handleLogin = async (demoEmail?: string, demoPassword?: string) => {
    const loginEmail = demoEmail || email;
    const loginPassword = demoPassword || password;

    if (!loginEmail || !loginPassword) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }

    const success = await login(loginEmail, loginPassword);
    
    if (success) {
      toast({
        title: "Success",
        description: "Login successful!",
      });
      
      // Redirect to return URL or appropriate dashboard
      if (returnTo) {
        navigate(returnTo);
      } else {
        // Redirect based on role
        if (loginEmail === 'admin@example.com') {
          navigate('/admin');
        } else if (loginEmail === 'turf@example.com') {
          navigate('/turf-owner');
        } else {
          navigate('/player');
        }
      }
    } else {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background with Glassmorphism */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full opacity-60 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full opacity-60 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-200/20 to-orange-200/20 rounded-full opacity-40 blur-2xl"></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-gray-600 hover:text-gray-900 p-3 rounded-2xl backdrop-blur-sm bg-white/40 border border-white/20 hover:bg-white/60 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="backdrop-blur-md bg-white/70 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
            <CardHeader className="text-center pb-6 bg-gradient-to-b from-white/50 to-transparent">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <User className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Welcome to TurfX
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to book turfs and join tournaments
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              {/* Demo Login Buttons */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Accounts:</h3>
                
                <Button
                  onClick={() => handleLogin('player@example.com', 'player123')}
                  variant="outline"
                  disabled={isLoading}
                  className="w-full justify-start border-white/30 hover:bg-white/60 rounded-2xl py-3 backdrop-blur-sm bg-white/20 hover:shadow-lg transition-all duration-300"
                >
                  <User className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Player Demo</div>
                    <div className="text-xs text-gray-600">player@example.com</div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleLogin('turf@example.com', 'turf123')}
                  variant="outline"
                  disabled={isLoading}
                  className="w-full justify-start border-white/30 hover:bg-white/60 rounded-2xl py-3 backdrop-blur-sm bg-white/20 hover:shadow-lg transition-all duration-300"
                >
                  <Mail className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Turf Owner Demo</div>
                    <div className="text-xs text-gray-600">turf@example.com</div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleLogin('admin@example.com', 'admin123')}
                  variant="outline"
                  disabled={isLoading}
                  className="w-full justify-start border-white/30 hover:bg-white/60 rounded-2xl py-3 backdrop-blur-sm bg-white/20 hover:shadow-lg transition-all duration-300"
                >
                  <User className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Admin Demo</div>
                    <div className="text-xs text-gray-600">admin@example.com</div>
                  </div>
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full text-gray-500">Or sign in manually</span>
                </div>
              </div>

              {/* Manual Login Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 border-white/30 rounded-2xl py-3 backdrop-blur-sm bg-white/20 focus:bg-white/40 transition-all duration-300"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    className="mt-1 border-white/30 rounded-2xl py-3 backdrop-blur-sm bg-white/20 focus:bg-white/40 transition-all duration-300"
                  />
                </div>
                <Button 
                  onClick={() => handleLogin()}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 hover:from-emerald-500 hover:via-teal-600 hover:to-blue-600 text-white font-semibold rounded-2xl py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
