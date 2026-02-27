'use client';

import { useTranslations } from 'next-intl';

import AnimatedText from '@/components/ui/AnimatedText';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

export default function ProjectsGrid() {
  const t = useTranslations('projects');

  const leftColumn = projects.filter((_, i) => i % 2 === 0);
  const rightColumn = projects.filter((_, i) => i % 2 !== 0);

  return (
    <section id='progetti' className='bg-background pb-24 md:pb-40'>
      <div className='container'>
        <AnimatedText
          as='h2'
          className='mb-20 font-title text-[8vw] leading-none font-light tracking-[0.02em] text-foreground md:mb-28 md:text-[4vw]'
          splitBy='chars'
          stagger={0.02}
        >
          {t('sectionTitle')}
        </AnimatedText>

        <div className='flex flex-col gap-12 md:flex-row md:gap-8'>
          <div className='flex flex-col gap-16 md:w-[55%] md:gap-24'>
            {leftColumn.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                index={project.id - 1}
              />
            ))}
          </div>

          <div className='flex flex-col gap-16 md:mt-40 md:w-[45%] md:gap-24'>
            {rightColumn.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                index={project.id - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
