export const CATEGORIES = {
  compare: { label: "比較・選び方", color: "blue" },
  review: { label: "レビュー", color: "orange" },
  basics: { label: "基礎知識", color: "green" },
  project: { label: "プロジェクト", color: "purple" },
  ai: { label: "AI解説", color: "red" },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
