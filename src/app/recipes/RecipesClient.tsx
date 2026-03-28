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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-[#1a2332] mb-2 flex items-center gap-2.5">
        <div className="w-1 h-7 bg-emerald-500 rounded-full" />
        レシピブック
      </h1>
      <p className="text-gray-500 text-sm mb-8 ml-3.5">
        電子工作のレシピ集。公式チュートリアルをベースに、初心者向けにまとめました。
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive("all")}
          className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${active === "all" ? "bg-[#00838F] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#00838F] hover:text-[#00838F]"}`}
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
              className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${active === d ? "bg-[#00838F] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#00838F] hover:text-[#00838F]"}`}
            >
              {conf.label}（{count}件）
            </button>
          );
        })}
      </div>

      {active !== "all" && (
        <p className="text-xs text-gray-400 mb-4 ml-0.5">
          {DIFFICULTY_CONFIG[active as RecipeDifficulty].description}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r) => (
          <RecipeCard key={r.slug} recipe={r} />
        ))}
      </div>
    </div>
  );
}
