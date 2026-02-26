import { getTranslations, setRequestLocale } from 'next-intl/server';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import AboutPreview from '@/components/sections/AboutPreview';
import ContactSection from '@/components/sections/ContactSection';
import Hero from '@/components/sections/Hero';
import ProjectsGrid from '@/components/sections/ProjectsGrid';

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
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale === 'it' ? 'it_IT' : 'en_US',
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

  return (
    <>
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
