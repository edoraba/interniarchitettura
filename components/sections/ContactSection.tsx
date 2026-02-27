'use client';

import { useRef } from 'react';

import { useTranslations } from 'next-intl';

import AnimatedText from '@/components/ui/AnimatedText';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { SplitText, gsap, useGSAP } from '@/lib/gsap';

export default function ContactSection() {
  const t = useTranslations('contact');
  const emailRef = useRef<HTMLAnchorElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!emailRef.current) return;

      const split = SplitText.create(emailRef.current, {
        type: 'chars',
        mask: 'chars',
      });

      gsap.from(split.chars, {
        y: '100%',
        duration: 0.8,
        stagger: 0.02,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: emailRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id='contatti'
      className='bg-foreground py-24 md:py-40'
    >
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

        <div className='overflow-hidden'>
          <a
            ref={emailRef}
            href={`mailto:${t('email')}`}
            className='inline-block font-title text-[5vw] font-light tracking-wider text-background transition-colors duration-300 hover:text-primary md:text-[3vw]'
          >
            {t('email')}
          </a>
        </div>

        <RevealOnScroll delay={0.4} className='mt-12'>
          <div className='mx-auto h-px w-16 bg-primary' />
        </RevealOnScroll>
      </div>
    </section>
  );
}
