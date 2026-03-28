import { allParts, getPartById } from "@/data/parts";
import { allRecipes } from "@/data/recipes";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, AMAZON_PARTNER_TAG, buildAmazonUrl } from "@/lib/site";
import { PART_CATEGORIES } from "@/types/parts";
import DifficultyBadge from "@/components/recipes/DifficultyBadge";

export function generateStaticParams() {
  return allParts.map((part) => ({ partId: part.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ partId: string }>;
}): Promise<Metadata> {
  const { partId } = await params;
  const part = getPartById(partId);
  if (!part) return {};
  return {
    title: `${part.name} — スペック・購入ガイド`,
    description: `${part.name}（${part.nameEn}）のスペック詳細、初心者向け解説、使用レシピ、Amazon購入リンク。${part.beginnerNote}`,
    alternates: { canonical: `${SITE_URL}/tools/parts-database/${partId}` },
    openGraph: {
      title: `${part.name} | エレクトロニクス研究所`,
      description: part.beginnerNote,
      url: `${SITE_URL}/tools/parts-database/${partId}`,
    },
  };
}

const diffLabelMap: Record<number, string> = {
  1: "★☆☆ 入門向き",
  2: "★★☆ 標準",
  3: "★★★ 上級",
};

export default async function PartDetailPage({
  params,
}: {
  params: Promise<{ partId: string }>;
}) {
  const { partId } = await params;
  const part = getPartById(partId);
  if (!part) notFound();

  const cat = PART_CATEGORIES[part.category];

  // このパーツを使うレシピ
  const relatedRecipes = allRecipes.filter((r) =>
    r.parts.some((p) => p.partId === partId)
  );

  // Amazon URL の決定
  const amazonUrl = part.amazonAsin
    ? buildAmazonUrl(part.amazonAsin)
    : `https://www.amazon.co.jp/s?k=${encodeURIComponent(part.name)}&tag=${AMAZON_PARTNER_TAG}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: part.name,
    description: part.beginnerNote,
    category: cat.label,
    ...(part.amazonAsin && {
      offers: {
        "@type": "Offer",
        url: amazonUrl,
        priceCurrency: "JPY",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Amazon.co.jp",
        },
      },
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "ツール", item: `${SITE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: "パーツ辞典", item: `${SITE_URL}/tools/parts-database` },
      { "@type": "ListItem", position: 4, name: part.name },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* パンくずリスト */}
      <nav className="text-xs text-slate-400 mb-6 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-slate-600">ホーム</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-slate-600">ツール</Link>
        <span>/</span>
        <Link href="/tools/parts-database" className="hover:text-slate-600">パーツ辞典</Link>
        <span>/</span>
        <span className="text-slate-600 truncate">{part.name}</span>
      </nav>

      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{cat.icon}</span>
          <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
            {cat.label}
          </span>
          <span className={`text-xs font-medium ${part.difficulty === 1 ? "text-green-600" : part.difficulty === 2 ? "text-amber-600" : "text-red-600"}`}>
            {diffLabelMap[part.difficulty]}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
          {part.name}
        </h1>
        <p className="text-slate-400 text-sm mb-2">{part.nameEn}</p>
        <p className="text-slate-600 font-medium">{part.priceRange}</p>
      </div>

      {/* 初心者メモ */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg mb-8">
        <p className="text-sm font-bold text-green-800 mb-1">💡 初心者向けメモ</p>
        <p className="text-sm text-green-900">{part.beginnerNote}</p>
      </div>

      {/* Amazonボタン */}
      <div className="mb-8">
        <a
          href={amazonUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-block bg-orange-400 hover:bg-orange-500 text-white font-bold py-2.5 px-6 rounded-xl transition-colors"
        >
          Amazonで購入・価格を確認する →
        </a>
        <p className="text-xs text-slate-400 mt-1">
          ※ Amazonアソシエイトリンク。表示価格は参考値です。
        </p>
      </div>

      {/* スペック表 */}
      <section className="mb-10">
        <h2 className="font-bold text-slate-800 text-lg mb-4">スペック詳細</h2>
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(part.specs).map(([key, val], i) => (
                <tr
                  key={key}
                  className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="py-2.5 px-4 text-slate-500 font-medium w-40 border-b border-slate-100">
                    {key}
                  </td>
                  <td className="py-2.5 px-4 text-slate-800 border-b border-slate-100">
                    {val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 対応ボード */}
      {part.compatibleBoards && part.compatibleBoards.length > 0 && (
        <section className="mb-10">
          <h2 className="font-bold text-slate-800 text-lg mb-3">対応ボード</h2>
          <div className="flex flex-wrap gap-2">
            {part.compatibleBoards.map((boardId) => {
              const boardPart = getPartById(boardId);
              return boardPart ? (
                <Link
                  key={boardId}
                  href={`/tools/parts-database/${boardId}`}
                  className="text-sm bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {boardPart.name}
                </Link>
              ) : (
                <span
                  key={boardId}
                  className="text-sm bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full"
                >
                  {boardId}
                </span>
              );
            })}
          </div>
        </section>
      )}

      {/* このパーツを使うレシピ */}
      {relatedRecipes.length > 0 && (
        <section className="mb-10">
          <h2 className="font-bold text-slate-800 text-lg mb-4">
            このパーツを使うレシピ
          </h2>
          <div className="flex flex-col gap-3">
            {relatedRecipes.map((r) => (
              <Link
                key={r.slug}
                href={`/recipes/${r.slug}`}
                className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow flex items-center gap-3"
              >
                <DifficultyBadge difficulty={r.difficulty} />
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{r.title}</p>
                  <p className="text-xs text-slate-400">{r.estimatedMinutes}分 / {r.board}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* データソース */}
      <p className="text-xs text-slate-400 mb-8">
        情報出典: {part.dataSource}
      </p>

      <div className="pt-6 border-t border-slate-200">
        <Link href="/tools/parts-database" className="text-blue-600 text-sm hover:underline">
          ← パーツ辞典に戻る
        </Link>
      </div>
    </div>
  );
}
