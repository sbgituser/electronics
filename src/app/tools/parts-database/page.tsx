import type { Metadata } from "next";
import Link from "next/link";
import { allParts } from "@/data/parts";
import { categoryGuides } from "@/data/parts/categories";
import PartFilter from "@/components/parts/PartFilter";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "パーツ辞典",
  description: "電子工作で使うパーツを初心者向けに整理。センサー、モーター、LED、ボードのスペックと選び方を解説します。",
  alternates: { canonical: `${SITE_URL}/tools/parts-database` },
  openGraph: {
    title: "パーツ辞典 | エレクトロニクス研究所",
    description: "電子工作で使うパーツを初心者向けに整理。センサー、モーター、LED、ボードのスペックと選び方を解説します。",
    url: `${SITE_URL}/tools/parts-database`,
  },
};

export default function PartsDatabasePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "ツール", item: `${SITE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: "パーツ辞典" },
        ],
      },
      {
        "@type": "ItemList",
        name: "電子工作パーツ辞典",
        numberOfItems: allParts.length,
        itemListElement: allParts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: `${SITE_URL}/tools/parts-database/${p.id}`,
        })),
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* パンくずリスト */}
      <nav className="text-xs text-slate-400 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-slate-600">ホーム</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-slate-600">ツール</Link>
        <span>/</span>
        <span className="text-slate-600">パーツ辞典</span>
      </nav>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">📋 パーツ辞典</h1>
        <p className="text-slate-500 text-sm">
          電子工作で使うパーツを初心者向けに整理しました。カテゴリから探すか、キーワードで検索できます。
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {categoryGuides.map((g) => (
          <Link
            key={g.id}
            href={`/tools/parts-database/category/${g.id}`}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-slate-400 transition-colors text-slate-600"
          >
            <span>{g.emoji}</span>
            <span>{g.name}とは？</span>
          </Link>
        ))}
      </div>
      <PartFilter parts={allParts} />
    </div>
  );
}
