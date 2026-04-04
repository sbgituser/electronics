import type { Metadata } from "next";
import Link from "next/link";
import BoardPicker from "@/components/tools/BoardPicker";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "開発ボード診断ツール",
  description:
    "3つの質問に答えるだけで、あなたに最適な開発ボードがわかります。Arduino、Raspberry Pi、ESP32、M5Stack、Jetson Orin Nanoを比較。",
  alternates: { canonical: `${SITE_URL}/tools/board-picker` },
  openGraph: {
    title: "開発ボード診断ツール | エレクトロニクス研究所",
    description: "3つの質問に答えるだけで、あなたに最適な開発ボードがわかります。Arduino、Raspberry Pi、ESP32、M5Stack、Jetson Orin Nanoを比較。",
    url: `${SITE_URL}/tools/board-picker`,
  },
};

export default function BoardPickerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "開発ボード診断ツール",
        url: `${SITE_URL}/tools/board-picker`,
        applicationCategory: "UtilityApplication",
        operatingSystem: "All",
        offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
        description: "3つの質問に答えるだけで最適な開発ボードを診断。Arduino・Raspberry Pi・ESP32・M5Stack・Jetson比較。",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "ツール", item: `${SITE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: "開発ボード診断ツール" },
        ],
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* パンくずリスト */}
      <nav className="text-xs text-gray-400 mb-6" aria-label="パンくずリスト">
        <Link href="/" className="hover:text-[#00838F]">ホーム</Link>
        <span className="mx-1.5">/</span>
        <Link href="/tools" className="hover:text-[#00838F]">ツール</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-600">開発ボード診断ツール</span>
      </nav>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a2332] mb-2 flex items-center gap-2.5">
          <div className="w-1 h-7 bg-[#00838F] rounded-full" />
          開発ボード診断ツール
        </h1>
        <p className="text-gray-500 text-sm ml-3.5">
          3つの質問に答えるだけで、あなたに最適な開発ボードをご提案します。
          Arduino、Raspberry Pi、ESP32 など5ボードから診断。
        </p>
      </div>
      <BoardPicker />

      {/* 関連コンテンツ */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-[#1a2332] mb-4 flex items-center gap-2.5">
          <div className="w-1 h-5 bg-[#00838F] rounded-full" />
          関連コンテンツ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/articles/arduino-beginner-guide"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-sm text-[#1a2332]">Arduino入門ガイド</h3>
            <p className="text-xs text-gray-500 mt-1">Arduinoの始め方を初心者向けに解説</p>
          </Link>
          <Link
            href="/tools/parts-database/category/board"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-sm text-[#1a2332]">開発ボード一覧</h3>
            <p className="text-xs text-gray-500 mt-1">パーツ辞典でボードのスペックを比較</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
