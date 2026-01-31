# James Brink Personal Website

Personal website and blog built with Astro, TypeScript, and Tailwind CSS.

## Quick Start

### Prerequisites

- [Nix](https://nixos.org/download.html) with flakes enabled

### Development

```bash
# Enter development environment
nix develop

# Install dependencies
bun install

# Start dev server (http://localhost:4321)
bun run dev
```

Or use `nix run` directly:

```bash
nix run  # Starts dev server
```

## Commands

| Command            | Description          |
| ------------------ | -------------------- |
| `bun run dev`      | Start dev server     |
| `bun run build`    | Build for production |
| `bun run check`    | TypeScript checks    |
| `bun run lint`     | ESLint               |
| `bun run lint:md`  | Markdown linting     |
| `bun run test:run` | Run tests            |
| `treefmt`          | Format all files     |

### Nix Commands

| Command               | Description           |
| --------------------- | --------------------- |
| `nix run`             | Start dev server      |
| `nix run .#lint`      | Run all linting       |
| `nix run .#check-all` | Run all checks        |
| `nix flake check`     | Verify Nix formatting |

## Project Structure

```
src/
├── components/   # Astro components
├── content/blog/ # MDX blog posts
├── layouts/      # Page layouts
├── pages/        # Routes
└── styles/       # Tailwind CSS
```

## Adding Blog Posts

Create `src/content/blog/your-post.mdx`:

```mdx
---
title: 'Post Title'
description: 'Brief description'
date: 2024-01-20
tags: ['tag1', 'tag2']
---

Content here...
```

## Deployment

```bash
bun run build
```

Output is in `dist/`, ready for any static host.

## License

MIT
