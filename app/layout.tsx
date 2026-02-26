import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import 'lenis/dist/lenis.css';

import RootProviders from '@/providers/RootProviders';

import './globals.css';

const geistSans = localFont({
  src: '../public/fonts/GeistVF.woff',
  variable: '--font-text',
});

const geistMono = localFont({
  src: '../public/fonts/GeistMonoVF.woff',
  variable: '--font-title',
});

const isProduction = process.env.ENVIRONMENT === 'production';

export const metadata: Metadata = {
  title: 'My App',
  description: 'A modern Next.js application',
  keywords: ['Next.js', 'React', 'TypeScript'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'My App',
    title: 'My App',
    description: 'A modern Next.js application',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'My App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My App',
    description: 'A modern Next.js application',
    images: ['/og-image.png'],
  },
  robots: {
    index: isProduction,
    follow: isProduction,
    googleBot: {
      index: isProduction,
      follow: isProduction,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-text text-foreground antialiased`}
      >
        <RootProviders>{children}</RootProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
