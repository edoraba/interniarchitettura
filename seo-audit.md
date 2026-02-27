# SEO Audit — interniarchitettura.it

**Score: 61/100** | Data: 2026-02-27

| Categoria           | Peso | Score |
| ------------------- | ---- | ----- |
| Technical SEO       | 25%  | 82    |
| Content Quality     | 25%  | 34    |
| On-Page SEO         | 20%  | 65    |
| Schema              | 10%  | 65    |
| Performance         | 10%  | 62    |
| Images              | 5%   | 80    |
| AI Search Readiness | 5%   | 42    |

---

## Critical

- [ ] **Aggiungere descrizioni ai progetti** (300-500 parole ciascuno) — brief, approccio progettuale, scelta materiali, risultato. File: `messages/it.json`, `messages/en.json` sotto `projects.items.[slug]`
- [ ] **Meta description unica per ogni progetto** — attualmente tutti i progetti condividono la stessa generica. File: `app/[locale]/progetti/[slug]/page.tsx` L31
- [ ] **Aggiungere pagina privacy policy** — obbligatoria GDPR/legge italiana. Linkarla dal footer

## High

- [ ] **Aggiungere security headers** — HSTS, X-Content-Type-Options, X-Frame-Options, CSP + `poweredByHeader: false`. File: `next.config.ts`
  ```ts
  const nextConfig: NextConfig = {
    poweredByHeader: false,
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'DENY' },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=()',
            },
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=31536000; includeSubDomains',
            },
          ],
        },
      ];
    },
  };
  ```
- [ ] **Fix Hero LCP** — il testo H1 parte con `opacity: 0` e aspetta GSAP JS. Renderlo visibile prima del JS, poi animare. File: `components/sections/Hero.tsx`
- [ ] **Aggiungere `priority` alla prima immagine ProjectCard** — tutte sono lazy-loaded, nessuna prioritaria. File: `components/ui/ProjectCard.tsx`
  ```tsx
  <Image ... priority={index === 0} />
  ```
- [ ] **Aggiungere OG image alla homepage** + cambiare Twitter card a `summary_large_image`. File: `app/[locale]/page.tsx`

## Medium

- [ ] **Aggiungere schema `WebSite`** alla homepage
  ```json
  {
    "@type": "WebSite",
    "@id": "https://interniarchitettura.it/#website",
    "name": "Interni Architettura",
    "url": "https://interniarchitettura.it",
    "publisher": { "@id": "https://interniarchitettura.it/#organization" },
    "inLanguage": ["it", "en"]
  }
  ```
- [ ] **Aggiungere schema `BreadcrumbList`** alle pagine progetto (Home > Progetti > Nome Progetto)
- [ ] **Arricchire CreativeWork schema** — aggiungere `@id`, `url`, `material`, linkare `creator` via `@id` reference invece di duplicare dati
- [ ] **Aggiungere sezione "Come lavoriamo"** in homepage — processo lavorativo, aiuta AI a rispondere a query tipo "come funziona un architetto d'interni"
- [ ] **Aggiungere `lastModified` reali ai progetti** nel sitemap — attualmente tutti condividono il timestamp di build. Aggiungere campo `lastUpdated` in `data/projects.ts`

## Low

- [ ] **Lazy-load GSAP ScrollTrigger** per sezioni below-fold — dynamic import per ridurre JS critico
- [ ] **Convertire componenti non-interattivi a Server Components** — `Footer.tsx`, contenuto statico di `AboutPreview.tsx`
- [ ] **Ottimizzare immagini sorgente** — alcune superano 200KB anche in WebP. Target ~100KB max per cover, considerare AVIF
