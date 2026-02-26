'use client';

import { useRef } from 'react';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

import type { Project } from '@/data/projects';
import { gsap, useGSAP } from '@/lib/gsap';

export default function ProjectGallery({ project }: { project: Project }) {
  const t = useTranslations('projects');
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!galleryRef.current) return;

      const images = galleryRef.current.querySelectorAll('.gallery-image');

      images.forEach(img => {
        gsap.from(img, {
          y: 60,
          opacity: 0,
          scale: 0.98,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    },
    { scope: galleryRef }
  );

  // Create an alternating layout: full-width, then 2-col, then full-width...
  const renderImages = () => {
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < project.images.length) {
      // Full width image
      if (i === 0 || (i > 0 && i % 3 === 0)) {
        elements.push(
          <div
            key={i}
            className='gallery-image relative aspect-video w-full overflow-hidden'
          >
            <Image
              src={project.images[i]}
              alt={
                t.has(`items.${project.slug}.alts.${i}`)
                  ? t(`items.${project.slug}.alts.${i}`)
                  : `${t(`items.${project.slug}.title`)} - ${i + 1}`
              }
              fill
              className='object-cover'
              sizes='100vw'
            />
          </div>
        );
        i++;
      }

      // Two column
      if (i < project.images.length) {
        const pair = project.images.slice(i, i + 2);
        if (pair.length === 2) {
          elements.push(
            <div
              key={`pair-${i}`}
              className='grid grid-cols-1 gap-3 md:grid-cols-2'
            >
              {pair.map((src, j) => (
                <div
                  key={i + j}
                  className='gallery-image relative aspect-4/3 overflow-hidden'
                >
                  <Image
                    src={src}
                    alt={
                      t.has(`items.${project.slug}.alts.${i + j}`)
                        ? t(`items.${project.slug}.alts.${i + j}`)
                        : `${t(`items.${project.slug}.title`)} - ${i + j + 1}`
                    }
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, 50vw'
                  />
                </div>
              ))}
            </div>
          );
          i += 2;
        } else if (pair.length === 1) {
          elements.push(
            <div
              key={i}
              className='gallery-image relative aspect-video w-full overflow-hidden'
            >
              <Image
                src={pair[0]}
                alt={
                  t.has(`items.${project.slug}.alts.${i}`)
                    ? t(`items.${project.slug}.alts.${i}`)
                    : `${t(`items.${project.slug}.title`)} - ${i + 1}`
                }
                fill
                className='object-cover'
                sizes='100vw'
              />
            </div>
          );
          i++;
        }
      }
    }

    return elements;
  };

  return (
    <section className='bg-background py-8 md:py-12'>
      <div ref={galleryRef} className='container space-y-3'>
        {renderImages()}

        {/* Materials */}
        {project.materials && project.materials.length > 0 && (
          <div className='pt-12'>
            <h3 className='mb-4 font-text text-xs font-light tracking-[0.2em] text-gray-400 uppercase'>
              {t('materials')}
            </h3>
            <ul className='space-y-1'>
              {project.materials.map((material, i) => (
                <li
                  key={i}
                  className='font-text text-sm font-light text-gray-600'
                >
                  {material}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
