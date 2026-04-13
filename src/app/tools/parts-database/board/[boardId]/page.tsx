import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { allParts, getPartById } from "@/data/parts";
import { SITE_URL } from "@/lib/site";
import PartCard from "@/components/parts/PartCard";

function getAllBoardIds(): string[] {
  const boardIds = new Set<string>();
  for (const part of allParts) {
    if (part.compatibleBoards) {
      for (const boardId of part.compatibleBoards) {
        boardIds.add(boardId);
      }
    }
  }
  return Array.from(boardIds).sort();
}

export function generateStaticParams() {
  return getAllBoardIds().map((boardId) => ({ boardId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ boardId: string }>;
}): Promise<Metadata> {
  const { boardId } = await params;
  const board = getPartById(boardId);
  const boardName = board?.name ?? boardId;
  const parts = allParts.filter(
    (p) => p.compatibleBoards?.includes(boardId) && p.id !== boardId
  );
  return {
    title: `${boardName} 対応パーツ一覧 — パーツ辞典`,
    description: `${boardName}に対応する電子パーツ ${parts.length}件。センサー・アクチュエーター・モジュール等のスペック・接続方法を解説。`,
    alternates: {
      canonical: `${SITE_URL}/tools/parts-database/board/${boardId}`,
    },
    openGraph: {
      title: `${boardName} 対応パーツ一覧 | エレクトロニクス研究所`,
      description: `${boardName}に対応する電子パーツ ${parts.length}件`,
      url: `${SITE_URL}/tools/parts-database/board/${boardId}`,
    },
  };
}

export default async function BoardCompatPage({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = await params;
  const board = getPartById(boardId);
  const boardName = board?.name ?? boardId;
  const parts = allParts.filter(
    (p) => p.compatibleBoards?.includes(boardId) && p.id !== boardId
  );
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
          { "@type": "ListItem", position: 4, name: `${boardName} 対応パーツ` },
        ],
      },
      {
        "@type": "ItemList",
        name: `${boardName} 対応パーツ一覧`,
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
        <span className="text-slate-600">{boardName} 対応</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🖥️</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {boardName} 対応パーツ
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {parts.length} 件の対応パーツ
            </p>
          </div>
        </div>
        {board && (
          <Link
            href={`/tools/parts-database/${boardId}`}
            className="inline-block text-sm text-blue-600 hover:underline mb-4"
          >
            {boardName} の詳細を見る →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {parts.map((part) => (
          <PartCard key={part.id} part={part} />
        ))}
      </div>

      <div className="pt-6 border-t border-slate-200">
        <Link href="/tools/parts-database" className="text-blue-600 text-sm hover:underline">
          ← パーツ辞典に戻る
        </Link>
      </div>
    </div>
  );
}
