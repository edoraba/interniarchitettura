'use client';

import React, { useRef } from 'react';

import { HeroUIProvider } from '@heroui/react';
import { LenisRef, ReactLenis } from 'lenis/react';

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
      <HeroUIProvider>{children}</HeroUIProvider>
    </ReactLenis>
  );
};

export default RootProviders;
