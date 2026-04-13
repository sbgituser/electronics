"use client";

import { useState } from "react";
import {
  capacitorsInSeries,
  capacitorsInParallel,
  rcTimeConstant,
  formatCapacitance,
  formatTime,
} from "@/lib/circuit-calc";

type ConnectionType = "series" | "parallel";

interface CapEntry {
  id: number;
  value: string;
  unit: "pF" | "nF" | "μF" | "mF";
}

const unitMultipliers: Record<string, number> = {
  pF: 1e-12,
  nF: 1e-9,
  "μF": 1e-6,
  mF: 1e-3,
};

let nextId = 3;

export default function CapacitorCalcClient() {
  const [connection, setConnection] = useState<ConnectionType>("series");
  const [caps, setCaps] = useState<CapEntry[]>([
    { id: 1, value: "100", unit: "nF" },
    { id: 2, value: "100", unit: "nF" },
  ]);
  const [resistance, setResistance] = useState("10000");

  const addCap = () => {
    setCaps([...caps, { id: nextId++, value: "100", unit: "nF" }]);
  };

  const removeCap = (id: number) => {
    if (caps.length <= 2) return;
    setCaps(caps.filter((c) => c.id !== id));
  };

  const updateCap = (id: number, field: "value" | "unit", val: string) => {
    setCaps(caps.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  // 計算
  const faradValues = caps.map(
    (c) => (parseFloat(c.value) || 0) * unitMultipliers[c.unit]
  );
  const allValid = faradValues.every((v) => v > 0);

  const combinedFarad = allValid
    ? connection === "series"
      ? capacitorsInSeries(faradValues)
      : capacitorsInParallel(faradValues)
    : 0;

  const R = parseFloat(resistance) || 0;
  const tau = R > 0 && combinedFarad > 0 ? rcTimeConstant(R, combinedFarad) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 入力 */}
      <div className="space-y-6">
        {/* 接続方式 */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            接続方式
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setConnection("series")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium border transition-colors ${
                connection === "series"
                  ? "bg-teal-50 border-teal-300 text-teal-700"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              直列接続
            </button>
            <button
              onClick={() => setConnection("parallel")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium border transition-colors ${
                connection === "parallel"
                  ? "bg-teal-50 border-teal-300 text-teal-700"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              並列接続
            </button>
          </div>
        </div>

        {/* コンデンサ入力 */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            コンデンサの容量
          </label>
          <div className="space-y-2">
            {caps.map((cap, i) => (
              <div key={cap.id} className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-6">C{i + 1}</span>
                <input
                  type="number"
                  value={cap.value}
                  onChange={(e) => updateCap(cap.id, "value", e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  min="0"
                  step="any"
                />
                <select
                  value={cap.unit}
                  onChange={(e) => updateCap(cap.id, "unit", e.target.value)}
                  className="border border-gray-200 rounded-lg px-2 py-2 text-sm bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                >
                  <option value="pF">pF</option>
                  <option value="nF">nF</option>
                  <option value="μF">μF</option>
                  <option value="mF">mF</option>
                </select>
                {caps.length > 2 && (
                  <button
                    onClick={() => removeCap(cap.id)}
                    className="text-gray-400 hover:text-rose-500 text-lg leading-none"
                    title="削除"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addCap}
            className="mt-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            + コンデンサを追加
          </button>
        </div>

        {/* 抵抗値（時定数計算用） */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            抵抗値（RC時定数計算用）
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              min="0"
              step="any"
            />
            <span className="text-sm text-gray-500">Ω</span>
          </div>
        </div>

        {/* 接続の図解 */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-slate-600 mb-2">
            {connection === "series" ? "直列接続" : "並列接続"}の計算式
          </p>
          {connection === "series" ? (
            <p className="text-sm text-slate-700 font-mono">
              1/C<sub>total</sub> = {caps.map((_, i) => `1/C${i + 1}`).join(" + ")}
            </p>
          ) : (
            <p className="text-sm text-slate-700 font-mono">
              C<sub>total</sub> = {caps.map((_, i) => `C${i + 1}`).join(" + ")}
            </p>
          )}
          <p className="text-xs text-slate-500 mt-2">
            {connection === "series"
              ? "直列接続では合成容量は個々のコンデンサより小さくなります"
              : "並列接続では合成容量は個々のコンデンサの合計になります"}
          </p>
        </div>
      </div>

      {/* 結果 */}
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-800 mb-4">計算結果</h3>

          {allValid && combinedFarad > 0 ? (
            <div className="space-y-4">
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <p className="text-xs text-teal-600 font-medium mb-1">合成容量</p>
                <p className="text-2xl font-bold text-teal-800">
                  {formatCapacitance(combinedFarad)}
                </p>
              </div>

              {tau > 0 && (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-xs text-amber-600 font-medium mb-1">
                      RC時定数 (τ = R × C)
                    </p>
                    <p className="text-2xl font-bold text-amber-800">
                      {formatTime(tau)}
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-2 px-3 text-left text-gray-600 font-medium">
                            時間
                          </th>
                          <th className="py-2 px-3 text-left text-gray-600 font-medium">
                            充電率
                          </th>
                          <th className="py-2 px-3 text-left text-gray-600 font-medium">
                            用途
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { mult: 1, pct: "63.2%", note: "1τ" },
                          { mult: 2, pct: "86.5%", note: "2τ" },
                          { mult: 3, pct: "95.0%", note: "3τ" },
                          { mult: 5, pct: "99.3%", note: "5τ（ほぼ満充電）" },
                        ].map((row) => (
                          <tr key={row.mult} className="border-t border-gray-100">
                            <td className="py-2 px-3 text-gray-700 font-mono text-xs">
                              {formatTime(tau * row.mult)}
                            </td>
                            <td className="py-2 px-3 text-gray-700">{row.pct}</td>
                            <td className="py-2 px-3 text-gray-500 text-xs">
                              {row.note}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* 個別容量 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-600 mb-2">入力値</p>
                <div className="space-y-1">
                  {caps.map((cap, i) => {
                    const f = faradValues[i];
                    return (
                      <div
                        key={cap.id}
                        className="flex justify-between text-xs text-gray-600"
                      >
                        <span>C{i + 1}</span>
                        <span className="font-mono">{formatCapacitance(f)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              コンデンサの容量を入力してください
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
