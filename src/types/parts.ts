export type PartCategory = "board" | "sensor" | "actuator" | "passive" | "module" | "tool";
export type DifficultyLevel = 1 | 2 | 3;

export interface Part {
  id: string;
  name: string;
  nameEn: string;
  category: PartCategory;
  subcategory: string;
  difficulty: DifficultyLevel;
  priceRange: string;
  amazonAsin?: string;
  specs: Record<string, string>;
  compatibleBoards?: string[];
  beginnerNote: string;
  relatedRecipes?: string[];
  imageUrl?: string;
  dataSource: string;
  tags: string[];
  seoKeywords: string[];
}

export const PART_CATEGORIES: Record<PartCategory, { label: string; color: string; icon: string }> = {
  board: { label: "開発ボード", color: "blue", icon: "🖥️" },
  sensor: { label: "センサー", color: "emerald", icon: "📡" },
  actuator: { label: "アクチュエーター", color: "violet", icon: "⚙️" },
  passive: { label: "受動部品", color: "amber", icon: "🔌" },
  module: { label: "モジュール", color: "cyan", icon: "🧩" },
  tool: { label: "接続・工具", color: "slate", icon: "🔧" },
};
