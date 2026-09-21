---
summary: "暗号処理と異常系の見直しを、GPT・GitHub Copilot・Microsoft 365 Copilotの役割分担で進めた実務事例。要件整理から仕様化・実装・単体テストまでの工程と、人間が保持した判断責任を示す。"
layer: publication
title: 3つのAIをオーケストレーションしたレガシー保守
kind: case
section: cases
status: evolving
tags: &a1
  - ソフトウェア設計
  - 生成ai
  - オーケストレーション
  - hitl
  - 保守開発
published_at: null
canonical: https://zenn.dev/nullcontroller/books/b9a9feaefb4001
source:
  type: zenn
  original_type: book
  slug: b9a9feaefb4001
  book_slug: b9a9feaefb4001
  chapter_slug: null
  url: https://zenn.dev/nullcontroller/books/b9a9feaefb4001
  published_at: null
  publication_month: 2026-08
  topics: *a1
  zenn_type: null
  metadata:
    title: 3つのAIをオーケストレーションしたレガシー保守
    summary: |-
      本書では、CRA対応に伴うセキュリティ要件の強化を契機として、レガシーシステムの暗号処理と異常系を見直した事例を扱う。

      既存システムでは、暗号化したパスワードをレジストリへ保存し、利用時に復号していた。暗号方式をCNG APIおよびDPAPIへ変更したことで、暗号APIのエラー処理が生じた。また、レジストリ値の破損、読出し失敗といった異常系も整理する必要があり、完全化保守を行う事になった。

      そこで、GitHub Copilot、GPT、Microsoft 365 Copilotを役割分担させた。

      GPT：制約条件と要件案の整理、PlantUML作成
      GitHub Copilot：コード調査、実現方法の具体化、コード修正
      Microsoft 365 Copilot：検討結果のExcel仕様書化

      時には、PlantUMLで動的構造を補完するなど、AIの特性を生かした補完を用いた。
      サブ審議で承認を得た後、関数単位で実装と単体テストを進めた。

      その結果、開発工数の兼ね合いから従来委託していた外部委託を不要とし、
      想定開発期間も7割短縮できた。

      本書で扱うのは、AIへの丸投げではない。人間が前提と判断基準を定め、AIの出力をリスクに応じて利用しながら、要件検討から仕様化、実装、承認までをつなぐ方法である。
    topics: *a1
    published: true
    price: 0
    toc_depth: 2
    chapters:
      - c90225
      - e68b04
      - "49e444"
      - 40f445
      - b2b1c6
      - 147fb6
      - c8af5c
series: three-ai-maintenance
series_title: 3つのAIをオーケストレーションしたレガシー保守
order: 0
cover: /assets/imported/zenn/b9a9feaefb4001-cover.jpg
---
本書では、CRA対応に伴うセキュリティ要件の強化を契機として、レガシーシステムの暗号処理と異常系を見直した事例を扱う。

既存システムでは、暗号化したパスワードをレジストリへ保存し、利用時に復号していた。暗号方式をCNG APIおよびDPAPIへ変更したことで、暗号APIのエラー処理が生じた。また、レジストリ値の破損、読出し失敗といった異常系も整理する必要があり、完全化保守を行う事になった。

そこで、GitHub Copilot、GPT、Microsoft 365 Copilotを役割分担させた。

GPT：制約条件と要件案の整理、PlantUML作成
GitHub Copilot：コード調査、実現方法の具体化、コード修正
Microsoft 365 Copilot：検討結果のExcel仕様書化

時には、PlantUMLで動的構造を補完するなど、AIの特性を生かした補完を用いた。
サブ審議で承認を得た後、関数単位で実装と単体テストを進めた。

その結果、開発工数の兼ね合いから従来委託していた外部委託を不要とし、
想定開発期間も7割短縮できた。

本書で扱うのは、AIへの丸投げではない。人間が前提と判断基準を定め、AIの出力をリスクに応じて利用しながら、要件検討から仕様化、実装、承認までをつなぐ方法である。
