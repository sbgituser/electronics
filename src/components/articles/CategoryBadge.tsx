import { CATEGORIES, type CategoryKey } from "@/lib/categories";

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  orange: "bg-orange-100 text-orange-700",
  green: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
  red: "bg-red-100 text-red-700",
};

export default function CategoryBadge({ category }: { category: CategoryKey }) {
  const cat = CATEGORIES[category];
  if (!cat) return null;
  return (
    <span
      className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${colorMap[cat.color] ?? "bg-gray-100 text-gray-700"}`}
    >
      {cat.label}
    </span>
  );
}
