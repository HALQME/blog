import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import remarkLinkCard from "remark-link-card";

export default defineConfig({
  site: "https://halqme.pages.dev",
  markdown: {
    remarkPlugins: [
      [
        remarkLinkCard,
        {
          cache: true,
          shortenUrl: true,
          thumbnailPosition: "right",
        },
      ],
    ],
  },
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    sitemap(),
    mdx({
      remarkPlugins: [
        [
          remarkLinkCard,
          {
            cache: true,
            shortenUrl: true,
            thumbnailPosition: "right",
          },
        ],
      ],
    }),
  ],
});
