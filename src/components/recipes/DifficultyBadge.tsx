import type { RecipeDifficulty } from "@/types/recipe";

const config: Record<RecipeDifficulty, { label: string; className: string }> = {
  1: { label: "★☆☆ 初級", className: "bg-green-100 text-green-700" },
  2: { label: "★★☆ 中級", className: "bg-amber-100 text-amber-700" },
  3: { label: "★★★ 上級", className: "bg-red-100 text-red-700" },
};

export default function DifficultyBadge({ difficulty }: { difficulty: RecipeDifficulty }) {
  const c = config[difficulty];
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${c.className}`}>
      {c.label}
    </span>
  );
}
