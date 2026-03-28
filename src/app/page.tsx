import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/articles/ArticleCard";
import ToolCard from "@/components/tools/ToolCard";
import { beginnerRecipes } from "@/data/recipes/beginner";
import RecipeCard from "@/components/recipes/RecipeCard";
import { BookOpen, Cpu, Wifi, FileText, Wrench, FlaskConical, ChevronRight, Zap, CircuitBoard, BrainCircuit } from "lucide-react";

export default function HomePage() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <div>
      {/* Hero - SORACOM風ティールグラデーション */}
      <section className="relative bg-gradient-to-br from-[#006064] via-[#00838F] to-[#00ACC1] py-20 px-4 overflow-hidden">
        {/* 装飾パターン */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border border-white/30 rounded-full" />
          <div className="absolute top-32 right-32 w-40 h-40 border border-white/20 rounded-full" />
          <div className="absolute bottom-10 left-10 w-48 h-48 border border-white/20 rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white/15 backdrop-blur rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-teal-200" />
              </div>
              <span className="text-teal-200 text-sm font-medium tracking-wide">Electronics Lab by kuras-plus</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight text-white">
              電子工作とAIの世界を、
              <br />
              ゼロから一緒に。
            </h1>
            <p className="text-teal-100 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
              完全初心者の管理人が、一つずつ学びながらお届けする電子工作×AI入門サイト
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center bg-white text-[#00838F] font-semibold py-3 px-7 rounded hover:bg-teal-50 transition-colors text-sm"
              >
                記事を読む
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
              <Link
                href="/tools/board-picker"
                className="inline-flex items-center justify-center border border-white/40 text-white font-semibold py-3 px-7 rounded hover:bg-white/10 transition-colors text-sm"
              >
                ボード診断ツールを試す
              </Link>
            </div>
          </div>

          {/* Feature indicators */}
          <div className="flex gap-8 mt-14 pt-8 border-t border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-teal-200" />
              </div>
              <div>
                <span className="text-white text-sm font-semibold block">学ぶ</span>
                <span className="text-teal-200/70 text-xs">入門記事</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <CircuitBoard className="w-5 h-5 text-teal-200" />
              </div>
              <div>
                <span className="text-white text-sm font-semibold block">作る</span>
                <span className="text-teal-200/70 text-xs">レシピ集</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-teal-200" />
              </div>
              <div>
                <span className="text-white text-sm font-semibold block">つなぐ</span>
                <span className="text-teal-200/70 text-xs">AI連携</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 最新記事 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-[#1a2332] flex items-center gap-2.5">
              <div className="w-1 h-6 bg-[#00838F] rounded-full" />
              最新記事
            </h2>
            <p className="text-sm text-gray-500 mt-1 ml-3.5">最新の技術解説・レビュー記事</p>
          </div>
          <Link href="/articles" className="text-sm text-[#00838F] hover:text-[#006064] font-medium flex items-center gap-1 transition-colors">
            すべて見る
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* レシピブック */}
      <section className="bg-[#F5F7FA] px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-[#1a2332] flex items-center gap-2.5">
                <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                作って学ぶレシピ
              </h2>
              <p className="text-sm text-gray-500 mt-1 ml-3.5">ステップバイステップの電子工作チュートリアル</p>
            </div>
            <Link href="/recipes" className="text-sm text-[#00838F] hover:text-[#006064] font-medium flex items-center gap-1 transition-colors">
              すべて見る
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerRecipes.slice(0, 3).map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </div>
      </section>

      {/* ツール紹介 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-[#1a2332] flex items-center gap-2.5">
              <div className="w-1 h-6 bg-amber-500 rounded-full" />
              実用ツール
            </h2>
            <p className="text-sm text-gray-500 mt-1 ml-3.5">あなたの電子工作をサポート</p>
          </div>
          <Link href="/tools" className="text-sm text-[#00838F] hover:text-[#006064] font-medium flex items-center gap-1 transition-colors">
            すべて見る
            <ChevronRight className="w-4 h-4" />
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
      <section className="bg-[#1a2332] py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-5">
            <Zap className="w-6 h-6 text-teal-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-4">
            このサイトについて
          </h2>
          <p className="text-gray-400 leading-relaxed mb-3 text-sm">
            「エレクトロニクス研究所」は、電子工作とフィジカルAIをテーマにした情報サイトです。
          </p>
          <p className="text-gray-400 leading-relaxed mb-6 text-sm">
            管理人は完全な初心者。「Arduinoって何？」というレベルから学んでいます。
            同じように「やってみたいけど何から始めればいいの？」という方の参考になれば嬉しいです。
          </p>
          <Link href="/about" className="inline-flex items-center text-teal-400 text-sm hover:text-teal-300 font-medium transition-colors">
            詳しくはAboutページへ
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
