export const sections = [
  ["foundations", "AI設計原則", "新しい入口はStart Hereから"],
  ["architecture", "Architecture", "業務システムの全体設計"],
  ["knowledge-context", "Knowledge / Context", "知識・根拠・情報環境"],
  ["evaluation-hitl", "Evaluation / HITL", "検証・レビュー・採否判断"],
  ["software-engineering", "Software Engineering", "開発工程とAIの役割分担"],
  ["practices", "Practice", "導入・教育・適用判断"],
  ["cases", "実践事例", "原則を適用した実務事例"],
  ["essays", "Essays", "市場・キャリア・技術への考察"],
] as const;
export const base = "/ai-design-foundations";
export const url = (p = "") =>
  base + "/" + p.replace(/^\/+|\/+$/g, "") + (p ? "/" : "");
export const assetUrl = (p: string) => base + "/" + p.replace(/^\/+|\/+$/g, "");
export const absoluteUrl = (site: URL, p = "") =>
  new URL(/\.[a-z0-9]+$/i.test(p) ? assetUrl(p) : url(p), site).toString();
export const label = (s: string) => sections.find((x) => x[0] === s)?.[1] ?? s;
export const publicEntry = (e: {
  data: { status: string; public?: boolean };
}) => e.data.status !== "draft" && e.data.public !== false;

export const layers = {
  "ai-mathematics": "AI数学論",
  "ai-design": "AIデザイン",
  career: "キャリア",
  reference: "Reference",
  practice: "Practice / 実践",
  case: "Case / 実務事例",
  publication: "Publication / 公開物",
} as const;
export const layerLabel = (layer: keyof typeof layers) => layers[layer];

export const statusLabel = (status: string) =>
  ({
    stable: "安定版",
    evolving: "更新中",
    archived: "アーカイブ",
    draft: "下書き",
  })[status] ?? status;
