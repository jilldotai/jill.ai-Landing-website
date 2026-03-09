import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jill.ai | Intelligence with Intent',
  description: 'Jill.ai landing site',
  icons: {
    icon: '/assets/icons/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`window.tailwind = window.tailwind || {}; window.tailwind.config = { theme: { extend: { colors: { background: '#050505', foreground: '#faf9f8', accent: '#8ee7ff', lumi: '#d98cff' }, fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], serif: ['Georgia', 'serif'] } } } };`}
        </Script>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
