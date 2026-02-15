import type { APIRoute } from "astro";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const CACHE_DIR = join(process.cwd(), "dist", ".cache", "ogp-fonts");
const BOLD_FONT_PATH = join(CACHE_DIR, "noto-sans-jp-700.woff");

async function loadFont() {
  if (!existsSync(CACHE_DIR)) {
    await mkdir(CACHE_DIR, { recursive: true });
  }

  if (existsSync(BOLD_FONT_PATH)) {
    const buffer = await readFile(BOLD_FONT_PATH);
    return new Uint8Array(buffer).buffer;
  }

  const response = await fetch(
    "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5.0.0/files/noto-sans-jp-japanese-700-normal.woff",
  );
  const bold = await response.arrayBuffer();
  await writeFile(BOLD_FONT_PATH, new Uint8Array(bold));
  return bold;
}

export const GET: APIRoute = async () => {
  const bold = await loadFont();

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
          padding: "60px",
          fontFamily: "Noto Sans JP",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                width: "120px",
                height: "120px",
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "40px",
              },
              children: [
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize: "64px",
                      fontWeight: 700,
                      color: "#1a1a1a",
                    },
                    children: "H",
                  },
                },
              ],
            },
          },
          {
            type: "h1",
            props: {
              style: {
                fontSize: "72px",
                fontWeight: 700,
                color: "#ffffff",
                margin: 0,
                letterSpacing: "-0.02em",
              },
              children: "HALQME",
            },
          },
          {
            type: "p",
            props: {
              style: {
                fontSize: "32px",
                color: "#999999",
                marginTop: "20px",
                marginBottom: 0,
              },
              children: "Portfolio & Blog",
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "40px",
                fontSize: "24px",
                color: "#666666",
              },
              children: "halqme.pages.dev",
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Noto Sans JP",
          data: bold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  // @ts-expect-error - Buffer is valid for Response body
  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
