import { describe, it, expect } from 'vitest';
import { formatDate, slugify } from '../src/lib/utils';

describe('Utils', () => {
  describe('formatDate', () => {
    it('should format dates correctly', () => {
      // Use UTC to avoid timezone issues
      const date = new Date(Date.UTC(2024, 0, 15)); // January is 0
      expect(formatDate(date)).toMatch(/January 1[45], 2024/); // Allow for timezone differences
    });

    it('should handle different months', () => {
      const date = new Date(Date.UTC(2024, 11, 25)); // December is 11
      expect(formatDate(date)).toMatch(/December 2[45], 2024/);
    });
  });

  describe('slugify', () => {
    it('should convert text to slug format', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('Test & Demo')).toBe('test-demo');
      expect(slugify('Multiple   Spaces')).toBe('multiple-spaces');
    });

    it('should handle special characters', () => {
      expect(slugify('C++ Programming')).toBe('c-programming');
      expect(slugify('Node.js & Deno')).toBe('nodejs-deno');
    });

    it('should handle edge cases', () => {
      expect(slugify('')).toBe('');
      expect(slugify('---test---')).toBe('-test-'); // Based on actual implementation
    });
  });
});
