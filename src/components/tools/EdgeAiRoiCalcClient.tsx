"use client";

import { useState, useMemo } from "react";
import { buildAmazonUrl } from "@/lib/site";
import { calculateEdgeAiRoi } from "@/lib/calculators/edge-ai-roi";
import { ExternalLink } from "lucide-react";

const PRODUCTS = [
  { name: "Raspberry Pi 4", asin: "B0B4VZ4N9W", desc: "エッジAI入門に最適なシングルボードコンピュータ" },
  { name: "NVIDIA Jetson Nano", asin: "B08J157LHH", desc: "GPU搭載の高性能エッジAIボード" },
  { name: "Grove センサーキット", asin: "B07PXGQC1Q", desc: "各種センサーを手軽に接続できるキット" },
];

export default function EdgeAiRoiCalcClient() {
  const [initialCost, setInitialCost] = useState(15000);
  const [devices, setDevices] = useState(5);
  const [commSaving, setCommSaving] = useState(3000);
  const [apiSaving, setApiSaving] = useState(5000);

  const result = useMemo(
    () => calculateEdgeAiRoi({ initialCost, devices, commSaving, apiSaving }),
    [initialCost, devices, commSaving, apiSaving],
  );

  const inputClass =
    "w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#00838F] focus:ring-2 focus:ring-[#00838F]/20 focus:outline-none text-sm";

  return (
    <div className="space-y-8">
      {/* 入力フォーム */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-[#1a2332] mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded flex items-center justify-center text-xs font-bold">1</span>
          パラメータ入力
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              デバイス初期費用（1台）
              <span className="text-xs text-gray-400 font-normal ml-1">円</span>
            </label>
            <input
              type="number"
              min={0}
              value={initialCost}
              onChange={(e) => setInitialCost(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              導入台数
              <span className="text-xs text-gray-400 font-normal ml-1">台</span>
            </label>
            <input
              type="number"
              min={1}
              value={devices}
              onChange={(e) => setDevices(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              月間通信費削減額
              <span className="text-xs text-gray-400 font-normal ml-1">円/月</span>
            </label>
            <input
              type="number"
              min={0}
              value={commSaving}
              onChange={(e) => setCommSaving(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              クラウドAPI費用削減額
              <span className="text-xs text-gray-400 font-normal ml-1">円/月</span>
            </label>
            <input
              type="number"
              min={0}
              value={apiSaving}
              onChange={(e) => setApiSaving(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* 計算結果 */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-[#1a2332] mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded flex items-center justify-center text-xs font-bold">2</span>
          計算結果
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <p className="text-xs text-teal-600 font-semibold mb-1">総初期費用</p>
            <p className="text-xl font-bold text-[#1a2332]">{result.totalInitial} <span className="text-sm font-normal text-gray-500">円</span></p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-xs text-blue-600 font-semibold mb-1">月間総コスト削減額</p>
            <p className="text-xl font-bold text-[#1a2332]">{result.monthlySaving} <span className="text-sm font-normal text-gray-500">円/月</span></p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
            <p className="text-xs text-amber-600 font-semibold mb-1">投資回収期間</p>
            <p className="text-xl font-bold text-[#1a2332]">{result.paybackMonths} <span className="text-sm font-normal text-gray-500">ヶ月</span></p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <p className="text-xs text-emerald-600 font-semibold mb-1">3年間ROI</p>
            <p className="text-xl font-bold text-[#1a2332]">{result.roi3year} <span className="text-sm font-normal text-gray-500">%</span></p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 sm:col-span-2 lg:col-span-2">
            <p className="text-xs text-purple-600 font-semibold mb-1">3年間累積削減額</p>
            <p className="text-xl font-bold text-[#1a2332]">{result.saving3year} <span className="text-sm font-normal text-gray-500">円</span></p>
          </div>
        </div>
      </div>

      {/* おすすめ製品 */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-[#1a2332] mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-orange-100 text-orange-700 rounded flex items-center justify-center text-xs font-bold">3</span>
          おすすめ製品
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PRODUCTS.map((p) => (
            <a
              key={p.asin}
              href={buildAmazonUrl(p.asin)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-[#00838F] transition-all"
            >
              <h3 className="font-bold text-sm text-[#1a2332] mb-1">{p.name}</h3>
              <p className="text-xs text-gray-500 mb-3">{p.desc}</p>
              <span className="inline-flex items-center gap-1 text-xs text-[#00838F] font-semibold">
                Amazonで見る <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
