import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import IotPowerCalcClient from "@/components/tools/IotPowerCalcClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IoTセンサー電力消費計算機 | 消費電力・バッテリー持続時間を自動計算",
  description:
    "IoTセンサーの種類・動作モード・サンプリング間隔から消費電力とバッテリー持続時間を自動計算。温度・湿度・CO2・GPS・カメラセンサー対応。",
  alternates: { canonical: `${SITE_URL}/tools/iot-power-calc` },
  openGraph: {
    title: "IoTセンサー電力消費計算機 | 消費電力・バッテリー持続時間を自動計算",
    description:
      "IoTセンサーの種類・動作モード・サンプリング間隔から消費電力とバッテリー持続時間を自動計算。",
    url: `${SITE_URL}/tools/iot-power-calc`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const faqs = [
  {
    question: "間欠稼働と常時稼働でどのくらい消費電力が変わりますか？",
    answer:
      "間欠稼働では、センサーの大半の時間をスタンバイ（低電力）モードで過ごすため、常時稼働に比べて消費電力を数十分の一〜数百分の一に削減できます。サンプリング間隔が長いほど省電力効果は大きくなります。",
  },
  {
    question: "電池はどれくらい持ちますか？",
    answer:
      "2000mAh（3.3V）のバッテリーの場合、温度センサーを60秒間隔の間欠稼働で使用すると数年以上持続します。一方、カメラモジュールを常時稼働させると半日程度で消耗します。センサー種類と動作モードの選択が重要です。",
  },
  {
    question: "消費電力を下げるにはどうすればよいですか？",
    answer:
      "間欠稼働モードの活用、サンプリング間隔の延長、低消費電力マイコン（ESP32のディープスリープ等）の使用、不要なペリフェラルの無効化、通信頻度の最適化などが効果的です。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "IoTセンサー電力消費計算機",
      url: `${SITE_URL}/tools/iot-power-calc`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "IoTセンサーの消費電力とバッテリー持続時間を自動計算するツール。",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "ツール",
          item: `${SITE_URL}/tools`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "IoTセンサー電力消費計算機",
          item: `${SITE_URL}/tools/iot-power-calc`,
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

export default function IotPowerCalcPage() {
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
          <span className="text-gray-600">IoTセンサー電力消費計算機</span>
        </nav>

        {/* ヒーロー */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#1a2332] mb-2 flex items-center gap-2.5">
            <div className="w-1 h-7 bg-blue-600 rounded-full" />
            IoTセンサー電力消費計算機
          </h1>
          <p className="text-gray-500 text-sm ml-3.5 mb-4 leading-relaxed max-w-2xl">
            センサーの種類・動作モード・サンプリング間隔を選択するだけで、消費電力・月間電力量・バッテリー持続時間をリアルタイム計算します。IoTシステム設計の電源計画にご活用ください。
          </p>
          <div className="flex flex-wrap gap-2 ml-3.5">
            <span className="text-[11px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded border border-blue-200 font-semibold">
              6種類のセンサー対応
            </span>
            <span className="text-[11px] bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded border border-teal-200 font-semibold">
              間欠 / 常時稼働モード
            </span>
            <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
              無料
            </span>
          </div>
        </div>

        {/* 計算ツール */}
        <IotPowerCalcClient />

        {/* 使い方ガイド */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            使い方ガイド
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed space-y-2">
            <p><strong>Step 1:</strong> 使用するセンサーの種類と動作モード（常時稼働 or 間欠稼働）を選択します。</p>
            <p><strong>Step 2:</strong> 間欠稼働の場合はサンプリング間隔（秒）を設定します。間隔が長いほど省電力です。</p>
            <p><strong>Step 3:</strong> 導入台数を入力すると、全体の月間消費電力量も算出されます。</p>
            <p>バッテリー持続時間は2000mAh（3.3V）リチウム電池を基準に計算しています。</p>
          </div>
        </section>

        {/* 関連記事 */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            関連記事
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/articles/iot-sensor-network-guide" className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-sm text-[#1a2332]">IoTセンサーネットワーク構築ガイド</h3>
              <p className="text-xs text-gray-500 mt-1">センサーの選定から通信プロトコルまで</p>
            </Link>
            <Link href="/articles/sensor-selection-guide" className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-sm text-[#1a2332]">センサー選定ガイド</h3>
              <p className="text-xs text-gray-500 mt-1">用途別センサーの特徴と選び方</p>
            </Link>
          </div>
        </section>

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
              href="/tools/edge-ai-roi"
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-bold text-sm text-[#1a2332]">エッジAI ROI計算機</h3>
                  <p className="text-xs text-gray-500 mt-0.5">エッジAI導入の投資回収期間とROIを計算</p>
                </div>
              </div>
            </Link>
            <Link
              href="/tools/power-supply-calc"
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-bold text-sm text-[#1a2332]">電源設計計算ツール</h3>
                  <p className="text-xs text-gray-500 mt-0.5">電源回路の設計パラメータを計算</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
