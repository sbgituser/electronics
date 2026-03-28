"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";

const navItems = [
  { href: "/articles", label: "記事" },
  { href: "/recipes", label: "レシピ" },
  { href: "/tools", label: "ツール" },
  { href: "/about", label: "概要" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-[#1a2332] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link
          href="/"
          className="flex items-center gap-2.5 no-underline hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-base tracking-tight text-white">
              エレクトロニクス研究所
            </span>
            <span className="text-teal-400 font-normal text-[11px] hidden sm:inline">
              kuras-plus
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1" aria-label="メインナビゲーション">
          {navItems.map(({ href, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm px-4 py-2 rounded transition-colors ${
                  isActive
                    ? "text-white bg-white/10 font-medium"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
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
