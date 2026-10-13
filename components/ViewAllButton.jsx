"use client";

import Link from "next/link";

export default function ViewAllButton({ href }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center h-9 px-8 bg-primary text-on-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-surface hover:text-primary border border-primary transition-colors"
    >
      View All →
    </Link>
  );
}
