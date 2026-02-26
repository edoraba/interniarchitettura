'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';
import { gsap } from '@/lib/gsap';

interface TransitionContextValue {
  navigateWithTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigateWithTransition: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const pendingNav = useRef<string | null>(null);
  const isAnimating = useRef(false);

  // Initialize overlay above viewport
  useEffect(() => {
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { yPercent: -100 });
    }
  }, []);

  const navigateWithTransition = useCallback(
    (href: string) => {
      if (isAnimating.current || !overlayRef.current) return;
      isAnimating.current = true;
      pendingNav.current = href;

      // Overlay slides down from top to cover the page
      gsap.fromTo(
        overlayRef.current,
        { yPercent: -100 },
        {
          yPercent: 0,
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => router.push(href),
        }
      );
    },
    [router]
  );

  // When pathname changes = new page loaded → slide overlay off screen
  useEffect(() => {
    if (pendingNav.current && overlayRef.current) {
      pendingNav.current = null;

      gsap.to(overlayRef.current, {
        yPercent: 100,
        duration: 0.5,
        ease: 'power3.inOut',
        delay: 0.15,
        onComplete: () => {
          isAnimating.current = false;
          // Reset overlay above viewport for next transition
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { yPercent: -100 });
          }
        },
      });
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      <div
        ref={overlayRef}
        className='pointer-events-none fixed inset-0 z-9999 bg-foreground will-change-transform'
      />
    </TransitionContext.Provider>
  );
}
