import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">お問い合わせ</h1>

      <div className="bg-white border border-slate-200 rounded-xl p-6 text-slate-600 text-sm leading-relaxed">
        <p className="mb-4">
          ご質問、ご意見、記事の誤りのご指摘など、お気軽にお問い合わせください。
        </p>
        <p>
          現在、フォームを準備中です。しばらくお待ちください。
        </p>
      </div>
    </div>
  );
}
