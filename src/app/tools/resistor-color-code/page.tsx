import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { COLOR_BANDS } from "@/constants/resistorColorCode";
import ResistorColorCodeClient from "@/components/tools/ResistorColorCodeClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: `抵抗カラーコード解読ツール | 色帯から抵抗値を即座に計算 — ${SITE_NAME}`,
  description:
    "抵抗のカラーコード（色帯）から抵抗値を読み取るツール。4バンド・5バンド・6バンドに対応。逆引き機能で抵抗値からカラーコードも検索可能。",
  openGraph: {
    title: "抵抗カラーコード解読ツール | 色帯から抵抗値を即座に計算",
    description:
      "抵抗のカラーコード（色帯）から抵抗値を読み取るツール。4バンド・5バンド・6バンドに対応。逆引き機能で抵抗値からカラーコードも検索可能。",
    url: `${SITE_URL}/tools/resistor-color-code`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const faqs = [
  {
    question: "抵抗のカラーコードとは何ですか？",
    answer:
      "カラーコードは、抵抗器の表面に塗られた色帯で抵抗値・許容差・温度係数を表す国際的な規格です。数字が小さくて読めない抵抗でも、色の組み合わせから値を読み取ることができます。",
  },
  {
    question: "4バンドと5バンドの違いは何ですか？",
    answer:
      "4バンド抵抗は有効数字2桁（例: 47×100Ω = 4.7kΩ）で、一般的な5%精度の抵抗に使われます。5バンド抵抗は有効数字3桁（例: 470×10Ω = 4.70kΩ）で、1%以下の高精度抵抗に使われます。桁数が多い分、より正確な値を表現できます。",
  },
  {
    question: "6バンドの抵抗器はどういう場合に使いますか？",
    answer:
      "6バンド抵抗は5バンドに加えて温度係数（ppm/°C）を表す帯が追加されています。温度変化による抵抗値の変動が問題になる精密回路や計測器で使用されます。一般的な電子工作では4バンドまたは5バンドで十分です。",
  },
  {
    question: "カラーコードの読み方の向きはどう判断しますか？",
    answer:
      "許容差帯（金色や銀色）が右端に来るように持ちます。また、許容差帯は他の帯より少し離れている場合が多いです。4バンド抵抗で金帯が見えたら、それを右端にして左から読みます。",
  },
  {
    question: "E24系列・E96系列とは何ですか？",
    answer:
      "E系列はIEC 60063で規定された抵抗値の標準数列です。E24は1桁あたり24段階（許容差5%向け）、E96は96段階（許容差1%向け）の値があります。市販の抵抗はこれらの系列値で製造・販売されています。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "抵抗カラーコード解読ツール",
      url: `${SITE_URL}/tools/resistor-color-code`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "抵抗のカラーコード（色帯）から抵抗値を読み取るツール。4バンド・5バンド・6バンド対応。逆引き機能付き。",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "ツール", item: `${SITE_URL}/tools` },
        {
          "@type": "ListItem",
          position: 3,
          name: "抵抗カラーコード",
          item: `${SITE_URL}/tools/resistor-color-code`,
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

function formatMultiplier(m: number | null): string {
  if (m === null) return "—";
  if (m >= 1_000_000_000) return "×1GΩ";
  if (m >= 1_000_000) return `×${m / 1_000_000}MΩ`;
  if (m >= 1_000) return `×${m / 1_000}kΩ`;
  if (m === 1) return "×1Ω";
  if (m === 0.1) return "×0.1Ω";
  if (m === 0.01) return "×0.01Ω";
  return `×${m}`;
}

export default function ResistorColorCodePage() {
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
          <span className="text-gray-600">抵抗カラーコード</span>
        </nav>

        {/* ヒーロー */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#1a2332] mb-2 flex items-center gap-2.5">
            <div className="w-1 h-7 bg-cyan-500 rounded-full" />
            抵抗カラーコード解読ツール
          </h1>
          <p className="text-gray-500 text-sm ml-3.5 mb-4 leading-relaxed max-w-2xl">
            抵抗器の色帯から抵抗値を即座に読み取れます。4バンド・5バンド・6バンドに対応。逆引き機能で抵抗値からカラーコードを調べることもできます。
          </p>
          <div className="flex flex-wrap gap-2 ml-3.5">
            <span className="text-[11px] bg-cyan-50 text-cyan-700 px-2.5 py-0.5 rounded border border-cyan-200 font-semibold">
              4/5/6バンド対応
            </span>
            <span className="text-[11px] bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded border border-teal-200 font-semibold">
              逆引き機能
            </span>
            <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
              無料
            </span>
          </div>
        </div>

        {/* ツール本体 */}
        <ResistorColorCodeClient />

        {/* カラーコード早見表 */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-cyan-500 rounded-full" />
            カラーコード早見表
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-3 py-2 border border-gray-200 font-semibold">色</th>
                  <th className="text-left px-3 py-2 border border-gray-200 font-semibold">英語</th>
                  <th className="text-center px-3 py-2 border border-gray-200 font-semibold">数値</th>
                  <th className="text-center px-3 py-2 border border-gray-200 font-semibold">乗数</th>
                  <th className="text-center px-3 py-2 border border-gray-200 font-semibold">許容差</th>
                  <th className="text-center px-3 py-2 border border-gray-200 font-semibold">温度係数</th>
                </tr>
              </thead>
              <tbody>
                {COLOR_BANDS.map((band) => (
                  <tr key={band.colorEn} className="hover:bg-gray-50">
                    <td className="px-3 py-2 border border-gray-200">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-5 h-5 rounded border inline-block shrink-0"
                          style={{
                            backgroundColor: band.hex,
                            borderColor: band.hex === "#FFFFFF" ? "#ccc" : band.hex === "#000000" ? "#000" : band.hex,
                          }}
                        />
                        {band.color}
                      </div>
                    </td>
                    <td className="px-3 py-2 border border-gray-200 text-gray-600">{band.colorEn}</td>
                    <td className="px-3 py-2 border border-gray-200 text-center font-mono">{band.digit ?? "—"}</td>
                    <td className="px-3 py-2 border border-gray-200 text-center font-mono text-xs">{formatMultiplier(band.multiplier)}</td>
                    <td className="px-3 py-2 border border-gray-200 text-center font-mono">{band.tolerance !== null ? `±${band.tolerance}%` : "—"}</td>
                    <td className="px-3 py-2 border border-gray-200 text-center font-mono">{band.tempCoeff !== null ? `${band.tempCoeff} ppm` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-cyan-500 rounded-full" />
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
            <div className="w-1 h-6 bg-cyan-500 rounded-full" />
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
