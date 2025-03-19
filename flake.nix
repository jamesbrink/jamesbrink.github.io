{
  description = "James Brink's Personal Website";

  inputs = {
    nixpkgs = { url = "github:nixos/nixpkgs/nixos-unstable"; };
    devshell = { url = "github:numtide/devshell"; };
  };

  outputs = { self, nixpkgs, devshell }:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-darwin" "x86_64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in {
      devShells = forAllSystems (system:
        let
          pkgs = import nixpkgs {
            inherit system;
            overlays = [ devshell.overlays.default ];
          };
        in {
          default = pkgs.devshell.mkShell {
            name = "jamesbrink-website";

            packages = with pkgs; [
              # Jekyll and dependencies
              jekyll
              bundler
              rubyPackages.jekyll-paginate
              rubyPackages.jekyll-sitemap

              # Development tools
              git
              imagemagick
              libxml2
              libxslt

              # Formatters
              nixfmt # Use the default nixfmt (will be replaced by RFC-style formatter in future)
              nodePackages.prettier
              yamlfmt
              treefmt
            ];

            commands = [
              # ───────────────────────────────────────────────────────
              # MAIN WORKFLOW COMMANDS
              # ───────────────────────────────────────────────────────
              {
                name = "serve";
                category = "workflow";
                help = "Start Jekyll development server";
                command = ''
                  echo "Starting Jekyll server at http://localhost:4000"
                  bundle exec jekyll serve --livereload
                '';
              }
              {
                name = "build";
                category = "workflow";
                help = "Build Jekyll site";
                command = ''
                  echo "Building Jekyll site for production"
                  JEKYLL_ENV=production bundle exec jekyll build
                '';
              }
              # ───────────────────────────────────────────────────────
              # JEKYLL COMMANDS
              # ───────────────────────────────────────────────────────
              {
                name = "new-post";
                category = "jekyll";
                help = "Create a new blog post";
                command = ''
                                    if [ -z "$1" ]; then
                                      echo "Error: Post title is required"
                                      echo "Usage: new-post \"Your Post Title\""
                                      exit 1
                                    fi
                                    
                                    # Convert title to filename format
                                    TITLE="$1"
                                    DATE=$(date +%Y-%m-%d)
                                    FILENAME="_posts/$DATE-$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g').md"
                                    
                                    echo "Creating new post: $FILENAME"
                                    
                                    # Create post with front matter
                                    cat > "$FILENAME" << EOF
                  ---
                  layout: post
                  title: "$TITLE"
                  date: $DATE $(date +%H:%M:%S) -0700
                  categories: blog
                  ---

                  Write your content here.
                  EOF
                                    
                                    echo "✅ Post created: $FILENAME"
                '';
              }
              {
                name = "clean";
                category = "jekyll";
                help = "Clean Jekyll build files";
                command = ''
                  echo "Cleaning Jekyll build files..."
                  bundle exec jekyll clean
                '';
              }
              # ───────────────────────────────────────────────────────
              # BUNDLE COMMANDS
              # ───────────────────────────────────────────────────────
              {
                name = "setup";
                category = "development";
                help = "Setup project dependencies";
                command = ''
                  echo "Installing project dependencies..."
                  bundle install
                  echo "✅ Dependencies installed!"
                '';
              }
              {
                name = "update";
                category = "development";
                help = "Update project dependencies";
                command = ''
                  echo "Updating project dependencies..."
                  bundle update
                  echo "✅ Dependencies updated!"
                '';
              }
              # ───────────────────────────────────────────────────────
              # UTILITY COMMANDS
              # ───────────────────────────────────────────────────────
              {
                name = "optimize-images";
                category = "utility";
                help = "Optimize images in the assets directory";
                command = ''
                  echo "Optimizing images in assets/images directory..."
                  find assets/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -exec sh -c '
                    echo "Optimizing {}..."
                    mogrify -strip -quality 85% "{}"
                  ' \;
                  echo "✅ Image optimization complete!"
                '';
              }
              {
                name = "format";
                category = "development";
                help = "Format all files using treefmt";
                command = ''
                  echo "Formatting all files with treefmt..."
                  treefmt
                  echo "✅ Formatting complete!"
                '';
              }
              {
                name = "version";
                category = "jekyll";
                help = "Show Jekyll version";
                command = ''
                  echo "Jekyll version:"
                  bundle exec jekyll --version

                  echo "\nRuby version:"
                  ruby --version

                  echo "\nBundler version:"
                  bundle --version
                '';
              }
            ];
          };
        });
    };
}
