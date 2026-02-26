# Next.js Static Template

A modern, production-ready Next.js template for building static websites without a database.

## Tech Stack

| Category      | Technology                                                    |
| ------------- | ------------------------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org/) (App Router)                |
| Language      | [TypeScript 5](https://www.typescriptlang.org/) (strict mode) |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com/)                   |
| UI Components | [HeroUI](https://heroui.com/)                                 |
| Animations    | [Framer Motion](https://www.framer.com/motion/)               |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering/)                  |
| Icons         | [Lucide React](https://lucide.dev/)                           |

## Features

- **App Router** - Latest Next.js routing with layouts, error boundaries, and not-found pages
- **TypeScript Strict** - Full type safety with strict mode enabled
- **Tailwind CSS v4** - Utility-first CSS with custom theme configuration
- **SEO Ready** - Complete metadata setup with Open Graph and Twitter cards
- **Smooth Scrolling** - Lenis integration with custom `useScrollToSection` hook
- **Developer Experience** - ESLint, Prettier, Husky, and Conventional Commits
- **MCP DevTools** - Next.js DevTools integration for enhanced debugging

## Getting Started

### Prerequisites

- Node.js 21+ (see `.nvmrc`)
- npm, pnpm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd <project-name>

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── error.tsx          # Error boundary
│   ├── not-found.tsx      # 404 page
│   └── globals.css        # Global styles & Tailwind config
├── components/            # React components (create as needed)
├── hooks/                 # Custom React hooks
│   └── useScrollToSection.tsx
├── lib/                   # Utility functions
│   └── utils.ts           # cn() helper for classnames
├── providers/             # React context providers
│   └── RootProviders.tsx  # HeroUI + Lenis providers
├── public/                # Static assets
│   └── fonts/             # Local fonts (Geist)
└── types/                 # TypeScript type definitions
```

## Scripts

| Command            | Description              |
| ------------------ | ------------------------ |
| `npm run dev`      | Start development server |
| `npm run build`    | Build for production     |
| `npm run start`    | Start production server  |
| `npm run lint`     | Run ESLint               |
| `npm run lint:fix` | Run ESLint with auto-fix |

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Customization

- **Theme Colors**: Edit `app/globals.css` under `@theme inline`
- **Metadata**: Update `app/layout.tsx` with your site info
- **Fonts**: Replace files in `public/fonts/` and update `layout.tsx`

## Code Quality

This template includes:

- **ESLint** - Code linting with Next.js config
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks
- **lint-staged** - Run linters on staged files
- **Commitlint** - Enforce [Conventional Commits](https://www.conventionalcommits.org/)

### Commit Message Format

```
type(scope): description

# Examples:
feat(auth): add login page
fix(ui): resolve button alignment
docs: update README
```

## License

MIT
