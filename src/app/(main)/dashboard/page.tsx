// src/app/(main)/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import styles from './styles.module.scss';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  const { user, authStatus, logout } = useAuth();
  const router = useRouter();

  // This effect handles redirection. It runs when authStatus changes.
  useEffect(() => {
    // If we are done checking auth and the user is not logged in,
    // send them back to the login page.
    if (authStatus === 'unauthenticated') {
      router.push('/auth');
    }
  }, [authStatus, router]);

  // Show a loading screen while we check for user auth
  if (authStatus === 'loading') {
    return <div className={styles.pageLoader}>در حال بارگذاری اطلاعات...</div>;
  }

  // This should ideally not happen due to the redirection logic,
  // but it's a good fallback to prevent rendering a broken page.
  if (!user) {
    return <div className={styles.pageLoader}>در حال انتقال به صفحه ورود...</div>;
  }

  // If we're here, it means the user is authenticated.
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.welcomeCard}>
        <img
          src={user.picture.large}
          alt={`Profile picture of ${user.name.first}`}
          className={styles.avatar}
        />
        <h1 className={styles.welcomeMessage}>
          سلام {user.name.first}، خوش برگشتی!
        </h1>
        <p className={styles.userInfo}>ایمیل ثبت‌شده: {user.email}</p>
        {/* TODO: Add more user info or dashboard widgets here */}
        <div className={styles.logoutButtonWrapper}>
          <Button onClick={logout}>خروج از حساب</Button>
        </div>
      </div>
    </div>
  );
}