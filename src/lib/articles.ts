import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import readingTime from "reading-time";
import { CATEGORIES, type CategoryKey } from "@/lib/categories";

export { CATEGORIES, type CategoryKey };

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: CategoryKey;
  tags: string[];
  products?: { asin: string; name: string; price: string }[];
  readingTime: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

const articlesDir = path.join(process.cwd(), "src/content/articles");

export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllArticles(): ArticleMeta[] {
  const slugs = getAllArticleSlugs();
  return slugs
    .map((slug) => {
      const filePath = path.join(articlesDir, `${slug}.md`);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const rt = readingTime(content);
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        category: data.category as CategoryKey,
        tags: (data.tags as string[]) ?? [],
        products: data.products,
        readingTime: `約${Math.ceil(rt.minutes)}分`,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(articlesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  const htmlContent = marked(content) as string;
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    category: data.category as CategoryKey,
    tags: (data.tags as string[]) ?? [],
    products: data.products,
    readingTime: `約${Math.ceil(rt.minutes)}分`,
    content: htmlContent,
  };
}
