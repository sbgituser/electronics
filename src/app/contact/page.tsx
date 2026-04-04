import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "エレクトロニクス研究所へのお問い合わせページ。記事の内容や電子工作に関するご質問はこちらからどうぞ。",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "お問い合わせ" },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav className="text-xs text-slate-400 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-slate-600">ホーム</Link>
        <span>/</span>
        <span className="text-slate-600">お問い合わせ</span>
      </nav>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">お問い合わせ</h1>

      <div className="bg-white border border-slate-200 rounded-xl p-6 text-slate-600 text-sm leading-relaxed">
        <p className="mb-4">
          ご質問、ご意見、記事の誤りのご指摘など、お気軽にお問い合わせください。
        </p>
        <p className="mb-4">
          現在、お問い合わせフォームを準備中です。
          記事の内容に関するご質問、電子工作でお困りのこと、掲載情報の誤りなど、どんなことでもお気軽にご連絡いただけるよう準備を進めています。
        </p>
        <p className="mb-4">
          当サイト「エレクトロニクス研究所」は、電子工作やフィジカルAIを初心者目線でお届けする情報サイトです。
          Arduino、Raspberry Pi、ESP32などの開発ボードの選び方から、センサーやモーターの使い方、
          実用的な計算ツールまで、幅広いコンテンツを提供しています。
        </p>
        <div className="mt-6 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-400">
            お急ぎの場合は、各記事のコメント欄もご利用ください。
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-blue-600 text-sm hover:underline">
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}
