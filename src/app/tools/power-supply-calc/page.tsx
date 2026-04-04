import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import PowerSupplyCalcClient from "@/components/tools/PowerSupplyCalcClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "電源容量計算ツール | プロジェクトに必要な電源をすぐ計算",
  description:
    "Arduino・ESP32プロジェクトの消費電力を自動計算。使うセンサーやモーターを選ぶだけで、推奨電源を提案します。バッテリー駆動時間も計算可能。",
  openGraph: {
    title: "電源容量計算ツール | プロジェクトに必要な電源をすぐ計算",
    description:
      "Arduino・ESP32プロジェクトの消費電力を自動計算。使うセンサーやモーターを選ぶだけで、推奨電源を提案します。バッテリー駆動時間も計算可能。",
    url: `${SITE_URL}/tools/power-supply-calc`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const faqs = [
  {
    question: "電源容量はどうやって決めればいいですか？",
    answer:
      "使用するすべてのコンポーネントのピーク消費電流を合算し、さらに20%の安全マージンを加えた値以上の電源を選びます。たとえばArduino Uno（200mA）とSG90サーボ（500mA）なら、ピーク合計700mAの20%マージンで840mA以上の電源が必要です。",
  },
  {
    question: "標準消費電流とピーク消費電流の違いは？",
    answer:
      "標準消費電流は通常動作時の平均的な消費電流です。ピーク消費電流はモーター起動時やWiFi送信時など、瞬間的に流れる最大電流です。電源選定ではピーク電流を基準にします。",
  },
  {
    question: "USB給電でモーターは動かせますか？",
    answer:
      "USB 2.0（500mA）では小型サーボ1個でも厳しい場合があります。モーターを使う場合はUSB PD（3A）やACアダプタ（2A以上）を推奨します。また、マイコンのGPIOからモーターを直接駆動せず、必ずモータードライバを使用してください。",
  },
  {
    question: "バッテリー駆動時間の計算方法は？",
    answer:
      "動作時間（時間）= バッテリー容量（mAh）÷ 平均消費電流（mA）で概算できます。たとえば1000mAhのリポバッテリーで平均100mA消費なら約10時間です。実際にはバッテリーの放電特性や効率により、計算値の70-80%程度になります。",
  },
  {
    question: "3.3Vと5Vのコンポーネントを混在させるには？",
    answer:
      "5V電源を使い、3.3Vコンポーネントにはレギュレーター（AMS1117-3.3など）で降圧するのが一般的です。信号レベルも異なるため、レベルシフターや分圧回路で変換が必要な場合があります。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "電源容量計算ツール",
      url: `${SITE_URL}/tools/power-supply-calc`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "Arduino・ESP32プロジェクトの消費電力を自動計算。推奨電源を提案し、バッテリー駆動時間も算出。",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "ツール", item: `${SITE_URL}/tools` },
        {
          "@type": "ListItem",
          position: 3,
          name: "電源容量計算",
          item: `${SITE_URL}/tools/power-supply-calc`,
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

export default function PowerSupplyCalcPage() {
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
          <span className="text-gray-600">電源容量計算</span>
        </nav>

        {/* ヒーロー */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#1a2332] mb-2 flex items-center gap-2.5">
            <div className="w-1 h-7 bg-orange-500 rounded-full" />
            電源容量計算ツール
          </h1>
          <p className="text-gray-500 text-sm ml-3.5 mb-4 leading-relaxed max-w-2xl">
            使用するセンサー・モーター・マイコンを選ぶだけで、合計消費電流を自動計算。推奨電源を提案し、バッテリー駆動時間も算出します。初心者でも安心して電源を選べます。
          </p>
          <div className="flex flex-wrap gap-2 ml-3.5">
            <span className="text-[11px] bg-orange-50 text-orange-700 px-2.5 py-0.5 rounded border border-orange-200 font-semibold">
              30+コンポーネント対応
            </span>
            <span className="text-[11px] bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded border border-teal-200 font-semibold">
              バッテリー駆動時間計算
            </span>
            <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
              無料
            </span>
          </div>
        </div>

        {/* 計算ツール */}
        <PowerSupplyCalcClient />

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-orange-500 rounded-full" />
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
            <div className="w-1 h-6 bg-orange-500 rounded-full" />
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
              href="/tools/ohms-law-calc"
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-bold text-sm text-[#1a2332]">オームの法則計算</h3>
                  <p className="text-xs text-gray-500 mt-0.5">電圧・電流・抵抗・電力を自動計算</p>
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
            <Link
              href="/tools/voltage-divider-calc"
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔋</span>
                <div>
                  <h3 className="font-bold text-sm text-[#1a2332]">分圧回路計算</h3>
                  <p className="text-xs text-gray-500 mt-0.5">分圧回路の出力電圧を自動計算</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
