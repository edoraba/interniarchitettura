export type Project = {
  id: number;
  slug: string;
  title: { it: string; en: string };
  location: string;
  category: { it: string; en: string };
  description?: { it: string; en: string };
  materials?: string[];
  images: string[];
  cover: string;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: 'ristrutturazione-villa-pino-torinese',
    title: {
      it: 'Ristrutturazione Villa',
      en: 'Villa Renovation',
    },
    location: 'Pino Torinese',
    category: {
      it: 'Residenziale',
      en: 'Residential',
    },
    images: [
      '/img/1/img_6868.webp',
      '/img/1/img_6870a.webp',
      '/img/1/img_5704.webp',
      '/img/1/bagno-3.webp',
      '/img/1/img_3012.webp',
    ],
    cover: '/img/1/img_6868.webp',
  },
  {
    id: 2,
    slug: 'appartamento-corso-valdocco',
    title: {
      it: 'Appartamento Corso Valdocco',
      en: 'Corso Valdocco Apartment',
    },
    location: 'Torino',
    category: {
      it: 'Residenziale',
      en: 'Residential',
    },
    images: [
      '/img/2/1.webp',
      '/img/2/img_8750.webp',
      '/img/2/img_8751.webp',
      '/img/2/img_8752.webp',
      '/img/2/img_8753.webp',
      '/img/2/img_8903.webp',
    ],
    cover: '/img/2/1.webp',
  },
  {
    id: 3,
    slug: 'appartamento-via-porta-palatina',
    title: {
      it: 'Appartamento Via Porta Palatina',
      en: 'Via Porta Palatina Apartment',
    },
    location: 'Torino',
    category: {
      it: 'Residenziale',
      en: 'Residential',
    },
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
  },
  {
    id: 4,
    slug: 'appartamento-corso-francia',
    title: {
      it: 'Appartamento Corso Francia',
      en: 'Corso Francia Apartment',
    },
    location: 'Torino',
    category: {
      it: 'Residenziale',
      en: 'Residential',
    },
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
  },
  {
    id: 5,
    slug: 'appartamento-corso-agnelli',
    title: {
      it: 'Appartamento Corso Agnelli',
      en: 'Corso Agnelli Apartment',
    },
    location: 'Torino',
    category: {
      it: 'Residenziale',
      en: 'Residential',
    },
    materials: [
      'Arletta Pavimento Metallica Decor Union 60x60 Ruggine',
      'Totallook 30x60 White',
    ],
    images: ['/img/5/img_2667.webp', '/img/5/img_2673.webp'],
    cover: '/img/5/img_2667.webp',
  },
  {
    id: 6,
    slug: 'bilocale-via-thonon',
    title: {
      it: 'Bilocale Via Thonon',
      en: 'Via Thonon Studio Apartment',
    },
    location: 'Torino',
    category: {
      it: 'Residenziale',
      en: 'Residential',
    },
    images: [
      '/img/6/img_3082.webp',
      '/img/6/img_3090.webp',
      '/img/6/img_3142.webp',
      '/img/6/img_3143.webp',
      '/img/6/planimetria-bagno2.webp',
    ],
    cover: '/img/6/img_3082.webp',
  },
  {
    id: 7,
    slug: 'ristrutturazione-casa-di-campagna',
    title: {
      it: 'Ristrutturazione Casa di Campagna',
      en: 'Country House Renovation',
    },
    location: 'Piemonte',
    category: {
      it: 'Residenziale',
      en: 'Residential',
    },
    images: [
      '/img/7/img_3216.webp',
      '/img/7/img_3220.webp',
      '/img/7/img_2757.webp',
      '/img/7/img_4074.webp',
      '/img/7/img_4413.webp',
    ],
    cover: '/img/7/img_3216.webp',
  },
  {
    id: 8,
    slug: 'studio-privato',
    title: {
      it: 'Studio Privato',
      en: 'Private Office',
    },
    location: 'Torino',
    category: {
      it: 'Commerciale',
      en: 'Commercial',
    },
    materials: ['Italgraniti Shale Sand 60x60'],
    images: [
      '/img/8/senza-titolo.webp',
      '/img/8/whatsapp-image-2026-01-29-at-3.01.42-pm.jpg.webp',
    ],
    cover: '/img/8/senza-titolo.webp',
  },
  {
    id: 9,
    slug: 'negozio-torino',
    title: {
      it: 'Negozio',
      en: 'Shop',
    },
    location: 'Torino',
    category: {
      it: 'Commerciale',
      en: 'Commercial',
    },
    images: [
      '/img/9/img_0643.webp',
      '/img/9/img_0648.webp',
      '/img/9/bagno.webp',
      '/img/9/img_0959.webp',
      '/img/9/img_0991.webp',
    ],
    cover: '/img/9/img_0643.webp',
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
