# エレクトロニクス研究所 — CLAUDE.md

## プロジェクト概要

- サイト: electronics.kuras-plus.com
- テーマ: 電子工作×フィジカルAI情報サイト（完全初心者向け）
- コンセプト: 「素人の自分が電子工作×AIを始めてみた」
- ターゲット: 電子工作の完全初心者

## 技術スタック

- **フレームワーク**: Next.js 16.1.6（React 19）
- **言語**: TypeScript strict
- **スタイリング**: Tailwind CSS v4
- **ホスティング**: Cloudflare Pages（SSG / Static Export）
- **記事管理**: Markdown（gray-matter + marked）
- **books-tools と同一の技術構成**

## ディレクトリ構成

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 共通レイアウト（Header + Footer含む）
│   ├── page.tsx            # トップページ
│   ├── globals.css
│   ├── articles/           # 記事ページ
│   ├── tools/              # ツールページ
│   │   └── board-picker/   # 開発ボード診断ツール
│   ├── about/
│   ├── privacy/
│   ├── contact/
│   ├── sitemap.ts
│   └── robots.ts
├── components/             # UIコンポーネント
├── lib/
│   ├── site.ts             # サイト設定・Amazon URL生成
│   └── articles.ts         # 記事データ取得
├── content/articles/       # Markdown記事ファイル
├── data/                   # boards.ts, products.ts
└── types/index.ts
```

## ビルドとデプロイ

```bash
npm run build         # out/ ディレクトリに静的ファイル生成
npx wrangler pages deploy out --project-name=electronics  # Cloudflare Pagesへ直接デプロイ
```

Git push → Cloudflare Pages 自動デプロイも設定済み（production branch: master）

## Git 運用

- ブランチ: **master**（mainではない）
- プッシュで Cloudflare Pages 自動デプロイ

## 記事の追加方法

1. `src/content/articles/` に `.md` ファイルを追加
2. フロントマター形式:
```yaml
---
title: "記事タイトル"
description: "記事の概要（SEO用）"
date: "YYYY-MM-DD"
category: "compare | review | basics | project | ai"
tags: ["タグ1", "タグ2"]
products:
  - asin: "XXXXXXXXXX"
    name: "商品名"
    price: "¥X,XXX前後"
---
```
3. `npm run build` でビルド確認
4. `git push origin master`

## Amazon アフィリエイト

```typescript
import { buildAmazonUrl } from "@/lib/site";
const url = buildAmazonUrl("ASIN文字列"); // tag=kurasplus-22 が自動付与
```

## 環境変数

- `NEXT_PUBLIC_GA_ID`: Google Analytics 計測ID（未設定でGA無効）

## コーディング規約

- TypeScript strict モード
- Tailwind CSS v4 ユーティリティクラス使用
- `@/*` パスエイリアス（`src/` を指す）
- "use client" は必要な場合のみ（データフェッチはサーバーコンポーネントで）
- Amazon リンクは必ず `buildAmazonUrl(asin)` を使用
- `rel="nofollow noopener noreferrer"` を外部リンクに付与

## 環境制約

- Windows 11 Home、PowerShell
- Git ブランチは master（mainではない）
- npm はローカルで実行
