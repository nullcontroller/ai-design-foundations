import { getCollection } from "astro:content";
import { isPublication, publicationTopics } from "./navigation";
import { publicEntry } from "./site";
import { contentUseCases } from "./use-cases";
import { activityDate, updateLabels, updateType } from "./growth";

export const feedAuthor = {
  name: "立林 裕太朗",
  url: "https://nullcontroller.github.io/ai-design-foundations/career/",
};

export async function publicationFeedEntries() {
  return (await getCollection("pages", publicEntry))
    .filter(
      (entry) =>
        isPublication(entry) ||
        Boolean(entry.data.updated_at || entry.data.update_type),
    )
    .sort((a, b) =>
      String(
        activityDate(b) ?? b.data.source?.publication_month ?? "",
      ).localeCompare(
        String(activityDate(a) ?? a.data.source?.publication_month ?? ""),
      ),
    )
    .map((entry) => {
      const type = updateType(entry);
      return {
        id: entry.id,
        title: entry.data.title,
        summary: entry.data.summary,
        publishedAt: entry.data.published_at ?? undefined,
        updatedAt: entry.data.updated_at ?? undefined,
        activityAt: activityDate(entry),
        updateType: type,
        updateLabel: updateLabels[type],
        updateNote: entry.data.update_note,
        topics: [
          ...new Set([
            ...contentUseCases(entry).map((useCase) => useCase.shortTitle),
            ...publicationTopics(entry),
          ]),
        ],
      };
    });
}
