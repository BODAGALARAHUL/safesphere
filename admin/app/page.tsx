'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthApi } from '../lib/api/auth';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    AuthApi.getCurrentUser()
      .then((u) => {
        if (u && u.role === 'ADMIN') {
          router.replace('/dashboard');
        } else {
          router.replace('/login');
        }
      })
      .catch(() => {
        router.replace('/login');
      });
  }, [router]);

  return null;
}
