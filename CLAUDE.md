# Development Guidelines for jamesbrink.github.io

## Environment Setup
- Prerequisites: Install [Nix](https://nixos.org/download.html) with flakes enabled
- Setup environment: `nix develop` or `direnv allow` (if using direnv)

## Build Commands
- Install dependencies: `setup`
- Start local server: `serve` 
- Build for production: `build`
- Create new blog post: `new-post "Your Post Title"`
- Clean build files: `clean`
- Update dependencies: `update`
- Format all files: `format` (uses treefmt)
- Optimize images: `optimize-images`
- Check versions: `version`

## Code Style Guidelines
- Formatting:
  - Use `format` command to automatically format all files
  - HTML, CSS, SCSS, JSON, MD, JS: nodePackages.prettier
  - YAML: yamlfmt
  - Nix files: nixfmt
  - See treefmt.toml for configuration details
- Jekyll/Ruby:
  - Use Jekyll 4.3+ conventions
  - Follow kramdown syntax for markdown
  - Keep front matter organized with consistent key ordering
- SCSS:
  - Use compressed style in production
  - Maintain skin options in _sass/skins/
  - Follow BEM naming convention for CSS classes
- HTML:
  - Use semantic HTML5 elements
  - Indent with 2 spaces
  - Keep templates modular via _includes directory
- General:
  - Write descriptive commit messages
  - Organize blog posts with proper front matter
  - Maintain responsive design principles