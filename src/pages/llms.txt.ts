import type { APIRoute } from "astro";
import { absoluteUrl } from "../lib/site";

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("Astro.site is required for llms.txt");
  const link = (label: string, path: string) =>
    `- [${label}](${absoluteUrl(site, path)})`;
  const body = [
    "# Rosarium",
    "",
    "Rosariumは、立林 裕太朗が趣味で構築しているサイトです。Applied AI、自然言語、システム設計、AI数学論、実務で得た知見などを公開しています。",
    "",
    link("Home", ""),
    link("Own Career", "career"),
    link("AI Design", "ai-design"),
    link("AI数学論", "ai-mathematics"),
    link("Practices", "practices"),
    link("Case Studies", "cases"),
    link("Articles", "articles"),
    link("全体目次", "overview"),
    link("RSS Feed", "feed.xml"),
    link("JSON Feed", "feed.json"),
    "",
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
