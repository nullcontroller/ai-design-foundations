export const sections = [
  ["foundations", "Foundations", "変わりにくい設計原則"],
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
export const publicEntry = (e: { data: { status: string } }) =>
  e.data.status !== "draft";
