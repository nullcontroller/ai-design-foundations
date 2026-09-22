import type { APIRoute } from "astro";
import { absoluteUrl } from "../lib/site";

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("Astro.site is required for robots.txt");
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(site, "sitemap.xml")}\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
