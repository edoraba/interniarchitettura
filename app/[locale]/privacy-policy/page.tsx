import { getTranslations, setRequestLocale } from 'next-intl/server';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return {
    title: `${t('title')} | Ferro & Salamano Architetti`,
    description: t('intro').slice(0, 160),
    alternates: {
      canonical: `/${locale}/privacy-policy`,
      languages: {
        it: '/it/privacy-policy',
        en: '/en/privacy-policy',
        'x-default': '/it/privacy-policy',
      },
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'privacy' });

  const sections = [
    'controller',
    'dataCollected',
    'purpose',
    'legalBasis',
    'retention',
    'rights',
    'cookies',
    'thirdParties',
  ] as const;

  return (
    <>
      <Navbar />
      <main className='bg-background pt-32 pb-24'>
        <div className='container max-w-3xl'>
          <h1 className='font-title text-[8vw] leading-none font-light tracking-[0.02em] text-foreground md:text-[3vw]'>
            {t('title')}
          </h1>
          <p className='mt-4 font-text text-xs font-light tracking-wider text-gray-400'>
            {t('lastUpdated')}
          </p>

          <p className='mt-10 font-text text-sm leading-relaxed font-light text-foreground/80'>
            {t('intro')}
          </p>

          {sections.map(section => (
            <div key={section} className='mt-10'>
              <h2 className='font-title text-xl font-light tracking-wider text-foreground'>
                {t(`${section}.title`)}
              </h2>
              <p className='mt-3 font-text text-sm leading-relaxed font-light text-foreground/80'>
                {t(`${section}.content`)}
              </p>
              {t.has(`${section}.items`) && (
                <ul className='mt-3 list-inside list-disc space-y-1'>
                  {(t.raw(`${section}.items`) as string[]).map((item, i) => (
                    <li
                      key={i}
                      className='font-text text-sm font-light text-foreground/80'
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
