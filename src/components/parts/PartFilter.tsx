"use client";

import { useState, useMemo } from "react";
import type { Part, PartCategory } from "@/types/parts";
import { PART_CATEGORIES } from "@/types/parts";
import PartCard from "./PartCard";

interface Props {
  parts: Part[];
}

export default function PartFilter({ parts }: Props) {
  const [category, setCategory] = useState<PartCategory | "all">("all");
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return parts.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (difficulty !== null && p.difficulty !== difficulty) return false;
      if (query) {
        const q = query.toLowerCase();
        const inName = p.name.toLowerCase().includes(q);
        const inSpecs = Object.values(p.specs).some((v) =>
          v.toLowerCase().includes(q)
        );
        if (!inName && !inSpecs) return false;
      }
      return true;
    });
  }, [parts, category, difficulty, query]);

  return (
    <div>
      {/* カテゴリタブ */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setCategory("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${category === "all" ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"}`}
        >
          すべて
        </button>
        {Object.entries(PART_CATEGORIES).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setCategory(key as PartCategory)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${category === key ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"}`}
          >
            {val.icon} {val.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {[null, 1, 2, 3].map((d) => (
          <button
            key={d ?? "all"}
            onClick={() => setDifficulty(d)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${difficulty === d ? "bg-slate-700 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"}`}
          >
            {d === null ? "全難易度" : d === 1 ? "★☆☆ 入門向き" : d === 2 ? "★★☆ 標準" : "★★★ 上級"}
          </button>
        ))}
      </div>

      {/* 検索 */}
      <input
        type="text"
        placeholder="パーツ名・スペックで検索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm mb-6 focus:outline-none focus:border-blue-400"
      />

      <p className="text-xs text-slate-400 mb-4">
        {filtered.length} 件
      </p>

      {filtered.length === 0 ? (
        <p className="text-slate-400 text-center py-10">該当するパーツが見つかりません。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <PartCard key={p.id} part={p} />
          ))}
        </div>
      )}
    </div>
  );
}
