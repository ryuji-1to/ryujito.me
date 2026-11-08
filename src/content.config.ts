import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "*/index.md",
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    published: z.boolean(),
    description: z.string().optional(),
  }),
});

export const collections = { posts };
