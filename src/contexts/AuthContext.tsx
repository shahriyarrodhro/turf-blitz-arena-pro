
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'player' | 'turf-owner' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Demo users
  const demoUsers = [
    { id: '1', email: 'player@example.com', password: 'player123', name: 'Ahmed Rahman', role: 'player' as const },
    { id: '2', email: 'turf@example.com', password: 'turf123', name: 'Champions Sports', role: 'turf-owner' as const },
    { id: '3', email: 'admin@example.com', password: 'admin123', name: 'System Admin', role: 'admin' as const },
  ];

  useEffect(() => {
    // Check for existing session with more robust validation
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('turfx_user');
        const sessionExpiry = localStorage.getItem('turfx_session_expiry');
        
        if (savedUser && sessionExpiry) {
          const expiryTime = parseInt(sessionExpiry);
          const currentTime = Date.now();
          
          // Check if session is still valid (24 hours)
          if (currentTime < expiryTime) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
          } else {
            // Session expired, clear storage
            localStorage.removeItem('turfx_user');
            localStorage.removeItem('turfx_session_expiry');
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('turfx_user');
        localStorage.removeItem('turfx_session_expiry');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = demoUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Set session expiry to 24 hours from now
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
      
      setUser(userWithoutPassword);
      localStorage.setItem('turfx_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('turfx_session_expiry', expiryTime.toString());
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('turfx_user');
    localStorage.removeItem('turfx_session_expiry');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('turfx_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
