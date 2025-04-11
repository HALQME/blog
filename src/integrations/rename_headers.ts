import type { AstroIntegration } from "astro";
import fs from "fs";
import path from "path";

export default (): AstroIntegration => ({
    name: "rename-headers",
    hooks: {
        "astro:build:done": async ({ dir }) => {
            const src = path.join(dir.pathname, "headers");
            const dst = path.join(dir.pathname, "_headers");
            if (fs.existsSync(src)) fs.renameSync(src, dst);
        },
    },
});
