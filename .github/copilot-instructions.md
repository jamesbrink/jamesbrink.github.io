# GitHub Copilot Instructions

## Project Overview

Personal website built with Astro 5.x, TypeScript, and Tailwind CSS 4.1. Features blog posts migrated from Jekyll, dark mode, and comprehensive visual regression testing. Key distinction: uses Tailwind CSS 4.1's CSS-first configuration instead of traditional JS config.

## Development Environment

**Primary workflow: Nix + Bun (preferred) or Docker**

```bash
# Nix development (recommended)
nix develop
bun install
bun run dev              # http://localhost:4321

# Alternative: Docker (no local dependencies needed)
docker compose up        # Starts dev server automatically
```

**Never use `npm` or `pnpm` commands** - this project uses Bun exclusively.

## Architecture Patterns

### Component System: Spotlight-Inspired

Components follow a composition pattern inspired by Spotlight design:
- **Container** → wraps content with responsive padding/max-width
- **Card** → base wrapper with flexbox layout (`group relative flex flex-col`)
- **CardTitle/CardDescription/CardEyebrow/CardCta** → compose into Card
- **ContainerOuter/ContainerInner** → nested containers for specific layouts

Example from [src/components/Card.astro](src/components/Card.astro):
```astro
<Card as="article">
  <CardTitle href="/blog/post">Title</CardTitle>
  <CardDescription>Description</CardDescription>
</Card>
```

### Content Collections: Strict Schema

Blog posts in `src/content/blog/` use Astro content collections with Zod validation ([src/content/config.ts](src/content/config.ts)):

```typescript
{
  title: string,
  description: string,
  date: Date,                // Required
  updatedDate?: Date,
  heroImage?: string,
  tags: string[],           // default: []
  draft: boolean,           // default: false
  series?: string,
  seriesOrder?: number,
}
```

Dynamic routes use `getStaticPaths()` - see [src/pages/blog/[...slug].astro](src/pages/blog/[...slug].astro#L5-L11).

### Tailwind CSS 4.1 CSS-First Configuration

**Critical distinction**: Uses `@theme` directive in CSS, not `tailwind.config.js`.

Configuration lives in [src/styles/tailwind.css](src/styles/tailwind.css):
```css
@import 'tailwindcss';
@plugin '@tailwindcss/typography';
@config '../../typography.ts';

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --text-xs: 0.8125rem;
  --text-xs--line-height: 1.5rem;
  /* ... custom design tokens */
}
```

Typography plugin configured in [typography.ts](typography.ts) with custom prose colors.

### Dark Mode Implementation

Dark mode uses class-based switching with persistent localStorage:
1. Inline script in [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro#L32-L38) prevents flash
2. `.dark` class toggled on `<html>` element
3. Custom variant defined: `@custom-variant dark (&:where(.dark, .dark *))`
4. Use `dark:` prefix in components: `dark:bg-zinc-900`

## Testing Strategy

### Unit Tests (Vitest)

**Test our code, not Astro's** - focus on utilities and business logic.

- Setup: [tests/setup.ts](tests/setup.ts) provides jsdom + localStorage mocks
- Mock Astro APIs: Use `vi.mock('astro:content')` for content collections
- Run: `bun run test` or `bun run test:run` (single pass)

Example: [tests/utils.test.ts](tests/utils.test.ts) tests date formatting, not Astro rendering.

### Visual Regression (Playwright)

**Always update baselines before testing changes:**

```bash
bun run test:visual:update    # Create/update baseline screenshots
bun run test:visual           # Compare against baselines
```

Tests in [tests/visual-regression/](tests/visual-regression/) cover:
- Light/dark mode screenshots for each page
- Responsive viewports (mobile/tablet/desktop)
- Component interactions (mobile menu, tag filters)

Configuration: [playwright.config.ts](playwright.config.ts) uses Chromium in Docker (`/usr/bin/chromium`).

### MDX Validation

[tests/mdx-validation.test.ts](tests/mdx-validation.test.ts) validates:
1. Frontmatter against Zod schema
2. MDX compilation (catches unescaped HTML like `<example>`)
3. No parsing errors

**When writing MDX**: Escape HTML syntax → `<example>` becomes `&lt;example&gt;`

## Critical Workflows

### Adding Blog Posts

1. Create `src/content/blog/yyyy-mm-dd-slug.mdx`
2. Add frontmatter matching schema (see above)
3. Run `bun run test` to validate MDX and frontmatter
4. Escape HTML-like syntax: `<tag>` → `&lt;tag&gt;`

### Styling Components

1. Use Tailwind utilities - defined in [src/styles/tailwind.css](src/styles/tailwind.css)
2. Always include dark mode variant: `dark:bg-zinc-900`
3. Follow color system: `zinc-*` for neutrals, `teal-*` for accents
4. Typography prose styles: [typography.ts](typography.ts) defines prose colors

### Running Tests in Docker

```bash
docker compose exec dev bun test              # Unit tests
docker compose exec dev bun run test:visual   # Visual regression
```

## Common Patterns

### Date Formatting
```typescript
import { formatDate } from '@/lib/utils';
formatDate(new Date())  // "January 30, 2026"
```

### Conditional Classes
```astro
import clsx from 'clsx';
<div class={clsx('base-class', someCondition && 'conditional-class')} />
```

### Layout Hierarchy
- BaseLayout → Header/Footer + slot
- SimpleLayout → BaseLayout + title/intro
- ArticleLayout → SimpleLayout + date + article prose

## Build & Deploy

```bash
bun run build    # astro check + astro build
bun run preview  # Preview production build
```

Build outputs to `dist/` - ready for static hosting (Netlify, Vercel, etc.).

## Git Conventions

Use conventional commits: `fix:`, `feat:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

Stage specific files - avoid `git add -A` to prevent committing sensitive files.
