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
            className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-6"
            aria-label="フッターナビゲーション"
          >
            <div>
              <p className="text-gray-300 text-xs font-semibold mb-2">コンテンツ</p>
              <ul className="space-y-1.5">
                <li><Link href="/articles" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">記事一覧</Link></li>
                <li><Link href="/recipes" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">レシピブック</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-gray-300 text-xs font-semibold mb-2">ツール</p>
              <ul className="space-y-1.5">
                <li><Link href="/tools" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">ツール一覧</Link></li>
                <li><Link href="/tools/board-picker" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">ボード診断</Link></li>
                <li><Link href="/tools/parts-database" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">パーツ辞典</Link></li>
                <li><Link href="/tools/led-resistor-calc" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">LED抵抗計算</Link></li>
                <li><Link href="/tools/ohms-law-calc" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">オームの法則</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-gray-300 text-xs font-semibold mb-2">サイト情報</p>
              <ul className="space-y-1.5">
                <li><Link href="/" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">ホーム</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">概要</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">プライバシーポリシー</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-teal-400 text-xs transition-colors">お問い合わせ</Link></li>
              </ul>
            </div>
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
