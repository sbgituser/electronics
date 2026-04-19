"use client";

import { useState, useMemo } from "react";
import { buildAmazonUrl } from "@/lib/site";
import { calculateAiInferenceCost } from "@/lib/calculators/ai-inference-cost";
import { ExternalLink } from "lucide-react";

const MODEL_OPTIONS = [
  "小型モデル(<100Mパラメータ)",
  "中型モデル(100M〜1Bパラメータ)",
  "大型モデル(>1Bパラメータ)",
];

const DEVICE_OPTIONS = [
  "クラウドGPU",
  "エッジGPU(Jetson Orin Nano)",
  "Raspberry Pi",
];

const PRODUCTS = [
  { name: "NVIDIA Jetson Orin Nano", asin: "B0BCNKKD9K", desc: "高性能エッジAI推論向けGPUモジュール" },
  { name: "Google Coral USB Accelerator", asin: "B0CXKPHLLX", desc: "USB接続のTPUアクセラレータ" },
];

export default function AiInferenceCostCalcClient() {
  const [modelSize, setModelSize] = useState("小型モデル(<100Mパラメータ)");
  const [requestsPerDay, setRequestsPerDay] = useState(1000);
  const [device, setDevice] = useState("クラウドGPU");

  const result = useMemo(
    () => calculateAiInferenceCost({ modelSize, requestsPerDay, device }),
    [modelSize, requestsPerDay, device],
  );

  const inputClass =
    "w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#00838F] focus:ring-2 focus:ring-[#00838F]/20 focus:outline-none text-sm";
  const selectClass = inputClass + " bg-white";

  return (
    <div className="space-y-8">
      {/* 入力フォーム */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-[#1a2332] mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded flex items-center justify-center text-xs font-bold">1</span>
          パラメータ入力
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              モデルサイズ
            </label>
            <select
              value={modelSize}
              onChange={(e) => setModelSize(e.target.value)}
              className={selectClass}
            >
              {MODEL_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              推論リクエスト数
              <span className="text-xs text-gray-400 font-normal ml-1">回/日</span>
            </label>
            <input
              type="number"
              min={1}
              value={requestsPerDay}
              onChange={(e) => setRequestsPerDay(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              実行デバイス
            </label>
            <select
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              className={selectClass}
            >
              {DEVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 計算結果 */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-[#1a2332] mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded flex items-center justify-center text-xs font-bold">2</span>
          計算結果
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <p className="text-xs text-teal-600 font-semibold mb-1">月額推論コスト</p>
            <p className="text-xl font-bold text-[#1a2332]">{result.monthlyCost} <span className="text-sm font-normal text-gray-500">円</span></p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-xs text-blue-600 font-semibold mb-1">年間コスト</p>
            <p className="text-xl font-bold text-[#1a2332]">{result.yearlyCost} <span className="text-sm font-normal text-gray-500">円</span></p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
            <p className="text-xs text-amber-600 font-semibold mb-1">レイテンシ目安</p>
            <p className="text-xl font-bold text-[#1a2332]">{result.latencyMs}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <p className="text-xs text-purple-600 font-semibold mb-1">1,000回あたりコスト</p>
            <p className="text-xl font-bold text-[#1a2332]">{result.costPer1000}</p>
          </div>
        </div>
      </div>

      {/* おすすめ製品 */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-[#1a2332] mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-orange-100 text-orange-700 rounded flex items-center justify-center text-xs font-bold">3</span>
          おすすめ製品
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
