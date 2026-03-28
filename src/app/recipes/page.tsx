import type { Metadata } from "next";
import { allRecipes } from "@/data/recipes";
import RecipesClient from "./RecipesClient";

export const metadata: Metadata = {
  title: "レシピブック",
  description: "電子工作のレシピ集。初級から上級まで、ステップバイステップで作れるプロジェクトをご紹介。",
};

export default function RecipesPage() {
  return <RecipesClient recipes={allRecipes} />;
}
