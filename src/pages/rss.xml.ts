import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context: { site: string }) {
    const posts = await getCollection("blog");
    const projects = await getCollection("projects");
    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site,
        items: [
            ...posts.map((post) => ({
                ...post.data,
                link: `/blog/${post.id}/`,
            })),
            ...projects.map((project) => ({
                ...project.data,
                link: `/projects/${project.id}/`,
            })),
        ],
    });
}
