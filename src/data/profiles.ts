/**
 * Canonical identity data — single source of truth for the Person schema,
 * rel="me" identity links, and profile URLs. Keep in sync with the bios on
 * the linked profiles (same name, photo, and title phrasing everywhere).
 */

export const IDENTITY = {
  name: 'James Brink',
  givenName: 'James',
  familyName: 'Brink',
  jobTitle: 'Site Reliability / DevOps Engineer',
  bio: 'James Brink is an SRE/DevOps engineer and infrastructure automator with 20+ years running production systems, specializing in NixOS, Terraform, Kubernetes, AI/LLM tooling, and reproducible infrastructure.',
  knowsAbout: [
    'DevOps',
    'Site Reliability Engineering',
    'NixOS',
    'Nix',
    'Terraform',
    'Kubernetes',
    'AWS',
    'Infrastructure as Code',
    'AI/LLM Tooling',
    'Model Context Protocol',
    'Astrophotography',
  ],
};

/**
 * Public profiles owned by James — used for schema.org sameAs and rel="me".
 */
export const profileUrls = [
  'https://github.com/jamesbrink',
  'https://linkedin.com/in/brinkjames',
  'https://twitter.com/brinkoo7',
  'https://bsky.app/profile/jamesbrink.bsky.social',
  'https://medium.com/@jamesbrink',
  'https://instagram.com/brink.james/',
];
