'use client';

import { useRef } from 'react';

import { gsap, useGSAP } from '@/lib/gsap';

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  triggerStart?: string;
};

export default function RevealOnScroll({
  children,
  className = '',
  y = 40,
  duration = 0.7,
  delay = 0,
  triggerStart = 'top 85%',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: triggerStart,
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
