import {
  LayoutDashboard, Inbox, Users, Calendar,
  FileSignature, FolderKanban, ListTodo, CalendarDays, UsersRound,
  Globe, Megaphone, PenLine, Rocket, BarChart3, DollarSign, Wallet,
  ReceiptText, TrendingUp, Banknote, PieChart, Wrench, Truck, BookText,
  FileBarChart, Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
  subtitle: string;
}
export interface NavSection {
  heading?: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/", subtitle: "Here's what's happening across your agency today." },
      { label: "Inbox", icon: Inbox, href: "/inbox", badge: 3, subtitle: "Messages and notifications from clients and tools." },
    ],
  },
  {
    heading: "Sales",
    items: [
      { label: "CRM & Pipeline", icon: Users, href: "/pipeline", subtitle: "Track deals through every stage of your pipeline." },
      { label: "Meetings", icon: Calendar, href: "/meetings", subtitle: "Upcoming sales and client meetings." },
    ],
  },
  {
    heading: "Projects",
    items: [
      { label: "Projects", icon: FolderKanban, href: "/projects", subtitle: "Delivery status across all client projects." },
      { label: "Tasks", icon: ListTodo, href: "/tasks", subtitle: "Everything your team is working on." },
      { label: "Calendar", icon: CalendarDays, href: "/calendar", subtitle: "Meetings, deadlines, and tasks by date." },
      { label: "Team & Capacity", icon: UsersRound, href: "/team", subtitle: "Workload and utilization across the team." },
      { label: "Contracts", icon: FileSignature, href: "/contracts", subtitle: "Active, expiring, and expired contracts." },
    ],
  },
  {
    heading: "Marketing",
    items: [
      { label: "Organic (SEO)", icon: Globe, href: "/seo", subtitle: "Rankings, traffic, and keyword performance." },
      { label: "Paid Ads", icon: Megaphone, href: "/paid-ads", subtitle: "Spend, ROAS, and conversions by channel." },
      { label: "Content", icon: PenLine, href: "/content", subtitle: "Content pipeline across all clients." },
      { label: "Campaigns", icon: Rocket, href: "/campaigns", subtitle: "Marketing campaigns and their ROI." },
      { label: "Analytics", icon: BarChart3, href: "/analytics", subtitle: "Traffic and acquisition across channels." },
    ],
  },
  {
    heading: "Finance",
    items: [
      { label: "Revenue", icon: DollarSign, href: "/revenue", subtitle: "Revenue by service line and over time." },
      { label: "Expenses", icon: Wallet, href: "/expenses", subtitle: "Every expense, channel-wise and by category." },
      { label: "Invoices", icon: ReceiptText, href: "/invoices", subtitle: "Paid, pending, and overdue invoices." },
      { label: "P&L", icon: TrendingUp, href: "/pnl", subtitle: "Profit and loss statement." },
      { label: "Cash Flow", icon: Banknote, href: "/cash-flow", subtitle: "Money in, money out, running balance." },
      { label: "Profitability", icon: PieChart, href: "/profitability", subtitle: "Which clients actually make you money." },
    ],
  },
  {
    heading: "Operations",
    items: [
      { label: "Tools & Subscriptions", icon: Wrench, href: "/tools", subtitle: "Every SaaS tool and what it costs." },
      { label: "Vendors", icon: Truck, href: "/vendors", subtitle: "Contractors and vendors you work with." },
      { label: "SOPs & Docs", icon: BookText, href: "/docs", subtitle: "Standard operating procedures and documents." },
      { label: "Reports", icon: FileBarChart, href: "/reports", subtitle: "Saved reports and when they last ran." },
    ],
  },
];

export const settingsItem: NavItem = {
  label: "Settings", icon: Settings, href: "/settings",
  subtitle: "Agency profile and dashboard preferences.",
};

// Flat lookup: href -> { label, subtitle }
export const routeMeta: Record<string, { label: string; subtitle: string }> = (() => {
  const map: Record<string, { label: string; subtitle: string }> = {};
  for (const s of navSections) for (const it of s.items) map[it.href] = { label: it.label, subtitle: it.subtitle };
  map[settingsItem.href] = { label: settingsItem.label, subtitle: settingsItem.subtitle };
  return map;
})();
