"use client";

import { useState, useMemo, useCallback } from "react";
import { COLOR_BANDS, E24_BASE, E96_BASE } from "@/constants/resistorColorCode";
import type { BandCount, ColorBand } from "@/constants/resistorColorCode";

/* ─── ユーティリティ ─── */

function formatResistance(ohms: number): string {
  if (ohms >= 1_000_000) return `${+(ohms / 1_000_000).toPrecision(4)}MΩ`;
  if (ohms >= 1_000) return `${+(ohms / 1_000).toPrecision(4)}kΩ`;
  if (ohms < 1) return `${+(ohms * 1000).toPrecision(4)}mΩ`;
  return `${+ohms.toPrecision(4)}Ω`;
}

function findNearest(value: number, series: number[]): number {
  if (value <= 0) return series[0];
  const decade = Math.pow(10, Math.floor(Math.log10(value)));
  const normalized = value / decade;
  let closest = series[0];
  let minDiff = Infinity;
  for (const base of series) {
    const diff = Math.abs(normalized - base);
    if (diff < minDiff) {
      minDiff = diff;
      closest = base;
    }
  }
  // check next decade down
  const prevDecade = series[series.length - 1] * (decade / 10);
  if (Math.abs(value - prevDecade) < Math.abs(value - closest * decade)) {
    return Math.round(prevDecade * 1e6) / 1e6;
  }
  return Math.round(closest * decade * 1e6) / 1e6;
}

function valueToBands(ohms: number, bandCount: BandCount): (ColorBand | null)[] {
  if (ohms <= 0) return Array(bandCount).fill(null);

  const digitBands = COLOR_BANDS.filter((b) => b.digit !== null);
  const multiplierBands = COLOR_BANDS.filter((b) => b.multiplier !== null);

  // Determine significant digits count
  const sigDigits = bandCount >= 5 ? 3 : 2;

  // Find the best multiplier
  let bestMultIdx = -1;
  let bestSig = 0;
  for (let i = 0; i < multiplierBands.length; i++) {
    const m = multiplierBands[i].multiplier!;
    const sig = ohms / m;
    const minSig = Math.pow(10, sigDigits - 1);
    const maxSig = Math.pow(10, sigDigits) - 1;
    if (sig >= minSig - 0.5 && sig <= maxSig + 0.5) {
      bestMultIdx = i;
      bestSig = Math.round(sig);
      break;
    }
  }

  if (bestMultIdx === -1) return Array(bandCount).fill(null);

  const digits = String(bestSig).padStart(sigDigits, "0").split("").map(Number);
  const result: (ColorBand | null)[] = digits.map(
    (d) => digitBands.find((b) => b.digit === d) ?? null
  );
  result.push(multiplierBands[bestMultIdx]);

  return result;
}

/* ─── SVG 抵抗器イラスト ─── */

function ResistorSvg({
  bands,
  bandCount,
  activeBandIndex,
}: {
  bands: (ColorBand | null)[];
  bandCount: BandCount;
  activeBandIndex: number | null;
}) {
  const w = 360;
  const h = 120;
  const bodyX = 80;
  const bodyW = 200;
  const bodyY = 30;
  const bodyH = 60;
  const bandW = bandCount === 6 ? 18 : 22;
  const totalBands = bandCount;
  const gap = (bodyW - totalBands * bandW) / (totalBands + 1);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md mx-auto" role="img" aria-label="抵抗器カラーコード表示">
      {/* リード線 */}
      <line x1="10" y1={bodyY + bodyH / 2} x2={bodyX} y2={bodyY + bodyH / 2} stroke="#888" strokeWidth="3" />
      <line x1={bodyX + bodyW} y1={bodyY + bodyH / 2} x2={w - 10} y2={bodyY + bodyH / 2} stroke="#888" strokeWidth="3" />
      {/* ボディ */}
      <rect x={bodyX} y={bodyY} width={bodyW} height={bodyH} rx="12" ry="12" fill="#E8D5B7" stroke="#C4A97D" strokeWidth="1.5" />
      {/* 色帯 */}
      {bands.map((band, i) => {
        const x = bodyX + gap + i * (bandW + gap);
        const isActive = activeBandIndex === i;
        return (
          <g key={i}>
            <rect
              x={x}
              y={bodyY + 4}
              width={bandW}
              height={bodyH - 8}
              rx="2"
              fill={band ? band.hex : "#E0D5C0"}
              stroke={isActive ? "#0891B2" : band ? (band.hex === "#FFFFFF" ? "#ccc" : "none") : "#ccc"}
              strokeWidth={isActive ? 2.5 : band?.hex === "#FFFFFF" ? 1 : 0}
              strokeDasharray={!band ? "4 2" : "none"}
            />
            {!band && (
              <text x={x + bandW / 2} y={bodyY + bodyH / 2 + 4} textAnchor="middle" fontSize="10" fill="#aaa">?</text>
            )}
          </g>
        );
      })}
      {/* バンド番号ラベル */}
      {bands.map((_, i) => {
        const x = bodyX + gap + i * (bandW + gap) + bandW / 2;
        const labels = bandCount === 4
          ? ["1st", "2nd", "×", "±"]
          : bandCount === 5
            ? ["1st", "2nd", "3rd", "×", "±"]
            : ["1st", "2nd", "3rd", "×", "±", "ppm"];
        return (
          <text key={i} x={x} y={bodyY + bodyH + 16} textAnchor="middle" fontSize="9" fill="#666">
            {labels[i]}
          </text>
        );
      })}
    </svg>
  );
}

/* ─── 色選択ボタン ─── */

function ColorButton({
  band,
  selected,
  onClick,
  disabled,
}: {
  band: ColorBand;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  const isLight = ["#FFFFFF", "#FFD700", "#C0C0C0", "#CFB53B"].includes(band.hex);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center gap-2 px-3 py-1.5 rounded border text-xs transition-all ${
        disabled
          ? "opacity-30 cursor-not-allowed border-gray-200"
          : selected
            ? "border-cyan-500 ring-2 ring-cyan-200 shadow-sm"
            : "border-gray-200 hover:border-cyan-300"
      }`}
      title={`${band.color} (${band.colorEn})`}
    >
      <span
        className="w-4 h-4 rounded-sm shrink-0 border"
        style={{
          backgroundColor: band.hex,
          borderColor: isLight ? "#ccc" : band.hex,
        }}
      />
      <span className="text-gray-700 font-medium">{band.color}</span>
    </button>
  );
}

/* ─── メインコンポーネント ─── */

export default function ResistorColorCodeClient() {
  const [mode, setMode] = useState<"decode" | "encode">("decode");
  const [bandCount, setBandCount] = useState<BandCount>(4);
  const [selectedBands, setSelectedBands] = useState<(number | null)[]>([null, null, null, null]);
  const [activeBandIndex, setActiveBandIndex] = useState<number | null>(0);

  // 逆引き用
  const [inputValue, setInputValue] = useState("");
  const [inputUnit, setInputUnit] = useState<"Ω" | "kΩ" | "MΩ">("Ω");
  const [inputTolerance, setInputTolerance] = useState(5);

  const handleBandCountChange = useCallback((count: BandCount) => {
    setBandCount(count);
    setSelectedBands(Array(count).fill(null));
    setActiveBandIndex(0);
  }, []);

  const handleColorSelect = useCallback(
    (colorIndex: number) => {
      if (activeBandIndex === null) return;
      setSelectedBands((prev) => {
        const next = [...prev];
        next[activeBandIndex] = colorIndex;
        return next;
      });
      // 次のバンドへ自動移動
      if (activeBandIndex < bandCount - 1) {
        setActiveBandIndex(activeBandIndex + 1);
      }
    },
    [activeBandIndex, bandCount]
  );

  // 正引き計算
  const decodeResult = useMemo(() => {
    const bands = selectedBands.map((idx) => (idx !== null ? COLOR_BANDS[idx] : null));

    const digitCount = bandCount >= 5 ? 3 : 2;
    const digitBands = bands.slice(0, digitCount);
    const multiplierBand = bands[digitCount];
    const toleranceBand = bands[digitCount + 1];
    const tempCoeffBand = bandCount === 6 ? bands[5] : null;

    // 全有効数字バンドが選択されているか
    if (digitBands.some((b) => b === null || b.digit === null)) return null;
    if (!multiplierBand || multiplierBand.multiplier === null) return null;

    const sigValue = digitBands.reduce((acc, b) => acc * 10 + b!.digit!, 0);
    const resistance = sigValue * multiplierBand.multiplier;
    const tolerance = toleranceBand?.tolerance ?? null;
    const tempCoeff = tempCoeffBand?.tempCoeff ?? null;

    return { resistance, tolerance, tempCoeff };
  }, [selectedBands, bandCount]);

  // 逆引き計算
  const encodeResult = useMemo(() => {
    const numVal = parseFloat(inputValue);
    if (isNaN(numVal) || numVal <= 0) return null;

    const multiplierMap = { "Ω": 1, "kΩ": 1000, "MΩ": 1000000 };
    const ohms = numVal * multiplierMap[inputUnit];

    // E24最近値
    const nearestE24 = findNearest(ohms, E24_BASE);
    // E96最近値
    const nearestE96 = findNearest(ohms, E96_BASE);

    // 4バンドのカラーコード
    const bands4 = valueToBands(nearestE24, 4);
    // 5バンドのカラーコード
    const bands5 = valueToBands(nearestE96, 5);

    // 許容差バンド
    const tolBand = COLOR_BANDS.find((b) => b.tolerance === inputTolerance) ?? null;

    return {
      ohms,
      nearestE24,
      nearestE96,
      bands4,
      bands5,
      toleranceBand: tolBand,
    };
  }, [inputValue, inputUnit, inputTolerance]);

  // 正引きモードのバンド表示用
  const displayBands = useMemo(() => {
    return selectedBands.map((idx) => (idx !== null ? COLOR_BANDS[idx] : null));
  }, [selectedBands]);

  // 逆引きモードのバンド表示用
  const encodeBands = useMemo(() => {
    if (!encodeResult) return Array(4).fill(null) as (ColorBand | null)[];
    const bands = [...encodeResult.bands4];
    if (encodeResult.toleranceBand) bands.push(encodeResult.toleranceBand);
    else bands.push(null);
    return bands;
  }, [encodeResult]);

  // 有効数字バンドで選択可能な色
  const getAvailableColors = useCallback(
    (bandIndex: number) => {
      const digitCount = bandCount >= 5 ? 3 : 2;
      if (bandIndex < digitCount) {
        // 有効数字: digit !== null の色のみ
        return COLOR_BANDS.map((b, i) => ({ ...b, originalIndex: i, available: b.digit !== null }));
      } else if (bandIndex === digitCount) {
        // 乗数: multiplier !== null
        return COLOR_BANDS.map((b, i) => ({ ...b, originalIndex: i, available: b.multiplier !== null }));
      } else if (bandIndex === digitCount + 1) {
        // 許容差: tolerance !== null
        return COLOR_BANDS.map((b, i) => ({ ...b, originalIndex: i, available: b.tolerance !== null }));
      } else {
        // 温度係数: tempCoeff !== null
        return COLOR_BANDS.map((b, i) => ({ ...b, originalIndex: i, available: b.tempCoeff !== null }));
      }
    },
    [bandCount]
  );

  const bandLabels = bandCount === 4
    ? ["第1数字", "第2数字", "乗数", "許容差"]
    : bandCount === 5
      ? ["第1数字", "第2数字", "第3数字", "乗数", "許容差"]
      : ["第1数字", "第2数字", "第3数字", "乗数", "許容差", "温度係数"];

  return (
    <div>
      {/* タブ切替 */}
      <div className="flex gap-1 mb-8 bg-gray-100 p-1 rounded-lg max-w-xs">
        <button
          onClick={() => setMode("decode")}
          className={`flex-1 text-sm py-2 px-4 rounded-md font-medium transition-colors ${
            mode === "decode"
              ? "bg-white text-cyan-700 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          色 → 抵抗値
        </button>
        <button
          onClick={() => setMode("encode")}
          className={`flex-1 text-sm py-2 px-4 rounded-md font-medium transition-colors ${
            mode === "encode"
              ? "bg-white text-cyan-700 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          抵抗値 → 色
        </button>
      </div>

      {mode === "decode" ? (
        /* ── 正引きモード ── */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左: 入力 */}
          <div className="space-y-6">
            {/* バンド数選択 */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold text-[#1a2332] text-sm mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-cyan-100 text-cyan-700 rounded flex items-center justify-center text-xs font-bold">1</span>
                バンド数
              </h3>
              <div className="flex gap-2">
                {([4, 5, 6] as BandCount[]).map((n) => (
                  <button
                    key={n}
                    onClick={() => handleBandCountChange(n)}
                    className={`flex-1 text-sm py-2 rounded border transition-colors ${
                      bandCount === n
                        ? "bg-cyan-50 border-cyan-300 text-cyan-800 font-semibold"
                        : "bg-white border-gray-200 text-gray-600 hover:border-cyan-300"
                    }`}
                  >
                    {n}バンド
                  </button>
                ))}
              </div>
            </div>

            {/* 色選択 */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold text-[#1a2332] text-sm mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-cyan-100 text-cyan-700 rounded flex items-center justify-center text-xs font-bold">2</span>
                色を選択
              </h3>

              {/* バンド選択タブ */}
              <div className="flex flex-wrap gap-1 mb-4">
                {bandLabels.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveBandIndex(i)}
                    className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                      activeBandIndex === i
                        ? "bg-cyan-50 border-cyan-300 text-cyan-800 font-semibold"
                        : "bg-white border-gray-200 text-gray-500 hover:border-cyan-300"
                    }`}
                  >
                    {label}
                    {selectedBands[i] !== null && (
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full ml-1.5 border align-middle"
                        style={{
                          backgroundColor: COLOR_BANDS[selectedBands[i]!].hex,
                          borderColor: COLOR_BANDS[selectedBands[i]!].hex === "#FFFFFF" ? "#ccc" : COLOR_BANDS[selectedBands[i]!].hex,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* 色ボタングリッド */}
              {activeBandIndex !== null && (
                <div className="flex flex-wrap gap-2">
                  {getAvailableColors(activeBandIndex).map((band) => (
                    <ColorButton
                      key={band.originalIndex}
                      band={band}
                      selected={selectedBands[activeBandIndex] === band.originalIndex}
                      onClick={() => handleColorSelect(band.originalIndex)}
                      disabled={!band.available}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* リセット */}
            <button
              onClick={() => {
                setSelectedBands(Array(bandCount).fill(null));
                setActiveBandIndex(0);
              }}
              className="text-sm text-gray-400 hover:text-cyan-600 transition-colors"
            >
              選択をリセット
            </button>
          </div>

          {/* 右: 結果 */}
          <div className="space-y-6">
            {/* SVGイラスト */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold text-[#1a2332] text-sm mb-3">抵抗器プレビュー</h3>
              <div className="bg-[#F5F7FA] rounded-lg p-4">
                <ResistorSvg bands={displayBands} bandCount={bandCount} activeBandIndex={activeBandIndex} />
              </div>
            </div>

            {/* 計算結果 */}
            {decodeResult ? (
              <div className="bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-200 rounded-lg p-5">
                <h3 className="font-bold text-[#1a2332] text-sm mb-4">読み取り結果</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline bg-white/60 rounded px-3 py-2">
                    <span className="text-sm font-semibold text-cyan-800">抵抗値</span>
                    <span className="text-xl font-bold text-cyan-900">{formatResistance(decodeResult.resistance)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-gray-600">許容差</span>
                    <span className="text-sm font-mono text-gray-700">
                      {decodeResult.tolerance !== null ? `±${decodeResult.tolerance}%` : "未選択"}
                    </span>
                  </div>
                  {bandCount === 6 && (
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">温度係数</span>
                      <span className="text-sm font-mono text-gray-700">
                        {decodeResult.tempCoeff !== null ? `${decodeResult.tempCoeff} ppm/°C` : "未選択"}
                      </span>
                    </div>
                  )}
                  {decodeResult.tolerance !== null && (
                    <div className="flex justify-between items-baseline text-gray-500">
                      <span className="text-xs">実際の範囲</span>
                      <span className="text-xs font-mono">
                        {formatResistance(decodeResult.resistance * (1 - decodeResult.tolerance / 100))}
                        {" ~ "}
                        {formatResistance(decodeResult.resistance * (1 + decodeResult.tolerance / 100))}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
                <p className="text-sm text-gray-400">
                  有効数字と乗数の色を選択すると結果が表示されます
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ── 逆引きモード ── */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左: 入力 */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold text-[#1a2332] text-sm mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-cyan-100 text-cyan-700 rounded flex items-center justify-center text-xs font-bold">1</span>
                抵抗値を入力
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="例: 4.7"
                  className="w-40 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"
                />
                <select
                  value={inputUnit}
                  onChange={(e) => setInputUnit(e.target.value as "Ω" | "kΩ" | "MΩ")}
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="Ω">Ω</option>
                  <option value="kΩ">kΩ</option>
                  <option value="MΩ">MΩ</option>
                </select>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold text-[#1a2332] text-sm mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-cyan-100 text-cyan-700 rounded flex items-center justify-center text-xs font-bold">2</span>
                許容差
              </h3>
              <div className="flex flex-wrap gap-2">
                {COLOR_BANDS.filter((b) => b.tolerance !== null).map((b) => (
                  <button
                    key={b.tolerance}
                    onClick={() => setInputTolerance(b.tolerance!)}
                    className={`text-xs px-3 py-1.5 rounded border transition-colors flex items-center gap-1.5 ${
                      inputTolerance === b.tolerance
                        ? "bg-cyan-50 border-cyan-300 text-cyan-800 font-semibold"
                        : "bg-white border-gray-200 text-gray-600 hover:border-cyan-300"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-sm border"
                      style={{
                        backgroundColor: b.hex,
                        borderColor: b.hex === "#FFFFFF" ? "#ccc" : b.hex,
                      }}
                    />
                    ±{b.tolerance}%（{b.color}）
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右: 結果 */}
          <div className="space-y-6">
            {encodeResult ? (
              <>
                {/* SVGイラスト */}
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <h3 className="font-bold text-[#1a2332] text-sm mb-3">4バンド（E24系列）</h3>
                  <div className="bg-[#F5F7FA] rounded-lg p-4">
                    <ResistorSvg bands={encodeBands} bandCount={4} activeBandIndex={null} />
                  </div>
                  <p className="text-center text-sm font-semibold text-cyan-800 mt-3">
                    {formatResistance(encodeResult.nearestE24)} ±{inputTolerance}%
                  </p>
                  <div className="flex justify-center gap-2 mt-2">
                    {encodeBands.map((b, i) => (
                      <span key={i} className="text-xs text-gray-500">
                        {b ? b.color : "—"}
                        {i < encodeBands.length - 1 && " ·"}
                      </span>
                    ))}
                  </div>
                </div>

                {/* E96 5バンド */}
                {encodeResult.bands5.every((b) => b !== null) && (
                  <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <h3 className="font-bold text-[#1a2332] text-sm mb-3">5バンド（E96系列）</h3>
                    <div className="bg-[#F5F7FA] rounded-lg p-4">
                      <ResistorSvg
                        bands={[...encodeResult.bands5, encodeResult.toleranceBand]}
                        bandCount={5}
                        activeBandIndex={null}
                      />
                    </div>
                    <p className="text-center text-sm font-semibold text-cyan-800 mt-3">
                      {formatResistance(encodeResult.nearestE96)} ±{inputTolerance}%
                    </p>
                    <div className="flex justify-center gap-2 mt-2">
                      {[...encodeResult.bands5, encodeResult.toleranceBand].map((b, i) => (
                        <span key={i} className="text-xs text-gray-500">
                          {b ? b.color : "—"}
                          {i < encodeResult.bands5.length && " ·"}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 入力値との差 */}
                <div className="bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-200 rounded-lg p-5">
                  <h3 className="font-bold text-[#1a2332] text-sm mb-3">系列値との比較</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">入力値</span>
                      <span className="text-sm font-mono text-gray-700">{formatResistance(encodeResult.ohms)}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">E24最近値</span>
                      <span className="text-sm font-mono font-semibold text-cyan-800">{formatResistance(encodeResult.nearestE24)}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">E96最近値</span>
                      <span className="text-sm font-mono font-semibold text-cyan-800">{formatResistance(encodeResult.nearestE96)}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-gray-500">
                      <span className="text-xs">E24誤差</span>
                      <span className="text-xs font-mono">
                        {(((encodeResult.nearestE24 - encodeResult.ohms) / encodeResult.ohms) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-gray-500">
                      <span className="text-xs">E96誤差</span>
                      <span className="text-xs font-mono">
                        {(((encodeResult.nearestE96 - encodeResult.ohms) / encodeResult.ohms) * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
                <p className="text-sm text-gray-400">抵抗値を入力すると結果が表示されます</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
