import Link from "next/link";
import type { Recipe } from "@/types/recipe";
import DifficultyBadge from "./DifficultyBadge";
import { ChevronRight, Clock, Cpu } from "lucide-react";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col">
      {/* 難易度カラーバー */}
      <div className={`h-1 ${
        recipe.difficulty === 1 ? "bg-emerald-500" :
        recipe.difficulty === 2 ? "bg-amber-500" :
        "bg-rose-500"
      }`} />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <DifficultyBadge difficulty={recipe.difficulty} />
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {recipe.estimatedMinutes}分
            </span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              {recipe.board}
            </span>
          </div>
        </div>
        <h3 className="font-bold text-[#1a2332] text-sm leading-snug mb-2 line-clamp-2 flex-1">
          {recipe.title}
        </h3>
        <p className="text-gray-500 text-xs line-clamp-2 mb-4 leading-relaxed">{recipe.description}</p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">
              パーツ {recipe.parts.length}点
            </span>
            {recipe.verified && (
              <span className="text-[11px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                公式準拠
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-400 truncate">
            {recipe.sourceName}
          </span>
          <Link
            href={`/recipes/${recipe.slug}`}
            className="text-xs text-[#00838F] hover:text-[#006064] font-medium whitespace-nowrap ml-2 flex items-center gap-0.5 transition-colors"
          >
            詳しく見る
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
