import type { Metadata } from "next";
import Link from "next/link";
import { allParts } from "@/data/parts";
import { categoryGuides } from "@/data/parts/categories";
import PartFilter from "@/components/parts/PartFilter";

export const metadata: Metadata = {
  title: "パーツ辞典",
  description: "電子工作で使うパーツを初心者向けに整理。センサー、モーター、LED、ボードのスペックと選び方を解説します。",
};

export default function PartsDatabasePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
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
