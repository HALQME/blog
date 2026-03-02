import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const CACHE_DIR = join(process.cwd(), ".cache");
const FONT_CACHE_DIR = join(CACHE_DIR, "ogp-fonts");
const IMAGE_CACHE_DIR = join(CACHE_DIR, "ogp-images");
const FAVICON_CACHE_DIR = join(CACHE_DIR, "favicon-png");
const REGULAR_FONT_PATH = join(FONT_CACHE_DIR, "noto-sans-jp-400.woff");
const BOLD_FONT_PATH = join(FONT_CACHE_DIR, "noto-sans-jp-700.woff");
const FAVICON_PATH = join(process.cwd(), "public", "favicon.svg");

async function loadFonts() {
  // キャッシュディレクトリがなければ作成
  if (!existsSync(FONT_CACHE_DIR)) {
    await mkdir(FONT_CACHE_DIR, { recursive: true });
  }

  let regular: ArrayBuffer;
  let bold: ArrayBuffer;

  // キャッシュから読み込む、なければダウンロード
  if (existsSync(REGULAR_FONT_PATH)) {
    const buffer = await readFile(REGULAR_FONT_PATH);
    regular = new Uint8Array(buffer).buffer;
  } else {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5.0.0/files/noto-sans-jp-japanese-400-normal.woff",
    );
    regular = await response.arrayBuffer();
    await writeFile(REGULAR_FONT_PATH, new Uint8Array(regular));
  }

  if (existsSync(BOLD_FONT_PATH)) {
    const buffer = await readFile(BOLD_FONT_PATH);
    bold = new Uint8Array(buffer).buffer;
  } else {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5.0.0/files/noto-sans-jp-japanese-700-normal.woff",
    );
    bold = await response.arrayBuffer();
    await writeFile(BOLD_FONT_PATH, new Uint8Array(bold));
  }

  return { regular, bold };
}

async function loadFavicon(): Promise<Uint8Array> {
  // ファビコンキャッシュディレクトリ
  if (!existsSync(FAVICON_CACHE_DIR)) {
    await mkdir(FAVICON_CACHE_DIR, { recursive: true });
  }

  const cachedPath = join(FAVICON_CACHE_DIR, "favicon-48.png");

  // キャッシュがあればそれを使用
  if (existsSync(cachedPath)) {
    const buffer = await readFile(cachedPath);
    return new Uint8Array(buffer);
  }

  // SVGを読み込んでPNGに変換
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
      value: 48,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  // キャッシュに保存
  await writeFile(cachedPath, new Uint8Array(pngBuffer));

  return new Uint8Array(pngBuffer);
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1) + "…";
}

export const GET: APIRoute = async ({ params, props }) => {
  const slug = params.slug as string;
  const title = props.title || "HALQME";

  // 開発環境: 画像キャッシュを確認
  if (import.meta.env.DEV) {
    if (!existsSync(IMAGE_CACHE_DIR)) {
      await mkdir(IMAGE_CACHE_DIR, { recursive: true });
    }
    const cachedImagePath = join(IMAGE_CACHE_DIR, `${slug}.png`);

    if (existsSync(cachedImagePath)) {
      const buffer = await readFile(cachedImagePath);
      return new Response(new Uint8Array(buffer), {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=0",
        },
      });
    }
  }

  const truncatedTitle = truncateText(title, 60);
  const { regular, bold } = await loadFonts();
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
          backgroundColor: "#ffffff",
          padding: "60px",
          fontFamily: "Noto Sans JP",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              },
              children: [
                {
                  type: "h1",
                  props: {
                    style: {
                      fontSize: "48px",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      lineHeight: 1.4,
                      margin: 0,
                      letterSpacing: "-0.02em",
                    },
                    children: truncatedTitle,
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "40px",
                paddingTop: "30px",
                borderTop: "3px solid #1a1a1a",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    },
                    children: [
                      {
                        type: "img",
                        props: {
                          src: faviconDataUrl,
                          width: 48,
                          height: 48,
                          alt: "HALQME",
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            fontSize: "28px",
                            fontWeight: 400,
                            color: "#666666",
                          },
                          children: "HALQME's Blog",
                        },
                      },
                    ],
                  },
                },
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize: "24px",
                      fontWeight: 400,
                      color: "#999999",
                    },
                    children: "halqme.pages.dev",
                  },
                },
              ],
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
          data: regular,
          weight: 400,
          style: "normal",
        },
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

  // 開発環境: 生成した画像をキャッシュ
  if (import.meta.env.DEV && slug) {
    const cachedImagePath = join(IMAGE_CACHE_DIR, `${slug}.png`);
    await writeFile(cachedImagePath, new Uint8Array(pngBuffer));
  }

  // @ts-expect-error - Uint8Array is valid for Response body
  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
};

export const getStaticPaths = (async () => {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title },
  }));
}) satisfies GetStaticPaths;
