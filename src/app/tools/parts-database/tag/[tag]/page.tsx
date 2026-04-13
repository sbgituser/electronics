import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { allParts } from "@/data/parts";
import { SITE_URL } from "@/lib/site";
import PartCard from "@/components/parts/PartCard";

function getAllTags(): string[] {
  const tagSet = new Set<string>();
  for (const part of allParts) {
    if (part.tags) {
      for (const tag of part.tags) {
        tagSet.add(tag);
      }
    }
  }
  return Array.from(tagSet).sort();
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const parts = allParts.filter((p) => p.tags?.includes(decodedTag));
  if (parts.length === 0) return {};
  return {
    title: `「${decodedTag}」タグのパーツ一覧 — パーツ辞典`,
    description: `「${decodedTag}」に関連する電子パーツ ${parts.length}件。スペック・価格・初心者向け解説つき。`,
    alternates: {
      canonical: `${SITE_URL}/tools/parts-database/tag/${encodeURIComponent(decodedTag)}`,
    },
    openGraph: {
      title: `「${decodedTag}」タグのパーツ一覧 | エレクトロニクス研究所`,
      description: `「${decodedTag}」に関連する電子パーツ ${parts.length}件`,
      url: `${SITE_URL}/tools/parts-database/tag/${encodeURIComponent(decodedTag)}`,
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const parts = allParts.filter((p) => p.tags?.includes(decodedTag));
  if (parts.length === 0) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "ツール", item: `${SITE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: "パーツ辞典", item: `${SITE_URL}/tools/parts-database` },
          { "@type": "ListItem", position: 4, name: `${decodedTag}` },
        ],
      },
      {
        "@type": "ItemList",
        name: `${decodedTag} パーツ一覧`,
        numberOfItems: parts.length,
        itemListElement: parts.map((p, i) => ({
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
      <nav className="text-xs text-slate-400 mb-6 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-slate-600">ホーム</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-slate-600">ツール</Link>
        <span>/</span>
        <Link href="/tools/parts-database" className="hover:text-slate-600">パーツ辞典</Link>
        <span>/</span>
        <span className="text-slate-600">タグ: {decodedTag}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          🏷️ 「{decodedTag}」のパーツ一覧
        </h1>
        <p className="text-slate-500 text-sm">
          {parts.length} 件のパーツが見つかりました
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {parts.map((part) => (
          <PartCard key={part.id} part={part} />
        ))}
      </div>

      <div className="pt-6 border-t border-slate-200 flex gap-4">
        <Link href="/tools/parts-database" className="text-blue-600 text-sm hover:underline">
          ← パーツ辞典に戻る
        </Link>
      </div>
    </div>
  );
}
