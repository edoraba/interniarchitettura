'use client';

import { useRef } from 'react';

import { useTranslations } from 'next-intl';

import { SplitText, gsap, useGSAP } from '@/lib/gsap';

export default function Hero() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!titleRef.current || !subtitleRef.current) return;

      const tl = gsap.timeline({ delay: 0.3 });

      // Split title into words then chars (word wrappers prevent mid-word line breaks)
      const titleSplit = SplitText.create(titleRef.current, {
        type: 'words,chars',
        mask: 'chars',
      });

      tl.from(titleSplit.chars, {
        y: '100%',
        rotateX: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power4.out',
      });

      if (lineRef.current) {
        tl.from(
          lineRef.current,
          {
            scaleX: 0,
            duration: 0.6,
            ease: 'power3.inOut',
          },
          '-=0.4'
        );
      }

      tl.from(
        subtitleRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      if (scrollRef.current) {
        tl.from(
          scrollRef.current,
          {
            opacity: 0,
            duration: 0.4,
          },
          '-=0.2'
        );

        gsap.to(scrollRef.current, {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: 'power2.inOut',
          delay: 1.5,
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className='relative flex min-h-screen items-center justify-center overflow-hidden bg-background'
    >
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.04]'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className='relative z-10 container text-center'>
        <h1
          ref={titleRef}
          className='font-title text-[7vw] leading-[0.9] font-light tracking-[0.04em] text-balance text-foreground uppercase md:text-[5.5vw]'
          style={{ perspective: '600px' }}
        >
          {t('title')}
        </h1>

        <div
          ref={lineRef}
          className='mx-auto my-6 h-px w-24 origin-center bg-primary md:my-10 md:w-32'
        />

        <p
          ref={subtitleRef}
          className='font-text text-sm font-light tracking-[0.3em] text-gray-500 uppercase md:text-base'
        >
          {t('subtitle')}
        </p>
      </div>

      <div
        ref={scrollRef}
        className='absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2'
      >
        <span className='font-text text-[10px] font-light tracking-[0.3em] text-gray-400 uppercase'>
          {t('scroll')}
        </span>
        <div className='h-8 w-px bg-gray-300' />
      </div>
    </section>
  );
}
