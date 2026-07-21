# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Environment

**Use Nix for a reproducible development environment with Bun.**

```bash
nix develop                    # Enter development shell
bun install                    # Install dependencies
bun run dev                    # Start dev server at http://localhost:4321
bun run build                  # Build for production (includes astro check)
```

## Commands

| Command               | Purpose                               |
| --------------------- | ------------------------------------- |
| `bun run dev`         | Start Astro dev server                |
| `bun run build`       | TypeScript check + production build   |
| `bun run check`       | TypeScript checks only                |
| `bun run lint`        | ESLint checks                         |
| `bun run lint:md`     | Markdownlint checks                   |
| `bun run lint:all`    | ESLint + Markdownlint                 |
| `bun run test:run`    | Run Vitest tests once                 |
| `bun run test:visual` | Playwright visual regression          |
| `treefmt`             | Format all files (requires Nix shell) |

### Nix Commands

| Command               | Purpose                                         |
| --------------------- | ----------------------------------------------- |
| `nix run`             | Start dev server                                |
| `nix run .#lint`      | Run all linting                                 |
| `nix run .#check-all` | Run formatting, linting, type checks, and tests |
| `nix flake check`     | Verify Nix formatting (pure check)              |

Run a single test:

```bash
bun run vitest tests/utils.test.ts
```

## Architecture

### Stack

- **Astro 7.x** with MDX for blog posts
- **Tailwind CSS 4.3** with CSS-first configuration
- **Bun** as package manager
- **Nix flake-parts** for reproducible dev environment
- **Vitest** for unit tests, **Playwright** for visual regression

### Spotlight Template Components

The UI is based on the Tailwind Spotlight template, ported from React to Astro:

- **Layouts**: `BaseLayout` (root), `SimpleLayout` (basic pages), `ArticleLayout` (blog posts)
- **Container system**: `Container` → `ContainerOuter` + `ContainerInner` for consistent max-width and padding
- **Card system**: `Card` with composable children (`CardLink`, `CardTitle`, `CardDescription`, `CardCta`, `CardEyebrow`)
- **Other**: `Header`, `Footer`, `Button`, `Prose` (typography wrapper), `SocialIcons`

### Content Collections

Blog posts in `src/content/blog/*.mdx` use this schema:

```typescript
{
  title: string,
  description: string,
  date: Date,
  updatedDate?: Date,
  heroImage?: string,
  tags: string[],        // default: []
  draft: boolean,        // default: false
  series?: string,
  seriesOrder?: number,
}
```

### "Emission" Design System (dark-first)

The visual identity is **"Emission"** — warm near-black "ink" neutrals + a single
H-alpha crimson accent, Newsreader serif + IBM Plex Mono, a starfield/nebula-bloom
backdrop, and floating frosted chrome. It is **dark by default**.

- **Token layer**: `src/styles/ds/{colors,typography,spacing,effects,base}.css`
  hold the DS semantic tokens (`--surface-*`, `--text-*`, `--emission-*`,
  `--font-serif`, effects). `:root` is the dark theme; adding `.light` to `<html>`
  flips every token to the warm-paper variant. `base.css` is imported into
  `@layer base` so utilities can override its global `:where(a)` link color.
- **Utilities**: `src/styles/tailwind.css` bridges the tokens to Tailwind via
  `@theme inline` (e.g. `bg-page`, `bg-card`, `text-heading`, `text-body`,
  `text-accent`, `text-link`, `border-hairline`, `text-emission`). Because the
  tokens flip at runtime, components use these **without `dark:` variants**.
- **Theme toggle**: dark-first. `BaseLayout.astro`'s inline script adds `.light`
  only when `localStorage.theme === 'light'`; `Header.astro` toggles `.light`.
  (Note: `@custom-variant light`, not the old `dark` variant.)
- **Prose/syntax**: `/typography.ts` (single Emission prose theme) + `prism.css`
  (Emission code theme on the deep `--surface-code` panel, dark in both themes).

### Tailwind 4.3 CSS-First

Styling in `/src/styles/tailwind.css` uses:

- `@theme` for the type scale; `@theme inline` for the semantic color/font tokens
- `@custom-variant light` with `.light` class on `<html>` (dark-first)
- Typography plugin config in `/typography.ts`

## Testing

Two test files remain after modernization:

- `tests/utils.test.ts` - Date formatting, slugify helpers
- `tests/mdx-validation.test.ts` - Validates all MDX files compile and have valid frontmatter

Visual regression tests in `tests/visual-regression/` run with Playwright (separate from Vitest).

## MDX Authoring

Escape HTML-like syntax in MDX content:

- `<example>` → `&lt;example&gt;`

The mdx-validation test catches syntax issues before build.

## Resume System

The **published** downloadable resume (`public/JamesBrink-Resume.pdf`) is the
single-page **Emission**-styled resume, rendered from a self-contained HTML
source so it is text-selectable (not a rasterized image):

| Source                                   | Output                         | How                              |
| ---------------------------------------- | ------------------------------ | -------------------------------- |
| `resume/emission/JamesBrink-Resume.html` | `public/JamesBrink-Resume.pdf` | `bun resume/emission/render.mjs` |

`render.mjs` uses Playwright Chromium print-to-PDF (`page.pdf` → vector/text,
`printBackground: true` for the dark sidebar + starfield). The bundle
(`resume/emission/`: HTML, `styles.css`, `tokens/`, `doc-page.js`) is self-contained;
edit the HTML then re-run the script. Keep content in sync with
`src/pages/resume.astro` (dates, roles — e.g. Yahoo = "Senior Operations Engineer").

**Legacy (not the published PDF):** the Typst templates `resume/resume.typ` and
`resume/resume-condensed.typ` (built via the `/cv` skill / `typst compile`) predate
the Emission redesign and are kept for reference only. They may lag the current
content; do not treat their output as the live resume.

## Astrophotography Gallery

Photos are managed via `/astrophotography` skill with data in `src/data/astrophotography.ts`.

| Directory                                    | Size   | Purpose              |
| -------------------------------------------- | ------ | -------------------- |
| `public/images/astrophotography/thumbnails/` | 400px  | Gallery grid hover   |
| `public/images/astrophotography/grid/`       | 800px  | Gallery grid display |
| `public/images/astrophotography/full/`       | 1920px | Lightbox full view   |

Use the `/astrophotography` skill to manage photos:

- `/astrophotography add "SourceFile.jpg" photo-id` — Add new photo
- `/astrophotography list` — List all photos
- `/astrophotography update photo-id` — Update metadata
- `/astrophotography optimize` — Re-optimize all images

Source photos are in `~/Pictures/website/`. The optimization script uses ImageMagick (`magick`).

## Git Commits

Use conventional prefixes: `fix:`, `feat:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

Stage specific files rather than `git add -A`.
