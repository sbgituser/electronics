"use client";

import { useState, useMemo, useCallback } from "react";
import { amazonSearchUrl } from "@/lib/site";
import { ExternalLink } from "lucide-react";

/* ── 型定義 ── */
type ValueKey = "voltage" | "current" | "resistance" | "power";
type UnitV = "V" | "mV";
type UnitI = "A" | "mA" | "µA";
type UnitR = "Ω" | "kΩ" | "MΩ";
type UnitP = "W" | "mW";

interface Preset {
  label: string;
  voltage: number;
  maxCurrent: number; // mA
  description: string;
}

/* ── プリセット ── */
const PRESETS: Preset[] = [
  { label: "Arduino Uno 5V", voltage: 5, maxCurrent: 40, description: "GPIOピン最大40mA" },
  { label: "ESP32 3.3V", voltage: 3.3, maxCurrent: 12, description: "GPIOピン最大12mA" },
  { label: "Raspberry Pi 3.3V", voltage: 3.3, maxCurrent: 16, description: "GPIOピン最大16mA" },
  { label: "USB 5V / 500mA", voltage: 5, maxCurrent: 500, description: "USB 2.0" },
  { label: "USB 5V / 2A", voltage: 5, maxCurrent: 2000, description: "USB 3.0 / 充電器" },
  { label: "USB 5V / 3A", voltage: 5, maxCurrent: 3000, description: "USB-C PD" },
];

/* ── ユーティリティ ── */
function toBase(value: number, unit: string): number {
  switch (unit) {
    case "mV": return value / 1000;
    case "mA": return value / 1000;
    case "µA": return value / 1_000_000;
    case "kΩ": return value * 1000;
    case "MΩ": return value * 1_000_000;
    case "mW": return value / 1000;
    default: return value; // V, A, Ω, W
  }
}

function formatValue(val: number, key: ValueKey): string {
  if (!isFinite(val) || isNaN(val)) return "—";
  switch (key) {
    case "voltage":
      if (val < 0.001) return `${(val * 1_000_000).toFixed(1)} µV`;
      if (val < 1) return `${(val * 1000).toFixed(2)} mV`;
      return `${val.toFixed(3)} V`;
    case "current":
      if (val < 0.000001) return `${(val * 1_000_000).toFixed(2)} µA`;
      if (val < 0.001) return `${(val * 1000).toFixed(3)} mA`;
      return `${val.toFixed(4)} A`;
    case "resistance":
      if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(2)} MΩ`;
      if (val >= 1000) return `${(val / 1000).toFixed(2)} kΩ`;
      return `${val.toFixed(2)} Ω`;
    case "power":
      if (val < 0.001) return `${(val * 1000).toFixed(3)} mW`;
      return `${val.toFixed(4)} W`;
  }
}

function formatResistanceShort(ohms: number): string {
  if (ohms >= 1_000_000) return `${(ohms / 1_000_000).toFixed(1)}MΩ`;
  if (ohms >= 1000) return `${(ohms / 1000).toFixed(ohms >= 10000 ? 0 : 1)}kΩ`;
  return `${Math.round(ohms)}Ω`;
}

/* ── オームの法則の輪 SVG ── */
function OhmsLawWheel({ inputKeys }: { inputKeys: Set<ValueKey> }) {
  const formulas = [
    { expr: "V = I × R", keys: ["voltage"] as ValueKey[] },
    { expr: "V = P / I", keys: ["voltage"] as ValueKey[] },
    { expr: "V = √(P×R)", keys: ["voltage"] as ValueKey[] },
    { expr: "I = V / R", keys: ["current"] as ValueKey[] },
    { expr: "I = P / V", keys: ["current"] as ValueKey[] },
    { expr: "I = √(P/R)", keys: ["current"] as ValueKey[] },
    { expr: "R = V / I", keys: ["resistance"] as ValueKey[] },
    { expr: "R = V² / P", keys: ["resistance"] as ValueKey[] },
    { expr: "R = P / I²", keys: ["resistance"] as ValueKey[] },
    { expr: "P = V × I", keys: ["power"] as ValueKey[] },
    { expr: "P = I² × R", keys: ["power"] as ValueKey[] },
    { expr: "P = V² / R", keys: ["power"] as ValueKey[] },
  ];

  const cx = 170, cy = 170, r = 140;
  const quadrants: { key: ValueKey; label: string; color: string; colorLight: string }[] = [
    { key: "voltage", label: "V", color: "#2563eb", colorLight: "#dbeafe" },
    { key: "current", label: "I", color: "#dc2626", colorLight: "#fee2e2" },
    { key: "resistance", label: "R", color: "#16a34a", colorLight: "#dcfce7" },
    { key: "power", label: "P", color: "#d97706", colorLight: "#fef3c7" },
  ];

  return (
    <svg viewBox="0 0 340 340" className="w-full max-w-[320px] mx-auto">
      {/* 外周円 */}
      <circle cx={cx} cy={cy} r={r + 10} fill="none" stroke="#e5e7eb" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={r - 40} fill="none" stroke="#e5e7eb" strokeWidth="1" />

      {/* 4象限の背景 */}
      {quadrants.map((q, qi) => {
        const startAngle = -90 + qi * 90;
        const endAngle = startAngle + 90;
        const s = (startAngle * Math.PI) / 180;
        const e = (endAngle * Math.PI) / 180;
        const outerR = r + 10;
        const innerR = r - 40;
        const isInput = inputKeys.has(q.key);
        return (
          <g key={q.key}>
            <path
              d={`M ${cx + innerR * Math.cos(s)} ${cy + innerR * Math.sin(s)}
                  L ${cx + outerR * Math.cos(s)} ${cy + outerR * Math.sin(s)}
                  A ${outerR} ${outerR} 0 0 1 ${cx + outerR * Math.cos(e)} ${cy + outerR * Math.sin(e)}
                  L ${cx + innerR * Math.cos(e)} ${cy + innerR * Math.sin(e)}
                  A ${innerR} ${innerR} 0 0 0 ${cx + innerR * Math.cos(s)} ${cy + innerR * Math.sin(s)} Z`}
              fill={isInput ? q.colorLight : "#f9fafb"}
              stroke={isInput ? q.color : "#e5e7eb"}
              strokeWidth={isInput ? 2 : 0.5}
              opacity={0.6}
            />
          </g>
        );
      })}

      {/* 12公式 */}
      {formulas.map((f, i) => {
        const angle = ((i * 30 - 90) * Math.PI) / 180;
        const textR = r - 14;
        const x = cx + textR * Math.cos(angle);
        const y = cy + textR * Math.sin(angle);
        const targetKey = f.keys[0];
        const isComputed = !inputKeys.has(targetKey) && inputKeys.size === 2;
        const isInput = inputKeys.has(targetKey);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9.5"
            fontWeight={isComputed ? "bold" : "normal"}
            fill={isComputed ? "#2563eb" : isInput ? "#6b7280" : "#9ca3af"}
            transform={`rotate(${i * 30}, ${x}, ${y})`}
          >
            {f.expr}
          </text>
        );
      })}

      {/* 中心の4文字 */}
      {quadrants.map((q, qi) => {
        const angle = ((-90 + qi * 90 + 45) * Math.PI) / 180;
        const labelR = 50;
        const x = cx + labelR * Math.cos(angle);
        const y = cy + labelR * Math.sin(angle);
        const isInput = inputKeys.has(q.key);
        return (
          <g key={`label-${q.key}`}>
            <circle cx={x} cy={y} r={18} fill={isInput ? q.color : "#f3f4f6"} stroke={q.color} strokeWidth={isInput ? 2 : 1} />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="16" fontWeight="bold" fill={isInput ? "#fff" : q.color}>
              {q.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── メインコンポーネント ── */
export default function OhmsLawCalcClient() {
  const [voltageStr, setVoltageStr] = useState("");
  const [currentStr, setCurrentStr] = useState("");
  const [resistanceStr, setResistanceStr] = useState("");
  const [powerStr, setPowerStr] = useState("");

  const [unitV, setUnitV] = useState<UnitV>("V");
  const [unitI, setUnitI] = useState<UnitI>("mA");
  const [unitR, setUnitR] = useState<UnitR>("Ω");
  const [unitP, setUnitP] = useState<UnitP>("W");

  // どのフィールドにユーザーが値を入力したか
  const [userInputs, setUserInputs] = useState<Set<ValueKey>>(new Set());

  const markInput = useCallback((key: ValueKey) => {
    setUserInputs((prev) => {
      const next = new Set(prev);
      next.add(key);
      // 3つ以上入力されたら、最も古いものを除去（最新2つを保持）
      if (next.size > 2) {
        const arr = Array.from(prev);
        // 既に含まれていた場合は除去不要
        if (prev.has(key)) return next;
        next.delete(arr[0]);
      }
      return next;
    });
  }, []);

  const clearInput = useCallback((key: ValueKey) => {
    setUserInputs((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }, []);

  const handleChange = (key: ValueKey, val: string) => {
    switch (key) {
      case "voltage": setVoltageStr(val); break;
      case "current": setCurrentStr(val); break;
      case "resistance": setResistanceStr(val); break;
      case "power": setPowerStr(val); break;
    }
    if (val === "" || isNaN(parseFloat(val))) {
      clearInput(key);
    } else {
      markInput(key);
    }
  };

  const applyPreset = (preset: Preset) => {
    setVoltageStr(String(preset.voltage));
    setCurrentStr(String(preset.maxCurrent));
    setUnitV("V");
    setUnitI("mA");
    setUserInputs(new Set(["voltage", "current"] as ValueKey[]));
  };

  const handleReset = () => {
    setVoltageStr("");
    setCurrentStr("");
    setResistanceStr("");
    setPowerStr("");
    setUserInputs(new Set());
  };

  // 計算ロジック
  const result = useMemo(() => {
    if (userInputs.size < 2) return null;

    const inputs = Array.from(userInputs).slice(-2);
    const vals: Partial<Record<ValueKey, number>> = {};

    if (inputs.includes("voltage")) {
      const v = parseFloat(voltageStr);
      if (isNaN(v) || v <= 0) return null;
      vals.voltage = toBase(v, unitV);
    }
    if (inputs.includes("current")) {
      const i = parseFloat(currentStr);
      if (isNaN(i) || i <= 0) return null;
      vals.current = toBase(i, unitI);
    }
    if (inputs.includes("resistance")) {
      const r = parseFloat(resistanceStr);
      if (isNaN(r) || r <= 0) return null;
      vals.resistance = toBase(r, unitR);
    }
    if (inputs.includes("power")) {
      const p = parseFloat(powerStr);
      if (isNaN(p) || p <= 0) return null;
      vals.power = toBase(p, unitP);
    }

    const V = vals.voltage;
    const I = vals.current;
    const R = vals.resistance;
    const P = vals.power;

    let calcV: number | undefined, calcI: number | undefined, calcR: number | undefined, calcP: number | undefined;

    if (V !== undefined && I !== undefined) {
      calcV = V; calcI = I; calcR = V / I; calcP = V * I;
    } else if (V !== undefined && R !== undefined) {
      calcV = V; calcR = R; calcI = V / R; calcP = (V * V) / R;
    } else if (V !== undefined && P !== undefined) {
      calcV = V; calcP = P; calcI = P / V; calcR = (V * V) / P;
    } else if (I !== undefined && R !== undefined) {
      calcI = I; calcR = R; calcV = I * R; calcP = I * I * R;
    } else if (I !== undefined && P !== undefined) {
      calcI = I; calcP = P; calcV = P / I; calcR = P / (I * I);
    } else if (R !== undefined && P !== undefined) {
      calcR = R; calcP = P; calcV = Math.sqrt(P * R); calcI = Math.sqrt(P / R);
    } else {
      return null;
    }

    if ([calcV, calcI, calcR, calcP].some((v) => v === undefined || !isFinite(v!) || isNaN(v!))) {
      return null;
    }

    return {
      voltage: calcV!,
      current: calcI!,
      resistance: calcR!,
      power: calcP!,
      inputKeys: new Set(inputs) as Set<ValueKey>,
    };
  }, [voltageStr, currentStr, resistanceStr, powerStr, unitV, unitI, unitR, unitP, userInputs]);

  // 警告
  const warnings = useMemo<string[]>(() => {
    if (!result) return [];
    const w: string[] = [];
    if (result.power > 0.25) {
      w.push(`消費電力が ${formatValue(result.power, "power")} です。一般的な1/4W抵抗の定格を超えています。定格の高い抵抗を使用してください。`);
    }
    if (result.power > 1) {
      w.push("消費電力が1Wを超えています。発熱に十分注意し、放熱を考慮してください。");
    }
    if (result.current > 1) {
      w.push(`電流が ${formatValue(result.current, "current")} と大きいです。配線やコネクタの許容電流を確認してください。`);
    }
    return w;
  }, [result]);

  const resistorSearchQuery = result
    ? `抵抗 ${formatResistanceShort(result.resistance)} カーボン`
    : "";

  const inputFields: { key: ValueKey; label: string; symbol: string; str: string; units: readonly string[]; unit: string; setUnit: (u: string) => void; color: string; colorLight: string }[] = [
    { key: "voltage", label: "電圧", symbol: "V", str: voltageStr, units: ["V", "mV"] as const, unit: unitV, setUnit: (u) => setUnitV(u as UnitV), color: "blue", colorLight: "blue" },
    { key: "current", label: "電流", symbol: "I", str: currentStr, units: ["A", "mA", "µA"] as const, unit: unitI, setUnit: (u) => setUnitI(u as UnitI), color: "red", colorLight: "red" },
    { key: "resistance", label: "抵抗", symbol: "R", str: resistanceStr, units: ["Ω", "kΩ", "MΩ"] as const, unit: unitR, setUnit: (u) => setUnitR(u as UnitR), color: "green", colorLight: "green" },
    { key: "power", label: "電力", symbol: "P", str: powerStr, units: ["W", "mW"] as const, unit: unitP, setUnit: (u) => setUnitP(u as UnitP), color: "amber", colorLight: "amber" },
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string; ring: string; badge: string; badgeText: string }> = {
    blue:  { bg: "bg-blue-50",  border: "border-blue-300",  text: "text-blue-700",  ring: "focus:border-blue-400", badge: "bg-blue-100", badgeText: "text-blue-800" },
    red:   { bg: "bg-red-50",   border: "border-red-300",   text: "text-red-700",   ring: "focus:border-red-400", badge: "bg-red-100", badgeText: "text-red-800" },
    green: { bg: "bg-green-50", border: "border-green-300", text: "text-green-700", ring: "focus:border-green-400", badge: "bg-green-100", badgeText: "text-green-800" },
    amber: { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700", ring: "focus:border-amber-400", badge: "bg-amber-100", badgeText: "text-amber-800" },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 入力フォーム */}
      <div className="space-y-6">
        {/* 入力フィールド */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-1 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded flex items-center justify-center text-xs font-bold">1</span>
            値を入力（任意の2つ）
          </h3>
          <p className="text-xs text-gray-400 mb-4 ml-8">2つの値を入力すると、残りが自動計算されます</p>

          <div className="space-y-4">
            {inputFields.map((field) => {
              const isInput = userInputs.has(field.key);
              const isComputed = !isInput && result !== null && userInputs.size >= 2;
              const c = colorMap[field.color];
              return (
                <div
                  key={field.key}
                  className={`rounded-lg p-3 transition-colors ${
                    isInput ? `${c.bg} border ${c.border}` : isComputed ? "bg-gray-50 border border-gray-200" : "border border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                      <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold ${isInput ? `${c.badge} ${c.badgeText}` : "bg-gray-100 text-gray-500"}`}>
                        {field.symbol}
                      </span>
                      {field.label}
                      {isInput && (
                        <span className={`text-[10px] ${c.badgeText} ${c.badge} px-1.5 py-0.5 rounded`}>入力</span>
                      )}
                      {isComputed && (
                        <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">計算値</span>
                      )}
                    </label>
                    {/* 単位切替 */}
                    <div className="flex gap-0.5">
                      {field.units.map((u) => (
                        <button
                          key={u}
                          onClick={() => field.setUnit(u)}
                          className={`text-[10px] px-2 py-0.5 rounded transition-colors ${
                            field.unit === u
                              ? `${c.bg} ${c.border} border ${c.text} font-semibold`
                              : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={isComputed && result ? "" : field.str}
                      placeholder={isComputed && result ? formatValue(result[field.key], field.key) : "0"}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className={`flex-1 border rounded px-3 py-1.5 text-sm focus:outline-none ${
                        isInput ? `${c.border} ${c.ring}` : "border-gray-300 focus:border-blue-400"
                      } ${isComputed ? "bg-gray-50 text-gray-400" : "bg-white"}`}
                    />
                    <span className="text-sm text-gray-500 w-8">{field.unit}</span>
                  </div>
                  {/* 計算結果をフィールド下に表示 */}
                  {isComputed && result && (
                    <p className="text-sm font-semibold text-[#1a2332] mt-1.5 ml-1">
                      = {formatValue(result[field.key], field.key)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleReset}
            className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors underline"
          >
            リセット
          </button>
        </div>

        {/* プリセット */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-1 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded flex items-center justify-center text-xs font-bold">2</span>
            よく使うプリセット
          </h3>
          <p className="text-xs text-gray-400 mb-3 ml-8">クリックで電圧と最大電流を自動入力</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p)}
                className="text-left text-xs px-3 py-2.5 rounded border bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50 transition-colors"
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
        {/* オームの法則の輪 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-3">オームの法則の輪</h3>
          <div className="bg-[#F5F7FA] rounded-lg p-4">
            <OhmsLawWheel inputKeys={userInputs} />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            入力した値がハイライトされます（12公式を円形配置）
          </p>
        </div>

        {/* 計算結果 */}
        {result ? (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5">
            <h3 className="font-bold text-[#1a2332] text-sm mb-4">計算結果</h3>
            <div className="space-y-3">
              {(["voltage", "current", "resistance", "power"] as ValueKey[]).map((key) => {
                const labels: Record<ValueKey, string> = { voltage: "電圧 (V)", current: "電流 (I)", resistance: "抵抗 (R)", power: "電力 (P)" };
                const isInput = result.inputKeys.has(key);
                return (
                  <div
                    key={key}
                    className={`flex justify-between items-baseline ${!isInput ? "bg-white/60 rounded px-3 py-2" : ""}`}
                  >
                    <span className={`text-sm ${isInput ? "text-gray-500" : "font-semibold text-blue-800"}`}>
                      {labels[key]} {isInput ? "(入力)" : "(計算)"}
                    </span>
                    <span className={`text-sm font-mono ${isInput ? "text-gray-600" : "text-lg font-bold text-blue-900"}`}>
                      {formatValue(result[key], key)}
                    </span>
                  </div>
                );
              })}
            </div>

            {result.resistance > 0 && (
              <div className="mt-4 pt-4 border-t border-blue-200">
                <a
                  href={amazonSearchUrl(resistorSearchQuery)}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#FF6D00] hover:bg-[#E65100] text-white font-semibold py-2 px-5 rounded transition-colors text-sm"
                >
                  この抵抗値をAmazonで探す
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
            <p className="text-sm text-gray-400">
              {userInputs.size < 2
                ? "任意の2つの値を入力すると計算結果が表示されます"
                : "有効な値を入力してください"}
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

        {/* 公式解説 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-3">オームの法則 基本公式</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { formula: "V = I × R", desc: "電圧 = 電流 × 抵抗" },
              { formula: "I = V / R", desc: "電流 = 電圧 / 抵抗" },
              { formula: "R = V / I", desc: "抵抗 = 電圧 / 電流" },
              { formula: "P = V × I", desc: "電力 = 電圧 × 電流" },
              { formula: "P = I² × R", desc: "電力 = 電流² × 抵抗" },
              { formula: "P = V² / R", desc: "電力 = 電圧² / 抵抗" },
            ].map((f, i) => (
              <div key={i} className="bg-[#F5F7FA] rounded p-2.5">
                <p className="font-mono text-sm text-[#1a2332] font-semibold">{f.formula}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 関連パーツ */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-3">関連ツール</h3>
          <div className="space-y-2">
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
            <a
              href="/tools/parts-database"
              className="flex items-center gap-2 text-sm text-[#00838F] hover:text-[#006064] transition-colors"
            >
              <span>📋</span>
              <span>パーツ辞典</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
