export const SITE_NAME = "エレクトロニクス研究所 | kuras-plus";
export const SITE_URL = "https://electronics.kuras-plus.com";
export const SITE_DESCRIPTION =
  "電子工作とAIの世界を、完全初心者がゼロから学ぶ情報サイト。Arduino、Raspberry Pi、TinyMLの入門ガイドと実用ツールをお届けします。";

export const AMAZON_PARTNER_TAG = "kurasplus-22";

export function buildAmazonUrl(asin: string): string {
  return `https://www.amazon.co.jp/dp/${asin}?tag=${AMAZON_PARTNER_TAG}`;
}

export function amazonSearchUrl(query: string): string {
  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}&tag=${AMAZON_PARTNER_TAG}`;
}
