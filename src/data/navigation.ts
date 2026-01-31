/**
 * Shared navigation data for Header and Footer
 */

export interface NavItem {
  href: string;
  label: string;
}

/**
 * Main navigation items - used by Header and Footer
 * Order: About (intro) → Projects (work) → Photos (hobby) → Articles (blog) → Resume (professional)
 */
export const navItems: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/astrophotography', label: 'Photos' },
  { href: '/blog', label: 'Articles' },
  { href: '/resume', label: 'Resume' },
];
