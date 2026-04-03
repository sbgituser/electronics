"use client";

import { useState, useMemo, useCallback } from "react";
import {
  COMPONENT_SPECS,
  POWER_SOURCES,
  CATEGORIES,
  CATEGORY_COLORS,
  SAFETY_MARGIN,
  type ComponentSpec,
  type PowerSource,
} from "@/constants/powerSupplyCalc";
import { amazonSearchUrl } from "@/lib/site";
import { ExternalLink, Plus, Minus, Trash2, Zap, Battery, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface SelectedComponent {
  spec: ComponentSpec;
  quantity: number;
}

function formatCurrent(mA: number): string {
  if (mA >= 1000) return `${(mA / 1000).toFixed(2)}A`;
  if (mA < 1) return `${(mA * 1000).toFixed(0)}μA`;
  return `${mA.toFixed(1)}mA`;
}

function formatTime(hours: number): string {
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const h = Math.floor(hours % 24);
    return h > 0 ? `約${days}日${h}時間` : `約${days}日`;
  }
  if (hours >= 1) {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return m > 0 ? `約${h}時間${m}分` : `約${h}時間`;
  }
  return `約${Math.round(hours * 60)}分`;
}

/* ── 円グラフ（SVG ドーナツ） ── */
function DonutChart({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return null;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let cumulativeOffset = 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 160 160" className="w-40 h-40">
        {segments.map((seg, i) => {
          const pct = seg.value / total;
          const dashLength = circumference * pct;
          const dashOffset = circumference * cumulativeOffset;
          cumulativeOffset += pct;
          return (
            <circle
              key={i}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="24"
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={-dashOffset}
              transform="rotate(-90 80 80)"
            />
          );
        })}
        <text x="80" y="76" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1a2332">
          {formatCurrent(total)}
        </text>
        <text x="80" y="94" textAnchor="middle" fontSize="9" fill="#6b7280">
          合計（標準）
        </text>
      </svg>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span>
              {seg.label} ({Math.round((seg.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── カテゴリ色 → チャート色 ── */
const CHART_COLORS: Record<string, string> = {
  "マイコン": "#3b82f6",
  "センサー": "#10b981",
  "表示": "#8b5cf6",
  "モーター": "#ef4444",
  "通信": "#0ea5e9",
  "LED": "#f59e0b",
  "その他": "#6b7280",
};

export default function PowerSupplyCalcClient() {
  const [selected, setSelected] = useState<SelectedComponent[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("マイコン");

  /* ── 追加・削除・個数変更 ── */
  const addComponent = useCallback(
    (spec: ComponentSpec) => {
      setSelected((prev) => {
        const existing = prev.find((s) => s.spec.id === spec.id);
        if (existing) {
          return prev.map((s) =>
            s.spec.id === spec.id ? { ...s, quantity: s.quantity + 1 } : s,
          );
        }
        return [...prev, { spec, quantity: 1 }];
      });
    },
    [],
  );

  const removeComponent = useCallback((id: string) => {
    setSelected((prev) => prev.filter((s) => s.spec.id !== id));
  }, []);

  const changeQuantity = useCallback((id: string, delta: number) => {
    setSelected((prev) =>
      prev
        .map((s) =>
          s.spec.id === id ? { ...s, quantity: Math.max(0, s.quantity + delta) } : s,
        )
        .filter((s) => s.quantity > 0),
    );
  }, []);

  /* ── 電流計算 ── */
  const totals = useMemo(() => {
    let typical = 0;
    let peak = 0;
    for (const s of selected) {
      typical += s.spec.typicalCurrent * s.quantity;
      peak += s.spec.peakCurrent * s.quantity;
    }
    const typicalWithMargin = typical * (1 + SAFETY_MARGIN);
    const peakWithMargin = peak * (1 + SAFETY_MARGIN);
    return { typical, peak, typicalWithMargin, peakWithMargin };
  }, [selected]);

  /* ── カテゴリ別集計 ── */
  const categoryBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of selected) {
      const cat = s.spec.category;
      map.set(cat, (map.get(cat) ?? 0) + s.spec.typicalCurrent * s.quantity);
    }
    return Array.from(map.entries())
      .map(([label, value]) => ({
        label,
        value,
        color: CHART_COLORS[label] ?? "#6b7280",
      }))
      .sort((a, b) => b.value - a.value);
  }, [selected]);

  /* ── 電源評価 ── */
  const powerResults = useMemo(() => {
    return POWER_SOURCES.map((src) => {
      const ok = src.maxCurrent >= totals.peakWithMargin;
      const margin = src.maxCurrent - totals.peakWithMargin;
      const marginPct = src.maxCurrent > 0 ? (margin / src.maxCurrent) * 100 : 0;
      let runtimeHours: number | null = null;
      if (src.capacity && totals.typical > 0) {
        runtimeHours = src.capacity / totals.typical;
      }
      return { source: src, ok, margin, marginPct, runtimeHours };
    }).sort((a, b) => {
      if (a.ok !== b.ok) return a.ok ? -1 : 1;
      return b.marginPct - a.marginPct;
    });
  }, [totals]);

  const componentsInCategory = COMPONENT_SPECS.filter(
    (c) => c.category === activeCategory,
  );

  return (
    <div className="space-y-8">
      {/* ── STEP 1: コンポーネント選択 ── */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="font-bold text-[#1a2332] text-sm mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-orange-100 text-orange-700 rounded flex items-center justify-center text-xs font-bold">
            1
          </span>
          使用するコンポーネントを選択
        </h3>

        {/* カテゴリタブ */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map((cat) => {
            const colors = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                  activeCategory === cat
                    ? `${colors.bg} ${colors.border} ${colors.text} font-semibold`
                    : "bg-white border-gray-200 text-gray-600 hover:border-orange-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* コンポーネント一覧 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {componentsInCategory.map((spec) => {
            const sel = selected.find((s) => s.spec.id === spec.id);
            return (
              <button
                key={spec.id}
                onClick={() => addComponent(spec)}
                className={`text-left p-3 rounded-lg border transition-all text-sm ${
                  sel
                    ? "bg-orange-50 border-orange-300"
                    : "bg-[#F5F7FA] border-transparent hover:border-orange-200"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <span className="font-semibold text-[#1a2332] block truncate">
                      {spec.name}
                    </span>
                    <span className="text-xs text-gray-500 block mt-0.5">
                      {formatCurrent(spec.typicalCurrent)} /{" "}
                      ピーク {formatCurrent(spec.peakCurrent)} / {spec.voltage}V
                    </span>
                  </div>
                  {sel ? (
                    <span className="shrink-0 text-xs bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {sel.quantity}
                    </span>
                  ) : (
                    <Plus className="shrink-0 w-4 h-4 text-gray-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STEP 2: 選択中のコンポーネント一覧 ── */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="font-bold text-[#1a2332] text-sm mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-orange-100 text-orange-700 rounded flex items-center justify-center text-xs font-bold">
            2
          </span>
          選択中のコンポーネント
          {selected.length > 0 && (
            <span className="text-xs text-gray-400 font-normal ml-1">
              ({selected.reduce((n, s) => n + s.quantity, 0)}個)
            </span>
          )}
        </h3>

        {selected.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">
            上のリストからコンポーネントを選択してください
          </p>
        ) : (
          <div className="space-y-2">
            {selected.map((item) => {
              const colors = CATEGORY_COLORS[item.spec.category];
              return (
                <div
                  key={item.spec.id}
                  className="flex items-center gap-3 p-3 bg-[#F5F7FA] rounded-lg"
                >
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${colors.bg} ${colors.text} ${colors.border} border shrink-0`}
                  >
                    {item.spec.category}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-[#1a2332] block truncate">
                      {item.spec.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatCurrent(item.spec.typicalCurrent * item.quantity)} (
                      {formatCurrent(item.spec.typicalCurrent)} × {item.quantity})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => changeQuantity(item.spec.id, -1)}
                      className="w-7 h-7 rounded bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      aria-label="数量を減らす"
                    >
                      <Minus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                    <span className="w-7 text-center text-sm font-bold text-[#1a2332]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => changeQuantity(item.spec.id, 1)}
                      className="w-7 h-7 rounded bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      aria-label="数量を増やす"
                    >
                      <Plus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => removeComponent(item.spec.id)}
                      className="w-7 h-7 rounded bg-white border border-red-200 flex items-center justify-center hover:bg-red-50 transition-colors ml-1"
                      aria-label="削除"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── STEP 3: 計算結果 ── */}
      {selected.length > 0 && (
        <>
          {/* 合計電流 */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-5">
            <h3 className="font-bold text-[#1a2332] text-sm mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-600" />
              合計消費電流
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">標準</p>
                <p className="text-lg font-bold text-[#1a2332]">
                  {formatCurrent(totals.typical)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">ピーク</p>
                <p className="text-lg font-bold text-[#1a2332]">
                  {formatCurrent(totals.peak)}
                </p>
              </div>
              <div className="bg-white/60 rounded px-3 py-2">
                <p className="text-xs text-orange-600 mb-1 font-semibold">
                  標準 +20%マージン
                </p>
                <p className="text-lg font-bold text-orange-800">
                  {formatCurrent(totals.typicalWithMargin)}
                </p>
              </div>
              <div className="bg-white/60 rounded px-3 py-2">
                <p className="text-xs text-orange-600 mb-1 font-semibold">
                  ピーク +20%マージン
                </p>
                <p className="text-lg font-bold text-orange-800">
                  {formatCurrent(totals.peakWithMargin)}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              ※ 安全マージン20%を自動加算しています。電源は「ピーク+20%マージン」以上の容量を選んでください。
            </p>
          </div>

          {/* 電流内訳チャート */}
          {categoryBreakdown.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-[#1a2332] text-sm mb-4">
                  カテゴリ別 電流内訳
                </h3>
                <DonutChart segments={categoryBreakdown} />
              </div>

              {/* バー表示 */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-[#1a2332] text-sm mb-4">
                  コンポーネント別 消費電流
                </h3>
                <div className="space-y-2">
                  {selected
                    .map((s) => ({
                      name: s.spec.name,
                      current: s.spec.typicalCurrent * s.quantity,
                      category: s.spec.category,
                    }))
                    .sort((a, b) => b.current - a.current)
                    .map((item, i) => {
                      const maxCurrent = Math.max(
                        ...selected.map(
                          (s) => s.spec.typicalCurrent * s.quantity,
                        ),
                      );
                      const pct =
                        maxCurrent > 0
                          ? (item.current / maxCurrent) * 100
                          : 0;
                      return (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-0.5">
                            <span className="text-gray-700 truncate mr-2">
                              {item.name}
                            </span>
                            <span className="text-gray-500 shrink-0">
                              {formatCurrent(item.current)}
                            </span>
                          </div>
                          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${pct}%`,
                                backgroundColor:
                                  CHART_COLORS[item.category] ?? "#6b7280",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4: 推奨電源 ── */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-[#1a2332] text-sm mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-orange-100 text-orange-700 rounded flex items-center justify-center text-xs font-bold">
                3
              </span>
              推奨電源
            </h3>

            <div className="space-y-3">
              {powerResults.map(({ source, ok, margin, marginPct, runtimeHours }) => (
                <div
                  key={source.id}
                  className={`rounded-lg border p-4 transition-colors ${
                    ok
                      ? "border-gray-200 bg-[#F5F7FA]"
                      : "border-red-200 bg-red-50/50"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <PowerIcon type={source.type} ok={ok} />
                      <div>
                        <span className="font-semibold text-sm text-[#1a2332]">
                          {source.name}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {source.voltage}V / {formatCurrent(source.maxCurrent)}
                        </span>
                      </div>
                    </div>
                    {ok ? (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-semibold shrink-0">
                        OK（余裕 {Math.round(marginPct)}%）
                      </span>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold shrink-0 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        容量不足（{formatCurrent(Math.abs(margin))}不足）
                      </span>
                    )}
                  </div>

                  {/* バッテリー駆動時間 */}
                  {runtimeHours !== null && ok && (
                    <div className="mb-2 flex items-center gap-1.5 text-xs">
                      <Battery className="w-3.5 h-3.5 text-orange-600" />
                      <span className="text-gray-700">
                        推定動作時間: <strong className="text-orange-700">{formatTime(runtimeHours)}</strong>
                        <span className="text-gray-400 ml-1">
                          ({source.capacity}mAh ÷ {totals.typical.toFixed(0)}mA)
                        </span>
                      </span>
                    </div>
                  )}

                  {/* Pros / Cons */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {source.pros.map((p, i) => (
                      <span
                        key={`p${i}`}
                        className="text-[11px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded"
                      >
                        {p}
                      </span>
                    ))}
                    {source.cons.map((c, i) => (
                      <span
                        key={`c${i}`}
                        className="text-[11px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Amazon リンク */}
                  <a
                    href={amazonSearchUrl(source.amazonKeyword)}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#FF6D00] hover:text-[#E65100] font-semibold transition-colors"
                  >
                    Amazonで探す
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* ── コンポーネント詳細・リンク ── */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-[#1a2332] text-sm mb-4">
              選択パーツの詳細・購入
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selected.map((item) => (
                <div
                  key={item.spec.id}
                  className="p-3 bg-[#F5F7FA] rounded-lg text-sm"
                >
                  <p className="font-semibold text-[#1a2332] mb-1">
                    {item.spec.name}
                    <span className="text-xs text-gray-400 ml-1">×{item.quantity}</span>
                  </p>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                    {item.spec.note}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.spec.partId && (
                      <Link
                        href={`/tools/parts-database/${item.spec.partId}`}
                        className="inline-flex items-center gap-1 text-xs text-[#00838F] hover:text-[#006064] font-medium transition-colors"
                      >
                        📋 パーツ辞典で詳細を見る
                      </Link>
                    )}
                    <a
                      href={amazonSearchUrl(item.spec.amazonKeyword)}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#FF6D00] hover:text-[#E65100] font-medium transition-colors"
                    >
                      Amazonで探す
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ── 電源アイコン ── */
function PowerIcon({ type, ok }: { type: PowerSource["type"]; ok: boolean }) {
  const color = ok ? "text-orange-600" : "text-red-400";
  const icons: Record<string, string> = {
    USB: "🔌",
    "ACアダプタ": "🏭",
    "電池": "🔋",
    "バッテリー": "🪫",
  };
  return <span className={`text-lg ${color}`}>{icons[type] ?? "⚡"}</span>;
}
