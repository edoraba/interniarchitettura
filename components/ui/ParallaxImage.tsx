'use client';

import { useRef } from 'react';

import Image from 'next/image';

import { gsap, useGSAP } from '@/lib/gsap';

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  priority?: boolean;
};

export default function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 20,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !imageRef.current) return;

      gsap.to(imageRef.current, {
        yPercent: -speed,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={imageRef} className='h-[120%] w-full'>
        <Image
          src={src}
          alt={alt}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority={priority}
        />
      </div>
    </div>
  );
}
