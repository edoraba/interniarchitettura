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
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  other: {
    'apple-mobile-web-app-title': 'SF',
  },
  twitter: {
    card: 'summary_large_image',
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

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Interni Architettura',
    alternateName: 'Ferro & Salamano Architetti',
    url: siteUrl,
    inLanguage: ['it', 'en'],
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${siteUrl}/#organization`,
    name: 'Ferro & Salamano Architetti',
    alternateName: 'Interni Architettura',
    description:
      "Studio di architettura d'interni a Torino. Progettazione di interni, ristrutturazioni e direzione lavori per spazi residenziali, commerciali e uffici.",
    url: siteUrl,
    email: 'interni2architettura@gmail.com',
    image: `${siteUrl}/img/1/1.webp`,
    address: {
      '@type': 'PostalAddress',
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
      '@type': 'AdministrativeArea',
      name: 'Piemonte',
    },
    sameAs: ['https://www.instagram.com/interniarchitettura/'],
    founder: [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#simonetta-salamano`,
        name: 'Simonetta Salamano',
        jobTitle: 'Architetto',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Politecnico di Torino',
        },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#paola-ferro`,
        name: 'Paola Ferro',
        jobTitle: 'Architetto',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Politecnico di Torino',
        },
      },
    ],
    knowsLanguage: ['it', 'en'],
    knowsAbout: [
      'Interior Design',
      "Architettura d'interni",
      'Ristrutturazioni',
      'Direzione lavori',
    ],
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
        <JsonLd data={websiteSchema} />
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
