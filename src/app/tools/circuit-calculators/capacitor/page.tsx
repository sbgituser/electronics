import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import CapacitorCalcClient from "@/components/tools/CapacitorCalcClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "コンデンサ計算ツール | 合成容量・RC時定数を計算",
  description:
    "コンデンサの直列・並列の合成容量とRC時定数を自動計算。充放電時間の目安もわかります。電子工作の回路設計に便利なブラウザ完結ツール。",
  alternates: { canonical: `${SITE_URL}/tools/circuit-calculators/capacitor` },
  openGraph: {
    title: "コンデンサ計算ツール | 合成容量・RC時定数を計算",
    description:
      "コンデンサの直列・並列の合成容量とRC時定数を自動計算。充放電時間の目安もわかります。",
    url: `${SITE_URL}/tools/circuit-calculators/capacitor`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const faqs = [
  {
    question: "コンデンサの直列接続と並列接続の違いは？",
    answer:
      "直列接続では合成容量は個々のコンデンサより小さくなります（1/C = 1/C1 + 1/C2 + ...）。並列接続では容量が合計されます（C = C1 + C2 + ...）。直列は耐圧を上げたいとき、並列は容量を増やしたいときに使います。",
  },
  {
    question: "RC時定数とは何ですか？",
    answer:
      "RC時定数（τ = R × C）は、抵抗とコンデンサからなるRC回路で、コンデンサが約63.2%まで充電（または36.8%まで放電）される時間です。5τ経過すると99.3%充電（またはほぼ完全放電）されます。",
  },
  {
    question: "コンデンサの容量の読み方は？",
    answer:
      "セラミックコンデンサの「104」は「10 × 10^4 pF = 100,000 pF = 100 nF = 0.1 μF」を意味します。最初の2桁が有効数字、3桁目が10の乗数です。電解コンデンサは本体にμF単位で直接表示されています。",
  },
  {
    question: "バイパスコンデンサ（パスコン）は何のために使いますか？",
    answer:
      "ICの電源ピンとGND間に0.1μF（100nF）のセラミックコンデンサを配置することで、高周波ノイズを除去し回路を安定させます。デジタルICを使う場合はほぼ必須です。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "コンデンサ計算ツール",
      url: `${SITE_URL}/tools/circuit-calculators/capacitor`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "コンデンサの直列・並列の合成容量とRC時定数を自動計算するツール",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "ツール", item: `${SITE_URL}/tools` },
        {
          "@type": "ListItem",
          position: 3,
          name: "回路計算ツール",
          item: `${SITE_URL}/tools/circuit-calculators`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "コンデンサ計算",
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

export default function CapacitorCalcPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <nav className="text-xs text-gray-400 mb-6" aria-label="パンくずリスト">
          <Link href="/" className="hover:text-[#00838F]">ホーム</Link>
          <span className="mx-1.5">/</span>
          <Link href="/tools" className="hover:text-[#00838F]">ツール</Link>
          <span className="mx-1.5">/</span>
          <Link href="/tools/circuit-calculators" className="hover:text-[#00838F]">回路計算ツール</Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-600">コンデンサ計算</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#1a2332] mb-2 flex items-center gap-2.5">
            <div className="w-1 h-7 bg-amber-500 rounded-full" />
            コンデンサ計算ツール
          </h1>
          <p className="text-gray-500 text-sm ml-3.5 mb-4 leading-relaxed max-w-2xl">
            コンデンサの直列・並列の合成容量とRC時定数を自動計算します。容量と抵抗値を入力するだけで、充放電の時間目安もわかります。
          </p>
          <div className="flex flex-wrap gap-2 ml-3.5">
            <span className="text-[11px] bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded border border-amber-200 font-semibold">
              直列・並列対応
            </span>
            <span className="text-[11px] bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded border border-teal-200 font-semibold">
              RC時定数計算
            </span>
            <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
              無料
            </span>
          </div>
        </div>

        <CapacitorCalcClient />

        {/* 使い方ガイド */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-amber-500 rounded-full" />
            使い方ガイド
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed space-y-2">
            <p><strong>合成容量計算:</strong> 接続方式（直列・並列）を選び、コンデンサの容量を入力すると合成容量が計算されます。最大5個まで追加可能です。</p>
            <p><strong>RC時定数計算:</strong> 抵抗値とコンデンサ容量を入力すると、時定数(τ)と充放電時間の目安（1τ〜5τ）が表示されます。</p>
            <p>タイマー回路の設計やフィルタ回路の周波数特性の把握に活用してください。</p>
          </div>
        </section>

        {/* 関連記事 */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-amber-500 rounded-full" />
            関連記事
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/articles/ohms-law-explained-with-examples" className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-sm text-[#1a2332]">オームの法則を実例で理解する</h3>
              <p className="text-xs text-gray-500 mt-1">RC回路の計算にも必要な基礎知識</p>
            </Link>
            <Link href="/articles/led-circuit-beginners-guide" className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-sm text-[#1a2332]">LED回路の作り方入門</h3>
              <p className="text-xs text-gray-500 mt-1">抵抗値計算から点灯まで完全ガイド</p>
            </Link>
          </div>
        </section>

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
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">
                    ▼
                  </span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/ohms-law-calc", icon: "⚡", title: "オームの法則計算", desc: "V / I / R / P を計算" },
              { href: "/tools/led-resistor-calc", icon: "💡", title: "LED抵抗計算", desc: "LED回路の抵抗値を計算" },
              { href: "/tools/resistor-color-code", icon: "🌈", title: "抵抗カラーコード", desc: "色から抵抗値を読み取り" },
              { href: "/tools/voltage-divider-calc", icon: "🔋", title: "分圧回路計算", desc: "分圧抵抗の設計" },
              { href: "/tools/power-supply-calc", icon: "🔌", title: "消費電力計算", desc: "バッテリー持続時間推定" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm text-[#1a2332]">{tool.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{tool.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
