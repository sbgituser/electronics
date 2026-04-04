import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { categoryGuides } from "@/data/parts/categories";
import { allParts } from "@/data/parts";
import { SITE_URL } from "@/lib/site";
import PartCard from "@/components/parts/PartCard";
import type { PartCategory } from "@/types/parts";

export function generateStaticParams() {
  return categoryGuides.map((g) => ({ categoryId: g.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}): Promise<Metadata> {
  const { categoryId } = await params;
  const guide = categoryGuides.find((g) => g.id === categoryId);
  if (!guide) return {};
  return {
    title: `${guide.name}とは？ — 電子工作パーツ解説`,
    description: guide.whatIs,
    alternates: {
      canonical: `${SITE_URL}/tools/parts-database/category/${categoryId}`,
    },
    openGraph: {
      title: `${guide.name}とは？ | エレクトロニクス研究所`,
      description: guide.whatIs,
      url: `${SITE_URL}/tools/parts-database/category/${categoryId}`,
    },
  };
}

export default async function CategoryGuidePage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const guide = categoryGuides.find((g) => g.id === categoryId);
  if (!guide) notFound();

  const categoryParts = allParts.filter((p) => p.category === (categoryId as PartCategory));
  const beginnerPart = allParts.find((p) => p.id === guide.beginnerFirst);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "ツール", item: `${SITE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: "パーツ辞典", item: `${SITE_URL}/tools/parts-database` },
          { "@type": "ListItem", position: 4, name: `${guide.name}とは？` },
        ],
      },
      {
        "@type": "ItemList",
        name: `${guide.name}一覧`,
        numberOfItems: categoryParts.length,
        itemListElement: categoryParts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: `${SITE_URL}/tools/parts-database/${p.id}`,
        })),
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* パンくず */}
      <nav className="text-xs text-slate-400 mb-6 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-slate-600">ホーム</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-slate-600">ツール</Link>
        <span>/</span>
        <Link href="/tools/parts-database" className="hover:text-slate-600">パーツ辞典</Link>
        <span>/</span>
        <span className="text-slate-600">{guide.name}とは？</span>
      </nav>

      {/* ヘッダー */}
      <div
        className="rounded-2xl p-6 mb-8 border-l-4"
        style={{ borderColor: guide.hexColor, backgroundColor: `${guide.hexColor}10` }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{guide.emoji}</span>
          <div>
            <p className="text-xs font-medium text-slate-500">{guide.nameEn}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {guide.name}とは？
            </h1>
          </div>
        </div>
        <p className="text-lg font-medium" style={{ color: guide.hexColor }}>
          {guide.catchphrase}
        </p>
      </div>

      {/* 〇〇ってなに？ */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {guide.emoji} {guide.name}ってなに？
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed bg-white border border-slate-200 rounded-xl p-5">
          {guide.whatIs}
        </p>
      </section>

      {/* 電子工作での役割 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          ⚡ 電子工作での役割
        </h2>
        <ul className="space-y-2">
          {guide.roles.map((role, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: guide.hexColor }}>
                {i + 1}
              </span>
              {role}
            </li>
          ))}
        </ul>
      </section>

      {/* 身近なものに例えると */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          💡 身近なものに例えると…
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guide.examples.map((ex, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-slate-600 text-sm leading-relaxed">{ex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* くわしい説明 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          📖 くわしい説明
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          {guide.description}
        </p>
      </section>

      {/* 買い物ガイド */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          🛒 買い物ガイド
        </h2>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-slate-700 text-sm leading-relaxed">
            {guide.buyingTips}
          </p>
        </div>
      </section>

      {/* 最初の1個CTA */}
      {beginnerPart && (
        <div
          className="rounded-xl p-5 mb-10 flex items-center justify-between gap-4"
          style={{ backgroundColor: `${guide.hexColor}15`, border: `1px solid ${guide.hexColor}40` }}
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1">最初の1個なら</p>
            <p className="font-bold text-slate-800">{beginnerPart.name} がおすすめ！</p>
            <p className="text-xs text-slate-500 mt-0.5">{beginnerPart.priceRange}</p>
          </div>
          <Link
            href={`/tools/parts-database/${guide.beginnerFirst}`}
            className="shrink-0 text-sm font-bold text-white px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: guide.hexColor }}
          >
            詳細を見る →
          </Link>
        </div>
      )}

      {/* パーツ一覧 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          {guide.emoji} このカテゴリのパーツ一覧
        </h2>
        <p className="text-slate-400 text-xs mb-5">{categoryParts.length} 種類</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryParts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      </section>

      <div className="pt-6 border-t border-slate-200">
        <Link href="/tools/parts-database" className="text-blue-600 text-sm hover:underline">
          ← パーツ辞典に戻る
        </Link>
      </div>
    </div>
  );
}
