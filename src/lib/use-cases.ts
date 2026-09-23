import type { CollectionEntry } from "astro:content";

export type Entry = CollectionEntry<"pages">;
export type UseCaseId =
  | "ai-adoption"
  | "natural-language-services"
  | "software-engineering"
  | "understand-ai"
  | "case-studies"
  | "career-work";

export const useCases = [
  {
    id: "ai-adoption",
    title: "AIを業務に使いたい",
    shortTitle: "AI導入・責任・評価",
    description:
      "AIをどこへ使い、どこを人間や既存システムへ残すか。適用判断、責任境界、HITL、評価、Governanceから設計します。",
    path: "ai-design",
    home: true,
    featured: [
      "foundations/applicability-and-delegation",
      "evaluation-hitl/responsibility-and-hitl",
      "architecture/reference-architecture",
    ],
    publications: [
      "foundations/ai-business-design",
      "foundations/generation-and-acceptance",
      "practices/ai-adoption-and-effective-use",
      "evaluation-hitl/human-review-capability",
    ],
  },
  {
    id: "natural-language-services",
    title: "自然言語で業務を扱うサービスを考えたい",
    shortTitle: "自然言語サービス・RAG・Knowledge",
    description:
      "自然言語を入口として、企業内の知識・業務・既存システムを扱うサービスを、RAG、Context、Tool、Workflowから考えます。",
    path: "ai-design/knowledge-context",
    home: true,
    featured: [
      "knowledge-context/instruction-knowledge-evidence",
      "knowledge-context/human-and-ai-documentation",
      "knowledge-context/qa-operations",
    ],
    publications: [
      "knowledge-context/context-before-model-performance",
      "cases/system-understanding",
      "architecture/agents-tools-and-workflows",
    ],
  },
  {
    id: "software-engineering",
    title: "AIを使って開発・保守したい",
    shortTitle: "AI × Software Engineering",
    description:
      "コード生成、複数AI、仕様理解、既存ソフトウェアの変更と評価を、開発工程へ安全に組み込む方法を整理します。",
    path: "ai-design/software-engineering",
    home: true,
    featured: [
      "software-engineering/development-workflow",
      "software-engineering/code-generation-boundaries",
      "software-engineering/multi-ai-orchestration",
    ],
    publications: [
      "software-engineering/ai-driven-development",
      "software-engineering/code-generation-and-work-design",
      "software-engineering/ai-design-assistance",
      "cases/three-ai-maintenance",
    ],
  },
  {
    id: "understand-ai",
    title: "AIの仕組みを理解したい",
    shortTitle: "AI数学論・モデルの性質",
    description:
      "AIがなぜそのように振る舞うのかを、確率、生成条件、Temperature、Hallucination、モデルの性質から理解します。",
    path: "ai-mathematics",
    home: true,
    featured: [
      "foundations/llm-as-probabilistic-model",
      "foundations/conditional-probability",
      "foundations/temperature-design",
    ],
    publications: [
      "foundations/llm-as-probabilistic-model",
      "essays/model-competition-and-ecosystems",
    ],
  },
  {
    id: "case-studies",
    title: "実際にどうやったか見たい",
    shortTitle: "Case・実務",
    description:
      "QA / RAG、Knowledge再構築、複数AI、既存ソフトウェア改善へ、設計原則を適用した事例を見ます。",
    path: "cases",
    home: true,
    featured: [
      "cases/system-understanding",
      "cases/three-ai-maintenance",
      "cases/understanding-systems-as-capability",
    ],
    publications: [
      "cases/system-understanding",
      "cases/three-ai-maintenance",
      "cases/understanding-systems-as-capability",
    ],
  },
  {
    id: "career-work",
    title: "キャリアと仕事の設計を考えたい",
    shortTitle: "Career・Work Design",
    description:
      "AI人材、技術職、レビュー、情報発信など、技術を取り巻く仕事とキャリアについての論考を読みます。",
    path: "articles",
    home: false,
    featured: ["essays/ai-career-market", "essays/ai-roles-beyond-fde"],
    publications: [
      "essays/ai-career-market",
      "essays/ai-roles-beyond-fde",
      "essays/trust-in-ai-generated-content",
    ],
  },
] as const satisfies readonly {
  id: UseCaseId;
  title: string;
  shortTitle: string;
  description: string;
  path: string;
  home: boolean;
  featured: readonly string[];
  publications: readonly string[];
}[];

export const primaryUseCases = useCases.filter((useCase) => useCase.home);
export const useCaseById = (id: string) =>
  useCases.find((useCase) => useCase.id === id);

export function contentUseCaseIds(entry: Entry): UseCaseId[] {
  const { data, id } = entry;
  const tags = new Set(data.tags.map((tag) => tag.toLowerCase()));
  const result = new Set<UseCaseId>();

  if (
    [
      "applicability",
      "responsibility-control",
      "architecture",
      "evaluation-hitl",
      "lifecycle-operations",
    ].includes(data.design_topic || "") ||
    data.layer === "practice" ||
    data.section === "practices" ||
    data.section === "evaluation-hitl" ||
    [...tags].some((tag) =>
      ["hitl", "aiガバナンス", "governance", "業務改善", "業務設計"].includes(
        tag,
      ),
    )
  )
    result.add("ai-adoption");

  if (
    data.design_topic === "knowledge-context" ||
    data.section === "knowledge-context" ||
    id.startsWith("cases/system-understanding") ||
    id === "architecture/agents-tools-and-workflows" ||
    [...tags].some((tag) =>
      ["rag", "コンテキスト", "knowledge", "aiエージェント", "mcp"].includes(
        tag,
      ),
    )
  )
    result.add("natural-language-services");

  if (
    data.design_topic === "software-engineering" ||
    data.section === "software-engineering" ||
    id.startsWith("cases/three-ai-maintenance") ||
    id.startsWith("cases/system-understanding") ||
    [...tags].some((tag) =>
      [
        "githubcopilot",
        "ソフトウェア設計",
        "開発プロセス",
        "保守開発",
        "レガシー",
        "リファクタリング",
      ].includes(tag),
    )
  )
    result.add("software-engineering");

  if (
    data.layer === "ai-mathematics" ||
    id === "essays/model-competition-and-ecosystems" ||
    [...tags].some((tag) => ["数学", "機械学習"].includes(tag))
  )
    result.add("understand-ai");

  if (data.layer === "case" || data.section === "cases")
    result.add("case-studies");

  if (data.section === "essays" || tags.has("キャリア"))
    result.add("career-work");

  return [...result];
}

export const contentUseCases = (entry: Entry) =>
  contentUseCaseIds(entry)
    .map((id) => useCaseById(id))
    .filter((useCase): useCase is (typeof useCases)[number] =>
      Boolean(useCase),
    );

export function recommendedEntries(
  all: Entry[],
  useCaseId: UseCaseId,
  kind: "featured" | "publications" = "featured",
) {
  const useCase = useCaseById(useCaseId);
  return (useCase?.[kind] || [])
    .map((id) => all.find((entry) => entry.id === id))
    .filter((entry): entry is Entry => Boolean(entry));
}
