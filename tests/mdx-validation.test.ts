import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { compile } from '@mdx-js/mdx';
import matter from 'gray-matter';
import { z } from 'zod';

// Schema matching our content collection
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  series: z.string().optional(),
  seriesOrder: z.number().optional(),
});

describe('MDX Content Validation', () => {
  const contentDir = path.join(process.cwd(), 'src/content/blog');
  const mdxFiles = fs.readdirSync(contentDir).filter((file) => file.endsWith('.mdx'));

  it('should have MDX files to test', () => {
    expect(mdxFiles.length).toBeGreaterThan(0);
  });

  mdxFiles.forEach((filename) => {
    describe(`${filename}`, () => {
      const filePath = path.join(contentDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: frontMatter, content } = matter(fileContent);

      it('should have valid frontmatter', () => {
        const result = blogSchema.safeParse(frontMatter);
        if (!result.success) {
          console.error(`Frontmatter errors in ${filename}:`, result.error.issues);
        }
        expect(result.success).toBe(true);
      });

      it('should have non-empty content', () => {
        expect(content.trim().length).toBeGreaterThan(0);
      });

      it('should compile without MDX syntax errors', async () => {
        try {
          await compile(content, {
            format: 'mdx',
            development: false,
          });
        } catch (error: unknown) {
          console.error(`MDX compilation error in ${filename}:`);
          if (error instanceof Error) {
            console.error(error.message);
            // Log the problematic content area if possible
            const mdxError = error as Error & { position?: { start: { line: number } } };
            if (mdxError.position) {
              const lines = content.split('\n');
              const errorLine = mdxError.position.start.line - 1;
              console.error(`\nError around line ${errorLine + 1}:`);
              console.error(`${errorLine}: ${lines[errorLine - 1] || ''}`);
              console.error(`${errorLine + 1}: >>> ${lines[errorLine] || ''} <<<`);
              console.error(`${errorLine + 2}: ${lines[errorLine + 1] || ''}`);
            }
          }
          throw error;
        }
      });

      it('should have matching opening and closing brackets', () => {
        const openBrackets = (content.match(/\{/g) || []).length;
        const closeBrackets = (content.match(/\}/g) || []).length;
        expect(openBrackets).toBe(closeBrackets);
      });

      it('should have matching opening and closing code blocks', () => {
        const codeBlockMatches = content.match(/```/g) || [];
        expect(codeBlockMatches.length % 2).toBe(0);
      });

      it('should not have unescaped JSX-like content outside code blocks', () => {
        // Remove code blocks to avoid false positives
        const withoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '');

        // Check for common JSX patterns that need escaping
        const jsxPatterns = [
          /<[A-Z][^>]*>/g, // Component-like tags
          /<\/[A-Z][^>]*>/g, // Closing component tags
        ];

        jsxPatterns.forEach((pattern) => {
          const matches = withoutCodeBlocks.match(pattern);
          if (matches) {
            console.warn(`Potential unescaped JSX in ${filename}:`, matches);
          }
        });
      });

      it('should have valid image references', () => {
        const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
        const images = [...content.matchAll(imagePattern)];

        images.forEach(([_full, _alt, src]) => {
          expect(src).toBeTruthy();
          // Check if image path starts with / or http
          expect(src).toMatch(/^(\/|https?:\/\/)/);
        });
      });

      it('should have valid link references', () => {
        const linkPattern = /(?<!!)(\[([^\]]+)\]\(([^)]+)\))/g;
        const links = [...content.matchAll(linkPattern)];

        links.forEach(([_full, _, text, href]) => {
          expect(text).toBeTruthy();
          expect(href).toBeTruthy();
        });
      });
    });
  });
});
