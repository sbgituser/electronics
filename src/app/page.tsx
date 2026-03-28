import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/articles/ArticleCard";
import ToolCard from "@/components/tools/ToolCard";
import { beginnerRecipes } from "@/data/recipes/beginner";
import RecipeCard from "@/components/recipes/RecipeCard";

export default function HomePage() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">⚡</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            電子工作とAIの世界を、
            <br className="hidden sm:block" />
            ゼロから一緒に。
          </h1>
          <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed">
            完全初心者の管理人が、一つずつ学びながらお届けする
            <br className="hidden sm:block" />
            電子工作×AI入門サイト
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/articles"
              className="bg-white text-slate-900 font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors"
            >
              記事を読む
            </Link>
            <Link
              href="/tools/board-picker"
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
            >
              ボード診断ツールを試す
            </Link>
          </div>
        </div>
      </section>

      {/* 最新記事 */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">最新記事</h2>
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
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">作って学ぶレシピ</h2>
          <Link href="/recipes" className="text-sm text-blue-600 hover:underline">
            すべて見る →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {beginnerRecipes.slice(0, 3).map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      </section>

      {/* ツール紹介 */}
      <section className="bg-slate-50 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">実用ツール</h2>
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
        </div>
      </section>

      {/* コンセプト */}
      <section className="max-w-3xl mx-auto px-4 py-14">
        <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">
          このサイトについて
        </h2>
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 text-slate-600 text-sm leading-relaxed">
          <p>
            「エレクトロニクス研究所」は、電子工作とフィジカルAIをテーマにした情報サイトです。
          </p>
          <p>
            管理人は完全な初心者。「Arduinoって何？」というレベルから学んでいます。
            同じように「やってみたいけど何から始めればいいの？」という方の参考になれば嬉しいです。
          </p>
          <p>
            素人目線でのレビューと使いやすさを最重視しています。
            難しい専門用語をなるべく使わず、失敗談も正直に書いていきます。
          </p>
          <div className="text-center mt-4">
            <Link href="/about" className="text-blue-600 text-sm hover:underline">
              詳しくはAboutページへ →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
