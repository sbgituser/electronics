"use client";

import { useState } from "react";
import type { Part } from "@/types/parts";
import { PART_CATEGORIES } from "@/types/parts";
import { buildAmazonUrl } from "@/lib/site";
import Link from "next/link";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const borderColors: Record<string, string> = {
  blue: "border-l-teal-500",
  emerald: "border-l-emerald-500",
  violet: "border-l-violet-500",
  amber: "border-l-amber-500",
  slate: "border-l-gray-400",
};

interface Props {
  part: Part;
}

export default function PartCard({ part }: Props) {
  const [open, setOpen] = useState(false);
  const cat = PART_CATEGORIES[part.category];
  const diffLabel = ["", "入門向き", "標準", "上級"][part.difficulty];
  const diffColor = ["", "text-emerald-600 bg-emerald-50 border-emerald-200", "text-amber-600 bg-amber-50 border-amber-200", "text-rose-600 bg-rose-50 border-rose-200"][part.difficulty];

  const specEntries = Object.entries(part.specs).slice(0, 4);

  return (
    <div
      className={`bg-white border border-gray-200 border-l-4 ${borderColors[cat.color] ?? "border-l-gray-400"} rounded-lg p-4 hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-sm">{cat.icon}</span>
            <span className="text-xs text-gray-500">{cat.label}</span>
            <span className={`text-[11px] font-medium ml-1 px-2 py-0.5 rounded border ${diffColor}`}>{diffLabel}</span>
          </div>
          <h3 className="font-bold text-[#1a2332] text-sm leading-snug">
            <Link href={`/tools/parts-database/${part.id}`} className="hover:text-[#00838F] transition-colors">
              {part.name}
            </Link>
          </h3>
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap">{part.priceRange}</span>
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-0.5 mb-3">
        {specEntries.map(([key, val]) => (
          <div key={key} className="flex gap-1 text-xs">
            <dt className="text-gray-400 shrink-0">{key}:</dt>
            <dd className="text-gray-600 truncate">{val}</dd>
          </div>
        ))}
      </dl>

      <div className="flex gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="flex-1 inline-flex items-center justify-center gap-1 text-xs py-1.5 px-3 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {open ? (
            <>閉じる <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>詳細を見る <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
        <Link
          href={`/tools/parts-database/${part.id}`}
          className="text-xs py-1.5 px-3 border border-teal-200 rounded text-[#00838F] hover:bg-teal-50 transition-colors"
        >
          詳細ページ
        </Link>
        {part.amazonAsin && (
          <a
            href={buildAmazonUrl(part.amazonAsin)}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs py-1.5 px-3 bg-[#FF6D00] hover:bg-[#E65100] text-white rounded transition-colors"
          >
            Amazon
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {open && (
        <div className="mt-4 border-t border-gray-100 pt-4 space-y-3">
          <table className="w-full text-xs">
            <tbody>
              {Object.entries(part.specs).map(([k, v]) => (
                <tr key={k} className="border-b border-gray-50">
                  <td className="py-1.5 pr-2 text-gray-400 font-medium w-28 shrink-0">{k}</td>
                  <td className="py-1.5 text-gray-700">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-3 rounded-r-lg">
            <p className="text-xs font-bold text-teal-800 mb-0.5">初心者メモ</p>
            <p className="text-xs text-teal-900">{part.beginnerNote}</p>
          </div>

          {part.compatibleBoards && part.compatibleBoards.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">対応ボード</p>
              <div className="flex flex-wrap gap-1">
                {part.compatibleBoards.map((b) => (
                  <span key={b} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-gray-400">出典: {part.dataSource}</p>
        </div>
      )}
    </div>
  );
}
