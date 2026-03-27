import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import CategoryBadge from "./CategoryBadge";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 mb-2">
        <CategoryBadge category={article.category} />
        <span className="text-xs text-slate-400">{article.readingTime}</span>
      </div>
      <h3 className="font-bold text-slate-800 text-base leading-snug mb-2 line-clamp-2">
        {article.title}
      </h3>
      <p className="text-slate-500 text-sm line-clamp-2">{article.description}</p>
      <p className="text-slate-400 text-xs mt-3">{article.date}</p>
    </Link>
  );
}
