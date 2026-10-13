"use client";

import { portfolio } from "../data/portfolio";

export default function Navbar() {
  const { navigation } = portfolio;

  return (
    <nav className="w-full px-5 md:px-12 py-4 flex items-center justify-between border-b border-surface-container-high bg-background">
      <a
        href="#"
        className="font-display font-bold text-sm tracking-tight text-primary hover:text-secondary transition-colors"
      >
        MUSA
      </a>
      <div className="flex items-center gap-6">
        {navigation.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary hover:text-primary transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
