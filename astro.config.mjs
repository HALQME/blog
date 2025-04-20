// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

import tailwindcss from "@tailwindcss/vite";

import RenameHeaders from "./src/integrations/rename_headers";

// https://astro.build/config
export default defineConfig({
    output: "static",
    site: "https://halqme.pages.dev",
    integrations: [
        mdx(),
        sitemap(),
        RenameHeaders(),
        compress({
            CSS: true,
            HTML: true,
            JavaScript: true,
        }),
    ],

    vite: {
        plugins: [tailwindcss()],
        build: {
            cssCodeSplit: true,
            chunkSizeWarningLimit: 1000,
            rollupOptions: {},
        },
        optimizeDeps: {
            include: ["@astrojs/image", "sharp"],
        },
        assetsInclude: ["**/*.jpg", "**/*.png", "**/*.webp", "**/*.svg"],
    },

    build: {
        inlineStylesheets: "always",
    },

    server: {
        headers: {
            // X-Frame-Options ヘッダーを HTTP ヘッダーとして設定
            "X-Frame-Options": "SAMEORIGIN",
            // モジュールスクリプトの MIME タイプを適切に設定
            // "Content-Type": "text/javascript; charset=utf-8",
        },
    },
});