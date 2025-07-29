// src/hooks/useAuth.ts
'use client';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

// A simple custom hook to access the auth context.
export const useAuth = () => {
  const context = useContext(AuthContext);

  // This is a good practice: if a component tries to use this hook
  // outside of the AuthProvider, we throw an error.
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};