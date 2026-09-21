export const prerender = true;

export function GET({ site }: { site: URL }) {
  const base = import.meta.env.BASE_URL;
  const absolute = (path: string) => new URL(`${base}${path}`, site).pathname;
  return new Response(
    JSON.stringify({
      name: "立林 裕太朗",
      short_name: "立林 裕太朗",
      start_url: base,
      scope: base,
      display: "standalone",
      theme_color: "#243439",
      background_color: "#f4f5f0",
      icons: [
        { src: absolute("icons/icon-192.png"), sizes: "192x192", type: "image/png", purpose: "any" },
        { src: absolute("icons/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "any" },
        { src: absolute("icons/icon-maskable-192.png"), sizes: "192x192", type: "image/png", purpose: "maskable" },
        { src: absolute("icons/icon-maskable-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
    }),
    { headers: { "Content-Type": "application/manifest+json; charset=utf-8" } },
  );
}
