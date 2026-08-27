# AI Design Foundations

生成AIを単なる「コード生成ツール」や「プロンプト操作の対象」としてではなく、

> **確率的に出力を生成するコンポーネントとして、実務システムの中でどう設計・制御・検証するか**

という観点から整理した設計体系です。

LLM / RAG / QA / AIオーケストレーション / HITL / AIガバナンスを中心に、  
生成AIを実務へ継続的に組み込むための設計思想・設計原則をまとめています。

---

## What this repository covers

主なテーマは以下です。

- LLMを確率的な出力生成モデルとして捉えた設計
- RAG / QAにおける知識境界・回答範囲・回答制御
- プロンプトによる役割・制約・Input / Output設計
- 生成AIをソフトウェア開発工程へ組み込む方法
- 複数AIの役割分担とオーケストレーション
- HITLによる判断・確認・責任境界
- AI出力の評価・検証可能性・ガバナンス
- 既存システム・レガシーシステムへのAI適用

---

## Core Concept

このリポジトリで重視しているのは、

> **AIに何を任せるかだけでなく、何を任せないか、どこで人間が確認し、誰が最終判断を持つかまで設計すること**

です。

生成AIの出力は確率的であり、そのまま正解として扱うことはできません。

そのため、

> **後工程で検証可能な中間成果物にはAIを積極的に利用し、品質・安全性・責任に直結する判断は人間が確認する**

ことを基本原則としています。

AI単体の性能ではなく、

> **AI・人間・既存システム・Workflow・Knowledge・Reviewを一つのシステムとして設計する**

ことを重視しています。

---

## Documentation

設計思想・設計原則の詳細は GitHub Wiki に整理しています。

👉 [AI Design Foundations Wiki](https://github.com/nullcontroller/ai-design-foundations/wiki)

| Section | Theme |
| --- | --- |
| 100 | 数学・確率モデルから見たAI |
| 200 | RAG / QAチャット設計 |
| 300 | プロンプト・制約・I/O設計 |
| 400 | コード生成・AI支援開発工程 |
| 500 | AIオーケストレーション |
| 600 | AIガバナンス・HITL |
| 700 | Architecture・Lifecycle・変更／再評価設計 |

設計ノートは個別のTipsではなく、以下の流れを持つ一つの設計体系として整理しています。

```text
LLMの性質
↓
制約設計
↓
RAG / QA
↓
開発工程への組み込み
↓
複数AIの役割分担
↓
HITL / Governance
```

## Design Principles

### 1. AIは確率的コンポーネントとして扱う

AIは、常に正解を返す決定的なシステムではありません。

そのため、生成結果だけではなく、

- 入力
- 制約
- Knowledge
- 検証
- 人間による判断

まで含めて設計します。

---

### 2. AIの適用範囲を設計する

AIを「使える場所」だけでなく、

- AIへ任せる範囲
- 人間が確認する範囲
- AIへ任せない範囲

を明確にします。

---

### 3. 検証可能性を重視する

AI出力は、後工程で検証できる形にします。

例：

- コード → テスト・レビュー
- 仕様案 → 既存仕様との照合
- 影響範囲 → 実コードで確認
- RAG回答 → 根拠情報を確認

---

### 4. AIを開発工程全体へ組み込む

コード生成だけを最適化しません。

~~~text
要求整理
↓
既存コード調査
↓
影響分析
↓
設計
↓
仕様化
↓
実装
↓
レビュー
↓
テスト
~~~

各工程でAIと人間の役割を分けて設計します。

---

### 5. 複数AIは競争ではなく役割分担させる

AIごとの特性を活かし、

- 調査
- コード探索
- 要件整理
- 文書化
- 実装
- レビュー

などを工程単位で分担させます。

---

## Case Studies

実務での生成AI活用・ソフトウェア設計事例は Zenn で公開しています。

👉 [Zenn - nullcontroller](https://zenn.dev/nullcontroller)

### 3つのAIをオーケストレーションしたレガシー保守

GPT、GitHub Copilot、Microsoft 365 Copilotを役割分担させ、  
要件整理、既存コード調査、仕様化、実装、単体テストまでを一つの開発・保守プロセスとして設計した事例です。

👉 [Zenn Book](https://zenn.dev/nullcontroller/books/b9a9feaefb4001)

### レガシーシステムを「理解可能な状態」にする設計手法

仕様書が不足し、担当者も不在で、コードだけが残っているレガシーシステムを対象に、  
ソースコードから構造を復元し、PlantUMLやMarkdownを利用して、理解可能・再利用可能な知識へ変換する設計手法を整理しています。

👉 [Zenn Book](https://zenn.dev/nullcontroller/books/db491398459cbc)

---

## Positioning

このリポジトリは、

**AIモデルそのものを開発するための研究リポジトリではありません。**

対象としているのは、

> **生成AIを既存の業務・ソフトウェア・システムへ安全かつ継続的に組み込むための設計**

です。

特に以下の領域を中心に扱います。

- Enterprise AI
- Applied AI
- AI Architecture
- RAG / QA
- AI-Assisted Software Engineering
- Legacy System / Modernization
- HITL
- AI Governance

---

## Keywords

`LLM` `RAG` `Generative AI` `Applied AI`  
`AI Architecture` `AI Orchestration` `AI Governance`  
`HITL` `AI Evaluation`  
`GitHub Copilot` `Microsoft 365 Copilot`  
`Software Architecture` `AI-Assisted Software Engineering`  
`Legacy System` `Modernization`
