import type { Metadata } from 'next';
import './globals.css';
import { AdminShell } from '../components/layout/AdminShell';

export const metadata: Metadata = {
  title: 'SafeSphere — Admin Command Console',
  description: 'Operational command center and administrative triage for SafeSphere civic intelligence platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#040810] text-slate-100 antialiased min-h-screen">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
