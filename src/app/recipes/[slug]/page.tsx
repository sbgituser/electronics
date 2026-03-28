import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { allRecipes, getRecipeBySlug } from "@/data/recipes";
import { SITE_URL } from "@/lib/site";
import DifficultyBadge from "@/components/recipes/DifficultyBadge";
import PartsList from "@/components/recipes/PartsList";

export async function generateStaticParams() {
  return allRecipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return {};
  return {
    title: recipe.title,
    description: recipe.description,
    alternates: { canonical: `${SITE_URL}/recipes/${slug}` },
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const related = allRecipes.filter(
    (r) => r.slug !== slug && recipe.relatedRecipes?.includes(r.slug)
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* パンくず */}
      <nav className="text-xs text-slate-400 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-slate-600">ホーム</Link>
        <span>/</span>
        <Link href="/recipes" className="hover:text-slate-600">レシピ</Link>
        <span>/</span>
        <span className="text-slate-600 truncate">{recipe.title}</span>
      </nav>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <DifficultyBadge difficulty={recipe.difficulty} />
          <span className="text-xs text-slate-400">約{recipe.estimatedMinutes}分</span>
          <span className="text-xs text-slate-400">/ {recipe.board}</span>
          {recipe.verified && (
            <span className="text-xs text-green-600 font-medium">✅ 公式準拠</span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">{recipe.title}</h1>
        <p className="text-slate-600 text-sm">{recipe.description}</p>
      </div>

      {/* 必要パーツ */}
      <section className="mb-8">
        <h2 className="font-bold text-slate-800 text-lg mb-4">必要なパーツ</h2>
        <PartsList parts={recipe.parts} />
      </section>

      {/* 学べるスキル */}
      <section className="mb-8">
        <h2 className="font-bold text-slate-800 text-lg mb-3">学べるスキル</h2>
        <div className="flex flex-wrap gap-2">
          {recipe.skills.map((s) => (
            <span
              key={s}
              className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* 出典 */}
      <section className="mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p className="text-sm font-bold text-blue-800 mb-1">📎 出典について</p>
          <p className="text-sm text-blue-900 mb-3">
            このレシピは <strong>{recipe.sourceName}</strong> のチュートリアルに基づいています。
            回路図とコードは公式チュートリアルをご参照ください。正確な情報を提供するため、出典元のコンテンツをそのまま使います。
          </p>
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors"
          >
            公式チュートリアルを見る →
          </a>
        </div>
      </section>

      {/* 関連レシピ */}
      {related.length > 0 && (
        <section className="mb-8">
          <h2 className="font-bold text-slate-800 text-lg mb-3">関連レシピ</h2>
          <div className="flex flex-col gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/recipes/${r.slug}`}
                className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow flex items-center gap-3"
              >
                <DifficultyBadge difficulty={r.difficulty} />
                <span className="text-sm font-semibold text-slate-800">{r.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="pt-6 border-t border-slate-200">
        <Link href="/recipes" className="text-blue-600 text-sm hover:underline">
          ← レシピ一覧に戻る
        </Link>
      </div>
    </div>
  );
}
