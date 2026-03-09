import { getTranslations, setRequestLocale } from 'next-intl/server';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import AboutPreview from '@/components/sections/AboutPreview';
import ContactSection from '@/components/sections/ContactSection';
import Hero from '@/components/sections/Hero';
import ProjectsGrid from '@/components/sections/ProjectsGrid';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://interniarchitettura.it';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        it: '/it',
        en: '/en',
        'x-default': '/it',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteUrl}/${locale}`,
      images: [{ url: '/img/1/1.webp', width: 1200, height: 630 }],
      locale: locale === 'it' ? 'it_IT' : 'en_US',
      alternateLocale: locale === 'it' ? 'en_US' : 'it_IT',
      type: 'website',
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'meta.home' });

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/${locale}/#webpage`,
    url: `${siteUrl}/${locale}`,
    name: t('title'),
    description: t('description'),
    inLanguage: locale,
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#organization` },
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <Navbar />
      <main>
        <Hero />
        <AboutPreview />
        <ProjectsGrid />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
