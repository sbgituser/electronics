"use client";

import { useState } from "react";
import type { ArticleMeta } from "@/lib/articles";
import { CATEGORIES, type CategoryKey } from "@/lib/categories";
import ArticleCard from "@/components/articles/ArticleCard";

interface Props {
  articles: ArticleMeta[];
  categories: typeof CATEGORIES;
}

export default function ArticlesClient({ articles }: Props) {
  const [active, setActive] = useState<CategoryKey | "all">("all");

  const filtered =
    active === "all"
      ? articles
      : articles.filter((a) => a.category === active);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-[#1a2332] mb-2 flex items-center gap-2.5">
        <div className="w-1 h-7 bg-[#00838F] rounded-full" />
        記事一覧
      </h1>
      <p className="text-gray-500 text-sm mb-8 ml-3.5">最新の技術解説・レビュー記事</p>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive("all")}
          className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
            active === "all"
              ? "bg-[#00838F] text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:border-[#00838F] hover:text-[#00838F]"
          }`}
        >
          すべて
        </button>
        {Object.entries(CATEGORIES).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setActive(key as CategoryKey)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
              active === key
                ? "bg-[#00838F] text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-[#00838F] hover:text-[#00838F]"
            }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          このカテゴリの記事はまだありません。
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
