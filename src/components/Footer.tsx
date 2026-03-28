import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 mt-20 py-10 px-4 text-sm">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">
          <div>
            <div className="text-white font-bold text-base mb-1">
              ⚡ エレクトロニクス研究所
            </div>
            <p className="text-slate-500 text-xs">
              電子工作とAIの世界を、ゼロから一緒に。
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2"
            aria-label="フッターナビゲーション"
          >
            <Link
              href="/"
              className="text-slate-400 hover:text-white text-xs transition-colors"
            >
              ホーム
            </Link>
            <Link
              href="/articles"
              className="text-slate-400 hover:text-white text-xs transition-colors"
            >
              記事
            </Link>
            <Link
              href="/recipes"
              className="text-slate-400 hover:text-white text-xs transition-colors"
            >
              レシピ
            </Link>
            <Link
              href="/tools"
              className="text-slate-400 hover:text-white text-xs transition-colors"
            >
              ツール
            </Link>
            <Link
              href="/about"
              className="text-slate-400 hover:text-white text-xs transition-colors"
            >
              概要
            </Link>
            <Link
              href="/privacy"
              className="text-slate-400 hover:text-white text-xs transition-colors"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/contact"
              className="text-slate-400 hover:text-white text-xs transition-colors"
            >
              お問い合わせ
            </Link>
          </nav>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-600 space-y-1">
          <p>© {year} kuras-plus. All rights reserved.</p>
          <p>
            本サイトはAmazon
            アソシエイト・プログラムに参加しています。
            表示される価格は参考値であり、実際の価格はAmazonでご確認ください。
          </p>
        </div>
      </div>
    </footer>
  );
}
