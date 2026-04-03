"use client";

import { useState, useMemo, useCallback } from "react";
import { amazonSearchUrl } from "@/lib/site";
import { ExternalLink } from "lucide-react";
import { E24_BASE } from "@/types/led-calculator";

/* ── 型定義 ── */
type Mode = "forward" | "reverse";

interface Preset {
  label: string;
  vin: number;
  vout: number;
  description: string;
}

interface ForwardResult {
  vout: number;
  current: number;
  powerR1: number;
  powerR2: number;
  powerTotal: number;
  ratio: number;
}

interface Suggestion {
  r1: number;
  r2: number;
  vout: number;
  error: number;
  errorPercent: number;
  current: number;
  powerR1: number;
  powerR2: number;
}

/* ── プリセット ── */
const PRESETS: Preset[] = [
  { label: "5V → 3.3V", vin: 5, vout: 3.3, description: "Arduino → ESP32 レベル変換" },
  { label: "12V → 5V", vin: 12, vout: 5, description: "12V電源 → 5Vロジック" },
  { label: "5V → 3.3V ADC", vin: 5, vout: 3.3, description: "センサー出力 → 3.3V ADC入力" },
  { label: "4.2V → 3.3V", vin: 4.2, vout: 3.3, description: "リポ満充電 → ADC監視" },
];

/* ── E24系列の全抵抗値を生成 ── */
function generateE24Values(): number[] {
  const values: number[] = [];
  for (let decade = 0; decade <= 6; decade++) {
    const mult = Math.pow(10, decade);
    for (const base of E24_BASE) {
      const val = Math.round(base * mult * 100) / 100;
      if (val >= 1 && val <= 10_000_000) values.push(val);
    }
  }
  return [...new Set(values)].sort((a, b) => a - b);
}

const E24_VALUES = generateE24Values();

/* ── ユーティリティ ── */
function formatResistance(ohms: number): string {
  if (ohms >= 1_000_000) return `${(ohms / 1_000_000).toFixed(ohms >= 10_000_000 ? 0 : 1)}MΩ`;
  if (ohms >= 1_000) return `${(ohms / 1_000).toFixed(ohms >= 10_000 ? 0 : 1)}kΩ`;
  return `${Math.round(ohms)}Ω`;
}

function formatVoltage(v: number): string {
  if (v < 0.001) return `${(v * 1_000_000).toFixed(1)}µV`;
  if (v < 1) return `${(v * 1000).toFixed(2)}mV`;
  return `${v.toFixed(3)}V`;
}

function formatCurrent(a: number): string {
  if (a < 0.000001) return `${(a * 1_000_000).toFixed(2)}µA`;
  if (a < 0.001) return `${(a * 1000).toFixed(3)}mA`;
  return `${a.toFixed(4)}A`;
}

function formatPower(w: number): string {
  if (w < 0.001) return `${(w * 1000).toFixed(3)}mW`;
  return `${w.toFixed(4)}W`;
}

/* ── 分圧回路図 SVG ── */
function VoltageDividerDiagram({
  vin,
  vout,
  r1Label,
  r2Label,
}: {
  vin: string;
  vout: string;
  r1Label: string;
  r2Label: string;
}) {
  return (
    <svg viewBox="0 0 240 260" className="w-full max-w-[240px] mx-auto">
      {/* Vin ラベル */}
      <text x="100" y="12" textAnchor="middle" fontSize="11" fill="#16a34a" fontWeight="bold">
        Vin = {vin}
      </text>

      {/* 上部配線 */}
      <line x1="100" y1="18" x2="100" y2="40" stroke="#1a2332" strokeWidth="2" />

      {/* R1 抵抗 */}
      <rect x="85" y="40" width="30" height="60" fill="none" stroke="#1a2332" strokeWidth="2" rx="3" />
      <text x="100" y="74" textAnchor="middle" fontSize="10" fill="#1a2332" fontWeight="bold">R1</text>
      <text x="130" y="74" fontSize="9" fill="#4b5563">{r1Label}</text>

      {/* R1-R2 接続点 */}
      <line x1="100" y1="100" x2="100" y2="130" stroke="#1a2332" strokeWidth="2" />
      <circle cx="100" cy="130" r="4" fill="#16a34a" />

      {/* Vout 引出し線 */}
      <line x1="100" y1="130" x2="180" y2="130" stroke="#16a34a" strokeWidth="2" strokeDasharray="4,3" />
      <text x="190" y="134" fontSize="11" fill="#16a34a" fontWeight="bold">
        Vout
      </text>
      <text x="190" y="148" fontSize="9" fill="#16a34a">
        {vout}
      </text>

      {/* R2 抵抗 */}
      <line x1="100" y1="130" x2="100" y2="150" stroke="#1a2332" strokeWidth="2" />
      <rect x="85" y="150" width="30" height="60" fill="none" stroke="#1a2332" strokeWidth="2" rx="3" />
      <text x="100" y="184" textAnchor="middle" fontSize="10" fill="#1a2332" fontWeight="bold">R2</text>
      <text x="130" y="184" fontSize="9" fill="#4b5563">{r2Label}</text>

      {/* GND */}
      <line x1="100" y1="210" x2="100" y2="235" stroke="#1a2332" strokeWidth="2" />
      <line x1="80" y1="235" x2="120" y2="235" stroke="#1a2332" strokeWidth="2" />
      <line x1="86" y1="240" x2="114" y2="240" stroke="#1a2332" strokeWidth="1.5" />
      <line x1="92" y1="245" x2="108" y2="245" stroke="#1a2332" strokeWidth="1" />
      <text x="100" y="258" textAnchor="middle" fontSize="10" fill="#4b5563">GND</text>
    </svg>
  );
}

/* ── 逆引き: 最適R1/R2組み合わせ提案 ── */
function findBestCombinations(vin: number, targetVout: number, maxResults: number = 10): Suggestion[] {
  if (vin <= 0 || targetVout <= 0 || targetVout >= vin) return [];

  const targetRatio = targetVout / vin;
  const suggestions: Suggestion[] = [];

  // E24系列から実用的な範囲を絞る（100Ω〜1MΩ）
  const practical = E24_VALUES.filter((v) => v >= 100 && v <= 1_000_000);

  for (const r2 of practical) {
    // R1 = R2 × (Vin/Vout - 1) から理想値を計算し、近い E24 値を探す
    const idealR1 = r2 * (vin / targetVout - 1);
    if (idealR1 < 100 || idealR1 > 1_000_000) continue;

    // idealR1 に最も近い E24 値を見つける
    let closestR1 = practical[0];
    let minDiff = Math.abs(practical[0] - idealR1);
    for (const r1 of practical) {
      const diff = Math.abs(r1 - idealR1);
      if (diff < minDiff) {
        minDiff = diff;
        closestR1 = r1;
      }
    }

    const actualVout = vin * r2 / (closestR1 + r2);
    const error = Math.abs(actualVout - targetVout);
    const errorPercent = (error / targetVout) * 100;
    const current = vin / (closestR1 + r2);

    // 重複チェック
    if (suggestions.some((s) => s.r1 === closestR1 && s.r2 === r2)) continue;

    suggestions.push({
      r1: closestR1,
      r2,
      vout: actualVout,
      error,
      errorPercent,
      current,
      powerR1: current * current * closestR1,
      powerR2: current * current * r2,
    });
  }

  // 誤差の小さい順にソート
  suggestions.sort((a, b) => a.errorPercent - b.errorPercent);
  return suggestions.slice(0, maxResults);
}

/* ── メインコンポーネント ── */
export default function VoltageDividerCalcClient() {
  const [mode, setMode] = useState<Mode>("forward");

  // 正引きモード
  const [vin, setVin] = useState("5");
  const [r1Str, setR1Str] = useState("10000");
  const [r2Str, setR2Str] = useState("20000");

  // 逆引きモード
  const [revVin, setRevVin] = useState("5");
  const [revTargetVout, setRevTargetVout] = useState("3.3");

  // 正引き計算
  const forwardResult = useMemo<ForwardResult | null>(() => {
    const v = parseFloat(vin);
    const r1 = parseFloat(r1Str);
    const r2 = parseFloat(r2Str);
    if (isNaN(v) || isNaN(r1) || isNaN(r2) || v <= 0 || r1 <= 0 || r2 <= 0) return null;

    const vout = v * r2 / (r1 + r2);
    const current = v / (r1 + r2);
    const powerR1 = current * current * r1;
    const powerR2 = current * current * r2;

    return {
      vout,
      current,
      powerR1,
      powerR2,
      powerTotal: powerR1 + powerR2,
      ratio: r2 / (r1 + r2),
    };
  }, [vin, r1Str, r2Str]);

  // 逆引き計算
  const suggestions = useMemo<Suggestion[]>(() => {
    const v = parseFloat(revVin);
    const target = parseFloat(revTargetVout);
    if (isNaN(v) || isNaN(target) || v <= 0 || target <= 0 || target >= v) return [];
    return findBestCombinations(v, target);
  }, [revVin, revTargetVout]);

  const applyPreset = useCallback((preset: Preset) => {
    if (mode === "forward") {
      setVin(String(preset.vin));
      // プリセットに合う R1/R2 を設定（10kΩ + 計算値の最寄りE24）
      const idealR2 = 10000;
      const idealR1 = idealR2 * (preset.vin / preset.vout - 1);
      // 最寄りE24を探す
      let closestR1 = E24_VALUES[0];
      let minDiff = Math.abs(E24_VALUES[0] - idealR1);
      for (const v of E24_VALUES) {
        const diff = Math.abs(v - idealR1);
        if (diff < minDiff) { minDiff = diff; closestR1 = v; }
      }
      setR1Str(String(closestR1));
      setR2Str(String(idealR2));
    } else {
      setRevVin(String(preset.vin));
      setRevTargetVout(String(preset.vout));
    }
  }, [mode]);

  const handleReset = () => {
    if (mode === "forward") {
      setVin("5");
      setR1Str("10000");
      setR2Str("20000");
    } else {
      setRevVin("5");
      setRevTargetVout("3.3");
    }
  };

  // 警告
  const warnings = useMemo<string[]>(() => {
    const w: string[] = [];
    if (mode === "forward" && forwardResult) {
      if (forwardResult.powerTotal > 0.25) {
        w.push(`合計消費電力が ${formatPower(forwardResult.powerTotal)} です。一般的な1/4W抵抗の定格を超える可能性があります。`);
      }
      if (forwardResult.current > 0.1) {
        w.push("電流が100mAを超えています。分圧回路としては大きすぎます。抵抗値を上げてください。");
      }
      const r1 = parseFloat(r1Str);
      const r2 = parseFloat(r2Str);
      if (r1 + r2 < 1000) {
        w.push("R1+R2が1kΩ未満です。無駄な電力消費が大きくなります。通常は10kΩ以上を推奨します。");
      }
    }
    return w;
  }, [mode, forwardResult, r1Str, r2Str]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 入力フォーム */}
      <div className="space-y-6">
        {/* モード切替 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-green-100 text-green-700 rounded flex items-center justify-center text-xs font-bold">1</span>
            計算モード
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setMode("forward")}
              className={`flex-1 text-xs py-2.5 rounded border transition-colors ${
                mode === "forward"
                  ? "bg-green-50 border-green-300 text-green-800 font-semibold"
                  : "bg-white border-gray-200 text-gray-600 hover:border-green-300"
              }`}
            >
              正引き（R1+R2 → Vout）
            </button>
            <button
              onClick={() => setMode("reverse")}
              className={`flex-1 text-xs py-2.5 rounded border transition-colors ${
                mode === "reverse"
                  ? "bg-green-50 border-green-300 text-green-800 font-semibold"
                  : "bg-white border-gray-200 text-gray-600 hover:border-green-300"
              }`}
            >
              逆引き（目標Vout → R提案）
            </button>
          </div>
        </div>

        {/* 入力フィールド */}
        {mode === "forward" ? (
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-[#1a2332] text-sm mb-1 flex items-center gap-2">
              <span className="w-6 h-6 bg-green-100 text-green-700 rounded flex items-center justify-center text-xs font-bold">2</span>
              パラメータ入力
            </h3>
            <p className="text-xs text-gray-400 mb-4 ml-8">入力電圧とR1・R2を指定してVoutを計算</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">入力電圧 (Vin)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-green-400"
                  />
                  <span className="text-sm text-gray-500 w-6">V</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">上側抵抗 (R1)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={r1Str}
                    onChange={(e) => setR1Str(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-green-400"
                  />
                  <span className="text-sm text-gray-500 w-6">Ω</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">下側抵抗 (R2)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={r2Str}
                    onChange={(e) => setR2Str(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-green-400"
                  />
                  <span className="text-sm text-gray-500 w-6">Ω</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors underline"
            >
              リセット
            </button>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-[#1a2332] text-sm mb-1 flex items-center gap-2">
              <span className="w-6 h-6 bg-green-100 text-green-700 rounded flex items-center justify-center text-xs font-bold">2</span>
              目標パラメータ
            </h3>
            <p className="text-xs text-gray-400 mb-4 ml-8">入力電圧と目標出力電圧からE24系列の最適R値を提案</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">入力電圧 (Vin)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={revVin}
                    onChange={(e) => setRevVin(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-green-400"
                  />
                  <span className="text-sm text-gray-500 w-6">V</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">目標出力電圧 (Vout)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={revTargetVout}
                    onChange={(e) => setRevTargetVout(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-green-400"
                  />
                  <span className="text-sm text-gray-500 w-6">V</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors underline"
            >
              リセット
            </button>
          </div>
        )}

        {/* プリセット */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-1 flex items-center gap-2">
            <span className="w-6 h-6 bg-green-100 text-green-700 rounded flex items-center justify-center text-xs font-bold">3</span>
            実用プリセット
          </h3>
          <p className="text-xs text-gray-400 mb-3 ml-8">クリックで値を自動入力</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p)}
                className="text-left text-xs px-3 py-2.5 rounded border bg-white border-gray-200 text-gray-600 hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <span className="font-semibold text-[#1a2332] block">{p.label}</span>
                <span className="text-gray-400">{p.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 結果 */}
      <div className="space-y-6">
        {/* 回路図 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-3">分圧回路図</h3>
          <div className="bg-[#F5F7FA] rounded-lg p-4">
            <VoltageDividerDiagram
              vin={mode === "forward" ? (vin || "—") : (revVin || "—")}
              vout={
                mode === "forward"
                  ? forwardResult
                    ? `${forwardResult.vout.toFixed(3)}V`
                    : "—"
                  : `${revTargetVout || "—"}V`
              }
              r1Label={
                mode === "forward"
                  ? formatResistance(parseFloat(r1Str) || 0)
                  : "?"
              }
              r2Label={
                mode === "forward"
                  ? formatResistance(parseFloat(r2Str) || 0)
                  : "?"
              }
            />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Vout = Vin × R2 / (R1 + R2)
          </p>
        </div>

        {/* 正引き結果 */}
        {mode === "forward" && forwardResult && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5">
            <h3 className="font-bold text-[#1a2332] text-sm mb-4">計算結果</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline bg-white/60 rounded px-3 py-2">
                <span className="text-sm font-semibold text-green-800">出力電圧 (Vout)</span>
                <span className="text-lg font-bold text-green-900">{formatVoltage(forwardResult.vout)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-600">分圧比 (R2/(R1+R2))</span>
                <span className="text-sm font-mono text-gray-700">{(forwardResult.ratio * 100).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-600">回路電流</span>
                <span className="text-sm font-mono text-gray-700">{formatCurrent(forwardResult.current)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-600">R1 消費電力</span>
                <span className="text-sm font-mono text-gray-700">{formatPower(forwardResult.powerR1)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-600">R2 消費電力</span>
                <span className="text-sm font-mono text-gray-700">{formatPower(forwardResult.powerR2)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-600">合計消費電力</span>
                <span className="text-sm font-mono text-gray-700">{formatPower(forwardResult.powerTotal)}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-green-200">
              <a
                href={amazonSearchUrl(`抵抗 ${formatResistance(parseFloat(r1Str))} ${formatResistance(parseFloat(r2Str))} カーボン`)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#FF6D00] hover:bg-[#E65100] text-white font-semibold py-2 px-5 rounded transition-colors text-sm"
              >
                この抵抗をAmazonで探す
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {mode === "forward" && !forwardResult && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
            <p className="text-sm text-gray-400">
              有効な値を入力すると計算結果が表示されます
            </p>
          </div>
        )}

        {/* 逆引き結果 */}
        {mode === "reverse" && suggestions.length > 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5">
            <h3 className="font-bold text-[#1a2332] text-sm mb-1">E24系列 最適R値提案</h3>
            <p className="text-xs text-gray-400 mb-4">誤差の小さい順に表示（最大10件）</p>
            <div className="space-y-2">
              {suggestions.map((s, i) => (
                <button
                  key={`${s.r1}-${s.r2}`}
                  onClick={() => {
                    setMode("forward");
                    setVin(revVin);
                    setR1Str(String(s.r1));
                    setR2Str(String(s.r2));
                  }}
                  className={`w-full text-left rounded border px-3 py-2.5 transition-colors ${
                    i === 0
                      ? "bg-white border-green-300 shadow-sm"
                      : "bg-white/60 border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#1a2332]">
                      {i === 0 && <span className="text-green-600 mr-1">★</span>}
                      R1={formatResistance(s.r1)}　R2={formatResistance(s.r2)}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      s.errorPercent < 1
                        ? "bg-green-100 text-green-700"
                        : s.errorPercent < 5
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      誤差 {s.errorPercent.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex gap-4 text-[11px] text-gray-500">
                    <span>Vout={s.vout.toFixed(3)}V</span>
                    <span>I={formatCurrent(s.current)}</span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">クリックすると正引きモードで詳細を確認できます</p>
          </div>
        )}

        {mode === "reverse" && suggestions.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
            <p className="text-sm text-gray-400">
              {parseFloat(revTargetVout) >= parseFloat(revVin)
                ? "目標電圧は入力電圧より低く設定してください"
                : "入力電圧と目標出力電圧を入力すると候補が表示されます"}
            </p>
          </div>
        )}

        {/* 警告 */}
        {warnings.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-bold text-red-800 text-sm mb-2">⚠ 注意</h4>
            <ul className="space-y-1">
              {warnings.map((w, i) => (
                <li key={i} className="text-xs text-red-700 leading-relaxed">{w}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 計算式 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-3">分圧回路の公式</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { formula: "Vout = Vin × R2 / (R1 + R2)", desc: "出力電圧（正引き）" },
              { formula: "R1 = R2 × (Vin/Vout - 1)", desc: "上側抵抗（逆引き）" },
              { formula: "I = Vin / (R1 + R2)", desc: "回路電流" },
              { formula: "P = I² × R", desc: "各抵抗の消費電力" },
            ].map((f, i) => (
              <div key={i} className="bg-[#F5F7FA] rounded p-2.5">
                <p className="font-mono text-sm text-[#1a2332] font-semibold">{f.formula}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 関連ツール */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-3">関連ツール</h3>
          <div className="space-y-2">
            <a
              href="/tools/ohms-law-calc"
              className="flex items-center gap-2 text-sm text-[#00838F] hover:text-[#006064] transition-colors"
            >
              <span>⚡</span>
              <span>オームの法則計算ツール</span>
            </a>
            <a
              href="/tools/led-resistor-calc"
              className="flex items-center gap-2 text-sm text-[#00838F] hover:text-[#006064] transition-colors"
            >
              <span>💡</span>
              <span>LED抵抗計算ツール</span>
            </a>
            <a
              href="/tools/resistor-color-code"
              className="flex items-center gap-2 text-sm text-[#00838F] hover:text-[#006064] transition-colors"
            >
              <span>🎨</span>
              <span>抵抗カラーコード読み取り</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
