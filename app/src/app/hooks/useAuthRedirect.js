"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuthRedirect = (isAuthRequired = true) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Replace with your actual token verification logic
      const token = document.cookie.split('; ').find((row) => row.startsWith('token='));
      
      if (isAuthRequired && !token) {
        router.push('/login'); // Redirect unauthenticated users to login
      } else if (!isAuthRequired && token) {
        router.push('/dashboard'); // Redirect authenticated users to dashboard
      }
    };

    checkAuth();
  }, [isAuthRequired, router]);
};
