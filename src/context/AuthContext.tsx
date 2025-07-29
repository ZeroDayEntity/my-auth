// src/context/AuthContext.tsx
'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

// A few states to know where we are: loading, logged in, or logged out.
type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  authStatus: AuthStatus;
}

// Creating the context with an initial undefined value.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is the provider component. It will wrap our entire app.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
  const router = useRouter();

  // On initial app load, check if user data exists in localStorage.
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setAuthStatus('authenticated');
      } else {
        setAuthStatus('unauthenticated');
      }
    } catch (error) {
      // If something goes wrong with parsing, clear storage and log out.
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
      setAuthStatus('unauthenticated');
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setAuthStatus('authenticated');
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setAuthStatus('unauthenticated');
    router.push('/auth');
  };

  const value = { user, login, logout, authStatus };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};