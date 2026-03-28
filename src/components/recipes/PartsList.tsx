import { amazonSearchUrl } from "@/lib/site";
import { getPartById } from "@/data/parts";
import type { RecipePart } from "@/types/recipe";
import Link from "next/link";

interface Props {
  parts: RecipePart[];
}

export default function PartsList({ parts }: Props) {
  const query = parts.map((p) => p.name).join(" ");

  return (
    <div>
      <ul className="space-y-2 mb-4">
        {parts.map((p, i) => {
          const partData = getPartById(p.partId);
          return (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span className="text-slate-400 w-5 text-center">{p.quantity}×</span>
              {partData ? (
                <Link
                  href={`/tools/parts-database#${p.partId}`}
                  className="text-blue-600 hover:underline"
                >
                  {p.name}
                </Link>
              ) : (
                <span className="text-slate-700">{p.name}</span>
              )}
              {p.optional && (
                <span className="text-xs text-slate-400">（任意）</span>
              )}
            </li>
          );
        })}
      </ul>
      <a
        href={amazonSearchUrl(query)}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="inline-block text-sm bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        このパーツをまとめてAmazonで探す
      </a>
    </div>
  );
}
