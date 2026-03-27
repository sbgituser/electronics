import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticleSlugs, getArticleBySlug, getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";
import CategoryBadge from "@/components/articles/CategoryBadge";
import ProductCard from "@/components/common/ProductCard";

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `${SITE_URL}/articles/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${SITE_URL}/articles/${slug}`,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = getAllArticles();
  const related = allArticles
    .filter((a) => a.category === article.category && a.slug !== slug)
    .slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* パンくずリスト */}
      <nav className="text-xs text-slate-400 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-slate-600">ホーム</Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-slate-600">記事</Link>
        <span>/</span>
        <span className="text-slate-600 truncate">{article.title}</span>
      </nav>

      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge category={article.category} />
          <span className="text-xs text-slate-400">{article.readingTime}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-3">
          {article.title}
        </h1>
        <p className="text-slate-500 text-sm">{article.description}</p>
        <p className="text-slate-400 text-xs mt-2">{article.date}</p>
      </div>

      {/* 本文 */}
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* 商品カード */}
      {article.products && article.products.length > 0 && (
        <div className="mt-10">
          <h2 className="font-bold text-slate-800 mb-4 text-lg">
            この記事で紹介した商品
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {article.products.map((p) => (
              <ProductCard
                key={p.asin}
                asin={p.asin}
                name={p.name}
                price={p.price}
              />
            ))}
          </div>
        </div>
      )}

      {/* 関連記事 */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-bold text-slate-800 mb-4 text-lg">関連記事</h2>
          <div className="flex flex-col gap-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CategoryBadge category={a.category} />
                  <span className="text-xs text-slate-400">{a.readingTime}</span>
                </div>
                <p className="font-semibold text-slate-800 text-sm">{a.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-slate-200">
        <Link href="/articles" className="text-blue-600 text-sm hover:underline">
          ← 記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
