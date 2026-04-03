"use client";

import { useState, useMemo } from "react";
import type { CircuitType, CalcResult } from "@/types/led-calculator";
import { E24_BASE } from "@/types/led-calculator";
import { LED_PRESETS, SUPPLY_VOLTAGE_PRESETS } from "@/constants/ledCalculator";
import { amazonSearchUrl } from "@/lib/site";
import { ExternalLink } from "lucide-react";

function findNearestE24(value: number): number {
  if (value <= 0) return 1;
  const decade = Math.pow(10, Math.floor(Math.log10(value)));
  const normalized = value / decade;
  let closest = E24_BASE[0];
  let minDiff = Math.abs(normalized - closest);
  for (const base of E24_BASE) {
    const diff = Math.abs(normalized - base);
    if (diff < minDiff) {
      minDiff = diff;
      closest = base;
    }
  }
  let result = closest * decade;
  const nextDecade = closest * decade * 10;
  const prevNorm = E24_BASE[E24_BASE.length - 1] * (decade / 10);
  if (Math.abs(value - prevNorm) < Math.abs(value - result) && decade > 1) {
    result = prevNorm;
  }
  if (Math.abs(value - nextDecade / 10) < Math.abs(value - result)) {
    result = nextDecade / 10;
  }
  return Math.round(result * 100) / 100;
}

function getRecommendedWattage(power: number): string {
  if (power <= 0.125) return "1/8W";
  if (power <= 0.25) return "1/4W";
  if (power <= 0.5) return "1/2W";
  if (power <= 1) return "1W";
  return "2W以上";
}

function formatResistance(ohms: number): string {
  if (ohms >= 1_000_000) return `${(ohms / 1_000_000).toFixed(1)}MΩ`;
  if (ohms >= 1_000) return `${(ohms / 1_000).toFixed(ohms >= 10_000 ? 0 : 1)}kΩ`;
  return `${Math.round(ohms)}Ω`;
}

function CircuitDiagram({
  circuitType,
  ledCount,
}: {
  circuitType: CircuitType;
  ledCount: number;
}) {
  if (circuitType === "series") {
    const ledsToShow = Math.min(ledCount, 4);
    const h = 80 + ledsToShow * 40;
    return (
      <svg viewBox={`0 0 200 ${h}`} className="w-full max-w-[200px] mx-auto">
        <line x1="100" y1="10" x2="100" y2="30" stroke="#1a2332" strokeWidth="2" />
        <text x="100" y="8" textAnchor="middle" fontSize="10" fill="#00838F" fontWeight="bold">+Vs</text>
        <rect x="90" y="30" width="20" height="30" fill="none" stroke="#1a2332" strokeWidth="2" rx="2" />
        <text x="120" y="48" fontSize="9" fill="#4A5568">R</text>
        {Array.from({ length: ledsToShow }).map((_, i) => {
          const y = 70 + i * 40;
          return (
            <g key={i}>
              <line x1="100" y1={y - 10} x2="100" y2={y} stroke="#1a2332" strokeWidth="2" />
              <polygon points={`90,${y} 110,${y} 100,${y + 15}`} fill="#f59e0b" stroke="#1a2332" strokeWidth="1.5" />
              <line x1="88" y1={y + 15} x2="112" y2={y + 15} stroke="#1a2332" strokeWidth="2" />
              <line x1="100" y1={y + 15} x2="100" y2={y + 30} stroke="#1a2332" strokeWidth="2" />
            </g>
          );
        })}
        {ledCount > 4 && (
          <text x="100" y={70 + ledsToShow * 40 - 5} textAnchor="middle" fontSize="10" fill="#4A5568">...</text>
        )}
        <line x1="80" y1={h - 10} x2="120" y2={h - 10} stroke="#1a2332" strokeWidth="2" />
        <text x="100" y={h - 1} textAnchor="middle" fontSize="10" fill="#4A5568">GND</text>
      </svg>
    );
  }

  if (circuitType === "parallel") {
    const cols = Math.min(ledCount, 4);
    const w = 40 + cols * 50;
    return (
      <svg viewBox={`0 0 ${w} 140`} className="w-full max-w-[280px] mx-auto">
        <text x={w / 2} y="8" textAnchor="middle" fontSize="10" fill="#00838F" fontWeight="bold">+Vs</text>
        <line x1={w / 2} y1="12" x2={w / 2} y2="25" stroke="#1a2332" strokeWidth="2" />
        <line x1="20" y1="25" x2={w - 20} y2="25" stroke="#1a2332" strokeWidth="2" />
        {Array.from({ length: cols }).map((_, i) => {
          const x = 20 + (w - 40) / (cols - 1 || 1) * (cols === 1 ? 0.5 : i) + (cols === 1 ? (w - 40) / 2 : 0);
          const cx = cols === 1 ? w / 2 : 20 + (w - 40) / (cols - 1) * i;
          return (
            <g key={i}>
              <line x1={cx} y1="25" x2={cx} y2="40" stroke="#1a2332" strokeWidth="2" />
              <rect x={cx - 8} y="40" width="16" height="24" fill="none" stroke="#1a2332" strokeWidth="1.5" rx="2" />
              <text x={cx + 14} y="55" fontSize="7" fill="#4A5568">R</text>
              <line x1={cx} y1="64" x2={cx} y2="72" stroke="#1a2332" strokeWidth="2" />
              <polygon points={`${cx - 8},72 ${cx + 8},72 ${cx},85`} fill="#f59e0b" stroke="#1a2332" strokeWidth="1.5" />
              <line x1={cx - 9} y1="85" x2={cx + 9} y2="85" stroke="#1a2332" strokeWidth="1.5" />
              <line x1={cx} y1="85" x2={cx} y2="105" stroke="#1a2332" strokeWidth="2" />
            </g>
          );
        })}
        {ledCount > 4 && (
          <text x={w - 10} y="70" fontSize="12" fill="#4A5568">...</text>
        )}
        <line x1="20" y1="105" x2={w - 20} y2="105" stroke="#1a2332" strokeWidth="2" />
        <line x1={w / 2} y1="105" x2={w / 2} y2="118" stroke="#1a2332" strokeWidth="2" />
        <line x1={w / 2 - 15} y1="118" x2={w / 2 + 15} y2="118" stroke="#1a2332" strokeWidth="2" />
        <text x={w / 2} y="132" textAnchor="middle" fontSize="10" fill="#4A5568">GND</text>
      </svg>
    );
  }

  // single
  return (
    <svg viewBox="0 0 200 160" className="w-full max-w-[200px] mx-auto">
      <text x="100" y="8" textAnchor="middle" fontSize="10" fill="#00838F" fontWeight="bold">+Vs</text>
      <line x1="100" y1="12" x2="100" y2="30" stroke="#1a2332" strokeWidth="2" />
      <rect x="90" y="30" width="20" height="30" fill="none" stroke="#1a2332" strokeWidth="2" rx="2" />
      <text x="120" y="48" fontSize="9" fill="#4A5568">R</text>
      <line x1="100" y1="60" x2="100" y2="75" stroke="#1a2332" strokeWidth="2" />
      <polygon points="90,75 110,75 100,95" fill="#f59e0b" stroke="#1a2332" strokeWidth="1.5" />
      <line x1="88" y1="95" x2="112" y2="95" stroke="#1a2332" strokeWidth="2" />
      <line x1="106" y1="80" x2="118" y2="72" stroke="#f59e0b" strokeWidth="1.5" />
      <polygon points="118,72 114,76 116,70" fill="#f59e0b" />
      <line x1="110" y1="84" x2="122" y2="76" stroke="#f59e0b" strokeWidth="1.5" />
      <polygon points="122,76 118,80 120,74" fill="#f59e0b" />
      <line x1="100" y1="95" x2="100" y2="120" stroke="#1a2332" strokeWidth="2" />
      <line x1="80" y1="120" x2="120" y2="120" stroke="#1a2332" strokeWidth="2" />
      <text x="100" y="138" textAnchor="middle" fontSize="10" fill="#4A5568">GND</text>
    </svg>
  );
}

export default function LedResistorCalcClient() {
  const [supplyVoltage, setSupplyVoltage] = useState(5.0);
  const [customVoltage, setCustomVoltage] = useState("");
  const [voltagePreset, setVoltagePreset] = useState("Arduino 5V");
  const [ledColor, setLedColor] = useState("赤");
  const [forwardVoltage, setForwardVoltage] = useState(2.0);
  const [forwardCurrent, setForwardCurrent] = useState(20);
  const [circuitType, setCircuitType] = useState<CircuitType>("single");
  const [ledCount, setLedCount] = useState(2);

  const handleVoltagePreset = (label: string) => {
    setVoltagePreset(label);
    if (label === "カスタム") return;
    const preset = SUPPLY_VOLTAGE_PRESETS.find((p) => p.label === label);
    if (preset) setSupplyVoltage(preset.voltage);
  };

  const handleCustomVoltage = (val: string) => {
    setCustomVoltage(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) setSupplyVoltage(num);
  };

  const handleLedColor = (color: string) => {
    setLedColor(color);
    if (color === "カスタム") return;
    const preset = LED_PRESETS.find((p) => p.color === color);
    if (preset) {
      setForwardVoltage(preset.forwardVoltage);
      setForwardCurrent(preset.forwardCurrent);
    }
  };

  const result = useMemo<CalcResult | null>(() => {
    const vf = circuitType === "series" ? forwardVoltage * ledCount : forwardVoltage;
    const ifMa = forwardCurrent;
    const vs = supplyVoltage;

    if (vs <= vf || ifMa <= 0) return null;

    const resistance = (vs - vf) / (ifMa / 1000);
    const nearestE24 = findNearestE24(resistance);
    const actualCurrent = ((vs - vf) / nearestE24) * 1000;
    const powerDissipation = ((vs - vf) * (vs - vf)) / nearestE24;
    const recommendedWattage = getRecommendedWattage(powerDissipation * 2);

    return {
      resistance,
      nearestE24,
      powerDissipation,
      ledCurrent: actualCurrent,
      recommendedWattage,
    };
  }, [supplyVoltage, forwardVoltage, forwardCurrent, circuitType, ledCount]);

  const warnings = useMemo<string[]>(() => {
    const w: string[] = [];
    const vf = circuitType === "series" ? forwardVoltage * ledCount : forwardVoltage;
    if (supplyVoltage <= vf) {
      w.push("電源電圧がLEDの順方向電圧より低いため、LEDは点灯しません。電源電圧を上げるか、LED数を減らしてください。");
    }
    if (result && result.ledCurrent > forwardCurrent * 1.2) {
      w.push(`E24系列の抵抗値では、LEDに流れる電流が定格（${forwardCurrent}mA）を超えます。1つ大きい値の抵抗を使用してください。`);
    }
    if (circuitType === "series" && supplyVoltage - vf < 1) {
      w.push("電源電圧とLED電圧の差が小さすぎます。安定した動作のため、余裕を持たせてください。");
    }
    return w;
  }, [supplyVoltage, forwardVoltage, forwardCurrent, circuitType, ledCount, result]);

  const resistorSearchQuery = result
    ? `抵抗 ${formatResistance(result.nearestE24)} ${result.recommendedWattage} カーボン`
    : "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 入力フォーム */}
      <div className="space-y-6">
        {/* 電源電圧 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded flex items-center justify-center text-xs font-bold">1</span>
            電源電圧
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {SUPPLY_VOLTAGE_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => handleVoltagePreset(p.label)}
                className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                  voltagePreset === p.label
                    ? "bg-amber-50 border-amber-300 text-amber-800 font-semibold"
                    : "bg-white border-gray-200 text-gray-600 hover:border-amber-300"
                }`}
              >
                {p.label}
              </button>
            ))}
            <button
              onClick={() => handleVoltagePreset("カスタム")}
              className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                voltagePreset === "カスタム"
                  ? "bg-amber-50 border-amber-300 text-amber-800 font-semibold"
                  : "bg-white border-gray-200 text-gray-600 hover:border-amber-300"
              }`}
            >
              カスタム
            </button>
          </div>
          {voltagePreset === "カスタム" && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={customVoltage}
                onChange={(e) => handleCustomVoltage(e.target.value)}
                placeholder="電圧を入力"
                className="w-32 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-amber-400"
              />
              <span className="text-sm text-gray-500">V</span>
            </div>
          )}
          <p className="text-xs text-gray-400 mt-2">現在: {supplyVoltage}V</p>
        </div>

        {/* LED仕様 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded flex items-center justify-center text-xs font-bold">2</span>
            LED仕様
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {LED_PRESETS.map((p) => (
              <button
                key={p.color}
                onClick={() => handleLedColor(p.color)}
                className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                  ledColor === p.color
                    ? "bg-amber-50 border-amber-300 text-amber-800 font-semibold"
                    : "bg-white border-gray-200 text-gray-600 hover:border-amber-300"
                }`}
              >
                {p.color}
              </button>
            ))}
            <button
              onClick={() => handleLedColor("カスタム")}
              className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                ledColor === "カスタム"
                  ? "bg-amber-50 border-amber-300 text-amber-800 font-semibold"
                  : "bg-white border-gray-200 text-gray-600 hover:border-amber-300"
              }`}
            >
              カスタム
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">順方向電圧 (Vf)</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={forwardVoltage}
                  onChange={(e) => {
                    setForwardVoltage(parseFloat(e.target.value) || 0);
                    setLedColor("カスタム");
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-amber-400"
                />
                <span className="text-sm text-gray-500">V</span>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">順方向電流 (If)</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={forwardCurrent}
                  onChange={(e) => {
                    setForwardCurrent(parseFloat(e.target.value) || 0);
                    setLedColor("カスタム");
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-amber-400"
                />
                <span className="text-sm text-gray-500">mA</span>
              </div>
            </div>
          </div>
        </div>

        {/* 回路タイプ */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded flex items-center justify-center text-xs font-bold">3</span>
            回路タイプ
          </h3>
          <div className="flex gap-2 mb-3">
            {([
              { id: "single", label: "単体" },
              { id: "series", label: "直列" },
              { id: "parallel", label: "並列" },
            ] as const).map((t) => (
              <button
                key={t.id}
                onClick={() => setCircuitType(t.id)}
                className={`flex-1 text-xs py-2 rounded border transition-colors ${
                  circuitType === t.id
                    ? "bg-amber-50 border-amber-300 text-amber-800 font-semibold"
                    : "bg-white border-gray-200 text-gray-600 hover:border-amber-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {circuitType !== "single" && (
            <div>
              <label className="text-xs text-gray-500 block mb-1">LED個数</label>
              <input
                type="number"
                min="2"
                max="20"
                value={ledCount}
                onChange={(e) => setLedCount(Math.max(2, parseInt(e.target.value) || 2))}
                className="w-24 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-amber-400"
              />
              {circuitType === "parallel" && (
                <p className="text-xs text-gray-400 mt-1">※ 各LEDに個別の抵抗を接続します</p>
              )}
              {circuitType === "series" && (
                <p className="text-xs text-gray-400 mt-1">※ 直列LEDに1つの抵抗を使用します</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 結果 */}
      <div className="space-y-6">
        {/* 回路図 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-3">回路図</h3>
          <div className="bg-[#F5F7FA] rounded-lg p-4">
            <CircuitDiagram
              circuitType={circuitType}
              ledCount={circuitType === "single" ? 1 : ledCount}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            {circuitType === "single" && "LED 1個 + 抵抗 1本"}
            {circuitType === "series" && `LED ${ledCount}個直列 + 抵抗 1本`}
            {circuitType === "parallel" && `LED ${ledCount}個並列（各LED + 抵抗 ${ledCount}本）`}
          </p>
        </div>

        {/* 計算結果 */}
        {result ? (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-5">
            <h3 className="font-bold text-[#1a2332] text-sm mb-4">計算結果</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-600">計算抵抗値</span>
                <span className="text-sm font-mono text-gray-700">{result.resistance.toFixed(1)}Ω</span>
              </div>
              <div className="flex justify-between items-baseline bg-white/60 rounded px-3 py-2">
                <span className="text-sm font-semibold text-amber-800">E24推奨値</span>
                <span className="text-lg font-bold text-amber-900">{formatResistance(result.nearestE24)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-600">実際の電流（E24使用時）</span>
                <span className="text-sm font-mono text-gray-700">{result.ledCurrent.toFixed(1)}mA</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-600">抵抗の消費電力</span>
                <span className="text-sm font-mono text-gray-700">{(result.powerDissipation * 1000).toFixed(1)}mW</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-600">推奨ワット数</span>
                <span className="text-sm font-semibold text-gray-700">{result.recommendedWattage}</span>
              </div>
              {circuitType === "parallel" && (
                <div className="border-t border-amber-200 pt-2 mt-2">
                  <p className="text-xs text-amber-700">
                    ※ 抵抗は{ledCount}本必要です（各LED1本ずつ）
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-amber-200">
              <a
                href={amazonSearchUrl(resistorSearchQuery)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#FF6D00] hover:bg-[#E65100] text-white font-semibold py-2 px-5 rounded transition-colors text-sm"
              >
                この抵抗をAmazonで探す
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
            <p className="text-sm text-gray-400">
              {supplyVoltage <= (circuitType === "series" ? forwardVoltage * ledCount : forwardVoltage)
                ? "電源電圧が不足しています"
                : "パラメータを入力すると結果が表示されます"}
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
          <h3 className="font-bold text-[#1a2332] text-sm mb-2">計算式</h3>
          <div className="bg-[#F5F7FA] rounded p-3 font-mono text-sm text-gray-700">
            {circuitType === "series" ? (
              <>
                <p>R = (Vs - n × Vf) / If</p>
                <p className="text-xs text-gray-500 mt-1">
                  R = ({supplyVoltage} - {ledCount} × {forwardVoltage}) / {forwardCurrent}mA
                </p>
              </>
            ) : (
              <>
                <p>R = (Vs - Vf) / If</p>
                <p className="text-xs text-gray-500 mt-1">
                  R = ({supplyVoltage} - {forwardVoltage}) / {forwardCurrent}mA
                </p>
              </>
            )}
          </div>
        </div>

        {/* 関連リンク */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-bold text-[#1a2332] text-sm mb-3">関連パーツ</h3>
          <div className="space-y-2">
            <a
              href="/tools/parts-database/led-5mm"
              className="flex items-center gap-2 text-sm text-[#00838F] hover:text-[#006064] transition-colors"
            >
              <span>💡</span>
              <span>LED 5mm 砲弾型 — パーツ辞典</span>
            </a>
            <a
              href="/tools/parts-database/rgb-led"
              className="flex items-center gap-2 text-sm text-[#00838F] hover:text-[#006064] transition-colors"
            >
              <span>🌈</span>
              <span>RGBフルカラーLEDモジュール — パーツ辞典</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
