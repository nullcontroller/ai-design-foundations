import type { APIRoute } from "astro";
import { assetUrl, url } from "../lib/site";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: "Rosarium — 立林 裕太朗",
      short_name: "Rosarium",
      description:
        "立林 裕太朗が趣味で構築し、Applied AI・自然言語・システム設計・AI理論・実務で得た知見を公開するサイト。",
      start_url: url(),
      scope: url(),
      display: "browser",
      background_color: "#17383b",
      theme_color: "#17383b",
      icons: [
        {
          src: assetUrl("icons/icon-192.png"),
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: assetUrl("icons/icon-512.png"),
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: assetUrl("icons/icon-maskable-192.png"),
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: assetUrl("icons/icon-maskable-512.png"),
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    }),
    { headers: { "Content-Type": "application/manifest+json" } },
  );
