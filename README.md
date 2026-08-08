# AI Design Foundations

LLM / RAG / QA / AIオーケストレーション / HITL / AIガバナンスについて、  
**生成AIを実務システムへ組み込むための設計思想・設計原則**を整理しています。

生成AIを単なるコード生成やプロンプト操作の対象としてではなく、

> **確率的に出力を生成するコンポーネントとして、システム全体の中でどう制御するか**

という観点から考えています。

主なテーマは以下です。

- LLMを確率モデルとして捉えた設計
- RAG / QAにおける知識境界と回答制御
- プロンプトによる役割・制約・I/O設計
- 生成AIをソフトウェア開発工程へ組み込む方法
- 複数AIの役割分担とオーケストレーション
- HITLによる判断・確認・責任境界
- AI出力の検証可能性とガバナンス

---

## Documentation

設計思想・設計原則の詳細は、GitHub Wikiに整理しています。

👉 [AI Design Foundations Wiki](https://github.com/nullcontroller/ai-design-foundations/wiki)

| Section | Theme |
|---|---|
| 100 | 数学から見たAI |
| 200 | QAチャット設計思想 |
| 300 | プロンプト構造 |
| 400 | コード生成・開発工程 |
| 500 | AIオーケストレーション |
| 600 | AIガバナンスとHITL |

---

## Design Principles

基本的な考え方は、

> **AIに何を任せるかだけでなく、何を任せないか、どこで人間が確認し、誰が最終判断を持つかまで設計する**

ことです。

AI出力については、

> **後工程で検証できる中間成果物は積極的に利用し、品質や責任に直結する判断は人間が検証する**

ことを基本原則としています。

---

## Case Studies

実務での生成AI活用やソフトウェア設計事例は、Zennで公開しています。

👉 [Zenn - nullcontroller](https://zenn.dev/nullcontroller)

### 3つのAIをオーケストレーションしたレガシー保守

GPT、GitHub Copilot、Microsoft 365 Copilotを役割分担させ、  
要件整理、既存コード調査、仕様化、実装、単体テストまでを一つの工程として設計した事例です。

👉 [Zenn Book](https://zenn.dev/nullcontroller/books/b9a9feaefb4001)

### レガシーシステムを「理解可能な状態」にする設計手法

仕様書が不足し、担当者も不在で、コードだけが残っているレガシーシステムを対象に、  
ソースコードから構造を復元し、PlantUMLやMarkdownを用いて理解可能・再利用可能な知識へ変換する設計手法を整理しています。

👉 [Zenn Book](https://zenn.dev/nullcontroller/books/db491398459cbc)


---

## Keywords

`LLM` `RAG` `Generative AI` `Applied AI` `HITL`  
`AI Architecture` `AI Orchestration` `AI Governance`  
`GitHub Copilot` `Microsoft 365 Copilot`  
`Software Architecture` `Legacy System`