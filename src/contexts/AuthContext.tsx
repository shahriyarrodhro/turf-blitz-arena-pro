
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'player' | 'turf-owner' | 'admin';
  avatar?: string;
  phone?: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'player@example.com',
    name: 'Ahmed Rahman',
    role: 'player',
    password: 'password123',
    phone: '+880 1712-345678',
    location: 'Dhaka'
  },
  {
    id: '2',
    email: 'owner@example.com',
    name: 'Champions Sports',
    role: 'turf-owner',
    password: 'password123',
    phone: '+880 1798-765432',
    location: 'Gulshan'
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'System Admin',
    role: 'admin',
    password: 'password123',
    phone: '+880 1555-123456',
    location: 'Dhaka'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('turfx_user');
    const sessionExpiry = localStorage.getItem('turfx_session_expiry');
    
    if (storedUser && sessionExpiry) {
      const now = new Date().getTime();
      const expiry = parseInt(sessionExpiry);
      
      if (now < expiry) {
        setUser(JSON.parse(storedUser));
      } else {
        // Session expired
        localStorage.removeItem('turfx_user');
        localStorage.removeItem('turfx_session_expiry');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      // Set session with 24 hour expiry
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('turfx_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('turfx_session_expiry', expiry.toString());
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      ...userData,
      id: Date.now().toString()
    };
    
    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    
    // Set session with 24 hour expiry
    const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
    localStorage.setItem('turfx_user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('turfx_session_expiry', expiry.toString());
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('turfx_user');
    localStorage.removeItem('turfx_session_expiry');
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    
    // Update stored session
    localStorage.setItem('turfx_user', JSON.stringify(updatedUser));
    
    setIsLoading(false);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
