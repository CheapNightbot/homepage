import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updateDate: z.coerce.date().optional(),
        author: z.string(),
        heroImage: z.object({
            url: z.string(),
            alt: z.string()
        }),
        tags: z.array(z.string())
    }),
});

export const collections = { blog };
