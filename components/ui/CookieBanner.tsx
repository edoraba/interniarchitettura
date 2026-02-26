'use client';

import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { gsap } from '@/lib/gsap';

const CONSENT_KEY = 'intarch-cookie-consent';

export default function CookieBanner() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (visible && bannerRef.current) {
      gsap.from(bannerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  }, [visible]);

  const handleConsent = (value: string) => {
    localStorage.setItem(CONSENT_KEY, value);
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => setVisible(false),
      });
    } else {
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      className='fixed right-4 bottom-4 z-9998 w-80 border border-gray-200 bg-background p-5 shadow-lg md:right-6 md:bottom-6'
      role='dialog'
      aria-label='Cookie consent'
    >
      <p className='font-text text-xs leading-relaxed font-light text-gray-600'>
        {t('message')}
      </p>
      <div className='mt-4 flex items-center gap-3'>
        <button
          onClick={() => handleConsent('necessary')}
          className='font-text text-xs font-light tracking-wider text-gray-500 uppercase transition-colors hover:text-foreground'
        >
          {t('decline')}
        </button>
        <button
          onClick={() => handleConsent('all')}
          className='bg-foreground px-4 py-2 font-text text-xs font-light tracking-wider text-background uppercase transition-opacity hover:opacity-80'
        >
          {t('accept')}
        </button>
      </div>
    </div>
  );
}
