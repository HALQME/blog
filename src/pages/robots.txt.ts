export async function GET(context: { site?: URL | undefined }) {
  const textResponse = (strings: TemplateStringsArray, ...values: any[]) => {
    const body = strings.reduce(
      (acc, str, i) => acc + str + (i < values.length ? String(values[i]) : ""),
      "",
    );
    return new globalThis.Response(body, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  };
  const site = (context.site?.toString() ?? "https://halqme.pages.dev").replace(/\/$/, "");
  return textResponse`User-agent: *
Allow: /

Sitemap: ${site}/sitemap-index.xml
`;
}
