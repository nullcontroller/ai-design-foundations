import type { IconName } from "../lib/icons";

export const recentGrowthLabels = {
  launch: "LAUNCH",
  new: "NEW",
  updated: "UPDATED",
  expanded: "EXPANDED",
  revised: "REVISED",
} as const;

export type RecentGrowthType = keyof typeof recentGrowthLabels;

export interface RecentGrowthItem {
  date: string;
  type: RecentGrowthType;
  title: string;
  summary: string;
  category: string;
  href: string;
  icon?: IconName;
}

// This is the single source of truth for the public update history.
// Add an entry only when the change is meaningful to Rosarium's readers.
const curatedRecentGrowth = [
  {
    date: "2026-09",
    type: "launch",
    title: "Rosarium 公開",
    summary:
      "Applied AI、システム設計、AI数学論、実務事例を横断して整理するPersonal Technical Site「Rosarium」を公開しました。",
    category: "Rosarium",
    href: "",
    icon: "updates",
  },
] satisfies RecentGrowthItem[];

export const recentGrowth = curatedRecentGrowth.sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const recentGrowthDateLabel = (date: string) => {
  const match = date.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if (!match) return date;
  const [, year, month, day] = match;
  return day
    ? `${year}年${Number(month)}月${Number(day)}日`
    : `${year}年${Number(month)}月`;
};

export const recentGrowthMonth = (date: string) => {
  const match = date.match(/^(\d{4})-(\d{2})/);
  return match ? `${match[1]}年${Number(match[2])}月` : date;
};
