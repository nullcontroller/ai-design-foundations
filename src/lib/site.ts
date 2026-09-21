export const sections = [
  ["foundations", "AI設計原則", "新しい入口はStart Hereから"],
  ["architecture", "Architecture", "業務システムの全体設計"],
  ["knowledge-context", "Knowledge / Context", "知識・根拠・情報環境"],
  ["evaluation-hitl", "Evaluation / HITL", "検証・レビュー・採否判断"],
  ["software-engineering", "Software Engineering", "開発工程とAIの役割分担"],
  ["practices", "Practices", "導入・教育・適用判断"],
  ["cases", "Case Studies", "原則を適用した実務事例"],
  ["essays", "Essays", "市場・キャリア・技術への考察"],
] as const;
export const base = "/ai-design-foundations";
export const url = (p = "") =>
  base + "/" + p.replace(/^\/+|\/+$/g, "") + (p ? "/" : "");
export const label = (s: string) => sections.find((x) => x[0] === s)?.[1] ?? s;
export const publicEntry = (e: {
  data: { status: string; public?: boolean };
}) => e.data.status !== "draft" && e.data.public !== false;

export const layers = {
  "ai-mathematics": "AI数学論",
  "ai-design": "AI Design",
  career: "Career",
  reference: "Reference",
  practice: "Practice / 実践",
  case: "Case / 実務事例",
  publication: "Publication / 公開物",
} as const;
export const layerLabel = (layer: keyof typeof layers) => layers[layer];
