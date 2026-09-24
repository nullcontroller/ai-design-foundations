# Content Completeness Audit

監査日：2026-09-24  
Wiki正本：`ec04bd4a933fadca50e1d92938e32d8f43c04aa4`

## Summary

| 対象 | 調査数 | 結果 |
|---|---:|---|
| 公式Wiki HEAD | 32 Markdown | 正本30、UI 2 |
| 保存ZIP 3系統 | 94 Markdown | raw body hash 74種。公式正本、別名、改稿、重複を意味比較 |
| Zenn Content | 43 | Article 16、Book 3、Chapter 24 |
| Zenn Asset | 17 | Cover 3、本文画像14、SHA-256検証 |
| README等 | 3 | 旧README、Wiki Home、Wiki索引を保存・統合 |
| Book第4章 | 9見出し | 9/9 covered |
| Book第5章 | 11見出し | 11/11 covered |
| MISSING | 0 | — |
| NEEDS_AUTHOR_REVIEW | 0 | — |
| 公開孤児 | 0 | Reading Path又は親Seriesから到達可能 |

公式Wikiの30本文はmanifestだけを信頼せず、指定commitをcheckoutした原文を`WIKI_SOURCE`として`scripts/verify-content.mjs`へ渡し、source hashと移行先を再検証した。保存ZIPは同一ファイル名だけでなくraw body hashと意味差を比較した。Zennは現行export 40件と、現行exportから消えているがmanifestが原文hashを保持するArticle 3件を合わせた43件を対象とした。

## Wiki正本（30/30）

| Source | Source section | Knowledge | Destination | Classification | 確認方法 | 差分 | 対応内容 |
|---|---|---|---|---|---|---|---|
| `100.数学から見たAI/Instruction・Knowledge・Evidenceの責務分離.md` | 本文全体 | Instruction・Knowledge・Evidenceの責務分離 | `src/content/knowledge-context/instruction-knowledge-evidence.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `100.数学から見たAI/Temperature設計指針.md` | 本文全体 | Temperature設計指針 | `src/content/foundations/temperature-design.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `100.数学から見たAI/なぜ回答範囲を制限した方がよいのか.md` | 本文全体 | なぜ回答範囲を制限した方がよいのか | `src/content/foundations/answer-scope.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `100.数学から見たAI/ハルシネーションの多層制御設計.md` | 本文全体 | ハルシネーションの多層制御設計 | `src/content/foundations/layered-hallucination-controls.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `100.数学から見たAI/ハルシネーションの発生原理.md` | 本文全体 | ハルシネーションの発生原理 | `src/content/foundations/hallucination-mechanisms.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `100.数学から見たAI/生成AIの条件付き確率モデル基礎.md` | 本文全体 | 生成AIの条件付き確率モデル基礎 | `src/content/foundations/conditional-probability.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `200.QAチャット設計思想/QAチャット評価設計思想.md` | 本文全体 | QAチャット評価設計思想 | `src/content/evaluation-hitl/qa-evaluation.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `200.QAチャット設計思想/QAチャット運用思想.md` | 本文全体 | QAチャット運用思想 | `src/content/knowledge-context/qa-operations.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `200.QAチャット設計思想/QA行動制約Knowledge.md` | 本文全体 | QA行動制約Knowledge | `src/content/knowledge-context/qa-behavior-constraints.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `200.QAチャット設計思想/人向け資料とAI向け資料の分離設計.md` | 本文全体 | 人向け資料とAI向け資料の分離設計 | `src/content/knowledge-context/human-and-ai-documentation.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `300.プロンプト構造/AI間インターフェースとしてのプロンプト.md` | 本文全体 | AI間インターフェースとしてのプロンプト | `src/content/architecture/prompts-as-interfaces.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `300.プロンプト構造/ガードレールの数学的説明.md` | 本文全体 | ガードレールの数学的説明 | `src/content/foundations/guardrail-models.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `300.プロンプト構造/プロンプト設計の基本構造.md` | 本文全体 | プロンプト設計の基本構造 | `src/content/knowledge-context/prompt-structure.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `300.プロンプト構造/プロンプト設計の失敗モード.md` | 本文全体 | プロンプト設計の失敗モード | `src/content/knowledge-context/prompt-failure-modes.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `400.コード生成/AIを開発工程に組み込む.md` | 本文全体 | AIを開発工程に組み込む | `src/content/software-engineering/development-workflow.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `400.コード生成/なぜAIは新規コードよりコード保守に強いのか.md` | 本文全体 | なぜAIは新規コードよりコード保守に強いのか | `src/content/software-engineering/code-maintenance-context.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `400.コード生成/コード生成AIの正体.md` | 本文全体 | コード生成AIの正体 | `src/content/software-engineering/code-generation-models.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `400.コード生成/コード生成AIの評価と採用設計.md` | 本文全体 | コード生成AIの評価と採用設計 | `src/content/evaluation-hitl/code-evaluation-acceptance.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `400.コード生成/コード生成を使うべき場所.md` | 本文全体 | コード生成を使うべき場所 | `src/content/software-engineering/code-generation-boundaries.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `500.AIオーケストレーション/AIコスト・Latency・モデルルーティング設計.md` | 本文全体 | AIコスト・Latency・モデルルーティング設計 | `src/content/architecture/cost-latency-routing.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `500.AIオーケストレーション/複数AIの役割分担と工程設計.md` | 本文全体 | 複数AIの役割分担と工程設計 | `src/content/software-engineering/multi-ai-orchestration.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `600.AIガバナンスとHITL/AI出力の責任境界とHITL.md` | 本文全体 | AI出力の責任境界とHITL | `src/content/evaluation-hitl/responsibility-and-hitl.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `600.AIガバナンスとHITL/AI適用可否と委任レベルの設計.md` | 本文全体 | AI適用可否と委任レベルの設計 | `src/content/foundations/applicability-and-delegation.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `600.AIガバナンスとHITL/生成AIセキュリティと脅威モデリング.md` | 本文全体 | 生成AIセキュリティと脅威モデリング | `src/content/architecture/security-threat-modeling.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `700.AIシステムアーキテクチャとライフサイクル/AIシステムのオブザーバビリティとSLO設計.md` | 本文全体 | AIシステムのオブザーバビリティとSLO設計 | `src/content/architecture/observability-and-slo.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `700.AIシステムアーキテクチャとライフサイクル/AIシステムの変更・再評価設計.md` | 本文全体 | AIシステムの変更・再評価設計 | `src/content/architecture/change-and-reevaluation.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `700.AIシステムアーキテクチャとライフサイクル/AI業務システムの参照アーキテクチャ.md` | 本文全体 | AI業務システムの参照アーキテクチャ | `src/content/architecture/reference-architecture.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `700.AIシステムアーキテクチャとライフサイクル/AI評価データセットと回帰評価設計.md` | 本文全体 | AI評価データセットと回帰評価設計 | `src/content/evaluation-hitl/datasets-and-regression.md` | COMPLETE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 正本本文と出典metadataを維持。 |
| `Home.md` | 本文全体 | Home | `src/content/foundations/wiki-overview.md` | PRIVATE_ARCHIVE | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 設計体系の履歴として非公開保存。一般知識は各正本へ分散済み。 |
| `用語・数式索引.md` | 本文全体 | 用語・数式索引 | `src/content/foundations/glossary.md` | MERGED | source commit・原文SHA-256・変換後本文SHA-256 | 有意差なし | 公開Reference正本への索引として保持。 |

## 別名・改稿・旧README

| Source | Source section | Knowledge | Destination | Classification | 確認方法 | 差分 | 対応内容 |
|---|---|---|---|---|---|---|---|
| readable/インストラクション・ナレッジ・エビデンスの責務分離.md | 全節 | 指示・知識・根拠の三責務 | `src/content/knowledge-context/instruction-knowledge-evidence.md` | BETTER_IN_ROSARIUM | 見出し・表・本文の意味比較 | 日本語別名。正本は責務境界と更新・評価まで包含 | 別記事を作らず正本へ統一 |
| readable/温度パラメータ設計指針.md | 全節 | Temperatureと分布・再現性 | `src/content/foundations/temperature-design.md` | BETTER_IN_ROSARIUM | 数式・例・結論の意味比較 | 日本語別名。正本が同論点を包含 | 別記事を作らず正本へ統一 |
| readable/AIのコスト・レイテンシ・モデルルーティング設計.md | Routing例・安全なFallback | 非AI経路、機能縮退、品質・費用・時間・人間負荷 | `src/content/architecture/cost-latency-routing.md` | ABSORBED | 短版と長版の節別比較 | 短版固有の郵便番号例と安全な縮退の明示 | 正本のRouting例・Fallbackへ吸収 |
| readable/RAG検索・権限・根拠の設計.md | 全節 | Retrieval、権限、根拠 | Knowledge / Context・Security・QA正本群 | MERGED | 見出し・主張の意味比較 | 一記事の責務が複数正本へ分割 | 現行責務境界を維持し重複記事を作らない |
| 旧repository README | 全節 | 設計体系の原点 | `src/content/foundations/design-system-overview.md` | PRIVATE_ARCHIVE | source commit・保存本文・現行正本の意味比較 | 公開IA説明は現在と不一致 | 履歴として非公開保存し、知識は各正本へ保持 |
| `_Sidebar.md` / `_Footer.md` | 全体 | 旧Wiki UI | 現行Navigation / Footer | UI_ONLY | source commitで確認 | 知識本文ではない | 旧UIを公開本文へ移行しない |
| 保存ZIP内の完全一致・ネスト複製 | 全体 | 正本と同一の本文 | 上記30正本 | DUPLICATE | raw body SHA-256 | 有意差なし | 複製しない |

## Zenn完全性

- Article 16/16、Book 3/3、Chapter 24/24を`migration/zenn-migration-manifest.yaml`でsource URL・front matter・章順・本文hashへ対応付けた。
- 現行exportに存在する40件は原文と照合した。削除済みArticle 3件は既存manifestのsource hashとRosarium本文を保持した。
- Book `76ed12dcc7e5d7` の第4章・第5章を追加し、configの章順 `412d8b → 62ecee → 10802f → 146efb → b165bb` を保存した。
- 正確な公開日・公開月が元資料にない第4章・第5章はnullのまま保持し、推測日を作っていない。

## 到達性

Canonical classificationは変更せず、`src/lib/reading.ts`のDiscovery Pathから全16件のtop-level Publicationへ到達可能にした。Book Chapter 24件は親Series目次から到達する。指摘されていた4件も次の経路へ接続した。

- 理解できないシステムは、コストである → 実践知 / 開発・保守
- 採用される側から見たAI人材の転職概況 → 実践知 / 組織・キャリア
- AI人材はFDEだけではない → 実践知 / 組織・キャリア
- モデル競争の裏にある構造とエコシステム → AI理論 / 生成モデルと変化、および実践知 / 組織・キャリア

## 最終判定

`MISSING = 0`、`NEEDS_AUTHOR_REVIEW = 0`、公開孤児 = 0。装飾画像、旧UI、完全重複、Git履歴は知識本文として複製していない。
