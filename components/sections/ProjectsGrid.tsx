'use client';

import { useTranslations } from 'next-intl';

import AnimatedText from '@/components/ui/AnimatedText';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

export default function ProjectsGrid() {
  const t = useTranslations('projects');

  return (
    <section id='progetti' className='bg-background py-24 md:py-40'>
      <div className='container'>
        {/* Section title */}
        <AnimatedText
          as='h2'
          className='mb-20 font-title text-[8vw] leading-none font-light tracking-[0.02em] text-foreground md:text-[4vw]'
          splitBy='chars'
          stagger={0.02}
        >
          {t('sectionTitle')}
        </AnimatedText>

        {/* Uniform grid */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5'>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
