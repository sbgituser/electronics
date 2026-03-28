import { buildAmazonUrl, AMAZON_PARTNER_TAG } from "@/lib/site";
import { getPartById } from "@/data/parts";
import type { RecipePart } from "@/types/recipe";
import Link from "next/link";

interface Props {
  parts: RecipePart[];
}

export default function PartsList({ parts }: Props) {
  return (
    <ul className="space-y-2">
      {parts.map((p, i) => {
        const partData = getPartById(p.partId);
        const amazonUrl = partData?.amazonAsin
          ? buildAmazonUrl(partData.amazonAsin)
          : `https://www.amazon.co.jp/s?k=${encodeURIComponent(p.name)}&tag=${AMAZON_PARTNER_TAG}`;

        return (
          <li key={i} className="flex items-center justify-between gap-2 py-1.5 border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-slate-400 text-sm w-5 text-right shrink-0">{p.quantity}×</span>
              <Link
                href={`/tools/parts-database/${p.partId}`}
                className="text-sm text-blue-600 hover:underline truncate"
              >
                {p.name}
              </Link>
              {p.optional && (
                <span className="text-xs text-slate-400 shrink-0">（任意）</span>
              )}
            </div>
            <a
              href={amazonUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-xs text-orange-600 hover:text-orange-700 font-medium whitespace-nowrap shrink-0 border border-orange-200 px-2 py-0.5 rounded hover:bg-orange-50 transition-colors"
            >
              Amazon ↗
            </a>
          </li>
        );
      })}
    </ul>
  );
}
