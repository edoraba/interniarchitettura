import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import { notFound } from 'next/navigation';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import JsonLd from '@/components/seo/JsonLd';
import { routing } from '@/i18n/routing';
import RootProviders from '@/providers/RootProviders';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-title',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-text',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://interniarchitettura.it';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'it' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#organization`,
    name: 'Salamano & Ferro Architetti',
    alternateName: 'Interni Architettura',
    url: siteUrl,
    email: 'interni2architettura@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Torino',
      addressLocality: 'Torino',
      postalCode: '10153',
      addressRegion: 'Piemonte',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.0703,
      longitude: 7.6869,
    },
    areaServed: {
      '@type': 'State',
      name: 'Piemonte',
    },
    sameAs: ['https://www.instagram.com/interniarchitettura/'],
    founder: [
      { '@type': 'Person', name: 'Simonetta Salamano', jobTitle: 'Architetto' },
      { '@type': 'Person', name: 'Paola Ferro', jobTitle: 'Architetto' },
    ],
    knowsLanguage: ['it', 'en'],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Progettazione di interni',
          description: 'Interior design per spazi residenziali e commerciali',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Ristrutturazioni',
          description:
            'Ristrutturazione appartamenti, ville e locali commerciali',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Direzione lavori',
          description: 'Coordinamento cantieri, appalti e imprese',
        },
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${outfit.variable} min-h-screen bg-background font-text text-foreground antialiased`}
      >
        <JsonLd data={organizationSchema} />
        <NextIntlClientProvider messages={messages}>
          <RootProviders>{children}</RootProviders>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
