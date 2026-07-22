/**
 * Build-time OG card generation (Emission-styled) for blog posts.
 * satori lays the text out as vector paths, so sharp can rasterize the
 * SVG without any system fonts installed.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const FONT_DIR = join(process.cwd(), 'node_modules/@fontsource/ibm-plex-mono/files');

const fonts = Promise.all([
  readFile(join(FONT_DIR, 'ibm-plex-mono-latin-400-normal.woff')),
  readFile(join(FONT_DIR, 'ibm-plex-mono-latin-600-normal.woff')),
]);

interface OgPost {
  title: string;
  date: Date;
  tags: string[];
}

interface OgProject {
  title: string;
  tagline: string;
  techStack: string[];
}

// satori element helper (object syntax — no JSX in .ts)
function el(
  type: string,
  style: Record<string, unknown>,
  children?: unknown
): Record<string, unknown> {
  return { type, props: { style, children } };
}

export async function renderOgImage({ title, date, tags }: OgPost): Promise<ArrayBuffer> {
  const [mono400, mono600] = await fonts;
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  const svg = await satori(
    el(
      'div',
      {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        backgroundColor: '#0a0506',
        backgroundImage:
          'radial-gradient(circle at 85% -10%, rgba(255, 61, 99, 0.22), rgba(10, 5, 6, 0) 55%)',
        border: '2px solid rgba(255, 61, 99, 0.35)',
        color: '#e8e2dc',
        fontFamily: 'IBM Plex Mono',
      },
      [
        el('div', { display: 'flex', flexDirection: 'column' }, [
          el(
            'div',
            {
              fontSize: '26px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#ff3d63',
            },
            'James Brink'
          ),
          el(
            'div',
            {
              marginTop: '40px',
              fontSize: title.length > 55 ? '52px' : '64px',
              fontWeight: 600,
              lineHeight: 1.25,
              color: '#f5f1ec',
            },
            title
          ),
        ]),
        el(
          'div',
          {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '24px',
            color: '#a89f96',
          },
          [
            el(
              'div',
              { display: 'flex' },
              `${formattedDate}${tags.length ? '  ·  ' + tags.slice(0, 3).join(', ') : ''}`
            ),
            el('div', { display: 'flex' }, 'jamesbrink.online'),
          ]
        ),
      ]
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'IBM Plex Mono', data: mono400, weight: 400, style: 'normal' },
        { name: 'IBM Plex Mono', data: mono600, weight: 600, style: 'normal' },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  // Slice out of Node's Buffer pool so Response gets exactly the PNG bytes.
  return png.buffer.slice(png.byteOffset, png.byteOffset + png.byteLength) as ArrayBuffer;
}

export async function renderProjectOgImage({
  title,
  tagline,
  techStack,
}: OgProject): Promise<ArrayBuffer> {
  const [mono400, mono600] = await fonts;
  const svg = await satori(
    el(
      'div',
      {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '68px 80px',
        backgroundColor: '#0a0506',
        backgroundImage:
          'radial-gradient(circle at 86% 18%, rgba(255, 61, 99, 0.3), rgba(10, 5, 6, 0) 52%)',
        border: '2px solid rgba(255, 61, 99, 0.35)',
        color: '#f5f1ec',
        fontFamily: 'IBM Plex Mono',
      },
      [
        el('div', { display: 'flex', flexDirection: 'column', maxWidth: '920px' }, [
          el(
            'div',
            {
              fontSize: '24px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#ff3d63',
            },
            'James Brink · Projects'
          ),
          el(
            'div',
            { marginTop: '38px', fontSize: '76px', fontWeight: 600, lineHeight: 1.05 },
            title
          ),
          el(
            'div',
            { marginTop: '28px', fontSize: '30px', lineHeight: 1.35, color: '#c9bfb6' },
            tagline
          ),
        ]),
        el(
          'div',
          {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '22px',
            color: '#a89f96',
          },
          [
            el('div', { display: 'flex' }, techStack.slice(0, 4).join('  ·  ')),
            el('div', { display: 'flex' }, 'jamesbrink.online'),
          ]
        ),
      ]
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'IBM Plex Mono', data: mono400, weight: 400, style: 'normal' },
        { name: 'IBM Plex Mono', data: mono600, weight: 600, style: 'normal' },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return png.buffer.slice(png.byteOffset, png.byteOffset + png.byteLength) as ArrayBuffer;
}
