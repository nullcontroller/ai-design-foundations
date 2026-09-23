import type { CollectionEntry } from "astro:content";
import { label } from "./site";
export type Entry = CollectionEntry<"pages">;
export const navigation = [
  [
    { path: "", title: "Home", summary: "Rosariumの入口", icon: "home" },
    { path: "about", title: "About", summary: "Rosariumについて", icon: "about" },
  ],
  [{ path: "career", title: "Career", summary: "職務経験・希望する役割", icon: "career" }],
  [
    { path: "overview", title: "全体目次", summary: "全コンテンツを見渡す", icon: "overview" },
    {
      path: "articles",
      title: "読む",
      summary: "目的・テーマから探す",
      icon: "articles",
    },
  ],
  [
    { path: "cases", title: "Case Studies", summary: "実務への適用事例", icon: "cases" },
    {
      path: "ai-design",
      title: "AI Design",
      summary: "業務システムへの組込み",
      icon: "ai-design",
    },
    {
      path: "ai-mathematics",
      title: "AI数学論",
      summary: "AIの性質を理解する",
      icon: "ai-mathematics",
    },
    { path: "practices", title: "Practices", summary: "業務・組織への適用", icon: "practices" },
  ],
  [{ path: "reference", title: "Reference", summary: "用語・数式・参照資料", icon: "reference" }],
];
export const designTopics = [
  ["applicability", "AI適用判断", "適用可否と委任レベル"],
  [
    "responsibility-control",
    "責任境界・制御",
    "生成・受理・実行の分離とGuardrail",
  ],
  [
    "architecture",
    "Architecture",
    "全体構成・Tool / Workflow・Security / Governance",
  ],
  [
    "knowledge-context",
    "Knowledge / Context",
    "指示・知識・根拠の責務と情報設計",
  ],
  ["evaluation-hitl", "Evaluation / HITL", "評価・回帰検証・採否判断"],
  [
    "software-engineering",
    "Software Engineering",
    "コード生成・保守・複数AIの設計",
  ],
  [
    "lifecycle-operations",
    "Lifecycle / Operations",
    "変更・再評価・監視・継続運用",
  ],
] as const;
export const topicLabel = (key?: string) =>
  designTopics.find((x) => x[0] === key)?.[1];
export const contentCategory = (e: Entry) =>
  e.data.layer === "ai-design"
    ? topicLabel(e.data.design_topic)!
    : e.data.layer === "ai-mathematics"
      ? "モデル・確率・振る舞い"
      : e.data.layer === "reference"
        ? "用語・参照資料"
        : e.data.layer === "practice"
          ? "業務・開発プロセス"
          : label(e.data.section);
export const layerPath = (layer: string) =>
  ({
    "ai-design": "ai-design",
    "ai-mathematics": "ai-mathematics",
    practice: "practices",
    case: "cases",
    publication: "articles",
    career: "career",
    reference: "reference",
  })[layer] || "start-here";
export const publicationType = (e: Entry) =>
  ({ article: "Article", book: "Book", series: "連載", essay: "Essay" })[
    e.data.publication_format || "article"
  ];
export const isPublication = (e: Entry) =>
  !!e.data.publication_format ||
  (e.data.layer === "publication" && (!e.data.series || e.data.order === 0));
export const publicationTiming = (e: Entry) => {
  if (e.data.publication_status === "ongoing")
    return { label: "状態", value: "連載中" };
  if (e.data.published_at)
    return {
      label: "公開",
      value: e.data.published_at.slice(0, 10),
      datetime: e.data.published_at,
    };
  const month = e.data.source?.publication_month;
  const match = month?.match(/^(\d{4})-(\d{2})$/);
  if (match)
    return {
      label: "公開",
      value: `${match[1]}年${Number(match[2])}月`,
    };
  return { label: "公開", value: "公開時期未確認" };
};
export const publicationDate = (e: Entry) => publicationTiming(e).value;
export const topicPublications: Record<string, string[]> = {
  applicability: [
    "foundations/ai-business-design",
    "foundations/generation-and-acceptance",
  ],
  "responsibility-control": [
    "foundations/generation-and-acceptance",
    "evaluation-hitl/human-review-capability",
    "essays/trust-in-ai-generated-content",
    "foundations/ai-business-design",
  ],
  architecture: [
    "architecture/agents-tools-and-workflows",
    "foundations/ai-business-design",
    "cases/three-ai-maintenance",
  ],
  "knowledge-context": [
    "knowledge-context/context-before-model-performance",
    "cases/system-understanding",
  ],
  "evaluation-hitl": [
    "evaluation-hitl/human-review-capability",
    "essays/trust-in-ai-generated-content",
    "cases/system-understanding",
  ],
  "software-engineering": [
    "software-engineering/ai-driven-development",
    "software-engineering/ai-design-assistance",
    "software-engineering/code-generation-and-work-design",
    "cases/three-ai-maintenance",
  ],
  "lifecycle-operations": [
    "cases/system-understanding",
    "cases/three-ai-maintenance",
  ],
};
export const relatedPublications = (all: Entry[], topic?: string) =>
  (topicPublications[topic || ""] || [])
    .map((id) => all.find((e) => e.id === id))
    .filter((e): e is Entry => !!e && isPublication(e));
export const caseStudies = [
  {
    book: "cases/system-understanding",
    topics: ["QA / RAG", "Knowledge再構築"],
    chapters: [
      "cases/system-understanding/recovering-code-structure",
      "cases/system-understanding/human-and-ai-knowledge",
      "cases/system-understanding/rag-implementation",
      "cases/system-understanding/qa-evaluation",
    ],
    design: [
      "knowledge-context/human-and-ai-documentation",
      "evaluation-hitl/qa-evaluation",
    ],
  },
  {
    book: "cases/three-ai-maintenance",
    topics: ["AIオーケストレーション", "既存ソフトウェア開発・改善"],
    chapters: [
      "cases/three-ai-maintenance/cryptography-and-failure-modes",
      "cases/three-ai-maintenance/structuring-failure-handling",
      "cases/three-ai-maintenance/sharing-current-specifications",
      "cases/three-ai-maintenance/results-and-reflections",
    ],
    design: [
      "software-engineering/multi-ai-orchestration",
      "evaluation-hitl/responsibility-and-hitl",
    ],
  },
];

export const mathematicsReadingIds = [
  "foundations/conditional-probability",
  "foundations/temperature-design",
  "foundations/hallucination-mechanisms",
  "software-engineering/code-generation-models",
] as const;

export const publicationTopic = (e: Entry) =>
  e.data.layer === "ai-mathematics" ? "AI数学論" : label(e.data.section);

export const publicationTopics = (entry: Entry) => [
  ...new Set([
    publicationTopic(entry),
    ...designTopics
      .filter(([key]) => topicPublications[key]?.includes(entry.id))
      .map(([, title]) => title),
    ...(entry.data.tags.some((tag) => ["aiエージェント", "mcp"].includes(tag))
      ? ["AI Agent"]
      : []),
    ...(entry.data.tags.includes("キャリア") ? ["Career"] : []),
  ]),
];
