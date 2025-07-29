// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth'; // We'll use this to be smart

export default function HomePage() {
  const router = useRouter();
  const { authStatus } = useAuth();

  useEffect(() => {
    // Wait until we know the auth status
    if (authStatus === 'loading') {
      return; // Do nothing while loading
    }

    // If user is logged in, send them to dashboard, otherwise to login page.
    if (authStatus === 'authenticated') {
      router.replace('/dashboard');
    } else {
      router.replace('/auth');
    }
  }, [authStatus, router]);

  // Show a simple loading text while redirecting
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        fontFamily: 'sans-serif',
      }}
    >
      در حال انتقال...
    </div>
  );
}