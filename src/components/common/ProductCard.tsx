import { buildAmazonUrl } from "@/lib/site";

interface Props {
  asin: string;
  name: string;
  price: string;
  description?: string;
}

export default function ProductCard({ asin, name, price, description }: Props) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-slate-800 text-sm">{name}</p>
          {description && (
            <p className="text-slate-500 text-xs mt-0.5">{description}</p>
          )}
        </div>
        <span className="text-orange-600 font-bold text-sm whitespace-nowrap">
          {price}
        </span>
      </div>
      <a
        href={buildAmazonUrl(asin)}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="block text-center bg-orange-400 hover:bg-orange-500 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Amazonで見る
      </a>
    </div>
  );
}
