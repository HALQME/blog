// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import RenameHeaders from "./src/integrations/rename_headers";

// https://astro.build/config
export default defineConfig({
    output: "static",
    site: "https://halqme.pages.dev",
    integrations: [mdx(), sitemap(), RenameHeaders()],

    vite: {
        plugins: [tailwindcss()],
    },
});
