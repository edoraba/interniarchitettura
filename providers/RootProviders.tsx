'use client';

import { HeroUIProvider } from '@heroui/react';
import { ReactLenis, LenisRef } from 'lenis/react';
import React, { useRef } from 'react';

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
