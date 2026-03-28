import type { Metadata } from "next";
import { allParts } from "@/data/parts";
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
      <PartFilter parts={allParts} />
    </div>
  );
}
