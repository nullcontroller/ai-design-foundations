# Book Knowledge Coverage

監査日：2026-09-24

対象Book：『生成AIを業務へ組み込む設計原則 ― AI・人間・既存システムの責任をどう分けるか』

Publication本文は第4章・第5章として保存し、設計知識は更新可能なRosarium正本へ吸収した。`COMPLETE`は既存正本が同じ知識を十分に含むこと、`ABSORBED`は今回正本へ不足差分を追加したことを示す。

| Chapter | Source section | Knowledge | Rosarium destination | Status | Action |
|---|---|---|---|---|---|
| 4 | 「AIが回答したから」では説明にならない | 採用理由を組織が説明する | `foundations/applicability-and-delegation` / `evaluation-hitl/responsibility-and-hitl` | ABSORBED | 根拠・検証・採用・訂正の説明対象を明示 |
| 4 | AIが文章を生成した内部の理由は説明できない | モデル内部の完全説明と業務上の説明を分離 | `foundations/applicability-and-delegation` | ABSORBED | 説明対象をモデル内部ではなく採用判断へ限定 |
| 4 | 責任には、説明と対応の二つがある | 説明責任と是正・影響対応 | `evaluation-hitl/responsibility-and-hitl` | COMPLETE | Accountability、Incident Owner、是正の既存正本を確認 |
| 4 | 仕事によって、必要な説明の深さは異なる | Riskに応じた説明・確認深度 | `evaluation-hitl/responsibility-and-hitl` | COMPLETE | Risk TierとReview Packetの既存正本を確認 |
| 4 | 人間が確認しても、説明できるとは限らない | 名目的HITLを避ける | `evaluation-hitl/responsibility-and-hitl` | COMPLETE | 能力・情報・時間・権限とFalse Acceptの既存正本を確認 |
| 4 | 説明できない場合は、AIの役割を小さくする | 回答・判断から候補提示・検索・整理へ縮小 | `foundations/applicability-and-delegation` | ABSORBED | 段階的な役割縮小を追加 |
| 4 | AIに任せない条件を先に決める | 根拠不足・高影響・担当不在時の停止・移管 | `foundations/applicability-and-delegation` | ABSORBED | 非委任条件と正常な停止を追加 |
| 4 | 説明できる仕事だけを任せる | Explainable Delegation | `foundations/applicability-and-delegation` | ABSORBED | 委任条件として説明可能性を明記 |
| 4 | 次章 | Humanを置くだけでは足りないという第5章への接続 | `practices/education-and-capability` | ABSORBED | 三段階の論理接続を明示 |
| 5 | AIが簡単な仕事を引き受けると、人間には難しい仕事が残る | 件数減少と判断難度上昇 | `practices/education-and-capability` | ABSORBED | AI導入後に残る判断として追加 |
| 5 | 「AIが出した答えを確認する」だけでは足りない | 対象・版・根拠・影響の評価 | `practices/education-and-capability` | ABSORBED | 表面的な文章確認との差を追加 |
| 5 | 人間にも成長が必要になる | 問題定義・評価・比較・停止判断 | `practices/education-and-capability` | ABSORBED | 学習成果と判断能力へ統合 |
| 5 | 判断するためには、広い知識が必要になる | 確認点を知るための基礎知識 | `practices/education-and-capability` | ABSORBED | 業務・技術・Security・AI知識を明示 |
| 5 | AIが強くなるほど、人間の役割は上流へ移る | 作業から目的・要否判断へ | `practices/education-and-capability` | ABSORBED | 上流判断の節を追加 |
| 5 | AIを使う能力より、AIを使うか判断する能力 | AI・人間・既存Systemの配置判断 | `practices/education-and-capability` / `foundations/applicability-and-delegation` | ABSORBED | Ruleと生成AIの適用差を明示 |
| 5 | Human in the Loopには、判断できる人間が必要 | 知識・情報・時間・差戻し権限 | `practices/education-and-capability` / `evaluation-hitl/responsibility-and-hitl` | ABSORBED | 判断可能なHITL条件を正本化 |
| 5 | 人間の教育も、AI導入の一部になる | AI・System・Humanを一体で改善 | `practices/education-and-capability` | ABSORBED | 教育対象と運用更新へ統合 |
| 5 | AI時代に価値を持つのは「判断できる人」 | 採用・停止・委任を説明できる能力 | `practices/education-and-capability` | ABSORBED | 人間の能力要件として保持 |
| 5 | 人間も、AIと一緒に成長しなければならない | AI能力変化に応じた役割更新 | `practices/education-and-capability` | ABSORBED | 更新サイクルと能力形成へ統合 |
| 5 | 次章 | 精度だけでなく影響から委任範囲を決める | `foundations/applicability-and-delegation` | COMPLETE | 影響・可逆性・検証可能性による既存判断を確認 |

## 第3章から第5章への接続

```text
Knowledge Availability
↓
Explainable Delegation
↓
Human Judgment Capability
```

第3章の「必要なKnowledgeがなければ推測せず人間へ戻す」、第4章の「Knowledgeがあっても採用理由を説明できなければ最終判断を委任しない」、第5章の「人間が責任主体になるには判断能力と権限が必要」という接続を `practices/education-and-capability` に保存した。

## Result

- Chapter 4: 9 / 9 headings covered
- Chapter 5: 11 / 11 headings covered
- PARTIAL: 0
- ABSENT: 0
- CONFLICT: 0
