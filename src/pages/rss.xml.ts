import rss from "@astrojs/rss";
import { getCollection, type CollectionEntry } from "astro:content";

export async function GET(context: { site?: string | undefined }) {
  const posts: CollectionEntry<"blog">[] = await getCollection("blog");

  return rss({
    title: "HALQME Blog",
    description: "HALQMEのブログ",
    site: context.site ?? "https://halqme.pages.dev",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>ja-JP</language>`,
  });
}
