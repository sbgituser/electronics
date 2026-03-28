"use client";

import { useState } from "react";
import type { Part } from "@/types/parts";
import { PART_CATEGORIES } from "@/types/parts";
import { buildAmazonUrl } from "@/lib/site";

const borderColors: Record<string, string> = {
  blue: "border-l-blue-500",
  emerald: "border-l-emerald-500",
  violet: "border-l-violet-500",
  amber: "border-l-amber-500",
  slate: "border-l-slate-400",
};

interface Props {
  part: Part;
}

export default function PartCard({ part }: Props) {
  const [open, setOpen] = useState(false);
  const cat = PART_CATEGORIES[part.category];
  const diffLabel = ["", "★☆☆ 入門向き", "★★☆ 標準", "★★★ 上級"][part.difficulty];
  const diffColor = ["", "text-green-600", "text-amber-600", "text-red-600"][part.difficulty];

  const specEntries = Object.entries(part.specs).slice(0, 4);

  return (
    <div
      className={`bg-white border border-slate-200 border-l-4 ${borderColors[cat.color] ?? "border-l-slate-400"} rounded-xl p-4 hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-sm">{cat.icon}</span>
            <span className="text-xs text-slate-500">{cat.label}</span>
            <span className={`text-xs font-medium ml-1 ${diffColor}`}>{diffLabel}</span>
          </div>
          <h3 className="font-bold text-slate-800 text-sm leading-snug">{part.name}</h3>
        </div>
        <span className="text-xs text-slate-500 whitespace-nowrap">{part.priceRange}</span>
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-0.5 mb-3">
        {specEntries.map(([key, val]) => (
          <div key={key} className="flex gap-1 text-xs">
            <dt className="text-slate-400 shrink-0">{key}:</dt>
            <dd className="text-slate-600 truncate">{val}</dd>
          </div>
        ))}
      </dl>

      <div className="flex gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="flex-1 text-xs py-1.5 px-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
        >
          {open ? "閉じる ▲" : "詳細を見る ▼"}
        </button>
        {part.amazonAsin && (
          <a
            href={buildAmazonUrl(part.amazonAsin)}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-xs py-1.5 px-3 bg-orange-400 hover:bg-orange-500 text-white rounded-lg transition-colors"
          >
            Amazon
          </a>
        )}
      </div>

      {open && (
        <div className="mt-4 border-t border-slate-100 pt-4 space-y-3">
          <table className="w-full text-xs">
            <tbody>
              {Object.entries(part.specs).map(([k, v]) => (
                <tr key={k} className="border-b border-slate-50">
                  <td className="py-1 pr-2 text-slate-400 font-medium w-28 shrink-0">{k}</td>
                  <td className="py-1 text-slate-700">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg">
            <p className="text-xs font-bold text-green-800 mb-0.5">💡 初心者メモ</p>
            <p className="text-xs text-green-900">{part.beginnerNote}</p>
          </div>

          {part.compatibleBoards && part.compatibleBoards.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1">対応ボード</p>
              <div className="flex flex-wrap gap-1">
                {part.compatibleBoards.map((b) => (
                  <span key={b} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-slate-400">出典: {part.dataSource}</p>
        </div>
      )}
    </div>
  );
}
