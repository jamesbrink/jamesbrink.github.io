{
  description = "James Brink's Personal Website";

  inputs = {
    nixpkgs = {
      url = "github:nixos/nixpkgs/nixos-unstable";
    };
    devshell = {
      url = "github:numtide/devshell";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      devshell,
    }:
    let
      supportedSystems = [
        "x86_64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = import nixpkgs {
            inherit system;
            overlays = [ devshell.overlays.default ];
          };

          # Define minimal-mistakes-jekyll theme as a Ruby gem
          minimal-mistakes-jekyll = pkgs.buildRubyGem rec {
            pname = "minimal-mistakes-jekyll";
            gemName = "minimal-mistakes-jekyll";
            version = "4.26.2";

            src = pkgs.fetchFromGitHub {
              owner = "mmistakes";
              repo = "minimal-mistakes";
              rev = "4.26.2";
              sha256 = "sha256-s+w1lSMKCqg1MTrZMJMq6Zx/OhAmvh4FqBKSjF9R5RY=";
            };

            # Create a proper gemspec file
            postPatch = ''
              cat > minimal-mistakes-jekyll.gemspec <<EOF
              # -*- encoding: utf-8 -*-
              Gem::Specification.new do |s|
                s.name = "minimal-mistakes-jekyll"
                s.version = "4.26.2"
                s.summary = "A flexible Jekyll theme"
                s.description = "A flexible Jekyll theme with a minimalist aesthetic."
                s.authors = ["Michael Rose"]
                s.email = ["michael@mademistakes.com"]
                s.homepage = "https://github.com/mmistakes/minimal-mistakes"
                s.licenses = ["MIT"]
                s.files = Dir["**/*"]
                s.require_paths = ["lib"]
                s.add_runtime_dependency "jekyll", ">= 3.7", "< 5.0"
                s.add_runtime_dependency "jekyll-paginate", ">= 1.1", "< 2.0"
                s.add_runtime_dependency "jekyll-sitemap", ">= 1.3", "< 2.0"
                s.add_runtime_dependency "jekyll-include-cache", ">= 0.1", "< 1.0"
              end
              EOF
            '';
          };

          # Define the Ruby environment with all required gems
          rubyEnv = pkgs.ruby.withPackages (
            ps: with ps; [
              # Using 'with ps;' is generally fine
              # Jekyll Core and Required Runtime
              jekyll
              webrick

              # Jekyll plugins (all needed plugins from _config.yml)
              jekyll-feed
              jekyll-seo-tag
              jekyll-sitemap
              jekyll-paginate
              jekyll-include-cache
              jekyll-remote-theme
              jekyll-watch
              kramdown-parser-gfm
              kramdown
              # Make sure all plugins are included
              jekyll-sass-converter

              # Additional plugins for minimal-mistakes theme
              jekyll-gist
              jemoji

              # Add the minimal-mistakes-jekyll theme as a gem
              minimal-mistakes-jekyll

              # Native extensions are handled by Nix automatically
            ]
          );

        in
        {
          default = pkgs.devshell.mkShell {
            name = "jamesbrink-website";

            # Set environment variables
            env = [
              {
                name = "JEKYLL_ENV";
                value = "development";
              }
            ];

            packages = with pkgs; [
              # The Ruby environment defined above
              rubyEnv
              minimal-mistakes-jekyll

              # Other non-Ruby dependencies
              git
              imagemagick
              libxml2 # Often needed by Nokogiri (a common dep)
              libxslt # Often needed by Nokogiri (a common dep)

              # Formatters
              nixfmt-rfc-style # Do not replace this, this is the RFC-style formatter available as nixfmt
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
                category = "jekyll";
                help = "Start Jekyll development server";
                command = ''
                  echo "Starting Jekyll server at http://localhost:4000"
                  jekyll serve --livereload
                '';
              }
              {
                name = "build";
                category = "jekyll";
                help = "Build Jekyll site";
                command = ''
                  echo "Building Jekyll site for production"
                  export JEKYLL_ENV=production
                  jekyll build
                '';
              }
              # ───────────────────────────────────────────────────────
              # JEKYLL COMMANDS
              # ───────────────────────────────────────────────────────
              {
                name = "clean";
                category = "jekyll";
                help = "Clean Jekyll build files";
                command = ''
                  echo "Cleaning Jekyll build files..."
                  jekyll clean
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
                category = "utility";
                help = "Format all files using treefmt";
                command = ''
                  echo "Formatting all files with treefmt..."
                  treefmt
                  echo "✅ Formatting complete!"
                '';
              }
              {
                name = "generate-gemfile";
                category = "utility";
                help = "Generate Gemfile and Gemfile.lock from current Nix environment";
                command = ''
                  ruby -r rubygems -e '
                    # Filter non-std gems → write Gemfile
                    g = Gem::Specification.group_by(&:name)
                      .reject { |_, s| s.any? { |x| x.default_gem? || 
                        (Gem::Specification.respond_to?(:bundled_gem?) && x.bundled_gem?) || 
                        x.full_require_paths.any? { |p| $LOAD_PATH.grep(/ruby/).any? { |l| p.start_with?(l) } } }}
                      .transform_values { |s| s.map(&:version).max.to_s }
                    File.write("Gemfile", "source \"https://rubygems.org\"\n\n# Generated from Nix environment on #{Time.now}\n" +
                      "# DO NOT EDIT MANUALLY\n\n" + g.sort.map { |n,v| "gem \"#{n}\", \"#{v}\"" }.join("\n"))
                  '
                  rm -f Gemfile.lock && bundle lock --local
                  echo "✅ Gemfile and Gemfile.lock generated!"
                '';
              }
            ];
          };
        }
      );
    };
}
