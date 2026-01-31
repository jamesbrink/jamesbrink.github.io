{
  description = "jamesbrink-website - James Brink <brink.james@gmail.com>";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    bun2nix = {
      url = "github:baileyluTCD/bun2nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    inputs@{ flake-parts, self, ... }:
    let
      # Read metadata from package.json
      packageJson = builtins.fromJSON (builtins.readFile ./package.json);
      # Version from last commit date (YYYYMMDD format)
      version = self.lastModifiedDate or "dev";
    in
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        inputs.treefmt-nix.flakeModule
      ];

      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      perSystem =
        {
          config,
          pkgs,
          lib,
          system,
          ...
        }:
        let
          # Common packages for development
          devPackages = with pkgs; [
            bun
            nodejs_22
            git
            markdownlint-cli
            config.treefmt.build.wrapper
            inputs.bun2nix.packages.${system}.default
            # Image manipulation tools
            imagemagick
            libwebp
            oxipng
            vips # For DZI tile generation (deep zoom mosaics)
            # Resume generation
            typst
          ];

          # Script to run linting checks
          lintScript = pkgs.writeShellScriptBin "lint-all" ''
            set -e
            echo "Running ESLint..."
            ${pkgs.bun}/bin/bun run lint
            echo "Running markdownlint..."
            ${pkgs.markdownlint-cli}/bin/markdownlint '**/*.md' \
              --ignore node_modules \
              --ignore dist \
              --ignore jamesbrink.github.io \
              --ignore playwright-report \
              --ignore test-results
            echo "All linting checks passed!"
          '';

          # Script to run type checks
          typeCheckScript = pkgs.writeShellScriptBin "type-check" ''
            set -e
            echo "Running TypeScript/Astro checks..."
            ${pkgs.bun}/bin/bun run check
            echo "Type checks passed!"
          '';

          # Script to run all checks
          checkAllScript = pkgs.writeShellScriptBin "check-all" ''
            set -e
            echo "=== Running all checks ==="
            echo ""
            echo "--- Formatting ---"
            ${config.treefmt.build.wrapper}/bin/treefmt --fail-on-change
            echo ""
            echo "--- Linting ---"
            ${lintScript}/bin/lint-all
            echo ""
            echo "--- Type Checking ---"
            ${typeCheckScript}/bin/type-check
            echo ""
            echo "--- Tests ---"
            ${pkgs.bun}/bin/bun run test:run
            echo ""
            echo "=== All checks passed! ==="
          '';

          # Dev server script (runs from current directory)
          devScript = pkgs.writeShellScriptBin "dev" ''
            if [ ! -d "node_modules" ]; then
              echo "Installing dependencies..."
              ${pkgs.bun}/bin/bun install
            fi
            echo "Starting dev server..."
            exec ${pkgs.bun}/bin/bun run dev
          '';
        in
        {
          # Treefmt configuration for development (includes prettier)
          treefmt = {
            projectRootFile = "flake.nix";
            # Disable the auto-generated flake check (requires node_modules for prettier)
            flakeCheck = false;
            programs = {
              nixfmt.enable = true;
              prettier = {
                enable = true;
                includes = [
                  "*.js"
                  "*.ts"
                  "*.tsx"
                  "*.json"
                  "*.css"
                  "*.astro"
                  "*.md"
                  "*.mdx"
                ];
                excludes = [
                  "node_modules/**"
                  "dist/**"
                  ".astro/**"
                  "bun.lock"
                  "jamesbrink.github.io/**"
                  "playwright-report/**"
                  "test-results/**"
                ];
              };
            };
          };

          formatter = config.treefmt.build.wrapper;

          # Checks run by `nix flake check` - only nixfmt (pure, no node_modules needed)
          checks = {
            nix-fmt = pkgs.runCommand "check-nix-fmt" { } ''
              ${pkgs.nixfmt}/bin/nixfmt --check ${self}/flake.nix
              touch $out
            '';
          };

          # Apps run by `nix run`
          apps = {
            default = {
              type = "app";
              program = "${devScript}/bin/dev";
              meta.description = "Start Astro development server";
            };
            dev = {
              type = "app";
              program = "${devScript}/bin/dev";
              meta.description = "Start Astro development server";
            };
            lint = {
              type = "app";
              program = "${lintScript}/bin/lint-all";
              meta.description = "Run ESLint and Markdownlint checks";
            };
            check-all = {
              type = "app";
              program = "${checkAllScript}/bin/check-all";
              meta.description = "Run formatting, linting, type checks, and tests";
            };
          };

          # DevShell
          devShells.default = pkgs.mkShell {
            packages = devPackages ++ [
              lintScript
              typeCheckScript
              checkAllScript
            ];

            shellHook = ''
              echo "${packageJson.name} v${version}"
              echo "${packageJson.author}"
              echo ""
              echo "Commands:"
              echo "  bun install     - Install dependencies"
              echo "  bun run dev     - Start dev server"
              echo "  bun run build   - Build for production"
              echo "  bun run check   - TypeScript checks"
              echo "  bun run lint    - ESLint checks"
              echo "  lint-all        - Run all linting"
              echo "  type-check      - Run type checks"
              echo "  check-all       - Run all checks"
              echo "  treefmt         - Format all files"
              echo ""
            '';
          };
        };
    };
}
