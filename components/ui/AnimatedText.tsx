'use client';

import { useRef } from 'react';

import { SplitText, gsap, useGSAP } from '@/lib/gsap';

type AnimatedTextProps = {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  splitBy?: 'chars' | 'words' | 'lines';
  stagger?: number;
  duration?: number;
  delay?: number;
  y?: number;
  scrollTrigger?: boolean;
  triggerStart?: string;
};

export default function AnimatedText({
  children,
  as: Tag = 'p',
  className = '',
  splitBy = 'words',
  stagger = 0.03,
  duration = 0.7,
  delay = 0,
  y = 30,
  scrollTrigger = true,
  triggerStart = 'top 85%',
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const split = SplitText.create(textRef.current, {
        type: splitBy,
        mask: splitBy === 'lines' ? 'lines' : undefined,
      });

      const targets =
        splitBy === 'chars'
          ? split.chars
          : splitBy === 'lines'
            ? split.lines
            : split.words;

      gsap.set(targets, { y, opacity: 0 });

      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: 'power4.out',
        ...(scrollTrigger
          ? {
              scrollTrigger: {
                trigger: containerRef.current,
                start: triggerStart,
                toggleActions: 'play none none none',
              },
            }
          : {}),
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className='overflow-hidden'>
      <Tag ref={textRef as React.RefObject<never>} className={className}>
        {children}
      </Tag>
    </div>
  );
}
