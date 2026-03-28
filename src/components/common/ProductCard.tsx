import { buildAmazonUrl } from "@/lib/site";
import { ExternalLink } from "lucide-react";

interface Props {
  asin: string;
  name: string;
  price: string;
  description?: string;
}

export default function ProductCard({ asin, name, price, description }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-[#1a2332] text-sm">{name}</p>
          {description && (
            <p className="text-gray-500 text-xs mt-0.5">{description}</p>
          )}
        </div>
        <span className="text-[#FF6D00] font-bold text-sm whitespace-nowrap">
          {price}
        </span>
      </div>
      <a
        href={buildAmazonUrl(asin)}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 bg-[#FF6D00] hover:bg-[#E65100] text-white text-sm font-semibold py-2.5 px-4 rounded transition-colors"
      >
        Amazonで見る
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
