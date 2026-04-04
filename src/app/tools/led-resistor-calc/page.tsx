import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import LedResistorCalcClient from "@/components/tools/LedResistorCalcClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LED抵抗計算ツール | 電源電圧とLED仕様から適切な抵抗値を計算",
  description:
    "LED回路に必要な抵抗値を自動計算。Arduino・ESP32・Raspberry Piの電源電圧プリセット対応。直列・並列接続にも対応し、E24系列の推奨抵抗値を提案します。",
  openGraph: {
    title: "LED抵抗計算ツール | 電源電圧とLED仕様から適切な抵抗値を計算",
    description:
      "LED回路に必要な抵抗値を自動計算。Arduino・ESP32・Raspberry Piの電源電圧プリセット対応。直列・並列接続にも対応し、E24系列の推奨抵抗値を提案します。",
    url: `${SITE_URL}/tools/led-resistor-calc`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const faqs = [
  {
    question: "LED抵抗の計算方法は？",
    answer:
      "R =（電源電圧 − LEDの順方向電圧）÷ LEDの順方向電流 で求められます。たとえば5V電源で赤色LED（Vf=2.0V, If=20mA）なら、R = (5 - 2.0) / 0.02 = 150Ω です。",
  },
  {
    question: "なぜLEDに抵抗が必要なのですか？",
    answer:
      "LEDはダイオードの一種で、電流制限をしないと過大な電流が流れて焼損します。抵抗を直列に接続することで電流を適切な値に制限し、LEDを安全に点灯させます。",
  },
  {
    question: "E24系列とは何ですか？",
    answer:
      "E24系列はJIS規格で定められた抵抗値の標準数列です。1桁あたり24種類の値（1.0, 1.1, 1.2, ... 9.1）があり、市販の抵抗はこの系列の値で販売されています。計算値に最も近いE24値を選ぶのが一般的です。",
  },
  {
    question: "LEDの直列接続と並列接続の違いは？",
    answer:
      "直列接続はLEDを数珠つなぎにして1つの抵抗で電流を制御します。電源電圧がLED電圧の合計より高い必要があります。並列接続は各LEDに個別の抵抗をつけるため、電圧条件は緩いですが抵抗の本数が増えます。",
  },
  {
    question: "抵抗のワット数はどう選べばよいですか？",
    answer:
      "抵抗の消費電力を計算し、その2倍以上のワット数の抵抗を選びます。一般的なLED回路では1/4W（0.25W）の抵抗で十分なことが多いですが、大電流LEDや多数直列の場合は1/2Wや1Wが必要になることもあります。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "LED抵抗計算ツール",
      url: `${SITE_URL}/tools/led-resistor-calc`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "LED回路に必要な抵抗値を自動計算。E24系列対応。Arduino・ESP32・Raspberry Piのプリセット付き。",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "ツール", item: `${SITE_URL}/tools` },
        {
          "@type": "ListItem",
          position: 3,
          name: "LED抵抗計算",
          item: `${SITE_URL}/tools/led-resistor-calc`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

export default function LedResistorCalcPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* パンくずリスト */}
        <nav className="text-xs text-gray-400 mb-6" aria-label="パンくずリスト">
          <Link href="/" className="hover:text-[#00838F]">ホーム</Link>
          <span className="mx-1.5">/</span>
          <Link href="/tools" className="hover:text-[#00838F]">ツール</Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-600">LED抵抗計算</span>
        </nav>

        {/* ヒーロー */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#1a2332] mb-2 flex items-center gap-2.5">
            <div className="w-1 h-7 bg-amber-500 rounded-full" />
            LED抵抗計算ツール
          </h1>
          <p className="text-gray-500 text-sm ml-3.5 mb-4 leading-relaxed max-w-2xl">
            LED回路に必要な抵抗値を自動計算します。電源電圧とLEDの仕様を入力するだけで、E24系列の推奨抵抗値・消費電力・推奨ワット数がわかります。直列・並列接続にも対応しています。
          </p>
          <div className="flex flex-wrap gap-2 ml-3.5">
            <span className="text-[11px] bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded border border-amber-200 font-semibold">
              E24系列対応
            </span>
            <span className="text-[11px] bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded border border-teal-200 font-semibold">
              Arduino / ESP32 / Raspberry Pi プリセット
            </span>
            <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
              無料
            </span>
          </div>
        </div>

        {/* 計算ツール */}
        <LedResistorCalcClient />

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-amber-500 rounded-full" />
            よくある質問
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white border border-gray-200 rounded-lg group"
              >
                <summary className="px-5 py-4 cursor-pointer text-sm font-semibold text-[#1a2332] hover:text-[#00838F] transition-colors list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">▼</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 関連ツール */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-amber-500 rounded-full" />
            関連ツール
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/tools/board-picker"
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔍</span>
                <div>
                  <h3 className="font-bold text-sm text-[#1a2332]">開発ボード診断ツール</h3>
                  <p className="text-xs text-gray-500 mt-0.5">あなたに最適な開発ボードを診断</p>
                </div>
              </div>
            </Link>
            <Link
              href="/tools/parts-database"
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="font-bold text-sm text-[#1a2332]">パーツ辞典</h3>
                  <p className="text-xs text-gray-500 mt-0.5">電子パーツのスペック・使い方を解説</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
