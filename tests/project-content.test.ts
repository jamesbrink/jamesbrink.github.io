import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { compile } from '@mdx-js/mdx';

const projectsDir = path.join(process.cwd(), 'src/content/projects');
const files = fs.readdirSync(projectsDir).filter((file) => file.endsWith('.mdx'));
const expectedProjects = [
  'claudette.mdx',
  'comfyui-nix.mdx',
  'envisaged.mdx',
  'mcp-nixos.mdx',
  'mold.mdx',
  'nxv.mdx',
];

describe('project landing-page content', () => {
  it('defines exactly the six featured projects', () => {
    expect(files.sort()).toEqual(expectedProjects);
  });

  it('uses unique ordering and SEO descriptions', () => {
    const entries = files.map(
      (file) => matter(fs.readFileSync(path.join(projectsDir, file), 'utf8')).data
    );
    expect(new Set(entries.map((entry) => entry.featuredOrder)).size).toBe(entries.length);
    expect(new Set(entries.map((entry) => entry.description)).size).toBe(entries.length);
    for (const entry of entries) {
      expect(entry.description.length).toBeGreaterThanOrEqual(120);
      expect(entry.description.length).toBeLessThanOrEqual(160);
      expect(entry.repository).toMatch(/^https:\/\/github\.com\//);
      expect(entry.features.length).toBeGreaterThanOrEqual(4);
      expect(entry.quickStarts.length).toBeGreaterThanOrEqual(1);
      expect(entry.architecture.length).toBeGreaterThanOrEqual(3);
    }
  });

  for (const file of files) {
    it(`${file} compiles as MDX`, async () => {
      const source = fs.readFileSync(path.join(projectsDir, file), 'utf8');
      const { content } = matter(source);
      expect(content.trim()).not.toBe('');
      await expect(compile(content, { format: 'mdx', development: false })).resolves.toBeTruthy();
    });
  }
});
