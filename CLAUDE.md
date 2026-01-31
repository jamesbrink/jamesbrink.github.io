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

| Command | Purpose |
|---------|---------|
| `bun run dev` | Start Astro dev server |
| `bun run build` | TypeScript check + production build |
| `bun run check` | TypeScript checks only |
| `bun run lint` | ESLint checks |
| `bun run lint:md` | Markdownlint checks |
| `bun run lint:all` | ESLint + Markdownlint |
| `bun run test:run` | Run Vitest tests once |
| `bun run test:visual` | Playwright visual regression |
| `treefmt` | Format all files (requires Nix shell) |

### Nix Commands

| Command | Purpose |
|---------|---------|
| `nix run` | Start dev server |
| `nix run .#lint` | Run all linting |
| `nix run .#check-all` | Run formatting, linting, type checks, and tests |
| `nix flake check` | Verify Nix formatting (pure check) |

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

## Git Commits

Use conventional prefixes: `fix:`, `feat:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

Stage specific files rather than `git add -A`.
