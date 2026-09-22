import type { APIRoute } from "astro";
import { createRssResponse } from "../lib/rss";

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("Astro.site is required for RSS generation");
  return createRssResponse(site);
};
