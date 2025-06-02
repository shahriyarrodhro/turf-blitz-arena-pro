
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      
      // Redirect based on role
      if (loginEmail === 'admin@example.com') {
        navigate('/admin');
      } else if (loginEmail === 'turf@example.com') {
        navigate('/turf-owner');
      } else {
        navigate('/player');
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
                Welcome to TurfX
              </CardTitle>
              <CardDescription className="text-stone-600">
                Sign in to book turfs and join tournaments
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Demo Login Buttons */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-stone-700 mb-3">Demo Accounts:</h3>
                
                <Button
                  onClick={() => handleLogin('player@example.com', 'player123')}
                  variant="outline"
                  disabled={isLoading}
                  className="w-full justify-start border-stone-300 hover:bg-stone-50 rounded-2xl py-3"
                >
                  <User className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Player Demo</div>
                    <div className="text-xs text-stone-600">player@example.com</div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleLogin('turf@example.com', 'turf123')}
                  variant="outline"
                  disabled={isLoading}
                  className="w-full justify-start border-stone-300 hover:bg-stone-50 rounded-2xl py-3"
                >
                  <Mail className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Turf Owner Demo</div>
                    <div className="text-xs text-stone-600">turf@example.com</div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleLogin('admin@example.com', 'admin123')}
                  variant="outline"
                  disabled={isLoading}
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
                  <span className="bg-white px-2 text-stone-500">Or sign in manually</span>
                </div>
              </div>

              {/* Manual Login Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-stone-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 border-stone-300 rounded-2xl py-3"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-stone-700">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    className="mt-1 border-stone-300 rounded-2xl py-3"
                  />
                </div>
                <Button 
                  onClick={() => handleLogin()}
                  disabled={isLoading}
                  className="w-full bg-lime-400 hover:bg-lime-500 text-stone-900 font-semibold rounded-2xl py-3"
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
