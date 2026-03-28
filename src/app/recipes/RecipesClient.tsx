"use client";

import { useState } from "react";
import type { Recipe, RecipeDifficulty } from "@/types/recipe";
import { DIFFICULTY_CONFIG } from "@/types/recipe";
import RecipeCard from "@/components/recipes/RecipeCard";

interface Props {
  recipes: Recipe[];
}

export default function RecipesClient({ recipes }: Props) {
  const [active, setActive] = useState<RecipeDifficulty | "all">("all");

  const filtered =
    active === "all" ? recipes : recipes.filter((r) => r.difficulty === active);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">🔨 レシピブック</h1>
      <p className="text-slate-500 text-sm mb-8">
        電子工作のレシピ集。公式チュートリアルをベースに、初心者向けにまとめました。
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${active === "all" ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"}`}
        >
          すべて（{recipes.length}件）
        </button>
        {([1, 2, 3] as RecipeDifficulty[]).map((d) => {
          const conf = DIFFICULTY_CONFIG[d];
          const count = recipes.filter((r) => r.difficulty === d).length;
          return (
            <button
              key={d}
              onClick={() => setActive(d)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${active === d ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"}`}
            >
              {conf.label}（{count}件）
            </button>
          );
        })}
      </div>

      {active !== "all" && (
        <p className="text-xs text-slate-400 mb-4">
          {DIFFICULTY_CONFIG[active as RecipeDifficulty].description}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((r) => (
          <RecipeCard key={r.slug} recipe={r} />
        ))}
      </div>
    </div>
  );
}
