import type { Metadata } from 'next';
<<<<<<< HEAD
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
=======
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jill.ai | Intelligence with Intent',
  description: 'Jill.ai landing site',
>>>>>>> 1ef9574d953de48238ed3800f4740a5c6e21a9f0
  icons: {
    icon: '/assets/icons/flavicon.svg',
  },
};

<<<<<<< HEAD
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${syncopate.variable} bg-ink text-paper antialiased`}>
        <ScrollProvider />
=======
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`window.tailwind = window.tailwind || {}; window.tailwind.config = { theme: { extend: { colors: { background: '#050505', foreground: '#faf9f8', accent: '#d48d5d', lumi: '#d946ef' }, fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], serif: ['Georgia', 'serif'] } } } };`}
        </Script>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
>>>>>>> 1ef9574d953de48238ed3800f4740a5c6e21a9f0
        {children}
      </body>
    </html>
  );
}
