import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/articles/ArticleCard";
import ToolCard from "@/components/tools/ToolCard";
import { beginnerRecipes } from "@/data/recipes/beginner";
import RecipeCard from "@/components/recipes/RecipeCard";
import { BookOpen, ChevronRight, Zap, CircuitBoard, BrainCircuit } from "lucide-react";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/site";

export default function HomePage() {
  const articles = getAllArticles().slice(0, 3);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "エレクトロニクス研究所",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: "kuras-plus",
      url: "https://kuras-plus.com",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "kuras-plus",
    url: "https://kuras-plus.com",
    logo: `${SITE_URL}/icon-512.png`,
    sameAs: [],
    description: SITE_DESCRIPTION,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {/* Hero - SORACOM風ティールグラデーション */}
      <section className="relative bg-gradient-to-br from-[#006064] via-[#00838F] to-[#00ACC1] py-20 px-4 overflow-hidden">
        {/* 装飾パターン */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border border-white/30 rounded-full" />
          <div className="absolute top-32 right-32 w-40 h-40 border border-white/20 rounded-full" />
          <div className="absolute bottom-10 left-10 w-48 h-48 border border-white/20 rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-10">
            {/* Left: text */}
            <div className="flex-1 min-w-0">
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

            {/* Right: IoT illustration */}
            <div className="hidden lg:flex flex-shrink-0 items-center justify-center w-80">
              <svg viewBox="0 0 320 260" width="320" height="260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                {/* Connection lines */}
                <line x1="160" y1="130" x2="60" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>
                <line x1="160" y1="130" x2="260" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>
                <line x1="160" y1="130" x2="60" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>
                <line x1="160" y1="130" x2="260" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>
                <line x1="160" y1="130" x2="160" y2="30" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>
                <line x1="160" y1="130" x2="50" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>
                <line x1="160" y1="130" x2="270" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>

                {/* Pulse rings on center */}
                <circle cx="160" cy="130" r="48" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                <circle cx="160" cy="130" r="68" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>

                {/* Center: microcontroller */}
                <rect x="130" y="100" width="60" height="60" rx="6" fill="rgba(0,131,143,0.7)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                {/* MCU pins left */}
                <rect x="118" y="110" width="12" height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
                <rect x="118" y="120" width="12" height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
                <rect x="118" y="130" width="12" height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
                <rect x="118" y="140" width="12" height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
                {/* MCU pins right */}
                <rect x="190" y="110" width="12" height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
                <rect x="190" y="120" width="12" height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
                <rect x="190" y="130" width="12" height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
                <rect x="190" y="140" width="12" height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
                {/* MCU inner detail */}
                <rect x="140" y="110" width="40" height="12" rx="2" fill="rgba(255,255,255,0.12)"/>
                <rect x="140" y="126" width="18" height="8" rx="2" fill="rgba(255,255,255,0.1)"/>
                <rect x="162" y="126" width="18" height="8" rx="2" fill="rgba(255,255,255,0.1)"/>
                <rect x="140" y="138" width="40" height="12" rx="2" fill="rgba(255,255,255,0.12)"/>
                {/* MCU label */}
                <text x="160" y="133" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7" fontFamily="monospace" fontWeight="bold">MCU</text>

                {/* Top: Cloud/WiFi node */}
                <circle cx="160" cy="28" r="18" fill="rgba(0,172,193,0.4)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                <path d="M152 31 Q160 22 168 31" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M155 35 Q160 28 165 35" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="160" cy="37" r="1.5" fill="rgba(255,255,255,0.9)"/>

                {/* Top-left: Temperature sensor */}
                <circle cx="58" cy="58" r="16" fill="rgba(0,172,193,0.35)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
                <rect x="54" y="52" width="8" height="14" rx="4" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2"/>
                <rect x="55.5" y="60" width="5" height="5" rx="0" fill="rgba(255,255,255,0.7)"/>
                <line x1="64" y1="54" x2="67" y2="54" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                <line x1="64" y1="57" x2="67" y2="57" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                <line x1="64" y1="60" x2="67" y2="60" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>

                {/* Top-right: LED/light node */}
                <circle cx="262" cy="58" r="16" fill="rgba(0,172,193,0.35)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
                <circle cx="262" cy="57" r="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"/>
                <line x1="262" y1="48" x2="262" y2="45" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                <line x1="268" y1="51" x2="271" y2="49" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                <line x1="256" y1="51" x2="253" y2="49" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                <rect x="258" y="63" width="8" height="3" rx="0" fill="rgba(255,255,255,0.4)"/>

                {/* Left: Button/input node */}
                <circle cx="48" cy="130" r="16" fill="rgba(0,172,193,0.35)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
                <rect x="41" y="123" width="14" height="14" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
                <rect x="44" y="126" width="8" height="8" rx="1" fill="rgba(255,255,255,0.5)"/>

                {/* Right: Motor/servo node */}
                <circle cx="272" cy="130" r="16" fill="rgba(0,172,193,0.35)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
                <circle cx="272" cy="130" r="7" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
                <line x1="272" y1="123" x2="272" y2="118" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                <path d="M272 130 L278 125" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>

                {/* Bottom-left: Sensor node */}
                <circle cx="58" cy="202" r="16" fill="rgba(0,172,193,0.35)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
                <rect x="51" y="196" width="14" height="12" rx="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
                <line x1="55" y1="202" x2="65" y2="202" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
                <line x1="55" y1="199" x2="65" y2="199" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                <line x1="55" y1="205" x2="65" y2="205" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                <rect x="52" y="208" width="12" height="3" rx="1" fill="rgba(255,255,255,0.3)"/>

                {/* Bottom-right: Display node */}
                <circle cx="262" cy="202" r="16" fill="rgba(0,172,193,0.35)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
                <rect x="254" y="196" width="16" height="10" rx="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
                <rect x="256" y="198" width="5" height="2" rx="0.5" fill="rgba(255,255,255,0.6)"/>
                <rect x="256" y="202" width="8" height="2" rx="0.5" fill="rgba(255,255,255,0.4)"/>
                <rect x="262" y="207" width="4" height="3" rx="0" fill="rgba(255,255,255,0.3)"/>

                {/* Animated data dots on lines */}
                <circle cx="110" cy="95" r="2.5" fill="rgba(255,255,255,0.6)">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M0,0 L100,35"/>
                </circle>
                <circle cx="0" cy="0" r="2.5" fill="rgba(255,255,255,0.6)">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M160,130 L60,200"/>
                </circle>
                <circle cx="0" cy="0" r="2.5" fill="rgba(255,255,255,0.6)">
                  <animateMotion dur="2s" repeatCount="indefinite" path="M160,130 L270,130"/>
                </circle>
                <circle cx="0" cy="0" r="2.5" fill="rgba(255,255,255,0.6)">
                  <animateMotion dur="3.5s" repeatCount="indefinite" path="M160,130 L160,30"/>
                </circle>
              </svg>
            </div>
          </div>

          {/* Feature indicators */}
          <div className="flex gap-8 mt-14 pt-8 border-t border-white/15">
            <Link href="/articles" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <BookOpen className="w-5 h-5 text-teal-200" />
              </div>
              <div>
                <span className="text-white text-sm font-semibold block">学ぶ</span>
                <span className="text-teal-200/70 text-xs">入門記事</span>
              </div>
            </Link>
            <Link href="/recipes" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <CircuitBoard className="w-5 h-5 text-teal-200" />
              </div>
              <div>
                <span className="text-white text-sm font-semibold block">作る</span>
                <span className="text-teal-200/70 text-xs">レシピ集</span>
              </div>
            </Link>
            <Link href="/tools" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <BrainCircuit className="w-5 h-5 text-teal-200" />
              </div>
              <div>
                <span className="text-white text-sm font-semibold block">つなぐ</span>
                <span className="text-teal-200/70 text-xs">AI連携</span>
              </div>
            </Link>
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
