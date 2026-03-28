import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import CategoryBadge from "./CategoryBadge";
import { ChevronRight } from "lucide-react";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      {/* カテゴリカラーバー */}
      <div className="h-1 bg-gradient-to-r from-[#00838F] to-[#4DB6AC]" />

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge category={article.category} />
          <span className="text-xs text-gray-400">{article.readingTime}</span>
        </div>
        <h3 className="font-bold text-[#1a2332] text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-[#00838F] transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{article.description}</p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <span className="text-gray-400 text-xs">{article.date}</span>
          <span className="text-[#00838F] text-xs font-medium flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            読む <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
