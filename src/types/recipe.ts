export type RecipeDifficulty = 1 | 2 | 3;

export interface RecipePart {
  partId: string;
  name: string;
  quantity: number;
  optional?: boolean;
}

export interface Recipe {
  slug: string;
  title: string;
  difficulty: RecipeDifficulty;
  estimatedMinutes: number;
  board: string;
  parts: RecipePart[];
  skills: string[];
  description: string;
  sourceUrl: string;
  sourceName: string;
  verified: boolean;
  relatedRecipes?: string[];
}

export const DIFFICULTY_CONFIG: Record<RecipeDifficulty, { label: string; color: string; description: string }> = {
  1: { label: "★☆☆ 初級", color: "green", description: "はんだ不要・ブレッドボードのみ" },
  2: { label: "★★☆ 中級", color: "amber", description: "複数パーツの組み合わせ" },
  3: { label: "★★★ 上級", color: "red", description: "AI連携・ネットワーク活用" },
};
