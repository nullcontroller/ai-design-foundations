import type { CollectionEntry } from "astro:content";
import { url } from "./site";

export type ReadingPath =
  | "ai-design"
  | "ai-mathematics"
  | "practices"
  | "cases";

export type ReadingGroup = {
  title: string;
  links: { id: string; title: string; href: string; current: boolean }[];
  current: boolean;
};

type Entry = CollectionEntry<"pages">;

// Canonical classification and discovery paths are intentionally separate.
// One canonical article may be reachable from more than one reading path.
export const readingGroups: Record<
  ReadingPath,
  readonly { title: string; ids: readonly string[] }[]
> = {
  "ai-design": [
    {
      title: "基礎・適用判断",
      ids: [
        "foundations/applicability-and-delegation",
        "foundations/answer-scope",
        "evaluation-hitl/responsibility-and-hitl",
        "foundations/ai-business-design",
      ],
    },
    {
      title: "責任・安全",
      ids: [
        "foundations/guardrail-models",
        "foundations/layered-hallucination-controls",
        "architecture/security-threat-modeling",
      ],
    },
    {
      title: "アーキテクチャ",
      ids: [
        "architecture/reference-architecture",
        "architecture/cost-latency-routing",
        "architecture/prompts-as-interfaces",
        "architecture/change-and-reevaluation",
        "architecture/observability-and-slo",
        "architecture/agents-tools-and-workflows",
      ],
    },
    {
      title: "Knowledge / Context",
      ids: [
        "knowledge-context/instruction-knowledge-evidence",
        "knowledge-context/prompt-structure",
        "knowledge-context/prompt-failure-modes",
        "knowledge-context/human-and-ai-documentation",
        "knowledge-context/qa-behavior-constraints",
        "knowledge-context/qa-operations",
      ],
    },
    {
      title: "評価・HITL",
      ids: [
        "evaluation-hitl/datasets-and-regression",
        "evaluation-hitl/qa-evaluation",
        "evaluation-hitl/code-evaluation-acceptance",
      ],
    },
    {
      title: "Software Engineering",
      ids: [
        "software-engineering/code-generation-boundaries",
        "software-engineering/code-maintenance-context",
        "software-engineering/multi-ai-orchestration",
      ],
    },
  ],
  "ai-mathematics": [
    {
      title: "確率と生成",
      ids: [
        "foundations/conditional-probability",
        "foundations/temperature-design",
      ],
    },
    {
      title: "誤りと制御",
      ids: [
        "foundations/hallucination-mechanisms",
        "foundations/layered-hallucination-controls",
        "foundations/guardrail-models",
      ],
    },
    {
      title: "生成モデルと変化",
      ids: [
        "software-engineering/code-generation-models",
        "essays/model-competition-and-ecosystems",
      ],
    },
  ],
  practices: [
    {
      title: "導入・教育・定着",
      ids: [
        "practices/adoption-governance",
        "practices/ai-adoption-and-effective-use",
        "practices/education-and-capability",
        "practices/ai-education-principles",
        "practices/transferring-practices",
        "practices/transferring-ai-practices",
      ],
    },
    {
      title: "Prompt・Knowledge運用",
      ids: [
        "knowledge-context/prompt-structure",
        "knowledge-context/prompt-failure-modes",
        "knowledge-context/qa-operations",
        "knowledge-context/context-before-model-performance",
        "knowledge-context/human-and-ai-documentation",
      ],
    },
    {
      title: "開発・保守",
      ids: [
        "software-engineering/development-workflow",
        "software-engineering/code-generation-boundaries",
        "software-engineering/code-maintenance-context",
        "software-engineering/multi-ai-orchestration",
        "software-engineering/code-generation-and-work-design",
        "software-engineering/ai-driven-development",
        "software-engineering/ai-design-assistance",
        "cases/understanding-systems-as-capability",
      ],
    },
    {
      title: "評価・Human Review",
      ids: [
        "evaluation-hitl/datasets-and-regression",
        "evaluation-hitl/responsibility-and-hitl",
        "evaluation-hitl/human-review-capability",
        "foundations/generation-and-acceptance",
        "essays/trust-in-ai-generated-content",
      ],
    },
    {
      title: "組織・キャリア",
      ids: [
        "essays/ai-career-market",
        "essays/ai-roles-beyond-fde",
        "essays/model-competition-and-ecosystems",
      ],
    },
  ],
  cases: [
    {
      title: "レガシーシステムの実践",
      ids: ["cases/system-understanding", "cases/three-ai-maintenance"],
    },
  ],
};

export function readingNavigation(
  entries: Entry[],
  path: ReadingPath,
  currentId?: string,
): ReadingGroup[] {
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  return readingGroups[path].map((group) => ({
    title: group.title,
    current: group.ids.includes(currentId || ""),
    links: group.ids.map((id) => {
      const entry = byId.get(id);
      if (!entry) throw new Error(`Missing reading navigation entry: ${id}`);
      return {
        id,
        title: entry.data.title,
        href: url(id),
        current: id === currentId,
      };
    }),
  }));
}

export function readingEntries(entries: Entry[], path: ReadingPath): Entry[] {
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  return [...new Set(readingGroups[path].flatMap((group) => group.ids))].map(
    (id) => {
      const entry = byId.get(id);
      if (!entry) throw new Error(`Missing reading entry: ${id}`);
      return entry;
    },
  );
}

export function readingPathForEntry(
  entry: Entry,
  entries: Entry[],
): ReadingPath | undefined {
  const canonical: ReadingPath | undefined =
    entry.data.layer === "ai-design"
      ? "ai-design"
      : entry.data.layer === "ai-mathematics"
        ? "ai-mathematics"
        : entry.data.layer === "practice"
          ? "practices"
          : undefined;
  if (canonical) return canonical;

  const parentId = entry.data.series
    ? entries.find(
        (candidate) =>
          candidate.data.series === entry.data.series &&
          (candidate.data.order ?? -1) === 0,
      )?.id
    : undefined;
  const ids = [entry.id, parentId].filter(Boolean) as string[];
  return (Object.keys(readingGroups) as ReadingPath[]).find((path) =>
    readingGroups[path].some((group) =>
      ids.some((id) => group.ids.includes(id)),
    ),
  );
}
