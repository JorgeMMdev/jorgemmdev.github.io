import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  // Lee todos los .md de esta carpeta
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),                 // "TFM · Máster en IA y Big Data"
    summary: z.string(),                  // 1-2 frases para la tarjeta de la portada
    tech: z.array(z.string()),            // etiquetas de tecnologías
    status: z.enum(['terminado', 'en-desarrollo']).default('terminado'),
    order: z.number(),                    // posición en la portada (1 = primero)
    date: z.coerce.date(),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),    // true = no se publica todavía
  }),
});

export const collections = { projects };