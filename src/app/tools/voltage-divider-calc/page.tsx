import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import VoltageDividerCalcClient from "@/components/tools/VoltageDividerCalcClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "分圧回路計算ツール | 抵抗2本で電圧を自由に変換",
  description:
    "分圧回路の出力電圧を自動計算。目標電圧から最適な抵抗値の組み合わせも提案。Arduino ADC入力やセンサー電圧調整に便利。",
  alternates: { canonical: `${SITE_URL}/tools/voltage-divider-calc` },
  openGraph: {
    title: "分圧回路計算ツール | 抵抗2本で電圧を自由に変換",
    description:
      "分圧回路の出力電圧を自動計算。目標電圧から最適な抵抗値の組み合わせも提案。Arduino ADC入力やセンサー電圧調整に便利。",
    url: `${SITE_URL}/tools/voltage-divider-calc`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const faqs = [
  {
    question: "分圧回路とは何ですか？",
    answer:
      "分圧回路は、2本の抵抗（R1とR2）を直列に接続し、その接続点から出力電圧を取り出す回路です。Vout = Vin × R2 / (R1 + R2) の式で出力電圧が決まります。電圧の変換やADC入力のレベル調整に広く使われます。",
  },
  {
    question: "分圧回路でArduinoの5V信号をESP32の3.3Vに変換できますか？",
    answer:
      "はい、可能です。R1=10kΩ、R2=20kΩの組み合わせで5Vを約3.33Vに分圧できます。ただし、信号の応答速度が必要な場合はレベルシフターICの使用を推奨します。分圧回路は静的な電圧変換やADC入力に適しています。",
  },
  {
    question: "E24系列とは何ですか？",
    answer:
      "E24系列はJIS規格で定められた抵抗値の標準数列です。1桁あたり24種類の値（1.0, 1.1, 1.2, ... 9.1）があり、市販の抵抗はこの系列の値で販売されています。逆引きモードではE24系列から最適な組み合わせを提案します。",
  },
  {
    question: "分圧回路の抵抗値はどのくらいが適切ですか？",
    answer:
      "一般的に1kΩ〜100kΩの範囲が適切です。抵抗値が小さすぎると無駄な電力消費が増え、大きすぎると出力インピーダンスが高くなり後段の回路に影響します。ADC入力用途では10kΩ〜100kΩ程度が推奨されます。",
  },
  {
    question: "バッテリー電圧の監視に分圧回路を使えますか？",
    answer:
      "はい、リチウムイオン電池（最大4.2V）の電圧をADCの入力範囲（3.3Vなど）に収めるために分圧回路がよく使われます。R1=10kΩ、R2=33kΩなどで4.2Vを約3.22Vに分圧できます。常時電流が流れるため、高い抵抗値を選んで消費電力を抑えましょう。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "分圧回路計算ツール",
      url: `${SITE_URL}/tools/voltage-divider-calc`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "分圧回路の出力電圧を自動計算。目標電圧からE24系列の最適な抵抗値の組み合わせも提案。",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "ツール", item: `${SITE_URL}/tools` },
        {
          "@type": "ListItem",
          position: 3,
          name: "分圧回路計算",
          item: `${SITE_URL}/tools/voltage-divider-calc`,
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

export default function VoltageDividerCalcPage() {
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
          <span className="text-gray-600">分圧回路計算</span>
        </nav>

        {/* ヒーロー */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#1a2332] mb-2 flex items-center gap-2.5">
            <div className="w-1 h-7 bg-green-600 rounded-full" />
            分圧回路計算ツール
          </h1>
          <p className="text-gray-500 text-sm ml-3.5 mb-4 leading-relaxed max-w-2xl">
            分圧回路の出力電圧をリアルタイム計算します。目標電圧を指定すれば、E24系列から最適な抵抗値の組み合わせを提案。Arduino
            ADC入力やセンサー電圧調整、バッテリー電圧監視に便利です。
          </p>
          <div className="flex flex-wrap gap-2 ml-3.5">
            <span className="text-[11px] bg-green-50 text-green-700 px-2.5 py-0.5 rounded border border-green-200 font-semibold">
              正引き / 逆引き対応
            </span>
            <span className="text-[11px] bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded border border-teal-200 font-semibold">
              E24系列 最適R値提案
            </span>
            <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
              無料
            </span>
          </div>
        </div>

        {/* 計算ツール */}
        <VoltageDividerCalcClient />

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 bg-green-600 rounded-full" />
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
            <div className="w-1 h-6 bg-green-600 rounded-full" />
            関連ツール
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/tools/ohms-law-calc"
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-bold text-sm text-[#1a2332]">オームの法則計算ツール</h3>
                  <p className="text-xs text-gray-500 mt-0.5">電圧・電流・抵抗・電力を自動計算</p>
                </div>
              </div>
            </Link>
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
          </div>
        </section>
      </div>
    </>
  );
}
