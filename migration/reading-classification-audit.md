# Reading Classification Audit

監査日：2026-09-24

## 原則

Canonical classificationとDiscovery Pathを分離する。`layer`、`section`、`design_topic`、URL、本文、source metadataは変更せず、一つの正本へ複数の「読む経路」から到達できるようにした。分類数を均等にするための移動や複製は行っていない。

## Canonical counts

| Category | Before | After | 判定 |
|---|---:|---:|---|
| AI設計 | 23 | 23 | 変更なし |
| AI理論 | 4 | 4 | 変更なし |
| 実践知 | 4 | 4 | 変更なし |
| 実践事例 | 2 Book | 2 Book | 変更なし |

## Reading Path counts

| Reading Path | Before | After | 追加した発見経路 |
|---|---:|---:|---|
| AI設計 | 23 | 25 | AI業務設計Book、Agent / Tool / Workflow |
| AI理論 | 4 | 7 | 多層Hallucination制御、Guardrail数理、モデル競争と構造 |
| 実践知 | 4 | 27 | Prompt、QA運用、Knowledge、開発・保守、複数AI、評価、Human Review、関連Publication |
| 実践事例 | 2 | 2 | 代表Book 2冊を維持 |

## Reading groups and order

| Path | Group | Order rationale | Canonical entries / cross-listed entries |
|---|---|---|---|
| AI設計 | 基礎・適用判断 | 適用可否 → 回答範囲 → 責任 → 連載 | applicability, answer-scope, responsibility-and-hitl, ai-business-design |
| AI設計 | 責任・安全 | 数理的制約 → 多層制御 → Security | guardrail-models, layered-hallucination-controls, security-threat-modeling |
| AI設計 | アーキテクチャ | 全体構成 → Routing / Interface → 変更・観測 → Agent | reference-architecture, cost-latency-routing, prompts-as-interfaces, change-and-reevaluation, observability-and-slo, agents-tools-and-workflows |
| AI設計 | Knowledge / Context | 情報責務 → Prompt → 文書 → QA制約・運用 | instruction-knowledge-evidence, prompt-structure, prompt-failure-modes, human-and-ai-documentation, qa-behavior-constraints, qa-operations |
| AI設計 | 評価・HITL | Dataset → QA → Code受入 | datasets-and-regression, qa-evaluation, code-evaluation-acceptance |
| AI設計 | Software Engineering | 生成境界 → 保守Context → 複数AI | code-generation-boundaries, code-maintenance-context, multi-ai-orchestration |
| AI理論 | 確率と生成 | 条件付き確率 → Temperature | conditional-probability, temperature-design |
| AI理論 | 誤りと制御 | 発生原理 → 多層制御 → Guardrail数理 | hallucination-mechanisms, layered-hallucination-controls, guardrail-models |
| AI理論 | 生成モデルと変化 | Code生成モデル → モデル競争の構造 | code-generation-models, model-competition-and-ecosystems |
| 実践知 | 導入・教育・定着 | 導入 → 教育 → Capability → 横展開 | adoption-governance, ai-adoption-and-effective-use, education-and-capability, ai-education-principles, transferring-practices, transferring-ai-practices |
| 実践知 | Prompt・Knowledge運用 | Prompt設計・失敗 → QA運用 → Context → 文書 | prompt-structure, prompt-failure-modes, qa-operations, context-before-model-performance, human-and-ai-documentation |
| 実践知 | 開発・保守 | Workflow → 生成境界 → 保守 → 複数AI → Publication実践 | development-workflowほか8件 |
| 実践知 | 評価・Human Review | 回帰評価 → 責任 → Review能力 → 受理 → 信頼 | datasets-and-regressionほか5件 |
| 実践知 | 組織・キャリア | 採用市場 → Role分化 → Ecosystem | ai-career-market, ai-roles-beyond-fde, model-competition-and-ecosystems |
| 実践事例 | レガシーシステムの実践 | 単独GPT中心 → 3 AIの役割分担 | system-understanding, three-ai-maintenance |

順序のSingle Source of Truthは `src/lib/reading.ts`。Hub、カテゴリページ、Desktop右ペイン、Mobile Navigator、個別記事で同じデータを利用する。

## Publication reachability

top-level Publication 16件はすべて少なくとも一つのReading Pathへ含めた。Series Chapter 24件は親Book / Seriesの目次から到達する。ReferenceとCareerはそれぞれ専用入口を持つ。公開コンテンツの孤児は0件。

## Knowledge gaps

既存資産からは、Embedding / Similarity、Attentionを独立して深く説明するAI理論正本は確認できなかった。既存本文にない主張を水増ししないため、今回は新記事を作成していない。将来の候補は「Embeddingと類似度が検索結果へ与える影響」「Attention / Context Windowを設計上どう読むか」。既存の確率・Hallucination・Guardrail・Code生成モデルで今回のNavigation要件は満たす。

実践知では、AIを使った調査だけを独立責務とする正本はない。QA運用、Context、開発Workflowに分散しており、現時点では新記事へ分割するだけの固有知識量がないため追加していない。

## Compatibility

既存URL、canonical、layer、section、design_topic、Zenn / Wiki provenanceは変更していない。Reading Pathはリンクによる発見経路だけを追加する。
