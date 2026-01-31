import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const SITE_TITLE = 'James Brink';
const SITE_DESCRIPTION = 'SRE/DevOps Engineer, Infrastructure Automator, and Tinkerer of Terror';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/blog/${post.slug}/`,
        categories: post.data.tags,
      })),
    customData: `<language>en-us</language>`,
  });
}