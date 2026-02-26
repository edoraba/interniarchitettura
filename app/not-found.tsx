'use client';

import { useRef } from 'react';

import Link from 'next/link';

import { gsap, useGSAP } from '@/lib/gsap';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!titleRef.current || !descRef.current || !linkRef.current) return;

      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      tl.from(
        descRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      tl.from(
        linkRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
        },
        '-=0.2'
      );
    },
    { scope: containerRef }
  );

  return (
    <html lang='en'>
      <body>
        <main>
          <div
            ref={containerRef}
            className='flex min-h-screen flex-col items-center justify-center bg-background'
          >
            <h1
              ref={titleRef}
              className='font-title text-[15vw] leading-none font-light text-gray-200 md:text-[10vw]'
              style={{ opacity: 1 }}
            >
              404
            </h1>
            <p
              ref={descRef}
              className='mt-4 font-text text-sm font-light tracking-[0.2em] text-gray-500 uppercase'
              style={{ opacity: 1 }}
            >
              Page not found
            </p>
            <div ref={linkRef} className='mt-8' style={{ opacity: 1 }}>
              <Link
                href='/'
                className='bg-foreground px-6 py-3 font-text text-xs font-light tracking-[0.2em] text-background uppercase transition-opacity hover:opacity-70'
              >
                Back to home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
