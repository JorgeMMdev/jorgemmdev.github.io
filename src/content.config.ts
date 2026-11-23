import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  // El esquema es una función que recibe el ayudante image()
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(),
      summary: z.string(),
      tech: z.array(z.string()),
      status: z.enum(['terminado', 'en-desarrollo']).default('terminado'),
      order: z.number(),
      date: z.coerce.date(),
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
      image: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };