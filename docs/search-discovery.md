# Search and discovery

RosariumはGitHub Pages上の静的サイトです。検索エンジン向けの公開情報は、`astro.config.mjs`の`site`と`base`を基点に生成します。

## 自動生成する公開情報

- `sitemap.xml` — index可能な公開ページ。Search、404、draft、非公開ページは含めない
- `robots.txt` — Crawlを許可し、Sitemapの絶対URLを通知
- `feed.xml` — Articles、Books、Series、EssaysのRSS 2.0 Feed
- `feed.json` — RSSと同じ公開物を扱うJSON Feed 1.1
- `opensearch.xml` — `/search/?q=`へ接続する軽量な検索定義
- `llms.txt` — 主要入口を示す任意のHuman-readable Index

`llms.txt`は標準SEO仕様ではなく、検索順位やAIによる利用を保証しません。低コストな補助的Discovery Fileとして公開します。

## Google Search Console

1. Search ConsoleでURL-prefix Property `https://nullcontroller.github.io/ai-design-foundations/`を追加する
2. HTML tag方式のVerification Tokenだけを取得する
3. GitHub RepositoryのSettings → Secrets and variables → Actions → Variablesへ`PUBLIC_GOOGLE_SITE_VERIFICATION`を登録する
4. `master`のPages Workflowを再実行する
5. 公開HTMLの`google-site-verification` meta tagを確認してVerifyする
6. `https://nullcontroller.github.io/ai-design-foundations/sitemap.xml`を送信する
7. 重要ページをURL Inspectionで確認する

Tokenは公開される値なのでRepository Variableを使用します。値が未設定ならmeta tagは生成しません。

## Bing Webmaster Tools

1. Bing Webmaster ToolsへSiteを追加する
2. Google Search ConsoleからImportするか、HTML meta tagのTokenを取得する
3. GitHub Actions Variable `PUBLIC_BING_SITE_VERIFICATION`へTokenを登録する
4. Pagesを再Deployし、公開HTMLの`msvalidate.01` meta tagを確認する
5. Sitemapを送信する

Tokenを推測したりRepositoryへ固定値としてCommitしたりしません。

## Canonicalと将来の独自Domain

Canonical、OG URL、JSON-LD、Sitemap、Feed、robots、OpenSearchは`Astro.site`から生成します。将来Domainを変更する場合は、まず`astro.config.mjs`の`site`と必要に応じて`base`を変更し、Build-time Validationで旧URLの残存を確認します。

## Publication方針

### Existing Zenn

既存ContentとDiscovery入口として保持します。移行元情報はRepository内部のmetadataとmigration台帳で追跡します。

### New Content

RosariumをCanonicalかつPrimary Publicationとして公開します。

### Duplicate Posting

同じ本文を複数Siteへ無秩序に複製しません。別媒体では要約や導線を使い、正本を明確にします。

### Discovery

Google、Bing、LinkedIn、GitHub、RSS、Topic Hub、Internal Linkを組み合わせて自前の流入経路を育てます。
