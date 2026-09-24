import type { APIRoute } from "astro";
import { absoluteUrl } from "../lib/site";

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("Astro.site is required for llms.txt");
  const link = (label: string, path: string) =>
    `- [${label}](${absoluteUrl(site, path)})`;
  const body = [
    "# Rosarium",
    "",
    "Rosariumは、立林 裕太朗が趣味で構築しているサイトです。Applied AI、自然言語、システム設計、AI理論、実務で得た知見などを公開しています。",
    "",
    link("庭", ""),
    link("実践事例", "cases"),
    link("キャリア", "career"),
    link("読み物", "articles"),
    link("AI設計", "ai-design"),
    link("AI理論", "ai-mathematics"),
    link("実践知", "practices"),
    link("RSS Feed", "feed.xml"),
    link("JSON Feed", "feed.json"),
    "",
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
