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
  faqs?: { q: string; a: string }[];
  readingTime: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

const articlesDir = path.join(process.cwd(), "src/content/articles");

export function getRelatedArticles(
  slug: string,
  category: CategoryKey,
  tags: string[],
  limit = 5
): ArticleMeta[] {
  const all = getAllArticles().filter((a) => a.slug !== slug);
  const scored = all.map((a) => {
    let score = 0;
    if (a.category === category) score += 3;
    const overlap = a.tags.filter((t) => tags.includes(t)).length;
    score += overlap;
    return { article: a, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.filter((s) => s.score > 0).slice(0, limit).map((s) => s.article);
}

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
        faqs: data.faqs,
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
  const renderer = new marked.Renderer();
  const originalTable = renderer.table.bind(renderer);
  renderer.table = (token) => {
    const html = originalTable(token);
    return `<div class="table-wrapper">${html}</div>`;
  };
  const originalImage = renderer.image.bind(renderer);
  renderer.image = (token) => {
    const html = originalImage(token);
    return html.replace(
      /^<img /,
      '<img loading="lazy" '
    );
  };
  const htmlContent = marked(content, { renderer }) as string;
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    category: data.category as CategoryKey,
    tags: (data.tags as string[]) ?? [],
    products: data.products,
    faqs: data.faqs,
    readingTime: `約${Math.ceil(rt.minutes)}分`,
    content: htmlContent,
  };
}
