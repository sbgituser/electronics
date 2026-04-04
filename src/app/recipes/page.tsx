import type { Metadata } from "next";
import { allRecipes } from "@/data/recipes";
import RecipesClient from "./RecipesClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "レシピブック",
  description: "電子工作のレシピ集。初級から上級まで、ステップバイステップで作れるプロジェクトをご紹介。Lチカ、温度計、サーボ制御など。",
  alternates: { canonical: `${SITE_URL}/recipes` },
  openGraph: {
    title: "レシピブック | エレクトロニクス研究所",
    description: "電子工作のレシピ集。初級から上級まで、ステップバイステップで作れるプロジェクトをご紹介。Lチカ、温度計、サーボ制御など。",
    url: `${SITE_URL}/recipes`,
  },
};

export default function RecipesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "レシピブック" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <RecipesClient recipes={allRecipes} />
    </>
  );
}
