import { getCollection } from "astro:content";
import { isPublication, publicationTopics } from "./navigation";
import { publicEntry } from "./site";

export const feedAuthor = {
  name: "立林 裕太朗",
  url: "https://nullcontroller.github.io/ai-design-foundations/career/",
};

export async function publicationFeedEntries() {
  return (await getCollection("pages", publicEntry))
    .filter(isPublication)
    .sort((a, b) =>
      String(
        b.data.published_at ?? b.data.source?.publication_month ?? "",
      ).localeCompare(
        String(a.data.published_at ?? a.data.source?.publication_month ?? ""),
      ),
    )
    .map((entry) => ({
      id: entry.id,
      title: entry.data.title,
      summary: entry.data.summary,
      publishedAt: entry.data.published_at ?? undefined,
      topics: publicationTopics(entry),
    }));
}
