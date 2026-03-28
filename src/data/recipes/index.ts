import { beginnerRecipes } from "./beginner";
import { intermediateRecipes } from "./intermediate";
import { advancedRecipes } from "./advanced";
import type { Recipe, RecipeDifficulty } from "@/types/recipe";

export const allRecipes: Recipe[] = [
  ...beginnerRecipes,
  ...intermediateRecipes,
  ...advancedRecipes,
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return allRecipes.find((r) => r.slug === slug);
}

export function getRecipesByDifficulty(difficulty: RecipeDifficulty): Recipe[] {
  return allRecipes.filter((r) => r.difficulty === difficulty);
}
