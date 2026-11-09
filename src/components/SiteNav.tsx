"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export type SiteNavItem = {
  label: string;
  href: string;
};

type SiteNavProps = {
  items: SiteNavItem[];
  className?: string;
};

export function SiteNav({ items, className }: SiteNavProps) {
  return (
    <nav
      className={cn("flex flex-wrap items-center justify-center gap-x-8 gap-y-2", className)}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="nav-link relative text-sm text-white/70 transition-colors hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
