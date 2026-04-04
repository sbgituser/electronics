import { getAllArticles, CATEGORIES } from "@/lib/articles";
import ArticlesClient from "./ArticlesClient";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "記事一覧",
  description: "電子工作とAIに関する入門記事をカテゴリ別にご覧いただけます。Arduino、Raspberry Pi、ESP32の比較・レビュー・基礎知識を初心者向けに解説。",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "記事一覧" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ArticlesClient articles={articles} categories={CATEGORIES} />
    </>
  );
}
