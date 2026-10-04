import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { DisasterProvider } from '@/context/DisasterContext';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { MobileNavigation } from '@/components/MobileNavigation';
import { OfflineBanner } from '@/components/OfflineBanner';
import { ClientSOSModal } from '@/components/ClientSOSModal';
import { NotificationCenter } from '@/components/NotificationCenter';
import { SpecialAssistanceModal } from '@/components/SpecialAssistanceModal';
import { BootGate } from '@/components/BootGate';
import { RouteTransition } from '@/components/RouteTransition';

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#071018] text-[#f4f8fb] selection:bg-[#f43f5e] selection:text-white">
        <DisasterProvider>
          <BootGate>
            <AppHeader />
            <OfflineBanner />
            
            <div className="flex-1 w-full pb-28 md:pb-0 min-w-0">
              <RouteTransition>{children}</RouteTransition>
            </div>
            <AppFooter />
            <MobileNavigation />
            <ClientSOSModal />
            <NotificationCenter />
            <SpecialAssistanceModal />
          </BootGate>
        </DisasterProvider>
      </body>
    </html>
  );
}
