'use client';

import { useTranslations } from 'next-intl';

import AnimatedText from '@/components/ui/AnimatedText';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function AboutPreview() {
  const t = useTranslations('about');

  return (
    <section id='chi-siamo' className='bg-background py-24 md:py-40'>
      <div className='container'>
        {/* Section title */}
        <AnimatedText
          as='h2'
          className='mb-20 font-title text-[8vw] leading-none font-light tracking-[0.02em] text-foreground md:text-[4vw]'
          splitBy='chars'
          stagger={0.02}
        >
          {t('sectionTitle')}
        </AnimatedText>

        {/* Two columns */}
        <div className='grid gap-16 md:grid-cols-2 md:gap-24'>
          {/* Simonetta */}
          <RevealOnScroll delay={0.1}>
            <div className='space-y-4'>
              <div className='mb-6'>
                <h3 className='font-title text-2xl font-light tracking-wider text-foreground md:text-3xl'>
                  {t('simonetta.name')}
                </h3>
                <p className='mt-1 font-text text-xs font-light tracking-[0.2em] text-primary uppercase'>
                  {t('simonetta.role')}
                </p>
              </div>
              <p className='font-text text-sm leading-relaxed font-light text-gray-600 md:text-base'>
                {t('simonetta.bio')}
              </p>
            </div>
          </RevealOnScroll>

          {/* Paola */}
          <RevealOnScroll delay={0.3}>
            <div className='space-y-4'>
              <div className='mb-6'>
                <h3 className='font-title text-2xl font-light tracking-wider text-foreground md:text-3xl'>
                  {t('paola.name')}
                </h3>
                <p className='mt-1 font-text text-xs font-light tracking-[0.2em] text-primary uppercase'>
                  {t('paola.role')}
                </p>
              </div>
              <p className='font-text text-sm leading-relaxed font-light text-gray-600 md:text-base'>
                {t('paola.bio')}
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* Decorative line */}
        <RevealOnScroll className='mt-24'>
          <div className='h-px w-full bg-gray-200' />
        </RevealOnScroll>
      </div>
    </section>
  );
}
