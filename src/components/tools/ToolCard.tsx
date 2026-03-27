import Link from "next/link";

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
      className="block bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800">{title}</h3>
            {badge && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                {badge}
              </span>
            )}
          </div>
        </div>
      </div>
      <p className="text-slate-500 text-sm">{description}</p>
      <p className="text-blue-600 text-sm font-semibold mt-3">
        試してみる →
      </p>
    </Link>
  );
}
