import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ProjectGallery from '@/components/sections/ProjectGallery';
import JsonLd from '@/components/seo/JsonLd';
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

  const tMeta = await getTranslations({ locale, namespace: 'meta.projects' });
  const tProjects = await getTranslations({ locale, namespace: 'projects' });
  const title = `${tProjects(`items.${slug}.title`)} - ${project.location}`;

  return {
    title: `${title} | Salamano & Ferro Architetti`,
    description: tMeta('description'),
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

  const t = await getTranslations({ locale, namespace: 'projects' });
  const { prev, next } = getAdjacentProjects(slug);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://interniarchitettura.it';

  const projectTitle = t(`items.${slug}.title`);
  const projectCategory = t(`categories.${project.category}`);

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: projectTitle,
    description: `${projectCategory} - ${project.location}`,
    image: project.images.map(img => `${siteUrl}${img}`),
    locationCreated: {
      '@type': 'Place',
      name: project.location,
    },
    creator: {
      '@type': 'Organization',
      name: 'Salamano & Ferro Architetti',
      url: siteUrl,
    },
    genre: projectCategory,
    inLanguage: locale,
  };

  return (
    <>
      <JsonLd data={projectSchema} />
      <Navbar />
      <main>
        {/* Project Hero */}
        <section className='relative flex min-h-[70vh] items-end overflow-hidden bg-foreground'>
          <Image
            src={project.cover}
            alt={
              t.has(`items.${slug}.alts.0`)
                ? t(`items.${slug}.alts.0`)
                : projectTitle
            }
            fill
            className='object-cover opacity-40'
            priority
            sizes='100vw'
          />
          <div className='relative z-10 container pt-32 pb-16'>
            <p className='font-text text-xs font-light tracking-[0.2em] text-background'>
              {projectCategory} - {project.location}
            </p>
            <h1 className='mt-3 font-title text-[8vw] leading-[0.95] font-light tracking-[0.02em] text-background md:text-[4vw]'>
              {projectTitle}
            </h1>
          </div>
        </section>

        {/* Gallery */}
        <ProjectGallery project={project} />

        {/* Back to projects */}
        <section className='border-t border-gray-200 bg-background'>
          <div className='container py-8 text-center'>
            <TransitionLink
              href='/'
              className='inline-block font-text text-xs font-light tracking-[0.2em] text-gray-400 uppercase transition-colors hover:text-foreground'
            >
              {t('backToProjects')}
            </TransitionLink>
          </div>
        </section>

        {/* Prev / Next Navigation */}
        <section className='border-t border-gray-200 bg-background'>
          <div className='container grid grid-cols-2 divide-x divide-gray-200'>
            {prev ? (
              <TransitionLink
                href={`/progetti/${prev.slug}`}
                className='group py-12 pr-8 transition-colors hover:bg-gray-50'
              >
                <p className='font-text text-xs font-light tracking-[0.2em] text-gray-400 uppercase'>
                  {t('prevProject')}
                </p>
                <p className='mt-2 font-title text-xl font-light tracking-wider text-foreground md:text-2xl'>
                  {t(`items.${prev.slug}.title`)}
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
                  {t('nextProject')}
                </p>
                <p className='mt-2 font-title text-xl font-light tracking-wider text-foreground md:text-2xl'>
                  {t(`items.${next.slug}.title`)}
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
