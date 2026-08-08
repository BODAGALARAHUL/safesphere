'use client';

import dynamic from 'next/dynamic';

export const ClientSOSModal = dynamic(
  () => import('@/components/SOSModal').then(mod => mod.SOSModal),
  { ssr: false }
);
