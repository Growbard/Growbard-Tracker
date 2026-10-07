"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useStore } from "@/lib/store";
import { navSections, settingsItem } from "@/lib/nav";

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { data } = useStore();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-ink-200 bg-white">
      {/* Logo */}
      <Link href="/" onClick={onNavigate} className="flex items-center gap-2.5 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-sm font-bold text-white">
          {data.agencyName.charAt(0)}
        </div>
        <span className="text-[15px] font-semibold text-ink-900">
          {data.agencyName} OS
        </span>
      </Link>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 rounded-lg border border-ink-200 bg-ink-50 px-3 py-2 text-ink-400">
          <Search size={15} />
          <span className="text-[13px]">Search...</span>
          <span className="ml-auto text-[11px] text-ink-300">⌘K</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 pb-6">
        {navSections.map((section, si) => (
          <div key={si} className="mb-1 mt-3 first:mt-1">
            {section.heading && (
              <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                {section.heading}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={`mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${
                    active ? "bg-brand-50 font-medium text-brand-700" : "text-ink-700 hover:bg-ink-50"
                  }`}
                >
                  <Icon size={16} className={active ? "text-brand-600" : "text-ink-500"} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Settings */}
      <div className="border-t border-ink-200 px-3 py-3">
        <Link
          href={settingsItem.href}
          onClick={onNavigate}
          className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${
            isActive(settingsItem.href) ? "bg-brand-50 font-medium text-brand-700" : "text-ink-700 hover:bg-ink-50"
          }`}
        >
          <settingsItem.icon size={16} className={isActive(settingsItem.href) ? "text-brand-600" : "text-ink-500"} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
