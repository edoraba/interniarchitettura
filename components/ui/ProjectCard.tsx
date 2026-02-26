'use client';

import { useRef } from 'react';

import Image from 'next/image';

import { useLocale } from 'next-intl';

import { usePageTransition } from '@/components/ui/PageTransition';
import type { Project } from '@/data/projects';
import { gsap, useGSAP } from '@/lib/gsap';

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const locale = useLocale() as 'it' | 'en';
  const { navigateWithTransition } = usePageTransition();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current || !imageRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      // Clip-path curtain reveal: card unveils from bottom to top
      tl.fromTo(
        cardRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.inOut',
        }
      );

      // Simultaneously scale image from zoomed-in to normal
      tl.fromTo(
        imageRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        },
        '<'
      );
    },
    { scope: cardRef }
  );

  const handleMouseEnter = () => {
    if (!imageRef.current || !overlayRef.current) return;
    gsap.to(imageRef.current, {
      scale: 1.05,
      duration: 0.6,
      ease: 'power2.out',
    });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.4 });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current || !overlayRef.current) return;
    gsap.to(imageRef.current, { scale: 1, duration: 0.6, ease: 'power2.out' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <a
      ref={cardRef}
      href={`/progetti/${project.slug}`}
      onClick={e => {
        e.preventDefault();
        navigateWithTransition(`/progetti/${project.slug}`);
      }}
      className='group relative block overflow-hidden'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='relative aspect-3/2 w-full overflow-hidden'>
        <div ref={imageRef} className='h-full w-full'>
          <Image
            src={project.cover}
            alt={project.title[locale]}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>

        {/* Hover overlay */}
        <div
          ref={overlayRef}
          className='absolute inset-0 flex flex-col justify-end bg-foreground/50 p-6 opacity-0 md:p-8'
        >
          <p className='font-text text-xs font-light tracking-[0.2em] text-white uppercase'>
            {project.category[locale]}
          </p>
          <h3 className='mt-1 font-title text-2xl font-light tracking-wider text-white md:text-3xl'>
            {project.title[locale]}
          </h3>
          <p className='mt-1 font-text text-sm font-light text-white/70'>
            {project.location}
          </p>
        </div>
      </div>
    </a>
  );
}
