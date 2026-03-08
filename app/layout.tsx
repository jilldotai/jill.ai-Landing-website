import type { Metadata } from 'next';
import { Space_Grotesk, Syncopate } from 'next/font/google';
import './globals.css';
import { ScrollProvider } from '@/components/scroll-provider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const syncopate = Syncopate({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-syncopate',
});

export const metadata: Metadata = {
  title: 'Jill.ai | Intelligence with Integrity',
  description:
    'Jill.ai is building IOkT: a privacy-first identity and safety layer for children, starting with parent verification, zero-knowledge trust, and an on-device guardian keyboard.',
  icons: {
    icon: '/assets/icons/flavicon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${syncopate.variable} bg-ink text-paper antialiased`}>
        <ScrollProvider />
        {children}
      </body>
    </html>
  );
}
