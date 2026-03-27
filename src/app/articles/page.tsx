import { getAllArticles, CATEGORIES } from "@/lib/articles";
import ArticlesClient from "./ArticlesClient";

export const metadata = {
  title: "記事一覧",
  description: "電子工作とAIに関する入門記事をカテゴリ別にご覧いただけます。",
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  return <ArticlesClient articles={articles} categories={CATEGORIES} />;
}
