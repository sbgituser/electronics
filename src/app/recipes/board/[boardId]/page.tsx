import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { allRecipes } from "@/data/recipes";
import { SITE_URL } from "@/lib/site";
import RecipeCard from "@/components/recipes/RecipeCard";

function getAllRecipeBoards(): { id: string; name: string }[] {
  const boardMap = new Map<string, string>();
  for (const recipe of allRecipes) {
    const id = recipe.board.toLowerCase().replace(/\s+/g, "-");
    if (!boardMap.has(id)) {
      boardMap.set(id, recipe.board);
    }
  }
  return Array.from(boardMap, ([id, name]) => ({ id, name }));
}

function getRecipesForBoard(boardId: string) {
  return allRecipes.filter(
    (r) => r.board.toLowerCase().replace(/\s+/g, "-") === boardId
  );
}

export function generateStaticParams() {
  return getAllRecipeBoards().map((b) => ({ boardId: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ boardId: string }>;
}): Promise<Metadata> {
  const { boardId } = await params;
  const boards = getAllRecipeBoards();
  const board = boards.find((b) => b.id === boardId);
  if (!board) return {};
  const recipes = getRecipesForBoard(boardId);
  return {
    title: `${board.name} レシピ一覧 — 電子工作レシピブック`,
    description: `${board.name}で作れる電子工作レシピ ${recipes.length}件。初心者から上級者まで。`,
    alternates: {
      canonical: `${SITE_URL}/recipes/board/${boardId}`,
    },
    openGraph: {
      title: `${board.name} レシピ一覧 | エレクトロニクス研究所`,
      description: `${board.name}で作れるレシピ ${recipes.length}件`,
      url: `${SITE_URL}/recipes/board/${boardId}`,
    },
  };
}

export default async function RecipeBoardPage({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = await params;
  const boards = getAllRecipeBoards();
  const board = boards.find((b) => b.id === boardId);
  if (!board) notFound();

  const recipes = getRecipesForBoard(boardId);
  if (recipes.length === 0) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "レシピ", item: `${SITE_URL}/recipes` },
      { "@type": "ListItem", position: 3, name: `${board.name}` },
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
        <span className="text-slate-600">{board.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          🖥️ {board.name} のレシピ一覧
        </h1>
        <p className="text-slate-500 text-sm">{recipes.length} 件のレシピ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>

      <div className="pt-6 border-t border-slate-200 flex gap-4 flex-wrap">
        {boards
          .filter((b) => b.id !== boardId)
          .map((b) => (
            <Link
              key={b.id}
              href={`/recipes/board/${b.id}`}
              className="text-blue-600 text-sm hover:underline"
            >
              {b.name}
            </Link>
          ))}
        <Link href="/recipes" className="text-blue-600 text-sm hover:underline">
          ← 全レシピに戻る
        </Link>
      </div>
    </div>
  );
}
