import type { Metadata } from "next";
import BoardPicker from "@/components/tools/BoardPicker";

export const metadata: Metadata = {
  title: "開発ボード診断ツール",
  description:
    "3つの質問に答えるだけで、あなたに最適な開発ボードがわかります。Arduino、Raspberry Pi、ESP32、M5Stack、Jetson Orin Nanoを比較。",
};

export default function BoardPickerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a2332] mb-2 flex items-center gap-2.5">
          <div className="w-1 h-7 bg-[#00838F] rounded-full" />
          開発ボード診断ツール
        </h1>
        <p className="text-gray-500 text-sm ml-3.5">
          3つの質問に答えるだけで、あなたに最適な開発ボードをご提案します。
          Arduino、Raspberry Pi、ESP32 など5ボードから診断。
        </p>
      </div>
      <BoardPicker />
    </div>
  );
}
