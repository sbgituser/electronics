import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { allRecipes, getRecipesByDifficulty } from "@/data/recipes";
import { SITE_URL } from "@/lib/site";
import type { RecipeDifficulty } from "@/types/recipe";
import { DIFFICULTY_CONFIG } from "@/types/recipe";
import RecipeCard from "@/components/recipes/RecipeCard";

const validLevels = [1, 2, 3] as const;

export function generateStaticParams() {
  return validLevels.map((level) => ({ level: String(level) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}): Promise<Metadata> {
  const { level } = await params;
  const num = Number(level) as RecipeDifficulty;
  const config = DIFFICULTY_CONFIG[num];
  if (!config) return {};
  const recipes = getRecipesByDifficulty(num);
  return {
    title: `${config.label} レシピ一覧 — 電子工作レシピブック`,
    description: `${config.description}の電子工作レシピ ${recipes.length}件。初心者でもステップバイステップで作れるプロジェクト集。`,
    alternates: {
      canonical: `${SITE_URL}/recipes/difficulty/${level}`,
    },
    openGraph: {
      title: `${config.label} レシピ一覧 | エレクトロニクス研究所`,
      description: `${config.description}のレシピ ${recipes.length}件`,
      url: `${SITE_URL}/recipes/difficulty/${level}`,
    },
  };
}

export default async function DifficultyPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const num = Number(level) as RecipeDifficulty;
  const config = DIFFICULTY_CONFIG[num];
  if (!config) notFound();

  const recipes = getRecipesByDifficulty(num);
  if (recipes.length === 0) notFound();

  const diffEmoji = ["", "🟢", "🟡", "🔴"][num];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "レシピ", item: `${SITE_URL}/recipes` },
      { "@type": "ListItem", position: 3, name: `${config.label}` },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-xs text-slate-400 mb-6 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-slate-600">ホーム</Link>
        <span>/</span>
        <Link href="/recipes" className="hover:text-slate-600">レシピ</Link>
        <span>/</span>
        <span className="text-slate-600">{config.label}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          {diffEmoji} {config.label} レシピ一覧
        </h1>
        <p className="text-slate-500 text-sm">{config.description} — {recipes.length} 件</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>

      <div className="pt-6 border-t border-slate-200 flex gap-4 flex-wrap">
        {validLevels
          .filter((l) => l !== num)
          .map((l) => (
            <Link
              key={l}
              href={`/recipes/difficulty/${l}`}
              className="text-blue-600 text-sm hover:underline"
            >
              {DIFFICULTY_CONFIG[l].label} を見る
            </Link>
          ))}
        <Link href="/recipes" className="text-blue-600 text-sm hover:underline">
          ← 全レシピに戻る
        </Link>
      </div>
    </div>
  );
}
