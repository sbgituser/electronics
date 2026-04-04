import type { Metadata } from "next";
import Link from "next/link";
import { Zap, User, ShoppingCart, ChevronLeft } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "サイト概要",
  description: "エレクトロニクス研究所について。電子工作×フィジカルAIをテーマにした初心者向け情報サイトです。",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "サイト概要 | エレクトロニクス研究所",
    description: "エレクトロニクス研究所について。電子工作×フィジカルAIをテーマにした初心者向け情報サイトです。",
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "サイト概要" },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* パンくずリスト */}
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-[#00838F] transition-colors">ホーム</Link>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <span className="text-gray-600">サイト概要</span>
      </nav>
      <h1 className="text-2xl font-bold text-[#1a2332] mb-8 flex items-center gap-2.5">
        <div className="w-1 h-7 bg-[#00838F] rounded-full" />
        エレクトロニクス研究所について
      </h1>

      <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="font-bold text-[#1a2332] text-base mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#00838F]" />
            サイトのコンセプト
          </h2>
          <p>
            「エレクトロニクス研究所」は、電子工作とフィジカルAIをテーマにした情報サイトです。
          </p>
          <p className="mt-2">
            「素人の自分が電子工作×AIを始めてみた」というテーマのもと、完全初心者目線で学んだことを発信しています。
          </p>
        </section>

        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="font-bold text-[#1a2332] text-base mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-[#00838F]" />
            管理人について
          </h2>
          <p>
            プログラミングの経験はありますが、電子工作は完全初心者です。
            「Arduinoって何？」というレベルから、実際に手を動かしながら学んでいます。
          </p>
          <p className="mt-2">
            失敗談も正直に書いていくつもりです。同じように悩む方の参考になれば嬉しいです。
          </p>
        </section>

        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="font-bold text-[#1a2332] text-base mb-3 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-[#00838F]" />
            Amazonアソシエイトについて
          </h2>
          <p>
            本サイトはAmazon アソシエイト・プログラムに参加しています。
            紹介商品のリンクを経由してご購入いただくと、サイト運営の費用に充てられます。
            掲載価格は参考値であり、実際の価格はAmazonでご確認ください。
          </p>
        </section>
      </div>

      <div className="mt-8">
        <Link href="/" className="inline-flex items-center text-[#00838F] text-sm hover:text-[#006064] transition-colors font-medium">
          <ChevronLeft className="w-4 h-4" />
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
