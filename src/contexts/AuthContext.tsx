import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'customer' | 'shopkeeper') => Promise<void>;
  signup: (email: string, password: string, name: string, type: 'customer' | 'shopkeeper') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('hyperlocal_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, type: 'customer' | 'shopkeeper') => {
    setIsLoading(true);
    try {
      // Mock authentication - in real app, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: type === 'shopkeeper' ? 'Modern Kirana Store' : 'User',
        type,
        location: {
          latitude: 18.5204,
          longitude: 73.8567,
          address: 'Koregaon Park, Pune, Maharashtra'
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('hyperlocal_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, type: 'customer' | 'shopkeeper') => {
    setIsLoading(true);
    try {
      // Mock signup - in real app, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        type,
        location: {
          latitude: 18.5204,
          longitude: 73.8567,
          address: 'Koregaon Park, Pune, Maharashtra'
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('hyperlocal_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hyperlocal_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};