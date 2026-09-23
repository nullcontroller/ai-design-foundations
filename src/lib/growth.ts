import type { Entry } from "./navigation";

export const updateLabels = {
  new: "NEW",
  updated: "UPDATED",
  expanded: "EXPANDED",
  revised: "REVISED",
  connected: "CONNECTED",
  reframed: "REFRAMED",
} as const;

export type UpdateType = keyof typeof updateLabels;

export const activityDate = (entry: Entry) =>
  entry.data.updated_at?.slice(0, 10) ??
  entry.data.published_at?.slice(0, 10);

export const updateType = (entry: Entry): UpdateType =>
  entry.data.update_type ?? (entry.data.updated_at ? "updated" : "new");

// A source publication date describes when the original work appeared. It does
// not, by itself, mean that a migrated Zenn article recently changed in
// Rosarium. Explicit growth metadata wins; repository-native publications can
// also enter the timeline from their publication date.
export const isGrowthEntry = (entry: Entry) =>
  Boolean(
    entry.data.updated_at ||
      entry.data.update_type ||
      (entry.data.published_at && entry.data.source?.type === "repository"),
  );

export const recentGrowth = (entries: Entry[]) =>
  entries
    .filter((entry) => isGrowthEntry(entry) && activityDate(entry))
    .sort((a, b) => {
      const byDate = activityDate(b)!.localeCompare(activityDate(a)!);
      return byDate || a.data.title.localeCompare(b.data.title, "ja");
    });
