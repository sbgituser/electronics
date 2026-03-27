import type { ArticleMeta } from "@/lib/articles";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }: { articles: ArticleMeta[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {articles.map((a) => (
        <ArticleCard key={a.slug} article={a} />
      ))}
    </div>
  );
}
