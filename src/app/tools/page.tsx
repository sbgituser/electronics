import ToolCard from "@/components/tools/ToolCard";

export const metadata = {
  title: "ツール一覧",
  description: "電子工作の初心者向け実用ツール集。開発ボード診断など。",
};

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-[#1a2332] mb-2 flex items-center gap-2.5">
        <div className="w-1 h-7 bg-amber-500 rounded-full" />
        ツール一覧
      </h1>
      <p className="text-gray-500 text-sm mb-8 ml-3.5">
        電子工作をはじめるときに役立つ無料ツールです。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <ToolCard
          href="/tools/led-resistor-calc"
          title="LED抵抗計算"
          description="LED回路に必要な抵抗値をワンクリック計算。Arduino・ESP32・Raspberry Piの電源電圧プリセット対応。E24系列の推奨値を提案します。"
          icon="💡"
        />
        <ToolCard
          href="/tools/resistor-color-code"
          title="抵抗カラーコード"
          description="抵抗のカラーコード（色帯）から抵抗値を読み取るツール。4バンド・5バンド・6バンドに対応。逆引き機能で抵抗値からカラーコードも検索可能。"
          icon="🎨"
        />
        <ToolCard
          href="/tools/ohms-law-calc"
          title="オームの法則計算"
          description="電圧・電流・抵抗・電力の任意2値を入力すると残り2値を自動計算。Arduino/ESP32/Raspberry PiのGPIOプリセット対応。公式輪で12公式を視覚表示。"
          icon="⚡"
        />
        <ToolCard
          href="/tools/voltage-divider-calc"
          title="分圧回路計算"
          description="分圧回路の出力電圧を自動計算。目標電圧から最適な抵抗値の組み合わせも提案。Arduino ADC入力やセンサー電圧調整に便利。"
          icon="🔋"
        />
        <ToolCard
          href="/tools/power-supply-calc"
          title="電源容量計算"
          description="使うセンサーやモーターを選ぶだけで合計消費電流を自動計算。推奨電源を提案し、バッテリー駆動時間も算出します。"
          icon="🔌"
          badge="NEW"
        />
      </div>
    </div>
  );
}
