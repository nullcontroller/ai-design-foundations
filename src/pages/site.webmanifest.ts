import type { APIRoute } from "astro";
import { assetUrl, url } from "../lib/site";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: "Rosarium — 立林 裕太朗",
      short_name: "Rosarium",
      description: "立林 裕太朗がApplied AI・System Architecture・設計知識・実務事例を育てる個人技術サイト。",
      start_url: url(),
      scope: url(),
      display: "browser",
      background_color: "#17383b",
      theme_color: "#17383b",
      icons: [
        { src: assetUrl("icons/icon-192.png"), sizes: "192x192", type: "image/png", purpose: "any" },
        { src: assetUrl("icons/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "any" },
        { src: assetUrl("icons/icon-maskable-192.png"), sizes: "192x192", type: "image/png", purpose: "maskable" },
        { src: assetUrl("icons/icon-maskable-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
    }),
    { headers: { "Content-Type": "application/manifest+json" } },
  );
