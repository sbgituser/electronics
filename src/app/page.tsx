import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/articles/ArticleCard";
import ToolCard from "@/components/tools/ToolCard";
import { beginnerRecipes } from "@/data/recipes/beginner";
import RecipeCard from "@/components/recipes/RecipeCard";
import { BookOpen, Cpu, Wifi, FileText, Wrench, FlaskConical } from "lucide-react";

export default function HomePage() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-4 text-amber-400">⚡</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-gray-800">
            電子工作とAIの世界を、
            <br className="hidden sm:block" />
            ゼロから一緒に。
          </h1>
          <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
            完全初心者の管理人が、一つずつ学びながらお届けする
            <br className="hidden sm:block" />
            電子工作×AI入門サイト
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/articles"
              className="bg-white border-2 border-blue-500 text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-50 transition-colors"
            >
              記事を読む
            </Link>
            <Link
              href="/tools/board-picker"
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition-colors"
            >
              ボード診断ツールを試す
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mt-10">
            <div className="flex flex-col items-center gap-1.5 text-gray-400">
              <BookOpen className="w-7 h-7 text-blue-400" />
              <span className="text-xs font-medium">学ぶ</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-gray-400">
              <Cpu className="w-7 h-7 text-green-400" />
              <span className="text-xs font-medium">作る</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-gray-400">
              <Wifi className="w-7 h-7 text-amber-400" />
              <span className="text-xs font-medium">つなぐ</span>
            </div>
          </div>
        </div>
      </section>

      {/* 最新記事 */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            最新記事
          </h2>
          <Link href="/articles" className="text-sm text-blue-600 hover:underline">
            すべて見る →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* レシピブック */}
      <section className="bg-gray-50 px-4 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-green-500" />
              作って学ぶレシピ
            </h2>
            <Link href="/recipes" className="text-sm text-blue-600 hover:underline">
              すべて見る →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {beginnerRecipes.slice(0, 3).map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </div>
      </section>

      {/* ツール紹介 */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-500" />
            実用ツール
          </h2>
          <Link href="/tools" className="text-sm text-blue-600 hover:underline">
            すべて見る →
          </Link>
        </div>
        <ToolCard
          href="/tools/board-picker"
          title="開発ボード診断ツール"
          description="3つの質問に答えるだけで、あなたに最適な開発ボード（Arduino / Raspberry Pi / ESP32 など）がわかります。"
          icon="🔍"
          badge="無料"
        />
      </section>

      {/* コンセプト */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 via-white to-green-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-4">🔰</div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            このサイトについて
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3 text-sm">
            「エレクトロニクス研究所」は、電子工作とフィジカルAIをテーマにした情報サイトです。
          </p>
          <p className="text-gray-600 leading-relaxed mb-6 text-sm">
            管理人は完全な初心者。「Arduinoって何？」というレベルから学んでいます。
            同じように「やってみたいけど何から始めればいいの？」という方の参考になれば嬉しいです。
          </p>
          <Link href="/about" className="text-blue-600 text-sm hover:text-blue-700 font-medium">
            詳しくはAboutページへ →
          </Link>
        </div>
      </section>
    </div>
  );
}
