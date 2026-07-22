import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderProjectOgImage } from '../../../lib/og';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({ params: { slug: project.id }, props: { project } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { project } = props;
  const png = await renderProjectOgImage({
    title: project.data.title,
    tagline: project.data.tagline,
    techStack: project.data.techStack,
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
