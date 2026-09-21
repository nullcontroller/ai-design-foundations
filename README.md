# AI Design Foundations

AIを業務システムへ組み込むための、個人の設計体系・技術知識・実務事例です。
MarkdownをGitで管理し、レビュー・検証を経てAstroから静的HTMLを生成します。

**[設計体系を読む](https://nullcontroller.github.io/ai-design-foundations/)**

中心テーマ：Applied AI / System Architecture / Knowledge・Context / Evaluation・HITL / AI-Assisted Software Engineering / AI System Lifecycle。
既存システムの改善・モダナイゼーションは、設計原則を適用した実務事例として扱います。

## Authoring

Node.js 24を使用します。

```sh
npm ci
npm run dev
npm run check
npm test
npm run build
```

[執筆ガイド](docs/authoring-guide.md)にfront matter、Markdown拡張、Series、公開手順をまとめています。
`master`へのpushでGitHub Actionsが検証・ビルド・Pagesデプロイを行います。

## Repository

- `src/content/` — 8領域のMarkdown原文
- `src/components/`, `src/layouts/`, `src/styles/` — 文書UIと意味ブロック
- `src/pages/` — トップ・カテゴリ・本文・検索
- `public/assets/` — ローカル配信する画像
- `migration/` — Zenn・Wikiの台帳、URL対応表、移行報告
- `scripts/` — 移行・完全性・リンク検証
- `.github/workflows/` — `master`用Pages CI/CD

## Sources / Author

[Zenn](https://zenn.dev/nullcontroller)は独立した公開チャネルとして継続します。移行Zennページのcanonicalは当面Zennです。
[既存Wiki](https://github.com/nullcontroller/ai-design-foundations/wiki)と旧READMEの本文は、内容を統合せずサイトへ移行しています。

著者の経歴・希望条件は別サイトの[Career Profile](https://nullcontroller.github.io/career-profile/)に掲載しています。

[移行報告](migration/report.md) / [Zenn URL対応表](migration/zenn-migration-map.md)
