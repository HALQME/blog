import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://halqme.pages.dev",
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    sitemap(),
    mdx(),
  ],
});
