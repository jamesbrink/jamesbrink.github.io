import type { ProjectSummary } from '../components/ProjectCard.astro';

export const otherProjects: ProjectSummary[] = [
  {
    name: 'Docker OpenGL',
    tagline: 'Software rendering in containers',
    description:
      'Mesa 3D OpenGL software rendering for Docker containers. Enables GPU-less rendering for CI/CD pipelines, headless servers, and testing environments.',
    repository: 'https://github.com/utensils/docker-opengl',
    techStack: ['Docker', 'Mesa3D', 'OpenGL'],
  },
  {
    name: 'Essex',
    tagline: 'Docker project scaffolding',
    description:
      'A Rust-based CLI tool for generating Docker project templates. Standardizes container project structure with best practices baked in.',
    repository: 'https://github.com/utensils/essex',
    techStack: ['Rust', 'Docker', 'CLI'],
  },
  {
    name: 'MCP Coroot',
    tagline: 'AI-powered observability queries',
    description:
      'Model Context Protocol server for the Coroot observability platform. Enables AI assistants to query infrastructure metrics and application performance data.',
    repository: 'https://github.com/jamesbrink/mcp-coroot',
    techStack: ['TypeScript', 'MCP', 'Coroot'],
  },
  {
    name: 'MCP Deadmansnitch',
    tagline: 'AI monitoring integration',
    description:
      "MCP server for Dead Man's Snitch monitoring service. Allows AI assistants to check cron job health and monitoring status.",
    repository: 'https://github.com/jamesbrink/mcp-deadmansnitch',
    techStack: ['TypeScript', 'MCP', 'Monitoring'],
  },
  {
    name: 'brinkOS',
    tagline: 'Linux for engineers',
    description:
      'A custom Arch-based Linux distribution tailored for software engineers and power users, with thoughtful defaults and automated installation.',
    repository: 'https://github.com/brinkOS/brinkOS',
    techStack: ['Arch Linux', 'Shell', 'Systemd'],
  },
  {
    name: 'Arch Linux AUR',
    tagline: 'Package maintainer',
    description:
      'Maintainer of several Arch User Repository packages, contributing tested packaging and updates to the community.',
    repository: 'https://github.com/jamesbrink/arch-aur',
    techStack: ['Arch Linux', 'PKGBUILD', 'Shell'],
  },
  {
    name: 'koban',
    tagline: 'Invoice Ninja from the terminal',
    description:
      'A scriptable Rust CLI and client library for Invoice Ninja—clients, invoices, payments, and reports for humans and AI agents.',
    repository: 'https://github.com/jamesbrink/koban',
    techStack: ['Rust', 'CLI', 'Nix', 'REST API'],
  },
  {
    name: 'claudex',
    tagline: 'Search your Claude Code sessions',
    description:
      'A Rust CLI to query, search, and analyze Claude Code session history with SQLite full-text search.',
    repository: 'https://github.com/utensils/claudex',
    techStack: ['Rust', 'SQLite', 'FTS5', 'CLI'],
  },
  {
    name: 'aethon',
    tagline: 'Pi with a face',
    description:
      'A Tauri desktop shell that embeds the pi coding agent and renders its output as live, interactive UI via A2UI.',
    repository: 'https://github.com/utensils/aethon',
    techStack: ['Tauri', 'React', 'A2UI', 'Rust'],
  },
  {
    name: 'yeet',
    tagline: 'Brutally rude AI commit messages',
    description:
      'A git tool that uses a local Ollama model to write technically accurate, hilariously offensive conventional commits and push them.',
    repository: 'https://github.com/utensils/yeet',
    techStack: ['Bash', 'Ollama', 'Local LLM'],
  },
  {
    name: 'why',
    tagline: 'Offline error explanations',
    description:
      'A CLI that explains programming errors using a locally embedded LLM. No API keys, internet, or patience required.',
    repository: 'https://github.com/jamesbrink/why',
    techStack: ['Rust', 'LLM', 'Offline', 'Nix'],
  },
  {
    name: 'burnrate',
    tagline: 'AI spend at a glance',
    description:
      'A menu-bar monitor for AI subscriptions, quotas, credits, and spend without leaving the status bar.',
    repository: 'https://github.com/jamesbrink/burnrate',
    techStack: ['Rust', 'Tauri', 'React'],
  },
  {
    name: 'strainer',
    tagline: 'Rate limiting for AI APIs',
    description:
      'Process-level rate limiting and spend management for AI API consumers that prevents rate-limit errors before they happen.',
    repository: 'https://github.com/utensils/strainer',
    techStack: ['Rust', 'CLI', 'AI/LLM'],
  },
  {
    name: 'pasta',
    tagline: 'Clipboard to keystrokes',
    description:
      "A cross-platform tray app that converts clipboard content into simulated input for apps that don't support paste.",
    repository: 'https://github.com/utensils/pasta',
    techStack: ['Rust', 'Tauri', 'Cross-platform'],
  },
  {
    name: 'Docker Darling',
    tagline: 'macOS runtime in a container',
    description:
      'An experimental Docker container running Darling to execute macOS binaries on Linux.',
    repository: 'https://github.com/utensils/docker-darling',
    techStack: ['Docker', 'Darling', 'macOS'],
  },
];
