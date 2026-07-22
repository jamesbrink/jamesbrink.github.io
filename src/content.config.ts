import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});

const projectLink = z.object({
  label: z.string(),
  url: z.string().url(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    repository: z.string().url(),
    website: z.string().url().optional(),
    docs: z.string().url().optional(),
    techStack: z.array(z.string()).min(1),
    keywords: z.array(z.string()).min(1),
    language: z.string(),
    license: z.string(),
    updatedDate: z.coerce.date(),
    featuredOrder: z.number().int().positive(),
    problem: z.object({
      body: z.string(),
      pains: z.array(z.string()).min(2),
    }),
    features: z.array(z.object({ title: z.string(), description: z.string() })).min(4),
    quickStarts: z.array(z.object({ label: z.string(), code: z.string() })).min(1),
    integrations: z.array(z.string()).min(1),
    architecture: z.array(z.object({ title: z.string(), description: z.string() })).min(3),
    closing: z.object({
      title: z.string(),
      body: z.string(),
    }),
    links: z.array(projectLink).min(1),
  }),
});

export const collections = { blog, projects };
