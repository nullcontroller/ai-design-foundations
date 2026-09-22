import type { APIRoute } from "astro";
import { feedAuthor, publicationFeedEntries } from "../lib/feed";
import { absoluteUrl } from "../lib/site";

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("Astro.site is required for JSON Feed generation");
  const entries = await publicationFeedEntries();
  const feedUrl = absoluteUrl(site, "feed.json");
  return new Response(
    JSON.stringify(
      {
        version: "https://jsonfeed.org/version/1.1",
        title: "Rosarium | Articles",
        home_page_url: absoluteUrl(site, "articles"),
        feed_url: feedUrl,
        description: "Applied AI、システム設計、実務事例と論考",
        language: "ja",
        authors: [feedAuthor],
        items: entries.map((entry) => {
          const pageUrl = absoluteUrl(site, entry.id);
          return {
            id: pageUrl,
            url: pageUrl,
            title: entry.title,
            summary: entry.summary,
            authors: [feedAuthor],
            tags: entry.topics,
            ...(entry.publishedAt ? { date_published: entry.publishedAt } : {}),
          };
        }),
      },
      null,
      2,
    ) + "\n",
    { headers: { "Content-Type": "application/feed+json; charset=utf-8" } },
  );
};
