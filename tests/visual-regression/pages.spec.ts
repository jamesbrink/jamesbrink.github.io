import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/blog', name: 'blog' },
  { path: '/contact', name: 'contact' },
  { path: '/resume', name: 'resume' },
  { path: '/404', name: '404' },
];

test.describe('Visual Regression Tests', () => {
  pages.forEach(({ path, name }) => {
    test.describe(`${name} page`, () => {
      test('light mode screenshot', async ({ page }) => {
        await page.goto(path);
        // Wait for page to fully load
        await page.waitForLoadState('networkidle');
        // Wait for any animations to complete
        await page.waitForTimeout(1000);
        
        await expect(page).toHaveScreenshot(`${name}-light.png`, {
          fullPage: true,
          animations: 'disabled',
        });
      });

      test('dark mode screenshot', async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        
        // Toggle to dark mode
        await page.click('button[aria-label*="dark mode" i]');
        // Wait for theme transition
        await page.waitForTimeout(500);
        
        await expect(page).toHaveScreenshot(`${name}-dark.png`, {
          fullPage: true,
          animations: 'disabled',
        });
      });
    });
  });

  // Special test for blog post page
  test.describe('blog post page', () => {
    test('light mode screenshot', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // Click on the first blog post
      const firstPost = page.locator('article').first().locator('a').first();
      await firstPost.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot('blog-post-light.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });

    test('dark mode screenshot', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // Toggle to dark mode first
      await page.click('button[aria-label*="dark mode" i]');
      
      // Click on the first blog post
      const firstPost = page.locator('article').first().locator('a').first();
      await firstPost.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('blog-post-dark.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });
  });
});

test.describe('Component Visual Tests', () => {
  test('navigation mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Open mobile menu
    await page.click('button[aria-label="Toggle navigation menu"]');
    await page.waitForTimeout(300); // Wait for animation
    
    await expect(page).toHaveScreenshot('mobile-menu.png');
  });

  test('blog tag filters', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    
    // Click on a tag filter
    const firstTag = page.locator('button').filter({ hasText: /^(javascript|react|nodejs|programming)/i }).first();
    await firstTag.click();
    await page.waitForTimeout(500); // Wait for filter animation
    
    await expect(page).toHaveScreenshot('blog-filtered.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});

test.describe('Responsive Design Tests', () => {
  const viewports = [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 667 },
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`homepage at ${name} viewport`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot(`home-${name}.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  });
});