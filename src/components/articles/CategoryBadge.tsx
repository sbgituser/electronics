import { CATEGORIES, type CategoryKey } from "@/lib/categories";

const colorMap: Record<string, string> = {
  blue: "bg-teal-50 text-teal-700 border-teal-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  purple: "bg-violet-50 text-violet-700 border-violet-200",
  red: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function CategoryBadge({ category }: { category: CategoryKey }) {
  const cat = CATEGORIES[category];
  if (!cat) return null;
  return (
    <span
      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded border ${colorMap[cat.color] ?? "bg-gray-50 text-gray-700 border-gray-200"}`}
    >
      {cat.label}
    </span>
  );
}
