---
title: 用語・数式索引
kind: principle
section: foundations
status: evolving
tags:
  - foundations
published_at: null
source:
  type: wiki
  url: https://github.com/nullcontroller/ai-design-foundations/wiki/%E7%94%A8%E8%AA%9E%E3%83%BB%E6%95%B0%E5%BC%8F%E7%B4%A2%E5%BC%95
  original_type: wiki
  slug: 用語・数式索引
  topics: []
---
## 用語・数式索引

> 種別：参照資料 / 設計用語 / 数式索引  
> 適用対象：Wiki全体  
> 対象工程：設計 / 実装 / 評価 / 運用  
> 関連ページ：[生成AIの条件付き確率モデル基礎](/foundations/conditional-probability/)、[Instruction・Knowledge・Evidenceの責務分離](/knowledge-context/instruction-knowledge-evidence/)、[AI出力の責任境界とHITL](/evaluation-hitl/responsibility-and-hitl/)

### このページの目的

このWikiで繰り返し用いる用語と数式の意味を揃える。

同じ記号でも、個別ページでは対象に合わせて意味を置き直す場合がある。数式を利用するときは、この索引だけでなく、各ページに書かれた前提と記号定義を確認する。

このWikiでは、次の四つを区別する。

| 種類 | 意味 |
|---|---|
| 数学上の恒等式・定義 | 前提の下で数学的に成立する関係 |
| 評価指標 | 観測データから計算する値 |
| 説明モデル | 複雑な系の関係を単純化した式 |
| 設計仮説 | 実装と評価によって確かめる主張 |

説明モデルは性能保証ではない。

---

### 基本用語

| 用語 | このWikiでの意味 |
|---|---|
| AI | 入力から分類、予測、生成、推薦などを行うモデルまたは機能の総称 |
| 言語モデル | 文脈を条件としてToken系列の確率分布を扱うモデル |
| AIシステム | モデルだけでなく、入力、Knowledge、検索、Tool、検証、承認、実行、監視を含む系 |
| Agent | モデル、Tool、状態、停止条件をWorkflowで接続した実行Loop |
| Workflow | Taskと状態遷移、担当、入力、出力、停止、例外処理を定義した工程 |
| Orchestrator | Taskの割当て、受渡し、再試行、停止、統合を制御する構成要素 |
| Artifact | AIや人間、Systemが工程間で受け渡す成果物 |
| Provenance | 成果物の由来。入力、根拠、作成者、版、時刻、処理履歴を含む |

---

### Context・Knowledge・Evidence

| 用語 | 意味 | 例 |
|---|---|---|
| Input | 今回の処理要求や観測値 | 質問、変更要求、対象ID |
| Instruction | 役割、Task、制約、出力契約 | 回答範囲、JSON Schema |
| Context | 一回の処理でモデルが実際に参照できる情報 | Instruction、履歴、検索結果、Tool結果 |
| Knowledge | 組織やDomainで再利用する知識資産 | 規程、仕様、用語、例外 |
| Retrieved Evidence | 今回の入力に対して検索され、根拠候補として渡された情報 | 文書断片、コード箇所、検索結果 |
| Canonical Knowledge | 事実、版、責任主体を管理する正本 |
| Human View | 人間の理解に合わせた説明、図、例、判断理由 |
| AI Access Layer | AIが検索・識別・適用しやすい構造、索引、Metadata |

Knowledgeが存在しても、今回のContextへ正しく組み込まれなければ生成条件にはならない。

Retrieved Evidenceは検索された根拠候補であり、検索された時点で正しいと確定した事実ではない。

---

### 制御・検証・責任

| 用語 | 意味 |
|---|---|
| Soft Constraint | 違反量や優先度を比較できる望ましい条件 |
| Hard Constraint | 違反した出力を受理・実行してはいけない条件 |
| Validation | Schema、型、範囲、権限など、定義済み条件への適合確認 |
| Verification | 出力内容が根拠、仕様、期待結果と整合するかの確認 |
| Approval | 権限者が業務上の採用・実行を確定する行為 |
| Guardrail | 生成前の誘導、生成時制約、出力検証、実行制御を含む多層統制 |
| HITL | AIから人間へ制御・判断・承認を戻す条件と手続きを持つ設計 |
| Rollback | 実行後の変更を、安全が確認された状態へ戻す処理 |

#### Capability・Authority・Accountability

$$
Capability \neq Authority \neq Accountability
$$

| 用語 | 意味 |
|---|---|
| Capability | 技術的に処理できる能力 |
| Authority | 処理を実行・確定してよい権限 |
| Accountability | 結果を説明し、是正する責任 |

AIへCapabilityを与えても、AuthorityとAccountabilityが自動的に移るわけではない。

#### 出力状態

| 状態 | 意味 |
|---|---|
| Generated | AIが候補を生成した |
| Evidence Linked | 根拠と由来が関連付いた |
| Validated | 定義済みの機械検証を通過した |
| Reviewed | 人間または独立した検証工程が確認した |
| Approved | 権限者が業務利用を確定した |
| Executed | 外部または業務Systemへ反映した |
| Monitored | 実行後の結果を観測している |

`Generated`と`Approved`は同じ状態ではない。

---

### 確率モデルの基本式

#### 条件付き出力分布

$$
P(Y\mid X,C,I,M,D)
$$

| 記号 | 意味 |
|---|---|
| $X$ | 利用者入力・処理対象 |
| $C$ | Context |
| $I$ | Instruction・制約 |
| $M$ | モデル |
| $D$ | Temperature、top-pなどの生成条件 |
| $Y$ | 生成出力 |

これは、出力がモデル単体ではなく、複数の条件に依存することを示す説明モデルである。

#### 自己回帰分解

$$
P(Y\mid C)
=
\prod_{t=1}^{T}P(y_t\mid y_{<t},C)
$$

系列全体の確率を、各Tokenの条件付き確率の積として表す。モデルが完成済みの回答候補を一覧から一つ選ぶ、という意味ではない。

#### Temperature付きsoftmax

$$
P(y_t=i)
=
\frac{\exp(z_i/T)}{\sum_j\exp(z_j/T)}
$$

$z_i$はlogit、$T>0$はTemperatureである。TemperatureはToken分布の形を変えるが、事実性や安全性を直接保証しない。

#### RAGの二段階モデル

$$
P(Y\mid X)
=
\sum_Z P(Z\mid X)P(Y\mid X,Z)
$$

$Z$は検索された文書または根拠候補である。検索失敗と、正しい根拠を渡した後の生成失敗を分けて考えるための簡略モデルである。

---

### Riskと工程連鎖

#### Riskの簡略モデル

$$
Risk=P(error)\times Impact
$$

同じ誤り確率でも、誤りの影響が異なれば必要な統制は異なる。実務では検出可能性、可逆性、露出量、復旧費用なども含めて拡張する。

#### 工程成功の連鎖律

工程 $i$ が成功する事象を $S_i$ とすると、全工程が成功する確率は次のように分解できる。

$$
P\left(\bigcap_{i=1}^{n}S_i\right)
=
\prod_{i=1}^{n}
P\left(S_i\mid\bigcap_{j=1}^{i-1}S_j\right)
$$

各工程が独立で、成功確率がすべて同じ $p$ である場合だけ、次の簡略式になる。

$$
P(\text{all correct})=p^n
$$

$p^n$を実システムの品質予測へそのまま使わない。

#### 誤答が採用される確率

誤答生成を $H$、検出を $D$、採用を $A$ とすると、次のように分解できる。

$$
P(H\cap\neg D\cap A)
=
P(H)P(\neg D\mid H)P(A\mid H,\neg D)
$$

制御対象は、誤答生成率だけではない。検出と、未検出出力を採用・実行させない工程も含む。

---

### 回答範囲と選択的予測

回答した件数を $N_{answer}$、全件数を $N$ とする。

$$
Coverage
=
\frac{N_{answer}}{N}
$$

回答した集合における誤り率をSelective Riskとする。

$$
Selective\ Risk
=
\frac{N_{error\ within\ answer}}{N_{answer}}
$$

Coverageを下げれば常に業務価値が上がるわけではない。誤答、過剰拒否、移管費用を合わせて評価する。

| 指標 | 定義 |
|---|---|
| FAR | $P(accept\mid unsafe)$ |
| FRR | $P(reject\mid safe)$ |
| Recall@k | 正解根拠のうち上位 $k$ 件へ取得できた割合 |
| Precision@k | 上位 $k$ 件のうち関連根拠であった割合 |
| Groundedness | 出力中の主張が提示根拠で支持される度合い |

---

### 期待損失

失敗種別を $F_k$、影響を $I_k$ とすると、期待損失を次のように置ける。

$$
\mathbb{E}[L]
=
\sum_k P(F_k)I_k
$$

実システムでは、誤答だけでなく、拒否、Latency、Token、Human Review、停止、事故対応の費用も含める。

この式は、どの損失を含め、どの重みを与えるかを明示するための設計モデルである。

---

### 記号を読むときの注意

1. 条件を省略した式は、前後の本文で補う。
2. 独立性を仮定した式は、実測値へ直結させない。
3. Model内部の確率と、運用上の頻度を混同しない。
4. 一つの平均値だけで、Domain別・Risk別の差を隠さない。
5. 数式が精密でも、観測可能な指標と責任主体がなければ運用できない。

---

### 関連ページ

- [生成AIの条件付き確率モデル基礎](/foundations/conditional-probability/)
- [ハルシネーションの多層制御設計](/foundations/layered-hallucination-controls/)
- [なぜ回答範囲を制限した方がよいのか](/foundations/answer-scope/)
- [QAチャット評価設計思想](/evaluation-hitl/qa-evaluation/)
- [AI出力の責任境界とHITL](/evaluation-hitl/responsibility-and-hitl/)
