# James Brink's Personal Website

This is the source code for my personal website and blog, built with Jekyll and the Minimal Mistakes theme. The site is designed to be deployed to GitHub Pages but can also be run locally using Nix or Docker.

## Development

### Using Nix (Recommended)

This project uses [Nix](https://nixos.org/) with flakes for dependency management. If you have Nix installed with flakes enabled:

```bash
# Enter development shell
nix develop

# Start Jekyll server
jekyll serve
```

### Using Docker

Alternatively, you can use Docker to build and run the site:

```bash
# Build the Docker image
podman build -t jamesbrink-site-ghpages .

# Run the container
podman run --rm -it -p 4000:4000 localhost/jamesbrink-site-ghpages:latest
```

The site will be available at http://localhost:4000

## Project Structure

- `_posts/`: Blog posts in Markdown format
- `_pages/`: Static pages
- `assets/`: Images, CSS, and other static assets
- `_data/`: Data files for navigation and other site configuration
- `_config.yml`: Main Jekyll configuration

## Dependency Management

This project uses a hybrid approach to dependency management:

- **Local Development**: Dependencies are managed through `flake.nix`
- **Docker/CI**: Dependencies are resolved using the Gemfile
- **GitHub Pages**: Uses standard GitHub Pages gem dependencies

The Gemfile.lock is intentionally excluded from Git and Docker to allow each environment to resolve its own dependencies.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

---

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Minimal Mistakes Theme Documentation](https://mmistakes.github.io/minimal-mistakes/docs/configuration/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
