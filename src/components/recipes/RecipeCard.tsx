import Link from "next/link";
import type { Recipe } from "@/types/recipe";
import DifficultyBadge from "./DifficultyBadge";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <DifficultyBadge difficulty={recipe.difficulty} />
        <span className="text-xs text-slate-400">{recipe.estimatedMinutes}分</span>
        <span className="text-xs text-slate-400">/ {recipe.board}</span>
      </div>
      <h3 className="font-bold text-slate-800 text-sm leading-snug mb-2 line-clamp-2 flex-1">
        {recipe.title}
      </h3>
      <p className="text-slate-500 text-xs line-clamp-2 mb-3">{recipe.description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-slate-400">
          パーツ {recipe.parts.length}点
        </span>
        <div className="flex items-center gap-2">
          {recipe.verified && (
            <span className="text-xs text-green-600 font-medium">✅ 公式準拠</span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-slate-400 truncate">
          📎 {recipe.sourceName}
        </span>
        <Link
          href={`/recipes/${recipe.slug}`}
          className="text-xs text-blue-600 hover:underline whitespace-nowrap ml-2"
        >
          詳しく見る →
        </Link>
      </div>
    </div>
  );
}
