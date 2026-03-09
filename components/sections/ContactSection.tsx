'use client';

import { useTranslations } from 'next-intl';

import AnimatedText from '@/components/ui/AnimatedText';
import ContactForm from '@/components/ui/ContactForm';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id='contatti' className='bg-foreground py-24 md:py-40'>
      <div className='container text-center'>
        <AnimatedText
          as='h2'
          className='mb-6 font-title text-[8vw] leading-none font-light tracking-[0.02em] text-background md:text-[4vw]'
          splitBy='words'
          stagger={0.06}
        >
          {t('heading')}
        </AnimatedText>

        <RevealOnScroll delay={0.2}>
          <p className='mx-auto mb-16 max-w-2xl font-text text-sm leading-relaxed font-light text-gray-400 md:text-base'>
            {t('description')}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <ContactForm />
        </RevealOnScroll>

        <RevealOnScroll delay={0.4} className='mt-16'>
          <div className='mx-auto h-px w-16 bg-primary' />
          <a
            href={`mailto:${t('email')}`}
            className='mt-6 inline-block font-text text-sm font-light tracking-wider text-gray-500 transition-colors duration-300 hover:text-background'
          >
            {t('email')}
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}
