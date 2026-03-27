import type { Metadata } from "next";
import BoardPicker from "@/components/tools/BoardPicker";

export const metadata: Metadata = {
  title: "開発ボード診断ツール",
  description:
    "3つの質問に答えるだけで、あなたに最適な開発ボードがわかります。Arduino、Raspberry Pi、ESP32、M5Stack、Jetson Orin Nanoを比較。",
};

export default function BoardPickerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          🔍 開発ボード診断ツール
        </h1>
        <p className="text-slate-500 text-sm">
          3つの質問に答えるだけで、あなたに最適な開発ボードをご提案します。
          Arduino、Raspberry Pi、ESP32 など5ボードから診断。
        </p>
      </div>
      <BoardPicker />
    </div>
  );
}
