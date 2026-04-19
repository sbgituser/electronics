"use client";

import { useState, useMemo } from "react";
import { buildAmazonUrl } from "@/lib/site";
import { calculateIotPower } from "@/lib/calculators/iot-power-calc";
import { ExternalLink } from "lucide-react";

const SENSOR_OPTIONS = [
  "温度センサー",
  "湿度センサー",
  "加速度センサー",
  "CO2センサー",
  "GPSセンサー",
  "カメラモジュール",
];

const MODE_OPTIONS = ["常時稼働", "間欠稼働"];

const PRODUCTS = [
  { name: "Raspberry Pi Pico W", asin: "B09KVB8LH2", desc: "Wi-Fi搭載の低消費電力マイコンボード" },
  { name: "ESP32開発ボード", asin: "B08D5ZD528", desc: "Wi-Fi/BLE対応の万能IoTマイコン" },
];

export default function IotPowerCalcClient() {
  const [sensorType, setSensorType] = useState("温度センサー");
  const [mode, setMode] = useState("間欠稼働");
  const [samplingInterval, setSamplingInterval] = useState(60);
  const [devices, setDevices] = useState(10);

  const result = useMemo(
    () => calculateIotPower({ sensorType, mode, samplingInterval, devices }),
    [sensorType, mode, samplingInterval, devices],
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              センサー種類
            </label>
            <select
              value={sensorType}
              onChange={(e) => setSensorType(e.target.value)}
              className={selectClass}
            >
              {SENSOR_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              動作モード
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className={selectClass}
            >
              {MODE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              サンプリング間隔
              <span className="text-xs text-gray-400 font-normal ml-1">秒</span>
            </label>
            <input
              type="number"
              min={1}
              value={samplingInterval}
              onChange={(e) => setSamplingInterval(Number(e.target.value))}
              className={inputClass}
              disabled={mode === "常時稼働"}
            />
            {mode === "常時稼働" && (
              <p className="text-xs text-gray-400 mt-1">常時稼働モードではサンプリング間隔は無効です</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              台数
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
        </div>
      </div>

      {/* 計算結果 */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-[#1a2332] mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded flex items-center justify-center text-xs font-bold">2</span>
          計算結果
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <p className="text-xs text-teal-600 font-semibold mb-1">1台あたり消費電力</p>
            <p className="text-xl font-bold text-[#1a2332]">{result.powerPerDevice}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-xs text-blue-600 font-semibold mb-1">月間消費電力量（全台）</p>
            <p className="text-xl font-bold text-[#1a2332]">{result.monthlyKwh}</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
            <p className="text-xs text-amber-600 font-semibold mb-1">バッテリー持続目安（2000mAh）</p>
            <p className="text-xl font-bold text-[#1a2332]">{result.batteryDays}</p>
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
