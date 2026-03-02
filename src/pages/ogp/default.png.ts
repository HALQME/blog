import type { APIRoute } from "astro";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const CACHE_DIR = join(process.cwd(), ".cache", "ogp-fonts");
const BOLD_FONT_PATH = join(CACHE_DIR, "noto-sans-jp-700.woff");
const FAVICON_PATH = join(process.cwd(), "public", "favicon.svg");
const FAVICON_CACHE_DIR = join(process.cwd(), "dist", ".cache", "favicon-png");

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

async function loadFavicon(): Promise<Uint8Array> {
  if (!existsSync(FAVICON_CACHE_DIR)) {
    await mkdir(FAVICON_CACHE_DIR, { recursive: true });
  }

  const cachedPath = join(FAVICON_CACHE_DIR, "favicon-120.png");

  if (existsSync(cachedPath)) {
    const buffer = await readFile(cachedPath);
    return new Uint8Array(buffer);
  }

  let svgContent: string;
  if (existsSync(FAVICON_PATH)) {
    svgContent = await readFile(FAVICON_PATH, "utf-8");
  } else {
    svgContent = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#1a1a1a"/>
      <text x="200" y="280" font-size="200" font-weight="bold" fill="white" text-anchor="middle">H</text>
    </svg>`;
  }

  const resvg = new Resvg(svgContent, {
    fitTo: {
      mode: "width",
      value: 120,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  await writeFile(cachedPath, new Uint8Array(pngBuffer));

  return new Uint8Array(pngBuffer);
}

export const GET: APIRoute = async () => {
  const bold = await loadFont();
  const faviconPng = await loadFavicon();

  // PNGをBase64に変換してimageとして使う
  const faviconBase64 = Buffer.from(faviconPng).toString("base64");
  const faviconDataUrl = `data:image/png;base64,${faviconBase64}`;

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
            type: "img",
            props: {
              src: faviconDataUrl,
              width: 120,
              height: 120,
              alt: "HALQME",
              style: {
                marginBottom: "40px",
              },
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
