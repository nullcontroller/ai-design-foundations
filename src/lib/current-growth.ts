export const currentGrowth = [
  {
    title: "自然言語を業務システムの入口にする設計",
    summary:
      "自然言語から企業内Knowledgeと既存システムへ接続する際の、Context・根拠・実行境界を整理しています。",
    path: "ai-design/knowledge-context",
  },
  {
    title: "AIの責任境界と人間の判断",
    summary:
      "AIによる候補生成と、人間による採否判断、既存システムによる確定処理の境界を深めています。",
    path: "ai-design/responsibility-control",
  },
  {
    title: "LLMの確率的性質を設計へどう落とすか",
    summary:
      "条件付き確率、Temperature、ハルシネーションの理解を、業務上の制御と評価へ接続します。",
    path: "ai-mathematics",
  },
] as const;
