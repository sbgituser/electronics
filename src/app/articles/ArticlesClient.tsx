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
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">記事一覧</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === "all"
              ? "bg-slate-800 text-white"
              : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
          }`}
        >
          すべて
        </button>
        {Object.entries(CATEGORIES).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setActive(key as CategoryKey)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              active === key
                ? "bg-slate-800 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
            }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-400 text-center py-10">
          このカテゴリの記事はまだありません。
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
