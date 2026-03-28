import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticleSlugs, getArticleBySlug, getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";
import CategoryBadge from "@/components/articles/CategoryBadge";
import ProductCard from "@/components/common/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const ogImageUrl = `${SITE_URL}/og/articles/${slug}.png`;
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
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImageUrl],
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "kuras-plus",
      url: "https://kuras-plus.com",
    },
    publisher: {
      "@type": "Organization",
      name: "kuras-plus",
      url: "https://kuras-plus.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/articles/${article.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "記事一覧", item: `${SITE_URL}/articles` },
      { "@type": "ListItem", position: 3, name: article.title },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* パンくずリスト */}
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-[#00838F] transition-colors">ホーム</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/articles" className="hover:text-[#00838F] transition-colors">記事</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600 truncate">{article.title}</span>
      </nav>

      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge category={article.category} />
          <span className="text-xs text-gray-400">{article.readingTime}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1a2332] leading-tight mb-3">
          {article.title}
        </h1>
        <p className="text-gray-500 text-sm">{article.description}</p>
        <p className="text-gray-400 text-xs mt-2">{article.date}</p>
      </div>

      {/* 本文 */}
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* 商品カード */}
      {article.products && article.products.length > 0 && (
        <div className="mt-10">
          <h2 className="font-bold text-[#1a2332] mb-4 text-lg flex items-center gap-2.5">
            <div className="w-1 h-5 bg-[#FF6D00] rounded-full" />
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
          <h2 className="font-bold text-[#1a2332] mb-4 text-lg flex items-center gap-2.5">
            <div className="w-1 h-5 bg-[#00838F] rounded-full" />
            関連記事
          </h2>
          <div className="flex flex-col gap-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CategoryBadge category={a.category} />
                  <span className="text-xs text-gray-400">{a.readingTime}</span>
                </div>
                <p className="font-semibold text-[#1a2332] text-sm group-hover:text-[#00838F] transition-colors">{a.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-gray-200">
        <Link href="/articles" className="inline-flex items-center text-[#00838F] text-sm hover:text-[#006064] font-medium transition-colors">
          <ChevronLeft className="w-4 h-4" />
          記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
