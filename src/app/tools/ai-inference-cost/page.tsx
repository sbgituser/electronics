import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import AiInferenceCostCalcClient from "@/components/tools/AiInferenceCostCalcClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI推論コスト計算機 | クラウド vs エッジの月額コストを比較",
  description:
    "AIモデルの推論コストをクラウドGPU・Jetson Orin Nano・Raspberry Piで比較計算。月額コスト・年間コスト・レイテンシを可視化。",
  alternates: { canonical: `${SITE_URL}/tools/ai-inference-cost` },
  openGraph: {
    title: "AI推論コスト計算機 | クラウド vs エッジの月額コストを比較",
    description:
      "AIモデルの推論コストをクラウドGPU・Jetson Orin Nano・Raspberry Piで比較計算。",
    url: `${SITE_URL}/tools/ai-inference-cost`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const faqs = [
  {
    question: "クラウドAIとエッジAI、どちらがコスト効率がよいですか？",
    answer:
      "リクエスト数が少ない場合はクラウドAIが有利（従量課金のため固定費がかからない）ですが、リクエスト数が増えるとエッジAIの方がコスト効率が良くなります。損益分岐点はモデルサイズやデバイスによりますが、一般的に1日数百回以上のリクエストがある場合はエッジAIの検討が有効です。",
  },
  {
    question: "モデルの量子化はコストに影響しますか？",
    answer:
      "INT8やFP16への量子化により、推論速度が向上し、エッジデバイスでの処理能力が大幅に改善されます。クラウドでも処理時間が短縮されるため、従量課金のコスト削減につながります。精度低下は一般的に1〜2%程度に抑えられます。",
  },
  {
    question: "Raspberry Piで大型モデルは動きますか？",
    answer:
      "1Bパラメータを超える大型モデルはRaspberry Piでは実用的な速度で動作しません。レイテンシが10秒以上かかるため、リアルタイム用途には不向きです。TensorFlow LiteやONNX Runtimeで量子化した小型モデルの利用を推奨します。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "AI推論コスト計算機",
      url: `${SITE_URL}/tools/ai-inference-cost`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "AIモデルの推論コストをクラウドGPU・エッジGPU・Raspberry Piで比較計算するツール。",
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
          name: "AI推論コスト計算機",
          item: `${SITE_URL}/tools/ai-inference-cost`,
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

export default function AiInferenceCostPage() {
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
          <span className="text-gray-600">AI推論コスト計算機</span>
        </nav>

        {/* ヒーロー */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#1a2332] mb-2 flex items-center gap-2.5">
            <div className="w-1 h-7 bg-blue-600 rounded-full" />
            AI推論コスト計算機
          </h1>
          <p className="text-gray-500 text-sm ml-3.5 mb-4 leading-relaxed max-w-2xl">
            モデルサイズ・リクエスト数・実行デバイスを選択するだけで、月額・年間の推論コストとレイテンシを比較できます。クラウドGPUとエッジデバイスのどちらが最適か判断する際にご活用ください。
          </p>
          <div className="flex flex-wrap gap-2 ml-3.5">
            <span className="text-[11px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded border border-blue-200 font-semibold">
              クラウド / エッジ比較
            </span>
            <span className="text-[11px] bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded border border-teal-200 font-semibold">
              レイテンシ目安表示
            </span>
            <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
              無料
            </span>
          </div>
        </div>

        {/* 計算ツール */}
        <AiInferenceCostCalcClient />

        {/* 使い方ガイド */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            使い方ガイド
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed space-y-2">
            <p><strong>Step 1:</strong> 使用するAIモデルのサイズ（小型・中型・大型）を選択します。</p>
            <p><strong>Step 2:</strong> 1日あたりの推論リクエスト数を入力します。</p>
            <p><strong>Step 3:</strong> 実行デバイス（クラウドGPU / Jetson Orin Nano / Raspberry Pi）を選択すると、月額コスト・年間コスト・レイテンシが表示されます。</p>
            <p>エッジデバイスのコストは電気代ベースの固定費で計算しています。実際にはデバイスの初期費用も考慮してください。</p>
          </div>
        </section>

        {/* 関連記事 */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            関連記事
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/articles/tensorflow-lite-raspberry-pi-intro" className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-sm text-[#1a2332]">TensorFlow Lite × Raspberry Pi 入門</h3>
              <p className="text-xs text-gray-500 mt-1">軽量AIモデルをラズパイで動かす方法</p>
            </Link>
            <Link href="/articles/edge-ai-inference-benchmark" className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-sm text-[#1a2332]">エッジAI推論ベンチマーク</h3>
              <p className="text-xs text-gray-500 mt-1">各デバイスの推論速度を実測比較</p>
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
              href="/tools/iot-power-calc"
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔋</span>
                <div>
                  <h3 className="font-bold text-sm text-[#1a2332]">IoTセンサー電力消費計算機</h3>
                  <p className="text-xs text-gray-500 mt-0.5">センサーの消費電力とバッテリー持続時間を計算</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
