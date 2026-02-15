import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

// フォントデータをキャッシュ
let notoSansJPRegular: ArrayBuffer | null = null;
let notoSansJPBold: ArrayBuffer | null = null;

async function loadFonts() {
  if (!notoSansJPRegular) {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5.0.0/files/noto-sans-jp-japanese-400-normal.woff",
    );
    notoSansJPRegular = await response.arrayBuffer();
  }
  if (!notoSansJPBold) {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5.0.0/files/noto-sans-jp-japanese-700-normal.woff",
    );
    notoSansJPBold = await response.arrayBuffer();
  }
  return {
    regular: notoSansJPRegular,
    bold: notoSansJPBold,
  };
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1) + "…";
}

export const GET: APIRoute = async ({ props }) => {
  const title = props.title || "HALQME";
  const truncatedTitle = truncateText(title, 60);

  const { regular, bold } = await loadFonts();

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
                        type: "div",
                        props: {
                          style: {
                            width: "48px",
                            height: "48px",
                            backgroundColor: "#1a1a1a",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontSize: "24px",
                            fontWeight: 700,
                          },
                          children: "H",
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
