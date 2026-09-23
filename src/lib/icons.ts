import type { CollectionEntry } from "astro:content";

export type IconName =
  | "home"
  | "about"
  | "career"
  | "overview"
  | "articles"
  | "cases"
  | "ai-design"
  | "ai-mathematics"
  | "practices"
  | "reference"
  | "updates"
  | "search"
  | "applicability"
  | "responsibility-control"
  | "architecture"
  | "knowledge-context"
  | "evaluation-hitl"
  | "software-engineering"
  | "lifecycle-operations"
  | "arrow"
  | "rss";

export const sectionIcons: Record<string, IconName> = {
  "": "home",
  about: "about",
  career: "career",
  overview: "overview",
  articles: "articles",
  books: "articles",
  series: "articles",
  essays: "articles",
  cases: "cases",
  "ai-design": "ai-design",
  "ai-mathematics": "ai-mathematics",
  practices: "practices",
  reference: "reference",
  updates: "updates",
  search: "search",
};

export const topicIcons: Record<string, IconName> = {
  applicability: "applicability",
  "responsibility-control": "responsibility-control",
  architecture: "architecture",
  "knowledge-context": "knowledge-context",
  "evaluation-hitl": "evaluation-hitl",
  "software-engineering": "software-engineering",
  "lifecycle-operations": "lifecycle-operations",
};

export const useCaseIcons: Record<string, IconName> = {
  "ai-adoption": "responsibility-control",
  "natural-language-services": "knowledge-context",
  "software-engineering": "software-engineering",
  "understand-ai": "ai-mathematics",
  "case-studies": "cases",
  "career-work": "career",
};

export const layerIcons: Record<string, IconName> = {
  "ai-design": "ai-design",
  "ai-mathematics": "ai-mathematics",
  practice: "practices",
  case: "cases",
  publication: "articles",
  career: "career",
  reference: "reference",
};

export const iconForSection = (section?: string): IconName =>
  sectionIcons[section || ""] ?? "articles";

export const iconForTopic = (topic?: string): IconName =>
  topicIcons[topic || ""] ?? "ai-design";

export const iconForUseCase = (useCase?: string): IconName =>
  useCaseIcons[useCase || ""] ?? "articles";

export const iconForPath = (path: string): IconName => {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const [section, topic] = clean.split("/");
  if (section === "ai-design" && topic) return iconForTopic(topic);
  return iconForSection(section);
};

export const iconForEntry = (entry: CollectionEntry<"pages">): IconName => {
  const { data, id } = entry;
  if (data.design_topic) return iconForTopic(data.design_topic);
  if (data.layer === "ai-mathematics") return "ai-mathematics";
  if (data.layer === "case" || data.section === "cases") return "cases";
  if (data.layer === "practice") return "practices";
  if (data.layer === "reference") return "reference";
  if (
    id.includes("knowledge") ||
    data.tags.some((tag) => /rag|context|knowledge/i.test(tag))
  )
    return "knowledge-context";
  if (
    id.includes("software") ||
    data.tags.some((tag) => /code|開発|保守/i.test(tag))
  )
    return "software-engineering";
  return iconForSection(data.section);
};
