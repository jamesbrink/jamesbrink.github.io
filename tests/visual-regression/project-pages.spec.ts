import { expect, test } from '@playwright/test';

const projects = ['mcp-nixos', 'envisaged', 'nxv', 'comfyui-nix', 'claudette', 'mold'];

test.describe('project landing pages', () => {
  for (const slug of projects) {
    test(`${slug} has complete search metadata and no horizontal overflow`, async ({ page }) => {
      await page.goto(`/projects/${slug}/`);

      await expect(page.locator('h1')).toBeVisible();
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description?.length).toBeGreaterThanOrEqual(120);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://jamesbrink.online/projects/${slug}/`
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        `https://jamesbrink.online/projects/og/${slug}.png`
      );

      const schema = await page.locator('script[type="application/ld+json"]').textContent();
      expect(schema).toContain('SoftwareSourceCode');
      expect(schema).toContain('BreadcrumbList');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
        await page.evaluate(() => document.documentElement.clientWidth)
      );
    });
  }

  test('featured project cards lead to internal landing pages', async ({ page }) => {
    await page.goto('/projects/');

    const card = page.locator('article').filter({ hasText: 'MCP NixOS' }).first();
    await expect(card.locator('a').first()).toHaveAttribute('href', '/projects/mcp-nixos/');
    await expect(card.locator('a[aria-label*="GitHub"]')).toHaveAttribute(
      'href',
      'https://github.com/utensils/mcp-nixos'
    );
  });
});

test('homepage proof metrics align on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const valueTops = await page
    .locator('main dl')
    .first()
    .locator('div > dd')
    .evaluateAll((values) => values.map((value) => Math.round(value.getBoundingClientRect().top)));

  expect(new Set(valueTops).size).toBe(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});
