
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, SubscriptionTier } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isPremium: boolean;
  login: () => void;
  logout: () => void;
  subscribe: (tier: SubscriptionTier) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: 1,
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  subscriptionTier: 'FREE',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const subscribe = (tier: SubscriptionTier) => {
    if (user) {
      setUser({ ...user, subscriptionTier: tier });
    }
  };
  
  const isAuthenticated = !!user;
  const isPremium = user?.subscriptionTier === 'MONTHLY' || user?.subscriptionTier === 'YEARLY';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isPremium, login, logout, subscribe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
