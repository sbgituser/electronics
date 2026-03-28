import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Props {
  href: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
}

export default function ToolCard({ href, title, description, icon, badge }: Props) {
  return (
    <Link
      href={href}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#F5F7FA] rounded-lg flex items-center justify-center text-2xl shrink-0">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-[#1a2332] group-hover:text-[#00838F] transition-colors">{title}</h3>
              {badge && (
                <span className="text-[11px] bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded border border-teal-200 font-semibold">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            <span className="inline-flex items-center text-[#00838F] text-sm font-medium mt-4 gap-0.5 group-hover:gap-1.5 transition-all">
              試してみる
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
