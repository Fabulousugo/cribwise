// ==========================================
// FILE: app/faq/_components/Breadcrumbs.tsx
// Simple shared breadcrumbs for /faq pages
// ==========================================
"use client";

import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string; current?: boolean };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <li className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:underline"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 opacity-60" />
            {item.href && !item.current ? (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
