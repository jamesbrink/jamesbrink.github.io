// Generates the social-share card at public/images/og.png (1200×630).
// Faithful to the "Emission" design system: warm ink near-black, H-alpha
// crimson accent, Newsreader serif + IBM Plex Mono. Re-run after edits:
//   bun scripts/generate-og.mjs
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
// avatar.jpg is actually PNG data — embed as a data URI so it loads under setContent.
const avatar =
  'data:image/png;base64,' +
  readFileSync(resolve(root, 'public/images/avatar.jpg')).toString('base64');
const out = resolve(root, 'public/images/og.png');

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,500&family=IBM+Plex+Mono:wght@500&display=swap" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: 'Newsreader', Georgia, serif;
    color: #f8ece9;
    background:
      radial-gradient(90% 120% at 82% -10%, rgba(255,61,99,0.22), transparent 55%),
      radial-gradient(60% 80% at 10% 110%, rgba(255,61,99,0.08), transparent 60%),
      #0a0506;
    position: relative;
    overflow: hidden;
  }
  /* faint starfield */
  .stars {
    position: absolute; inset: 0;
    background-image:
      radial-gradient(1.5px 1.5px at 20% 30%, rgba(248,236,233,0.7), transparent),
      radial-gradient(1.5px 1.5px at 70% 20%, rgba(248,236,233,0.5), transparent),
      radial-gradient(1px 1px at 40% 70%, rgba(248,236,233,0.6), transparent),
      radial-gradient(1px 1px at 88% 60%, rgba(248,236,233,0.45), transparent),
      radial-gradient(1.5px 1.5px at 55% 85%, rgba(248,236,233,0.4), transparent),
      radial-gradient(1px 1px at 30% 12%, rgba(248,236,233,0.5), transparent);
  }
  .wrap { position: relative; height: 100%; display: flex; align-items: center; justify-content: space-between; padding: 84px 90px; }
  .eyebrow { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 22px; letter-spacing: 0.16em; text-transform: uppercase; color: #a98f8d; display: flex; align-items: center; gap: 14px; }
  .dot { width: 12px; height: 12px; border-radius: 999px; background: #ff3d63; box-shadow: 0 0 18px 2px rgba(255,61,99,0.7); }
  h1 { font-size: 118px; font-weight: 700; line-height: 0.98; letter-spacing: -0.02em; margin-top: 26px; color: #f8ece9; }
  .tag { font-style: italic; font-weight: 500; font-size: 46px; color: #ff5c78; margin-top: 22px; }
  .sub { font-family: 'IBM Plex Mono', monospace; font-size: 24px; color: #806865; margin-top: 20px; letter-spacing: 0.02em; }
  .avatar { width: 260px; height: 260px; border-radius: 999px; object-fit: cover; flex: none; box-shadow: 0 0 0 2px rgba(255,255,255,0.12), 0 24px 60px -12px rgba(255,61,99,0.5); }
</style>
</head>
<body>
  <div class="stars"></div>
  <div class="wrap">
    <div>
      <div class="eyebrow"><span class="dot"></span> jamesbrink.online</div>
      <h1>James Brink</h1>
      <div class="tag">SRE / DevOps Engineer &middot; Infrastructure Automator</div>
      <div class="sub">…and Tinkerer of Terror</div>
    </div>
    <img class="avatar" src="${avatar}" alt="" />
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out });
await browser.close();
console.log('Wrote', out);
