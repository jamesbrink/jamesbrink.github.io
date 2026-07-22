import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgImage } from '../../../lib/og';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !import.meta.env.PROD || !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;
  const png = await renderOgImage({
    title: post.data.title,
    date: post.data.date,
    tags: post.data.tags,
  });
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
