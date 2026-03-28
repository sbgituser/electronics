import ToolCard from "@/components/tools/ToolCard";

export const metadata = {
  title: "ツール一覧",
  description: "電子工作の初心者向け実用ツール集。開発ボード診断など。",
};

export default function ToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">ツール一覧</h1>
      <p className="text-slate-500 text-sm mb-8">
        電子工作をはじめるときに役立つ無料ツールです。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ToolCard
          href="/tools/board-picker"
          title="開発ボード診断ツール"
          description="3つの質問に答えるだけで、あなたに最適な開発ボードがわかります。Arduino / Raspberry Pi / ESP32 / M5Stack など5ボードを比較。"
          icon="🔍"
          badge="無料"
        />
        <ToolCard
          href="/tools/parts-database"
          title="パーツ辞典"
          description="電子工作で使うパーツをまとめた辞典。センサー、モーター、受動部品などのスペックを初心者向けに解説します。"
          icon="📋"
          badge="32種"
        />
      </div>
    </div>
  );
}
