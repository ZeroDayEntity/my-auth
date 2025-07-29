// src/app/(auth)/auth/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema, AuthFormValues } from '@/lib/validation';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './styles.module.scss';
import { User } from '@/types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const { login, authStatus } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    mode: 'onTouched', // Validate on blur
  });

  // Redirect user if they are already logged in
  useEffect(() => {
    if (authStatus === 'authenticated') {
      router.push('/dashboard');
    }
  }, [authStatus, router]);

  const handleLogin = async (data: AuthFormValues) => {
    // Just to show validation is working, phone number is not actually used.
    console.log('Validation successful for phone:', data.phone);
    setIsSubmitting(true);
    try {
      const res = await fetch('https://randomuser.me/api/?results=1&nat=us');
      const apiData = await res.json();
      // The API gives us an array, we just need the first user
      const user: User = apiData.results[0];
      login(user);
    } catch (error) {
      console.error('Login failed:', error);
      // A simple alert for error feedback
      alert('مشکلی در ارتباط با سرور پیش اومد. دوباره امتحان کن.');
    } finally {
      // Make sure button is enabled again, even if API fails
      setIsSubmitting(false);
    }
  };

  // Show a loader while we check auth status or if user is already logged in
  if (authStatus === 'loading' || authStatus === 'authenticated') {
    return <div className={styles.pageLoader}>لطفا صبر کنید...</div>;
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>ورود به پنل کاربری</h1>
        <p className={styles.subtitle}>برای ادامه، شماره موبایل خود را وارد نمایید.</p>
        <form onSubmit={handleSubmit(handleLogin)} className={styles.authForm}>
          <Input
            label="شماره موبایل"
            {...register('phone')}
            error={errors.phone?.message}
            type="tel"
            placeholder="09123456789"
            dir="ltr"
          />
          <Button type="submit" isLoading={isSubmitting}>
            ورود
          </Button>
        </form>
      </div>
    </div>
  );
}