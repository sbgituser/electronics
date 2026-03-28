/**
 * OGP画像自動生成スクリプト
 * 使い方: npx tsx scripts/generate-og-images.tsx
 * 出力先: public/og/{articles,recipes,parts}/{slug}.png
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { allRecipes } from "../src/data/recipes/index";
import { allParts } from "../src/data/parts/index";

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "public", "og");
const FONTS_DIR = path.join(ROOT, "scripts", "fonts");
const ARTICLES_DIR = path.join(ROOT, "src", "content", "articles");

// Category config (mirrors src/lib/categories.ts)
const CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
  compare: { label: "比較・選び方", color: "#3b82f6" },
  review: { label: "レビュー", color: "#f97316" },
  basics: { label: "基礎知識", color: "#22c55e" },
  project: { label: "プロジェクト", color: "#a855f7" },
  ai: { label: "AI解説", color: "#ef4444" },
};

// Difficulty config (mirrors src/types/recipe.ts)
const DIFFICULTY_CONFIG: Record<number, { label: string; color: string }> = {
  1: { label: "初級", color: "#22c55e" },
  2: { label: "中級", color: "#f59e0b" },
  3: { label: "上級", color: "#ef4444" },
};

// Part category config (mirrors src/types/parts.ts)
const PART_CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
  board: { label: "開発ボード", color: "#3b82f6" },
  sensor: { label: "センサー", color: "#10b981" },
  actuator: { label: "アクチュエーター", color: "#8b5cf6" },
  passive: { label: "受動部品", color: "#f59e0b" },
  tool: { label: "接続・工具", color: "#64748b" },
};

// ---------------------------------------------------------------------------
// Font loading
// ---------------------------------------------------------------------------

async function loadFont(): Promise<ArrayBuffer> {
  // Check cache first (WOFF, TTF, OTF in order of preference)
  const candidates = [
    path.join(FONTS_DIR, "NotoSansJP-Bold.woff"),
    path.join(FONTS_DIR, "NotoSansJP-Bold.ttf"),
    path.join(FONTS_DIR, "NotoSansJP-Bold.otf"),
  ];

  for (const fontPath of candidates) {
    if (fs.existsSync(fontPath)) {
      const buf = fs.readFileSync(fontPath);
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
    }
  }

  console.log("📥 NotoSansJP フォントをダウンロード中...");
  fs.mkdirSync(FONTS_DIR, { recursive: true });

  // Strategy 1: jsDelivr CDN (mirrors @fontsource/noto-sans-jp) → WOFF format
  // satori supports WOFF via @shuding/opentype.js
  try {
    const url =
      "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5/files/noto-sans-jp-japanese-700-normal.woff";
    const fontData = await fetch(url).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.arrayBuffer();
    });
    const savePath = path.join(FONTS_DIR, "NotoSansJP-Bold.woff");
    fs.writeFileSync(savePath, Buffer.from(fontData));
    console.log("✅ フォントのダウンロード完了 (jsDelivr)");
    return fontData;
  } catch (err) {
    console.warn("⚠️  jsDelivr からの取得に失敗:", (err as Error).message);
  }

  // Strategy 2: Alternate jsDelivr path
  try {
    const url =
      "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-700-normal.woff";
    const fontData = await fetch(url).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.arrayBuffer();
    });
    const savePath = path.join(FONTS_DIR, "NotoSansJP-Bold.woff");
    fs.writeFileSync(savePath, Buffer.from(fontData));
    console.log("✅ フォントのダウンロード完了 (jsDelivr fallback)");
    return fontData;
  } catch (err) {
    console.warn("⚠️  jsDelivr fallback からの取得に失敗:", (err as Error).message);
  }

  throw new Error(
    [
      "フォントの自動ダウンロードに失敗しました。",
      "以下のいずれかの方法でフォントを配置してください:",
      "  1. npm install @fontsource/noto-sans-jp を実行後、",
      "     node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-700-normal.woff を",
      "     scripts/fonts/NotoSansJP-Bold.woff としてコピー",
      "  2. ネットワーク接続を確認して npm run generate:og を再実行",
    ].join("\n")
  );
}

// ---------------------------------------------------------------------------
// OGP image template
// ---------------------------------------------------------------------------

function calcFontSize(text: string): number {
  const len = text.length;
  if (len <= 15) return 64;
  if (len <= 25) return 54;
  if (len <= 35) return 44;
  if (len <= 50) return 36;
  return 30;
}

function buildOgElement(
  title: string,
  badgeLabel: string,
  badgeColor: string,
  typeLabel: string
): object {
  const fontSize = calcFontSize(title);

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        background: "linear-gradient(135deg, #1a2332 0%, #0d1620 100%)",
        padding: "0",
        fontFamily: "Noto Sans JP",
        position: "relative",
      },
      children: [
        // Top accent bar
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              height: "6px",
              background: "linear-gradient(90deg, #00838F, #4DD0E1)",
            },
          },
        },
        // Main content area
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              flex: "1",
              padding: "64px",
              paddingTop: "72px",
            },
            children: [
              // Badge row
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "32px",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          background: badgeColor,
                          color: "white",
                          fontSize: "22px",
                          fontWeight: "700",
                          padding: "6px 20px",
                          borderRadius: "100px",
                        },
                        children: badgeLabel,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "rgba(255,255,255,0.4)",
                          fontSize: "18px",
                        },
                        children: typeLabel,
                      },
                    },
                  ],
                },
              },
              // Title
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flex: "1",
                    alignItems: "center",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: `${fontSize}px`,
                          fontWeight: "700",
                          color: "#ffffff",
                          lineHeight: "1.45",
                          maxWidth: "1072px",
                        },
                        children: title,
                      },
                    },
                  ],
                },
              },
              // Footer divider
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.15)",
                    paddingTop: "24px",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        },
                        children: [
                          // Teal dot icon
                          {
                            type: "div",
                            props: {
                              style: {
                                width: "28px",
                                height: "28px",
                                borderRadius: "50%",
                                background: "#00838F",
                              },
                            },
                          },
                          {
                            type: "div",
                            props: {
                              style: {
                                color: "#00838F",
                                fontSize: "22px",
                                fontWeight: "700",
                              },
                              children: "エレクトロニクス研究所",
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "rgba(255,255,255,0.35)",
                          fontSize: "17px",
                        },
                        children: "electronics.kuras-plus.com",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// Image rendering
// ---------------------------------------------------------------------------

async function renderToPng(
  element: object,
  fontData: ArrayBuffer,
  outputPath: string
): Promise<void> {
  const svg = await satori(element as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Noto Sans JP",
        data: fontData,
        weight: 700,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, pngBuffer);
}

// ---------------------------------------------------------------------------
// Generators per content type
// ---------------------------------------------------------------------------

async function generateArticleImages(fontData: ArrayBuffer): Promise<number> {
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.warn("⚠️  記事ディレクトリが見つかりません:", ARTICLES_DIR);
    return 0;
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  let count = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const outputPath = path.join(OUTPUT_DIR, "articles", `${slug}.png`);

    try {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
      const { data } = matter(raw);
      const title = data.title as string;
      const category =
        CATEGORY_CONFIG[data.category as string] ?? {
          label: "記事",
          color: "#00838F",
        };

      const element = buildOgElement(title, category.label, category.color, "記事");
      await renderToPng(element, fontData, outputPath);
      console.log(`  ✅ articles/${slug}.png`);
      count++;
    } catch (err) {
      console.error(`  ❌ articles/${slug}.png:`, (err as Error).message);
    }
  }

  return count;
}

async function generateRecipeImages(fontData: ArrayBuffer): Promise<number> {
  let count = 0;

  for (const recipe of allRecipes) {
    const outputPath = path.join(OUTPUT_DIR, "recipes", `${recipe.slug}.png`);

    try {
      const diff =
        DIFFICULTY_CONFIG[recipe.difficulty] ?? { label: "レシピ", color: "#00838F" };
      const element = buildOgElement(recipe.title, diff.label, diff.color, "レシピ");
      await renderToPng(element, fontData, outputPath);
      console.log(`  ✅ recipes/${recipe.slug}.png`);
      count++;
    } catch (err) {
      console.error(`  ❌ recipes/${recipe.slug}.png:`, (err as Error).message);
    }
  }

  return count;
}

async function generatePartsImages(fontData: ArrayBuffer): Promise<number> {
  let count = 0;

  for (const part of allParts) {
    const outputPath = path.join(OUTPUT_DIR, "parts", `${part.id}.png`);

    try {
      const cat =
        PART_CATEGORY_CONFIG[part.category] ?? { label: "パーツ", color: "#00838F" };
      const element = buildOgElement(part.name, cat.label, cat.color, "パーツ辞典");
      await renderToPng(element, fontData, outputPath);
      console.log(`  ✅ parts/${part.id}.png`);
      count++;
    } catch (err) {
      console.error(`  ❌ parts/${part.id}.png:`, (err as Error).message);
    }
  }

  return count;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  console.log("🎨 OGP画像を生成中...\n");

  let fontData: ArrayBuffer;
  try {
    fontData = await loadFont();
  } catch (err) {
    console.error("\n❌ フォントの読み込みに失敗しました:");
    console.error((err as Error).message);
    process.exit(1);
  }

  let totalCount = 0;

  console.log("\n📰 記事のOGP画像を生成中...");
  totalCount += await generateArticleImages(fontData);

  console.log("\n🔧 レシピのOGP画像を生成中...");
  totalCount += await generateRecipeImages(fontData);

  console.log("\n🔌 パーツのOGP画像を生成中...");
  totalCount += await generatePartsImages(fontData);

  console.log(`\n✅ 合計 ${totalCount} 枚のOGP画像を生成しました → public/og/`);
}

main().catch((err) => {
  console.error("\n❌ OGP画像生成に失敗しました:", err);
  process.exit(1);
});
