import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a2332] text-gray-300 pt-12 pb-8 px-4 text-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 bg-teal-500 rounded-md flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-base">エレクトロニクス研究所</span>
            </div>
            <p className="text-gray-500 text-xs max-w-xs leading-relaxed">
              電子工作とAIの世界を、ゼロから一緒に。
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-8 gap-y-3"
            aria-label="フッターナビゲーション"
          >
            <Link href="/" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">
              ホーム
            </Link>
            <Link href="/articles" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">
              記事
            </Link>
            <Link href="/recipes" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">
              レシピ
            </Link>
            <Link href="/tools" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">
              ツール
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">
              概要
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">
              お問い合わせ
            </Link>
          </nav>
        </div>

        <div className="border-t border-gray-700/50 pt-6 text-center text-xs text-gray-500 space-y-1.5">
          <p>&copy; {year} kuras-plus. All rights reserved.</p>
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
