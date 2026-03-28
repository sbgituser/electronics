import type { RecipeDifficulty } from "@/types/recipe";

const config: Record<RecipeDifficulty, { label: string; className: string }> = {
  1: {
    label: "初級",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  2: {
    label: "中級",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  3: {
    label: "上級",
    className: "bg-rose-50 text-rose-700 border-rose-200",
  },
};

export default function DifficultyBadge({ difficulty }: { difficulty: RecipeDifficulty }) {
  const c = config[difficulty];
  return (
    <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded border ${c.className}`}>
      {c.label}
    </span>
  );
}
