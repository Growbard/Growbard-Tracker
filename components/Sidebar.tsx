"use client";

import React from "react";
import {
  Search,
  LayoutDashboard,
  Inbox,
  Users,
  Send,
  Calendar,
  FileText,
  UserRound,
  HeartPulse,
  FileSignature,
  FolderKanban,
  ListTodo,
  CalendarDays,
  UsersRound,
  Globe,
  Megaphone,
  PenLine,
  Rocket,
  BarChart3,
  DollarSign,
  Wallet,
  ReceiptText,
  TrendingUp,
  Banknote,
  PieChart,
  Wrench,
  Truck,
  BookText,
  FileBarChart,
  Settings,
} from "lucide-react";
import { useStore } from "@/lib/store";

interface NavItem {
  label: string;
  icon: React.ElementType;
  badge?: number;
  active?: boolean;
}

interface NavSection {
  heading?: string;
  items: NavItem[];
}

const sections: NavSection[] = [
  {
    items: [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Inbox", icon: Inbox, badge: 3 },
    ],
  },
  {
    heading: "Sales",
    items: [
      { label: "CRM & Pipeline", icon: Users },
      { label: "Outreach", icon: Send },
      { label: "Meetings", icon: Calendar },
      { label: "Proposals", icon: FileText },
    ],
  },
  {
    heading: "Clients",
    items: [
      { label: "All Clients", icon: UserRound },
      { label: "Client Health", icon: HeartPulse },
      { label: "Contracts", icon: FileSignature },
    ],
  },
  {
    heading: "Projects",
    items: [
      { label: "Projects", icon: FolderKanban },
      { label: "Tasks", icon: ListTodo },
      { label: "Calendar", icon: CalendarDays },
      { label: "Team & Capacity", icon: UsersRound },
    ],
  },
  {
    heading: "Marketing",
    items: [
      { label: "Organic (SEO)", icon: Globe },
      { label: "Paid Ads", icon: Megaphone },
      { label: "Content", icon: PenLine },
      { label: "Campaigns", icon: Rocket },
      { label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    heading: "Finance",
    items: [
      { label: "Revenue", icon: DollarSign },
      { label: "Expenses", icon: Wallet },
      { label: "Invoices", icon: ReceiptText },
      { label: "P&L", icon: TrendingUp },
      { label: "Cash Flow", icon: Banknote },
      { label: "Profitability", icon: PieChart },
    ],
  },
  {
    heading: "Operations",
    items: [
      { label: "Tools & Subscriptions", icon: Wrench },
      { label: "Vendors", icon: Truck },
      { label: "SOPs & Docs", icon: BookText },
      { label: "Reports", icon: FileBarChart },
    ],
  },
];

export default function Sidebar() {
  const { data } = useStore();

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-ink-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-sm font-bold text-white">
          {data.agencyName.charAt(0)}
        </div>
        <span className="text-[15px] font-semibold text-ink-900">
          {data.agencyName} OS
        </span>
      </div>

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
        {sections.map((section, si) => (
          <div key={si} className="mb-1 mt-3 first:mt-1">
            {section.heading && (
              <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                {section.heading}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${
                    item.active
                      ? "bg-brand-50 font-medium text-brand-700"
                      : "text-ink-700 hover:bg-ink-50"
                  }`}
                >
                  <Icon size={16} className={item.active ? "text-brand-600" : "text-ink-500"} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Settings */}
      <div className="border-t border-ink-200 px-3 py-3">
        <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-ink-700 hover:bg-ink-50">
          <Settings size={16} className="text-ink-500" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
