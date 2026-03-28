"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/articles", label: "記事" },
  { href: "/recipes", label: "レシピ" },
  { href: "/tools", label: "ツール" },
  { href: "/about", label: "概要" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <Link
          href="/"
          className="flex items-center gap-2 no-underline hover:opacity-80 transition-opacity"
        >
          <span className="text-xl text-amber-500">⚡</span>
          <span className="font-bold text-base tracking-tight text-gray-800">
            エレクトロニクス研究所
            <span className="hidden sm:inline text-gray-400 font-normal text-xs ml-1">
              kuras-plus
            </span>
          </span>
        </Link>

        <nav className="flex gap-1" aria-label="メインナビゲーション">
          {navItems.map(({ href, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
