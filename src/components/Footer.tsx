import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20 py-10 px-4 text-sm">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">
          <div>
            <div className="text-gray-700 font-bold text-base mb-1">
              <span className="text-amber-500">⚡</span> エレクトロニクス研究所
            </div>
            <p className="text-gray-500 text-xs">
              電子工作とAIの世界を、ゼロから一緒に。
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2"
            aria-label="フッターナビゲーション"
          >
            <Link
              href="/"
              className="text-gray-500 hover:text-blue-600 text-xs transition-colors"
            >
              ホーム
            </Link>
            <Link
              href="/articles"
              className="text-gray-500 hover:text-blue-600 text-xs transition-colors"
            >
              記事
            </Link>
            <Link
              href="/recipes"
              className="text-gray-500 hover:text-blue-600 text-xs transition-colors"
            >
              レシピ
            </Link>
            <Link
              href="/tools"
              className="text-gray-500 hover:text-blue-600 text-xs transition-colors"
            >
              ツール
            </Link>
            <Link
              href="/about"
              className="text-gray-500 hover:text-blue-600 text-xs transition-colors"
            >
              概要
            </Link>
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-blue-600 text-xs transition-colors"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/contact"
              className="text-gray-500 hover:text-blue-600 text-xs transition-colors"
            >
              お問い合わせ
            </Link>
          </nav>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center text-xs text-gray-400 space-y-1">
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
