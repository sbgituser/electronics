import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import CategoryBadge from "@/components/articles/CategoryBadge";

export default function RelatedArticles({
  articles,
}: {
  articles: ArticleMeta[];
}) {
  if (articles.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="font-bold text-[#1a2332] mb-4 text-lg flex items-center gap-2.5">
        <div className="w-1 h-5 bg-[#00838F] rounded-full" />
        関連記事
      </h2>
      <div className="flex flex-col gap-3">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/articles/${a.slug}`}
            className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-1">
              <CategoryBadge category={a.category} />
              <span className="text-xs text-gray-400">{a.readingTime}</span>
            </div>
            <p className="font-semibold text-[#1a2332] text-sm group-hover:text-[#00838F] transition-colors">
              {a.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
