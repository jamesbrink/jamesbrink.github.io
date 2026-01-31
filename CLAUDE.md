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

- **Astro 5.x** with MDX for blog posts
- **Tailwind CSS 4.1** with CSS-first configuration
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

### Tailwind 4.1 CSS-First

Styling in `/src/styles/tailwind.css` uses:

- `@theme` directive for custom properties
- `@custom-variant dark` with `.dark` class on `<html>`
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

PDF resumes are generated from Typst source files in `resume/`:

| Template  | Source                        | Output                                   | Pages |
| --------- | ----------------------------- | ---------------------------------------- | ----- |
| Full      | `resume/resume.typ`           | `public/JamesBrink-Resume.pdf`           | 2     |
| Condensed | `resume/resume-condensed.typ` | `public/JamesBrink-Resume-Condensed.pdf` | 1     |

Use the `/cv` skill to edit and rebuild:

- `/cv` or `/cv build` — Edit/build full resume
- `/cv condensed build` — Build condensed resume
- `/cv open` — Build and open in Preview

When updating job descriptions, sync changes to both `.typ` files and `src/pages/resume.astro`.

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
