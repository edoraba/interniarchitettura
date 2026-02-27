import type { MetadataRoute } from 'next';

import { projects } from '@/data/projects';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://interniarchitettura.it';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['it', 'en'] as const;

  const staticPages = [''];

  const staticEntries = staticPages.flatMap(page =>
    locales.map(locale => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          it: `${BASE_URL}/it${page}`,
          en: `${BASE_URL}/en${page}`,
          'x-default': `${BASE_URL}/it${page}`,
        },
      },
    }))
  );

  const projectEntries = projects.flatMap(project =>
    locales.map(locale => ({
      url: `${BASE_URL}/${locale}/progetti/${project.slug}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          it: `${BASE_URL}/it/progetti/${project.slug}`,
          en: `${BASE_URL}/en/progetti/${project.slug}`,
          'x-default': `${BASE_URL}/it/progetti/${project.slug}`,
        },
      },
    }))
  );

  return [...staticEntries, ...projectEntries];
}
