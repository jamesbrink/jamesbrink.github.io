James Brink Personal Website
============================

This repo is for my personal website and blog.

This is a [Jekyll](http://jekyllrb.com/) website managed with [Nix](https://nixos.org/) for consistent development environments.

## Development

### Prerequisites
- [Nix](https://nixos.org/download.html) (with flakes enabled)
- Optionally [direnv](https://direnv.net/) for automatic environment loading

### Setup

Using Nix directly:
```sh
# Enter the development environment
nix develop

# Install dependencies
setup

# Start the development server
serve
```

With direnv (after initial setup):
```sh
# Allow the .envrc file
direnv allow

# Install dependencies
setup

# Start the development server
serve
```

## Production

Build the site for production:

```sh
# Build the site
build

# The site will be generated in the _site directory
```

