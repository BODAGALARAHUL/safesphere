import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { DisasterProvider } from '@/context/DisasterContext';
import { AppHeader } from '@/components/AppHeader';
import { MobileNavigation } from '@/components/MobileNavigation';
import { SOSModal } from '@/components/SOSModal';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SafeSphere | Disaster Awareness & Emergency Assistance (SIH1462)',
  description: 'Real-time emergency assistance, flood warnings, safe zone locator, and disaster survival guides.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 pb-20 md:pb-0">
        <DisasterProvider>
          <AppHeader />
          <div className="flex-1 w-full">{children}</div>
          <MobileNavigation />
          <SOSModal />
        </DisasterProvider>
      </body>
    </html>
  );
}
