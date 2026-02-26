export type Project = {
  id: number;
  slug: string;
  category: 'residential' | 'commercial';
  location: string;
  materials?: string[];
  images: string[];
  cover: string;
  coverRatio: number;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: 'ristrutturazione-villa-pino-torinese',
    category: 'residential',
    location: 'Pino Torinese',
    images: [
      '/img/1/img_6868.webp',
      '/img/1/img_6870a.webp',
      '/img/1/img_5704.webp',
      '/img/1/bagno-3.webp',
    ],
    cover: '/img/1/img_6868.webp',
    coverRatio: 3 / 4,
  },
  {
    id: 2,
    slug: 'appartamento-corso-valdocco',
    category: 'residential',
    location: 'Torino',
    images: [
      '/img/2/1.webp',
      '/img/2/img_8750.webp',
      '/img/2/img_8751.webp',
      '/img/2/img_8752.webp',
      '/img/2/img_8753.webp',
      '/img/2/img_8903.webp',
    ],
    cover: '/img/2/1.webp',
    coverRatio: 3 / 4,
  },
  {
    id: 3,
    slug: 'appartamento-corso-francia',
    category: 'residential',
    location: 'Torino',
    materials: [
      'Marazzi Colorplay 30x90 White',
      'Marazzi Naturalia Rovere Struttura Canneto 3D 33x100',
    ],
    images: [
      '/img/4/img_0582.webp',
      '/img/4/img20240709162029.webp',
      '/img/4/whatsapp-image-2026-01-23-at-12.07.10.webp',
      '/img/4/whatsapp-image-2026-01-23-at-12.29.06.webp',
    ],
    cover: '/img/4/img_0582.webp',
    coverRatio: 4 / 3,
  },
  {
    id: 4,
    slug: 'appartamento-via-porta-palatina',
    category: 'residential',
    location: 'Torino',
    materials: [
      'Carta da parati vinilica con motivi floreali',
      'Lavabo Casabath "Luce" Freestanding',
      'Xilo - Due G Ceramiche 120x20',
      'Italgraniti Shale Sand 60x60',
    ],
    images: [
      '/img/3/img_4020.webp',
      '/img/3/img_4024.webp',
      '/img/3/img_3881.webp',
      '/img/3/img_4121.webp',
      '/img/3/img_5141.webp',
      '/img/3/img_5143.webp',
      '/img/3/tappezzeria.webp',
      '/img/3/photo-2025-12-22-14-11-00.webp',
      '/img/3/img20250603171257.webp',
    ],
    cover: '/img/3/img_4020.webp',
    coverRatio: 3 / 4,
  },
  {
    id: 5,
    slug: 'appartamento-corso-agnelli',
    category: 'residential',
    location: 'Torino',
    materials: [
      'Arletta Pavimento Metallica Decor Union 60x60 Ruggine',
      'Totallook 30x60 White',
    ],
    images: ['/img/5/img_2667.webp', '/img/5/img_2673.webp'],
    cover: '/img/5/img_2667.webp',
    coverRatio: 4 / 3,
  },
  {
    id: 6,
    slug: 'negozio-torino',
    category: 'commercial',
    location: 'Torino',
    images: [
      '/img/9/img_0643.webp',
      '/img/9/img_0648.webp',
      '/img/9/bagno.webp',
      '/img/9/img_0959.webp',
      '/img/9/img_0991.webp',
    ],
    cover: '/img/9/img_0643.webp',
    coverRatio: 3 / 4,
  },
  {
    id: 7,
    slug: 'ristrutturazione-casa-di-campagna',
    category: 'residential',
    location: 'Piemonte',
    images: [
      '/img/7/img_3216.webp',
      '/img/7/img_3220.webp',
      '/img/7/img_2757.webp',
      '/img/7/img_4074.webp',
      '/img/7/img_4413.webp',
    ],
    cover: '/img/7/img_3216.webp',
    coverRatio: 3 / 4,
  },
  {
    id: 8,
    slug: 'studio-privato',
    category: 'commercial',
    location: 'Torino',
    materials: ['Italgraniti Shale Sand 60x60'],
    images: [
      '/img/8/senza-titolo.webp',
      '/img/8/whatsapp-image-2026-01-29-at-3.01.42-pm.jpg.webp',
    ],
    cover: '/img/8/senza-titolo.webp',
    coverRatio: 3 / 4,
  },
  {
    id: 9,
    slug: 'bilocale-via-thonon',
    category: 'residential',
    location: 'Torino',
    images: [
      '/img/6/img_3082.webp',
      '/img/6/img_3090.webp',
      '/img/6/img_3142.webp',
      '/img/6/img_3143.webp',
      '/img/6/planimetria-bagno2.webp',
    ],
    cover: '/img/6/img_3082.webp',
    coverRatio: 4 / 3,
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
