import type { MetadataRoute } from 'next';

import { projects } from '@/data/projects';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://interniarchitettura.it';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['it', 'en'];

  // Static pages
  const staticPages = locales.flatMap(locale => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ]);

  // Project pages
  const projectPages = locales.flatMap(locale =>
    projects.map(project => ({
      url: `${BASE_URL}/${locale}/progetti/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [...staticPages, ...projectPages];
}
