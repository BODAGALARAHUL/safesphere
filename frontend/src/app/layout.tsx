import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { DisasterProvider } from '@/context/DisasterContext';
import { AppHeader } from '@/components/AppHeader';
import { MobileNavigation } from '@/components/MobileNavigation';
import { OfflineBanner } from '@/components/OfflineBanner';
import { ClientSOSModal } from '@/components/ClientSOSModal';
import { NotificationCenter } from '@/components/NotificationCenter';
import { SpecialAssistanceModal } from '@/components/SpecialAssistanceModal';

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
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 w-full max-w-full overflow-x-hidden">
        <DisasterProvider>
          <AppHeader />
          <OfflineBanner />
          {/* Main Content Area with generous bottom padding so bottom fixed navbar never covers buttons */}
          <div className="flex-1 w-full max-w-full overflow-x-hidden pb-28 md:pb-8">{children}</div>
          <MobileNavigation />
          <ClientSOSModal />
          <NotificationCenter />
          <SpecialAssistanceModal />
        </DisasterProvider>
      </body>
    </html>
  );
}
