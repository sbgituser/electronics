import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllArticles } from "@/lib/articles";
import { allRecipes } from "@/data/recipes";
import { allParts, getAllTags, getAllBoardIds } from "@/data/parts";
import { categoryGuides } from "@/data/parts/categories";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/articles`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/recipes`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/board-picker`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tools/parts-database`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/led-resistor-calc`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tools/resistor-color-code`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tools/ohms-law-calc`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tools/voltage-divider-calc`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tools/power-supply-calc`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tools/circuit-calculators`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/circuit-calculators/capacitor`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const recipeRoutes: MetadataRoute.Sitemap = allRecipes.map((r) => ({
    url: `${SITE_URL}/recipes/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Recipe difficulty pages
  const recipeDifficultyRoutes: MetadataRoute.Sitemap = [1, 2, 3].map((level) => ({
    url: `${SITE_URL}/recipes/difficulty/${level}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Recipe board pages
  const recipeBoardSet = new Set<string>();
  for (const r of allRecipes) {
    recipeBoardSet.add(r.board.toLowerCase().replace(/\s+/g, "-"));
  }
  const recipeBoardRoutes: MetadataRoute.Sitemap = Array.from(recipeBoardSet).map((boardId) => ({
    url: `${SITE_URL}/recipes/board/${boardId}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const partRoutes: MetadataRoute.Sitemap = allParts.map((p) => ({
    url: `${SITE_URL}/tools/parts-database/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categoryGuides.map((g) => ({
    url: `${SITE_URL}/tools/parts-database/category/${g.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Tag pages
  const tagRoutes: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${SITE_URL}/tools/parts-database/tag/${encodeURIComponent(tag)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // Board compatibility pages
  const boardCompatRoutes: MetadataRoute.Sitemap = getAllBoardIds().map((boardId) => ({
    url: `${SITE_URL}/tools/parts-database/board/${boardId}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...recipeRoutes,
    ...recipeDifficultyRoutes,
    ...recipeBoardRoutes,
    ...partRoutes,
    ...categoryRoutes,
    ...tagRoutes,
    ...boardCompatRoutes,
  ];
}
