import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "回路計算ツール — 電子工作に使える無料計算機",
  description:
    "オームの法則、LED抵抗値、抵抗カラーコード、分圧回路、コンデンサ合成容量、消費電力計算など、電子工作で使える回路計算ツールをまとめて紹介。すべてブラウザで完結、無料。",
  alternates: { canonical: `${SITE_URL}/tools/circuit-calculators` },
  openGraph: {
    title: "回路計算ツール | エレクトロニクス研究所",
    description: "電子工作に使える無料回路計算ツール6種。ブラウザ完結。",
    url: `${SITE_URL}/tools/circuit-calculators`,
  },
};

const calculators = [
  {
    href: "/tools/ohms-law-calc",
    icon: "⚡",
    title: "オームの法則計算機",
    description: "電圧V・電流I・抵抗R・電力Pのうち2つを入力すると残りをすべて計算。GPIOプリセット付き。",
    tags: ["V=IR", "電力計算"],
    seoNote: "オームの法則 計算",
  },
  {
    href: "/tools/led-resistor-calc",
    icon: "💡",
    title: "LED抵抗値計算機",
    description: "電源電圧とLED仕様から必要な抵抗値を計算。E24系列の推奨値、消費電力、直列・並列対応。",
    tags: ["E24系列", "直列・並列"],
    seoNote: "LED 抵抗 計算",
  },
  {
    href: "/tools/resistor-color-code",
    icon: "🌈",
    title: "抵抗カラーコード計算機",
    description: "カラーバンドの色を選んで抵抗値を読み取り。4本/5本/6本バンド対応。逆引き機能付き。",
    tags: ["4本/5本/6本", "逆引き"],
    seoNote: "抵抗 カラーコード 読み方",
  },
  {
    href: "/tools/voltage-divider-calc",
    icon: "🔋",
    title: "分圧回路計算機",
    description: "2つの抵抗で入力電圧を分圧する回路の設計。目標電圧から抵抗値を逆算する機能付き。",
    tags: ["分圧回路", "逆算"],
    seoNote: "分圧回路 計算",
  },
  {
    href: "/tools/circuit-calculators/capacitor",
    icon: "🔵",
    title: "コンデンサ計算機",
    description: "コンデンサの直列・並列の合成容量とRC時定数を計算。充放電時間の目安表付き。",
    tags: ["直列・並列", "RC時定数"],
    seoNote: "コンデンサ 合成容量 計算",
  },
  {
    href: "/tools/power-supply-calc",
    icon: "🔌",
    title: "消費電力計算機",
    description: "各パーツの消費電流を合計して消費電力を算出。バッテリー持続時間の推定と推奨電源の提案。",
    tags: ["バッテリー計算", "電源設計"],
    seoNote: "消費電力 計算 Arduino",
  },
];

export default function CircuitCalculatorsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "ツール", item: `${SITE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: "回路計算ツール" },
        ],
      },
      {
        "@type": "ItemList",
        name: "回路計算ツール一覧",
        numberOfItems: calculators.length,
        itemListElement: calculators.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.title,
          url: `${SITE_URL}${c.href}`,
        })),
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-xs text-gray-400 mb-6" aria-label="パンくずリスト">
        <Link href="/" className="hover:text-[#00838F]">ホーム</Link>
        <span className="mx-1.5">/</span>
        <Link href="/tools" className="hover:text-[#00838F]">ツール</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-600">回路計算ツール</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1a2332] mb-3">
          🧮 回路計算ツール
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
          電子工作で頻繁に使う計算をブラウザだけで実行できるツール群です。すべて無料、インストール不要。スマートフォンでも使えます。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {calculators.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl shrink-0">{calc.icon}</span>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-[#1a2332] text-base mb-1 group-hover:text-[#00838F] transition-colors">
                  {calc.title}
                </h2>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">
                  {calc.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {calc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
        <h2 className="font-bold text-teal-800 mb-2">電子工作の計算で困ったら</h2>
        <p className="text-sm text-teal-700 leading-relaxed">
          初心者の方は、まず「LED抵抗計算」から試してみてください。LEDを点灯させるために必要な抵抗値がすぐにわかります。次に「オームの法則計算」で、V=IRの関係を体感的に理解できます。回路設計の基本が身についたら「分圧回路」「コンデンサ計算」にもチャレンジしてみましょう。
        </p>
      </div>

      <div className="pt-8 border-t border-gray-200 mt-10">
        <Link href="/tools" className="text-blue-600 text-sm hover:underline">
          ← ツール一覧に戻る
        </Link>
      </div>
    </div>
  );
}
