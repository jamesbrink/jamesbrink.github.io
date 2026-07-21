// Render the Emission resume (resume/emission/JamesBrink-Resume.html) to a
// text-selectable, background-printed PDF at public/JamesBrink-Resume.pdf.
//
//   bun resume/emission/render.mjs
//
// Uses Playwright's Chromium print-to-PDF (page.pdf produces a vector/text PDF,
// never a rasterized image) with printBackground so the dark sidebar, starfield,
// and nebula bloom render. The <doc-page> web component pins the US-Letter page.
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(here, 'JamesBrink-Resume.html');
const outPath = resolve(here, '../../public/JamesBrink-Resume.pdf');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
// Let the <doc-page> custom element define and web fonts settle before printing.
await page.evaluate(async () => {
  if (window.customElements?.whenDefined) {
    await customElements.whenDefined('doc-page').catch(() => {});
  }
  await document.fonts.ready;
});
await page.waitForTimeout(500);
await page.pdf({
  path: outPath,
  printBackground: true,
  preferCSSPageSize: true,
  format: 'Letter',
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
await browser.close();
console.log('Wrote ' + outPath);
