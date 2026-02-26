'use client';

import React, { useEffect, useRef } from 'react';

import { HeroUIProvider } from '@heroui/react';
import { LenisRef, ReactLenis, useLenis } from 'lenis/react';

import PageTransitionProvider from '@/components/ui/PageTransition';
import { usePathname } from '@/i18n/navigation';

const RootProviders = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<LenisRef>(null);

  const options = {
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  };

  return (
    <ReactLenis ref={lenisRef} options={options} root>
      <ScrollToTop />
      <PageTransitionProvider>
        <HeroUIProvider>
          {children}
          {/* <CookieBanner /> */}
        </HeroUIProvider>
      </PageTransitionProvider>
    </ReactLenis>
  );
};

function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}

export default RootProviders;
