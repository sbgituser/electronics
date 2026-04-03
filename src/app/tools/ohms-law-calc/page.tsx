import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import OhmsLawCalcClient from "@/components/tools/OhmsLawCalcClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: `オームの法則計算ツール | 電圧・電流・抵抗・電力を自動計算 — ${SITE_NAME}`,
  description:
    "オームの法則（V=IR）で電圧・電流・抵抗・電力を自動計算。任意の2値を入力するだけ。Arduino/ESP32のGPIOピン出力プリセット対応。",
  openGraph: {
    title: "オームの法則計算ツール | 電圧・電流・抵抗・電力を自動計算",
    description:
      "オームの法則（V=IR）で電圧・電流・抵抗・電力を自動計算。任意の2値を入力するだけ。Arduino/ESP32のGPIOピン出力プリセット対応。",
    url: `${SITE_URL}/tools/ohms-law-calc`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const faqs = [
  {
    question: "オームの法則とは何ですか？",
    answer:
      "オームの法則は、電圧(V)＝電流(I)×抵抗(R)という電気回路の基本法則です。1827年にドイツの物理学者ゲオルク・オームが発見しました。この法則を使えば、電圧・電流・抵抗のうち2つがわかれば残りの1つを計算できます。",
  },
  {
    question: "電力はどうやって計算しますか？",
    answer:
      "電力(P)は P=V×I（電圧×電流）で求められます。オームの法則と組み合わせると、P=I²×R や P=V²/R でも計算できます。4つの値（V, I, R, P）のうち任意の2つがわかれば、残り2つをすべて求めることができます。",
  },
  {
    question: "Arduino UnoのGPIOピンの最大電流は？",
    answer:
      "Arduino Unoのデジタルピンは、1ピンあたり最大40mA（推奨20mA）の電流を出力できます。出力電圧は5Vです。複数ピンの合計電流にも上限（約200mA）があるため、大きな電流が必要な場合はトランジスタやMOSFETで駆動します。",
  },
  {
    question: "ESP32とRaspberry Piの出力電圧の違いは？",
    answer:
      "ESP32とRaspberry Piは共に3.3Vロジックです。ESP32のGPIOピンは最大12mA、Raspberry Piは最大16mAが目安です。5Vデバイスと接続する場合はレベルシフターが必要です。",
  },
  {
    question: "消費電力が大きい場合はどうすればいいですか？",
    answer:
      "一般的な1/4Wカーボン抵抗は0.25Wまでしか耐えられません。計算結果が0.25Wを超える場合は、1/2Wや1W以上の定格を持つ抵抗を使用してください。また放熱も考慮し、密閉空間での使用は避けましょう。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "オームの法則計算ツール",
      url: `${SITE_URL}/tools/ohms-law-calc`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "オームの法則で電圧・電流・抵抗・電力を自動計算。任意の2値を入力するだけ。Arduino/ESP32プリセット対応。",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "ツール", item: `${SITE_URL}/tools` },
        {
          "@type": "ListItem",
          position: 3,
          name: "オームの法則計算",
          item: `${SITE_URL}/tools/ohms-law-calc`,
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

export default function OhmsLawCalcPage() {
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
          <span className="text-gray-600">オームの法則計算</span>
        </nav>

        {/* ヒーロー */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#1a2332] mb-2 flex items-center gap-2.5">
            <div className="w-1 h-7 bg-blue-600 rounded-full" />
            オームの法則計算ツール
          </h1>
          <p className="text-gray-500 text-sm ml-3.5 mb-4 leading-relaxed max-w-2xl">
            電圧(V)・電流(I)・抵抗(R)・電力(P)の任意の2値を入力するだけで、残り2値をリアルタイム計算します。Arduino/ESP32/Raspberry
            PiのGPIOプリセットですぐに使えます。
          </p>
          <div className="flex flex-wrap gap-2 ml-3.5">
            <span className="text-[11px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded border border-blue-200 font-semibold">
              V / I / R / P 相互計算
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
        <OhmsLawCalcClient />

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
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
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            関連ツール
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/tools/led-resistor-calc"
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-bold text-sm text-[#1a2332]">LED抵抗計算ツール</h3>
                  <p className="text-xs text-gray-500 mt-0.5">LED回路に必要な抵抗値を自動計算</p>
                </div>
              </div>
            </Link>
            <Link
              href="/tools/resistor-color-code"
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <h3 className="font-bold text-sm text-[#1a2332]">抵抗カラーコード</h3>
                  <p className="text-xs text-gray-500 mt-0.5">色帯から抵抗値を読み取り・逆引き</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
