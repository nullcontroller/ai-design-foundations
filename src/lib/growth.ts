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

export const recentGrowth = (entries: Entry[]) =>
  entries
    .filter((entry) => activityDate(entry))
    .sort((a, b) => {
      const byDate = activityDate(b)!.localeCompare(activityDate(a)!);
      return byDate || a.data.title.localeCompare(b.data.title, "ja");
    });
