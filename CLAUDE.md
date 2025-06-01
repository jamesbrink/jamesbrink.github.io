# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Nix Development (Recommended)
```bash
# Enter development shell
nix develop

# Available commands in Nix shell:
serve              # Start Jekyll dev server with livereload (port 4000)
build              # Build site for production
clean              # Clean build files
optimize-images    # Optimize images in assets directory
format             # Format all files using treefmt
```

### Standard Jekyll Commands
```bash
# Start development server
bundle exec jekyll serve --livereload

# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Clean build artifacts
bundle exec jekyll clean
```

### Code Formatting
```bash
# Format all files (requires Nix shell)
treefmt
```

## Architecture Overview

This is a Jekyll-based personal blog using the Minimal Mistakes theme with extensive customizations:

- **Theme**: Minimal Mistakes 4.26.2 with custom Rosé Pine Dawn color scheme
- **Jekyll Version**: 3.10.0
- **Deployment**: GitHub Pages (primary), Netlify (alternative)
- **Development**: Nix flakes for dependency management

### Key Directories
- `_posts/`: Blog posts in Markdown format (YYYY-MM-DD-title.md)
- `_sass/custom/`: Custom theme overrides and components
- `_data/navigation.yml`: Site navigation configuration
- `assets/blog/`: Blog post images organized by post

### Theme Customization
The site uses a modular SCSS architecture in `_sass/custom/`:
- `_variables.scss`: Color palette and spacing system
- `components/`: Individual UI components (buttons, code blocks, navigation, etc.)
- Light theme with dark code blocks, subtle animations, and responsive design

### Adding Content
- **Blog Posts**: Create files in `_posts/` with format `YYYY-MM-DD-title.md`
- **Images**: Store in `assets/blog/post-title/` directory
- **Pages**: Add to `_pages/` directory with appropriate front matter

### Deployment
- **GitHub Pages**: Automatic via GitHub Actions on push to main branch
- **Build Output**: `_site/` directory (gitignored)
- **Production Build**: Set `JEKYLL_ENV=production` for optimized output

### Development Tools
- Remember to use your Playwright MCP tools as needed for dev and debugging for this website