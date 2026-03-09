# SEO Todo List - interniarchitettura.it

**Audit date:** 2026-03-09
**SEO Health Score:** 48/100

---

## Critical

- [x] Fix hamburger menu CSS typo (`bg-foregtext-foreground` → `bg-foreground`) in Navbar.tsx
- [ ] Aggiungere indirizzo fisico, telefono e Partita IVA nel footer/contatti (obbligatorio per legge in Italia)
- [ ] Tutte le 11 pagine sono thin content - homepage ~204 parole (min 500), pagine progetto ~60-130 parole (min 300)
- [x] Cambiare redirect root da 307 (temporaneo) a 301/308 (`/ → /it`) - il PageRank non viene trasferito con 307

## High

- [x] Aggiungere CTA above the fold nella hero section (link a `#contatti` o `#progetti`)
- [x] Aggiungere schema `WebSite` e `WebPage` in `layout.tsx`
- [x] Aggiungere schema `BreadcrumbList` nelle pagine progetto
- [x] Aggiungere pagina privacy policy (obbligatorio GDPR)
- [ ] Configurare DNS per `www.interniarchitettura.it` con redirect 301 a non-www
- [x] Hamburger tap target troppo piccolo (24x15px, minimo 48x48px)
- [x] Aggiungere contact form, non solo link mailto:
- [x] Aggiungere `description`, `image`, `telephone` allo schema LocalBusiness

## Medium

- [x] Aggiungere `og:image` e `og:url` alla homepage (`page.tsx`)
- [ ] URL inglesi usano path italiano `/en/progetti/` - valutare `/en/projects/`
- [x] Abilitare supporto AVIF in `next.config.ts` (`images.formats: ['image/avif', 'image/webp']`)
- [x] Aggiungere security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- [x] Language switcher tap target troppo piccoli (26x24px, minimo 48x48px)
- [x] Link logo `href="/"` causa redirect 307 - cambiare a `href="/it"` (o locale corrente)
- [x] Schema: `areaServed` usa `State` invece di `AdministrativeArea`
- [x] Twitter card usa `summary` invece di `summary_large_image`
- [ ] Espandere descrizioni progetto a 300+ parole (brief, sfide, materiali, processo)
- [ ] Aggiungere sottotitoli H2/H3 nelle descrizioni progetto

## Low

- [ ] Creare pagina indice `/it/progetti`
- [ ] Aggiungere tag hreflang anche nell'HTML `<head>` (ora solo in HTTP header e sitemap)
- [ ] Aggiungere Twitter Card meta tags
- [x] Configurare `images.minimumCacheTTL` in next.config.ts per caching immagini
