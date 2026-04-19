import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import EdgeAiRoiCalcClient from "@/components/tools/EdgeAiRoiCalcClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "エッジAI ROI計算機 | 導入コストと投資回収期間を自動計算",
  description:
    "エッジAIデバイスの導入コスト・通信費削減額・クラウドAPI費用削減額から、投資回収期間と3年間ROIを自動計算。Raspberry Pi・Jetson Nano導入の費用対効果を可視化。",
  alternates: { canonical: `${SITE_URL}/tools/edge-ai-roi` },
  openGraph: {
    title: "エッジAI ROI計算機 | 導入コストと投資回収期間を自動計算",
    description:
      "エッジAIデバイスの導入コスト・通信費削減額・クラウドAPI費用削減額から、投資回収期間と3年間ROIを自動計算。",
    url: `${SITE_URL}/tools/edge-ai-roi`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const faqs = [
  {
    question: "エッジAIの導入でどのくらいコスト削減できますか？",
    answer:
      "用途によりますが、クラウドAPI呼び出しの削減と通信コストの低減により、月間数千〜数万円のコスト削減が見込めます。特にカメラ映像のリアルタイム解析など、大量のデータを扱うケースではクラウド送信コストが大幅に削減されます。",
  },
  {
    question: "Raspberry PiとJetson Nanoはどちらが向いていますか？",
    answer:
      "軽量なモデル（画像分類、音声認識など）であればRaspberry Pi 4でも十分動作します。物体検出やセグメンテーションなどGPU演算が必要な場合はJetson NanoやJetson Orin Nanoが適しています。コスト面ではRaspberry Piが有利です。",
  },
  {
    question: "ROIの計算に含めるべき隠れコストは？",
    answer:
      "デバイス本体以外に、電源・ケース・ネットワーク機器・初期セットアップ工数・メンテナンス人件費・ソフトウェア開発費・故障時の交換費用なども考慮すると、より正確なROI計算ができます。",
  },
  {
    question: "エッジAI導入に向いている用途は？",
    answer:
      "低レイテンシが求められるリアルタイム推論、プライバシー保護が必要なカメラ映像解析、通信環境が不安定な工場・農場でのIoT、大量データのフィルタリング前処理などが代表的です。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "エッジAI ROI計算機",
      url: `${SITE_URL}/tools/edge-ai-roi`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "エッジAIデバイスの導入コストと投資回収期間・3年間ROIを自動計算するツール。",
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
          name: "エッジAI ROI計算機",
          item: `${SITE_URL}/tools/edge-ai-roi`,
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

export default function EdgeAiRoiPage() {
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
          <span className="text-gray-600">エッジAI ROI計算機</span>
        </nav>

        {/* ヒーロー */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#1a2332] mb-2 flex items-center gap-2.5">
            <div className="w-1 h-7 bg-blue-600 rounded-full" />
            エッジAI ROI計算機
          </h1>
          <p className="text-gray-500 text-sm ml-3.5 mb-4 leading-relaxed max-w-2xl">
            エッジAIデバイスの初期費用・通信費削減・クラウドAPI費用削減から、投資回収期間と3年間のROIを自動計算します。導入計画の意思決定にお役立てください。
          </p>
          <div className="flex flex-wrap gap-2 ml-3.5">
            <span className="text-[11px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded border border-blue-200 font-semibold">
              ROI / 投資回収期間計算
            </span>
            <span className="text-[11px] bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded border border-teal-200 font-semibold">
              3年間シミュレーション
            </span>
            <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
              無料
            </span>
          </div>
        </div>

        {/* 計算ツール */}
        <EdgeAiRoiCalcClient />

        {/* 使い方ガイド */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            使い方ガイド
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed space-y-2">
            <p><strong>Step 1:</strong> エッジAIデバイス1台あたりの初期費用と導入台数を入力します。</p>
            <p><strong>Step 2:</strong> クラウドからエッジへ移行することで見込まれる月間の通信費削減額とAPI費用削減額を入力します。</p>
            <p><strong>Step 3:</strong> 総初期費用・月間削減額・投資回収期間・3年間ROI・累積削減額がリアルタイムで表示されます。</p>
            <p>実際の導入では、メンテナンス費や人件費も含めて検討することをおすすめします。</p>
          </div>
        </section>

        {/* 関連記事 */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            関連記事
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/articles/edge-ai-board-comparison" className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-sm text-[#1a2332]">エッジAIボード比較</h3>
              <p className="text-xs text-gray-500 mt-1">Raspberry Pi vs Jetson Nano vs Coral の性能・コスト比較</p>
            </Link>
            <Link href="/articles/edge-ai-selection-guide" className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-sm text-[#1a2332]">エッジAI選定ガイド</h3>
              <p className="text-xs text-gray-500 mt-1">用途別の最適なエッジAIデバイスの選び方</p>
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
              href="/tools/ai-inference-cost"
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-bold text-sm text-[#1a2332]">AI推論コスト計算機</h3>
                  <p className="text-xs text-gray-500 mt-0.5">クラウド vs エッジの推論コストを比較</p>
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
