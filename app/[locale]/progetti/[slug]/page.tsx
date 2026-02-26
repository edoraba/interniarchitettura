import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ProjectGallery from '@/components/sections/ProjectGallery';
import TransitionLink from '@/components/ui/TransitionLink';
import {
  getAdjacentProjects,
  getProjectBySlug,
  projects,
} from '@/data/projects';

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: 'meta.projects' });
  const title = `${project.title[locale as 'it' | 'en']} - ${project.location}`;

  return {
    title: `${title} | Salamano & Ferro Architetti`,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/progetti/${slug}`,
      languages: {
        it: `/it/progetti/${slug}`,
        en: `/en/progetti/${slug}`,
      },
    },
    openGraph: {
      title,
      images: [{ url: project.cover, width: 1200, height: 630 }],
      locale: locale === 'it' ? 'it_IT' : 'en_US',
      type: 'article',
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const loc = locale as 'it' | 'en';

  return (
    <>
      <Navbar />
      <main>
        {/* Project Hero */}
        <section className='relative flex min-h-[70vh] items-end overflow-hidden bg-foreground'>
          <Image
            src={project.cover}
            alt={project.title[loc]}
            fill
            className='object-cover opacity-40'
            priority
            sizes='100vw'
          />
          <div className='relative z-10 container pt-32 pb-16'>
            <p className='font-text text-xs font-light tracking-[0.2em] text-background'>
              {project.category[loc]} - {project.location}
            </p>
            <h1 className='mt-3 font-title text-[8vw] leading-[0.95] font-light tracking-[0.02em] text-background md:text-[4vw]'>
              {project.title[loc]}
            </h1>
          </div>
        </section>

        {/* Gallery */}
        <ProjectGallery project={project} locale={loc} />

        {/* Navigation */}
        <section className='border-t border-gray-200 bg-background'>
          <div className='container grid grid-cols-2 divide-x divide-gray-200'>
            {prev ? (
              <TransitionLink
                href={`/progetti/${prev.slug}`}
                className='group py-12 pr-8 transition-colors hover:bg-gray-50'
              >
                <p className='font-text text-xs font-light tracking-[0.2em] text-gray-400 uppercase'>
                  {locale === 'it' ? 'Precedente' : 'Previous'}
                </p>
                <p className='mt-2 font-title text-xl font-light tracking-wider text-foreground md:text-2xl'>
                  {prev.title[loc]}
                </p>
              </TransitionLink>
            ) : (
              <div />
            )}
            {next ? (
              <TransitionLink
                href={`/progetti/${next.slug}`}
                className='group py-12 pl-8 text-right transition-colors hover:bg-gray-50'
              >
                <p className='font-text text-xs font-light tracking-[0.2em] text-gray-400 uppercase'>
                  {locale === 'it' ? 'Successivo' : 'Next'}
                </p>
                <p className='mt-2 font-title text-xl font-light tracking-wider text-foreground md:text-2xl'>
                  {next.title[loc]}
                </p>
              </TransitionLink>
            ) : (
              <div />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
