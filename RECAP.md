# Interni Architettura — Recap Completo

## Stack Tecnologico

- **Framework**: Next.js 16.1.4 + React 19.2.3 + TypeScript 5
- **Styling**: Tailwind CSS 4 (inline theme in `globals.css`) + HeroUI 2.8.7
- **Animazioni**: GSAP 3.14.2 (ScrollTrigger, SplitText, useGSAP)
- **Smooth scroll**: Lenis 1.3.14
- **i18n**: next-intl 4.8.3 (IT default + EN)
- **Font**: Cormorant Garamond (titoli) + Outfit (testo)
- **Colori**: bg `#fafaf8`, fg `#1a1a1a`, primary `#972a90` (magenta)

---

## Struttura File

```
app/
  globals.css                     → Theme, scrollbar, utility, GSAP helpers
  layout.tsx                      → Root shell (html lang)
  robots.ts / sitemap.ts          → SEO
  [locale]/
    layout.tsx                    → Font loading, NextIntl provider, RootProviders
    page.tsx                      → Home: Hero + About + Projects + Contact + Footer
    error.tsx / not-found.tsx
    progetti/[slug]/page.tsx      → Pagina progetto (hero + gallery + prev/next)

components/
  layout/
    Navbar.tsx                    → Fixed navbar, mix-blend-difference, scroll-to-section
    Footer.tsx                    → Copyright + credits

  sections/
    Hero.tsx                      → SplitText char animation, titolo + sottotitolo + scroll indicator
    AboutPreview.tsx              → Due colonne Simonetta/Paola con RevealOnScroll
    ProjectsGrid.tsx              → Griglia 2 colonne con ProjectCard
    ProjectGallery.tsx            → Gallery alternata (full + 2-col) con scroll animations
    ContactSection.tsx            → Contatti + email animata con SplitText

  ui/
    AnimatedText.tsx              → Componente riusabile per testo animato (chars/words/lines)
    RevealOnScroll.tsx            → Wrapper fade-in su scroll
    ParallaxImage.tsx             → Immagine con effetto parallax
    ProjectCard.tsx               → Card progetto con clip-path reveal + hover
    PageTransition.tsx            → Overlay GSAP per transizioni pagina (translateY)
    TransitionLink.tsx            → <a> wrapper che usa navigateWithTransition
    LanguageSwitcher.tsx          → Toggle IT/EN

data/projects.ts                  → Array progetti + helper (getBySlug, getAdjacent)
hooks/useScrollToSection.tsx      → Hook Lenis per scroll a sezioni
lib/gsap.ts                       → Registrazione plugin GSAP
lib/utils.ts                      → cn() utility (clsx + tailwind-merge)
i18n/routing.ts                   → Locales ['it','en'], default 'it'
i18n/navigation.ts                → Link, usePathname, useRouter (next-intl)
i18n/request.ts                   → Caricamento messaggi per locale
providers/RootProviders.tsx       → Lenis + ScrollToTop + PageTransition + HeroUI
messages/it.json + en.json        → Traduzioni
hero.ts                           → Plugin HeroUI per Tailwind
proxy.ts                          → Middleware next-intl
```

---

## Cosa e stato fatto (sessione corrente)

### 1. Page Transitions GSAP (custom)

**Problema**: `next-view-transitions` non funziona con next-intl — nessuna transizione visibile.

**Soluzione**: Sistema custom con overlay GSAP.

- **`PageTransition.tsx`**: Div full-screen fixed con `z-9999`, posizionato sopra il viewport (`yPercent: -100`). Al click su un link:
  1. Overlay scende da sopra (`yPercent: -100 → 0`) — copre la pagina (0.5s)
  2. `router.push(href)` viene chiamato quando l'overlay copre tutto
  3. Al cambio pathname, overlay scorre via verso il basso (`yPercent: 0 → 100`) — rivela la nuova pagina (0.5s)
  4. Reset a `yPercent: -100` per la prossima transizione

- **`TransitionLink.tsx`**: Semplice `<a>` che previene il default e chiama `navigateWithTransition(href)`

- **Integrazione**:
  - `ProjectCard.tsx` → usa `usePageTransition()` hook con onClick
  - `progetti/[slug]/page.tsx` → prev/next usano `<TransitionLink>`
  - `Navbar.tsx` → logo usa `<TransitionLink>`, nav cross-page usa `navigateWithTransition`
  - `RootProviders.tsx` → wrappa tutto con `<PageTransitionProvider>`

- **Rimosso**: `next-view-transitions`, `viewTransition: true` da next.config, tutti i `viewTransitionName` inline, CSS `::view-transition-*`

### 2. Testo Hero

- **IT**: "Progettazione Architettonica & Arredo di Interni"
- **EN**: "Architectural Design & Interior Furnishing"
- Font ridotto: `text-[7vw] md:text-[5.5vw]` (era `text-[10vw] md:text-[8vw]`)
- Aggiunto `text-balance` per bilanciare le righe
- SplitText usa `type: 'words,chars'` (non solo `'chars'`) per evitare rottura parole mid-word

### 3. Velocizzazione animazioni

| Componente              | Prima          | Dopo        |
| ----------------------- | -------------- | ----------- |
| Hero delay iniziale     | 0.8s           | 0.3s        |
| Hero chars duration     | 1.2s           | 0.8s        |
| Hero chars stagger      | 0.03           | 0.02        |
| Hero linea              | 1s             | 0.6s        |
| Hero subtitle           | 0.8s           | 0.5s        |
| AnimatedText duration   | 1s             | 0.7s        |
| AnimatedText y          | 40px           | 30px        |
| RevealOnScroll duration | 1s             | 0.7s        |
| RevealOnScroll y        | 60px           | 40px        |
| ProjectCard curtain     | 1.2s           | 0.8s        |
| ProjectCard stagger     | 0.15           | 0.1         |
| ProjectCard image scale | 1.15→1 in 1.4s | 1.1→1 in 1s |

### 4. Altre modifiche fatte (sessione precedente)

- **Hero bright**: Cambiato da `bg-foreground` a `bg-background`, testo invertito
- **Griglia progetti**: Da 3 colonne asimmetriche a 2 colonne uguali
- **Card animation**: Clip-path curtain reveal (dal basso) + image scale simultanea
- **Navbar**: Scroll-to-section con Lenis hook, cross-page navigation con deferred scroll
- **ScrollToTop**: Componente in RootProviders che scrolla a top su cambio pathname
- **Cursor pointer**: Regola globale in `globals.css` per a, button, [role='button'], ecc.

---

## Cosa manca / Miglioramenti possibili

### Priorita alta

1. **Animazione entrata pagina progetto** — Ora l'overlay rivela la pagina, ma il contenuto della pagina progetto (hero, titolo, gallery) appare tutto insieme. Sarebbe meglio animare l'entrata degli elementi (titolo che sale, immagine che fa fade-in) dopo che l'overlay si ritira.

2. **Pagina tutti i progetti** — Non esiste una pagina `/progetti` che mostri tutti i progetti. Solo la griglia in home. Potrebbe servire una pagina dedicata con filtri per categoria.

3. **Back to home da progetto** — Il pulsante "Torna ai progetti" nelle traduzioni esiste ma non e usato da nessuna parte. Aggiungere un link sopra la navigazione prev/next.

### Priorita media

4. **Loading state / skeleton** — Durante la transizione pagina, il contenuto potrebbe non essere pronto. Un piccolo stato di loading aiuterebbe.

5. **Animazione Navbar su scroll** — La navbar e sempre visibile con mix-blend-difference. Si potrebbe aggiungere un background blur quando si scrolla oltre la hero, o nasconderla durante lo scroll down e mostrarla su scroll up.

6. **Immagini progetto mancanti** — I progetti usano immagini placeholder. Servono le foto reali.

7. **Framer Motion inutilizzato** — E nel package.json ma non sembra usato. Rimuoverlo per ridurre il bundle.

8. **Mobile menu animation** — Il menu mobile appare/scompare senza transizione. Aggiungere animazione GSAP.

9. **Footer migliorato** — Il footer e molto minimale. Aggiungere indirizzo studio, link social, mappa.

### Priorita bassa

10. **Preload immagini progetto** — Quando l'utente fa hover su una card, fare prefetch della pagina progetto per navigazione istantanea.

11. **404 personalizzata** — La pagina not-found esiste ma potrebbe avere un design migliore con animazioni.

12. **Accessibilita** — Verificare contrasti colore (il grigio chiaro su bianco potrebbe non passare WCAG), aggiungere aria-labels dove mancano, testare con screen reader.

13. **Performance** — Verificare LCP, CLS, INP. Le immagini webp sono gia ottimizzate ma verificare i sizes per evitare download eccessivi.

14. **SEO structured data** — Aggiungere JSON-LD per Organization, LocalBusiness, e Portfolio/CreativeWork.

15. **Cookie banner / Privacy** — Se il sito va in produzione in Italia, serve cookie banner GDPR.
