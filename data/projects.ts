export type Project = {
  id: number;
  slug: string;
  category: 'residential' | 'commercial' | 'office' | 'industrial';
  location: string;
  year?: string;
  size?: string;
  materials?: string[];
  images: string[];
  cover: string;
  coverRatio: number;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: 'villa-pino-torinese',
    category: 'residential',
    location: 'Pino Torinese (TO)',
    year: '2020',
    size: '360 mq',
    images: [
      '/img/1/1.webp',
      '/img/1/2.webp',
      '/img/1/3.webp',
      '/img/1/4.webp',
      '/img/1/5.webp',
      '/img/1/6.webp',
      '/img/1/7.webp',
      '/img/1/8.webp',
      '/img/1/9.webp',
      '/img/1/10.webp',
      '/img/1/11.webp',
    ],
    cover: '/img/1/1.webp',
    coverRatio: 1200 / 896,
  },
  {
    id: 2,
    slug: 'appartamento-corso-valdocco',
    category: 'residential',
    location: 'Torino',
    year: '2023',
    size: '140 mq',
    images: [
      '/img/2/1.webp',
      '/img/2/2.webp',
      '/img/2/2a.webp',
      '/img/2/3.webp',
      '/img/2/4.webp',
      '/img/2/4a.webp',
      '/img/2/5.webp',
      '/img/2/6.webp',
      '/img/2/7.webp',
      '/img/2/8.webp',
      '/img/2/9.webp',
      '/img/2/10.webp',
    ],
    cover: '/img/2/1.webp',
    coverRatio: 896 / 1200,
  },
  {
    id: 3,
    slug: 'appartamento-via-porta-palatina',
    category: 'residential',
    location: 'Torino',
    year: '2025',
    size: '170 mq',
    images: [
      '/img/3/1.webp',
      '/img/3/2.webp',
      '/img/3/3.webp',
      '/img/3/4.webp',
      '/img/3/5.webp',
      '/img/3/6.webp',
      '/img/3/7.webp',
      '/img/3/8.webp',
      '/img/3/9.webp',
      '/img/3/10.webp',
      '/img/3/11.webp',
      '/img/3/12.webp',
      '/img/3/13.webp',
      '/img/3/14.webp',
      '/img/3/15.webp',
    ],
    cover: '/img/3/1.webp',
    coverRatio: 1440 / 1920,
  },
  {
    id: 4,
    slug: 'appartamento-corso-francia',
    category: 'residential',
    location: 'Torino',
    year: '2024',
    size: '110 mq',
    images: [
      '/img/4/1.webp',
      '/img/4/2.webp',
      '/img/4/3.webp',
      '/img/4/4.webp',
    ],
    cover: '/img/4/1.webp',
    coverRatio: 1200 / 896,
  },
  {
    id: 5,
    slug: 'appartamento-corso-agnelli',
    category: 'residential',
    location: 'Torino',
    year: '2024',
    size: '100 mq',
    images: [
      '/img/5/1.webp',
      '/img/5/2.webp',
      '/img/5/3.webp',
      '/img/5/4.webp',
    ],
    cover: '/img/5/1.webp',
    coverRatio: 1200 / 896,
  },
  {
    id: 6,
    slug: 'bilocale-via-thonon',
    category: 'residential',
    location: 'Torino',
    year: '2023',
    size: '35 mq',
    images: [
      '/img/6/1.webp',
      '/img/6/3.webp',
      '/img/6/2.webp',
      '/img/6/2a.webp',
      '/img/6/1a.webp',
    ],
    cover: '/img/6/1.webp',
    coverRatio: 912 / 1168,
  },
  {
    id: 7,
    slug: 'casa-di-campagna-gabiano',
    category: 'residential',
    location: 'Gabiano (AL)',
    year: '2023-2025',
    size: '180 mq',
    images: [
      '/img/7/1.webp',
      '/img/7/2.webp',
      '/img/7/3.webp',
      '/img/7/4.webp',
      '/img/7/5.webp',
    ],
    cover: '/img/7/1.webp',
    coverRatio: 896 / 1200,
  },
  {
    id: 8,
    slug: 'studio-privato',
    category: 'office',
    location: 'Torino',
    year: '2025',
    images: ['/img/8/1.webp', '/img/8/2.webp'],
    cover: '/img/8/1.webp',
    coverRatio: 896 / 1200,
  },
  {
    id: 9,
    slug: 'negozio-torino',
    category: 'commercial',
    location: 'Torino',
    year: '2024',
    images: [
      '/img/9/1.webp',
      '/img/9/2.webp',
      '/img/9/3.webp',
      '/img/9/4.webp',
      '/img/9/5.webp',
      '/img/9/6.webp',
    ],
    cover: '/img/9/1.webp',
    coverRatio: 896 / 1200,
  },
  {
    id: 10,
    slug: 'stabilimento-industriale-govone',
    category: 'industrial',
    location: 'Govone (CN)',
    year: '2017-2019',
    size: '~6800 mq',
    images: [
      '/img/10/1.webp',
      '/img/10/2.webp',
      '/img/10/3.webp',
      '/img/10/4.webp',
      '/img/10/5.webp',
      '/img/10/6.webp',
      '/img/10/7.webp',
      '/img/10/8.webp',
      '/img/10/9.webp',
      '/img/10/9a.webp',
      '/img/10/10.webp',
      '/img/10/11.webp',
      '/img/10/12.webp',
    ],
    cover: '/img/10/1.webp',
    coverRatio: 1319 / 708,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | undefined;
  next: Project | undefined;
} {
  const index = projects.findIndex(p => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
