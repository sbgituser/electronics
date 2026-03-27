import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "サイト概要",
  description: "エレクトロニクス研究所について。電子工作×フィジカルAIをテーマにした初心者向け情報サイトです。",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        ⚡ エレクトロニクス研究所について
      </h1>

      <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
        <section className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-bold text-slate-800 text-base mb-3">
            サイトのコンセプト
          </h2>
          <p>
            「エレクトロニクス研究所」は、電子工作とフィジカルAIをテーマにした情報サイトです。
          </p>
          <p className="mt-2">
            「素人の自分が電子工作×AIを始めてみた」というテーマのもと、完全初心者目線で学んだことを発信しています。
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-bold text-slate-800 text-base mb-3">
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

        <section className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-bold text-slate-800 text-base mb-3">
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
        <Link href="/" className="text-blue-600 text-sm hover:underline">
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}
