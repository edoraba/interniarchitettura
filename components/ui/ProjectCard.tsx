'use client';

import { useRef } from 'react';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { usePageTransition } from '@/components/ui/PageTransition';
import type { Project } from '@/data/projects';
import { useRouter } from '@/i18n/navigation';
import { gsap, useGSAP } from '@/lib/gsap';

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const t = useTranslations('projects');
  const { navigateWithTransition } = usePageTransition();
  const router = useRouter();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefetchedRef = useRef(false);

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

      tl.fromTo(
        cardRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.inOut',
        }
      );

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
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      scale: 1.03,
      duration: 0.6,
      ease: 'power2.out',
    });

    if (!prefetchedRef.current) {
      router.prefetch(`/progetti/${project.slug}`);
      prefetchedRef.current = true;
    }
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, { scale: 1, duration: 0.6, ease: 'power2.out' });
  };

  return (
    <a
      ref={cardRef}
      href={`/progetti/${project.slug}`}
      onClick={e => {
        e.preventDefault();
        navigateWithTransition(`/progetti/${project.slug}`);
      }}
      className='group block'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image — natural ratio clamped between 3/5 (portrait) and 2/1 (landscape) */}
      <div className='overflow-hidden'>
        <div
          ref={imageRef}
          className='relative w-full'
          style={{
            aspectRatio: Math.max(3 / 5, Math.min(2, project.coverRatio)),
          }}
        >
          <Image
            src={project.cover}
            alt={
              t.has(`items.${project.slug}.alts.0`)
                ? t(`items.${project.slug}.alts.0`)
                : t(`items.${project.slug}.title`)
            }
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>
      </div>

      {/* Info */}
      <div className='mt-4'>
        <p className='font-text text-xs font-light tracking-[0.2em] text-gray-400 uppercase'>
          {t(`categories.${project.category}`)} — {project.location}
        </p>
        <h3 className='mt-1.5 font-title text-xl font-light tracking-wider text-foreground transition-colors duration-300 group-hover:text-gray-400 md:text-2xl'>
          {t(`items.${project.slug}.title`)}
        </h3>
      </div>
    </a>
  );
}
