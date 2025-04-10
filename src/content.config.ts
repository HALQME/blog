import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

// Define custom object for content

const version = z.object({
    value: z.string().transform((val) => {
        const [major, minor, patch] = val.split(".").map(Number);
        return { major, minor, patch };
    }),
    pubDate: z.coerce.date(),
});

const tags = z.object({
    name: z.string(),
    color: z.string(),
});

// ================= //

const blog = defineCollection({
    loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        tags: z.array(tags).optional(),
    }),
});

const projects = defineCollection({
    loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        language: z.string().optional(),
        repository: z.string().url(),
        version: version,
    }),
});

export const collections = { blog, projects };
