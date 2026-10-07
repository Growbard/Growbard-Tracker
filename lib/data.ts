// =============================================================
// GROWBARD DASHBOARD — DEFAULT DATA
// -------------------------------------------------------------
// This file is the single source of truth for everything the
// dashboard shows. You can edit numbers directly here (commit to
// GitHub -> Vercel redeploys), OR edit live on the site (click
// the "Edit" button, top-right). Live edits are saved in your
// browser automatically and override these defaults.
//
// Every value is typed so charts/graphics recompute automatically
// whenever a number changes.
// =============================================================

export type Trend = "up" | "down";

export interface StatCard {
  id: string;
  label: string;
  value: number;
  /** "currency" | "number" | "percent" */
  format: "currency" | "number" | "percent";
  changePct: number; // e.g. 12 => "↑ 12%"
  trend: Trend;
  /** which accent color to use for the mini sparkline */
  accent: string;
  /** small sparkline series */
  spark: number[];
  icon: string; // lucide icon name
}

export interface MiniStat {
  id: string;
  label: string;
  value: number;
  format: "currency" | "number" | "percent";
  changePct: number;
  trend: Trend;
  icon: string;
  iconColor: string;
}

export interface MonthPoint {
  month: string;
  revenue: number;
  expenses: number;
}

export interface ChannelSlice {
  id: string;
  name: string;
  value: number; // percent
  color: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  amount: number;
  count: number;
  color: string;
}

export interface ProjectStatusSlice {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface HealthRow {
  id: string;
  name: string;
  score: number; // 0-100
  icon: string;
}

export interface CapacityRow {
  id: string;
  name: string;
  load: number; // percent, can exceed 100
  avatarColor: string;
}

export interface ActivityRow {
  id: string;
  type: string; // lucide icon name
  title: string;
  subject: string;
  time: string;
  color: string;
}

export interface DeadlineRow {
  id: string;
  title: string;
  client: string;
  date: string;
  priority: "High" | "Medium" | "Low";
  icon: string;
}

export interface ClientProfitRow {
  id: string;
  client: string;
  revenue: number;
  cost: number;
}

export interface DashboardData {
  agencyName: string;
  userName: string;
  dateLabel: string;
  topStats: StatCard[];
  miniStats: MiniStat[];
  revenueVsExpenses: MonthPoint[];
  revenueByChannel: ChannelSlice[];
  pipeline: PipelineStage[];
  projectStatus: ProjectStatusSlice[];
  clientHealth: HealthRow[];
  teamCapacity: CapacityRow[];
  recentActivity: ActivityRow[];
  upcomingDeadlines: DeadlineRow[];
  topClients: ClientProfitRow[];
}

export const defaultData: DashboardData = {
  agencyName: "Growbard",
  userName: "Alex",
  dateLabel: "Thu, Oct 24, 2024",

  topStats: [
    {
      id: "mrr",
      label: "Monthly Recurring Revenue",
      value: 18400,
      format: "currency",
      changePct: 12,
      trend: "up",
      accent: "#3b82f6",
      spark: [12, 14, 13, 16, 15, 18, 17, 19, 18.4],
      icon: "DollarSign",
    },
    {
      id: "rev-month",
      label: "Revenue This Month",
      value: 25600,
      format: "currency",
      changePct: 18,
      trend: "up",
      accent: "#22c55e",
      spark: [18, 20, 19, 22, 21, 24, 23, 25, 25.6],
      icon: "BarChart3",
    },
    {
      id: "exp-month",
      label: "Expenses This Month",
      value: 14200,
      format: "currency",
      changePct: 6,
      trend: "up",
      accent: "#ef4444",
      spark: [13, 14, 13.5, 15, 14, 14.5, 14, 14.2, 14.2],
      icon: "Briefcase",
    },
    {
      id: "net-profit",
      label: "Net Profit",
      value: 11400,
      format: "currency",
      changePct: 28,
      trend: "up",
      accent: "#a855f7",
      spark: [7, 8, 7.5, 9, 9.5, 10, 10.5, 11, 11.4],
      icon: "LineChart",
    },
    {
      id: "margin",
      label: "Profit Margin",
      value: 44.5,
      format: "percent",
      changePct: 10,
      trend: "up",
      accent: "#06b6d4",
      spark: [38, 40, 39, 41, 42, 43, 43.5, 44, 44.5],
      icon: "Percent",
    },
  ],

  miniStats: [
    { id: "new-leads", label: "New Leads", value: 56, format: "number", changePct: 27, trend: "up", icon: "Users", iconColor: "#3b82f6" },
    { id: "qualified", label: "Qualified Leads", value: 28, format: "number", changePct: 33, trend: "up", icon: "Target", iconColor: "#22c55e" },
    { id: "proposals", label: "Proposals Sent", value: 12, format: "number", changePct: 20, trend: "up", icon: "FileText", iconColor: "#3b82f6" },
    { id: "deals-won", label: "Deals Won", value: 6, format: "number", changePct: 100, trend: "up", icon: "Trophy", iconColor: "#f59e0b" },
    { id: "active-clients", label: "Active Clients", value: 18, format: "number", changePct: 0, trend: "up", icon: "UserCheck", iconColor: "#64748b" },
    { id: "active-projects", label: "Active Projects", value: 24, format: "number", changePct: 0, trend: "up", icon: "Box", iconColor: "#64748b" },
    { id: "overdue", label: "Overdue Tasks", value: 7, format: "number", changePct: 40, trend: "up", icon: "AlertTriangle", iconColor: "#ef4444" },
    { id: "cash", label: "Cash Balance", value: 32800, format: "currency", changePct: 0, trend: "up", icon: "Landmark", iconColor: "#22c55e" },
  ],

  revenueVsExpenses: [
    { month: "Jan", revenue: 21000, expenses: 13000 },
    { month: "Feb", revenue: 22000, expenses: 11000 },
    { month: "Mar", revenue: 25000, expenses: 18000 },
    { month: "Apr", revenue: 24000, expenses: 17000 },
    { month: "May", revenue: 26000, expenses: 19000 },
    { month: "Jun", revenue: 28000, expenses: 20000 },
    { month: "Jul", revenue: 27000, expenses: 18000 },
    { month: "Aug", revenue: 29000, expenses: 21000 },
    { month: "Sep", revenue: 31000, expenses: 22000 },
    { month: "Oct", revenue: 32000, expenses: 23000 },
  ],

  revenueByChannel: [
    { id: "seo", name: "Organic SEO", value: 32, color: "#3b82f6" },
    { id: "gads", name: "Google Ads", value: 22, color: "#22c55e" },
    { id: "outreach", name: "Outreach", value: 18, color: "#f59e0b" },
    { id: "referral", name: "Referral", value: 12, color: "#f97316" },
    { id: "social", name: "Social Media", value: 8, color: "#c4b5fd" },
    { id: "other", name: "Other", value: 8, color: "#93c5fd" },
  ],

  pipeline: [
    { id: "new", name: "New Leads", amount: 12000, count: 10, color: "#3b82f6" },
    { id: "qualified", name: "Qualified", amount: 18000, count: 8, color: "#a855f7" },
    { id: "proposal", name: "Proposal", amount: 16000, count: 6, color: "#f59e0b" },
    { id: "negotiation", name: "Negotiation", amount: 8000, count: 4, color: "#f97316" },
    { id: "won", name: "Won", amount: 6000, count: 6, color: "#22c55e" },
  ],

  projectStatus: [
    { id: "ontrack", name: "On Track", count: 12, color: "#22c55e" },
    { id: "atrisk", name: "At Risk", count: 6, color: "#f59e0b" },
    { id: "delayed", name: "Delayed", count: 3, color: "#ef4444" },
    { id: "completed", name: "Completed", count: 3, color: "#64748b" },
  ],

  clientHealth: [
    { id: "elite", name: "Elite Septic Service", score: 92, icon: "Building2" },
    { id: "roofright", name: "RoofRight Co.", score: 78, icon: "Home" },
    { id: "bright", name: "Bright Dental", score: 65, icon: "Stethoscope" },
    { id: "greenleaf", name: "GreenLeaf Landscaping", score: 88, icon: "Trees" },
    { id: "summit", name: "Summit HVAC", score: 70, icon: "Wind" },
  ],

  teamCapacity: [
    { id: "alex", name: "Alex Johnson", load: 91, avatarColor: "#3b82f6" },
    { id: "sarah", name: "Sarah Kim", load: 66, avatarColor: "#ec4899" },
    { id: "mike", name: "Mike Chen", load: 109, avatarColor: "#f59e0b" },
    { id: "emily", name: "Emily Davis", load: 72, avatarColor: "#8b5cf6" },
    { id: "david", name: "David Wilson", load: 58, avatarColor: "#22c55e" },
  ],

  recentActivity: [
    { id: "a1", type: "UserPlus", title: "New lead from website", subject: "Acme Roofing", time: "2 min ago", color: "#3b82f6" },
    { id: "a2", type: "FileText", title: "Proposal sent", subject: "Bright Dental", time: "1 hour ago", color: "#f59e0b" },
    { id: "a3", type: "Receipt", title: "Invoice paid", subject: "Elite Septic Service", time: "3 hours ago", color: "#22c55e" },
    { id: "a4", type: "CheckCircle2", title: "Task completed", subject: "On-page SEO audit", time: "5 hours ago", color: "#22c55e" },
    { id: "a5", type: "Users", title: "New client onboarded", subject: "GreenLeaf Landscaping", time: "1 day ago", color: "#8b5cf6" },
  ],

  upcomingDeadlines: [
    { id: "d1", title: "Local SEO report", client: "Elite Septic Service", date: "Oct 25", priority: "High", icon: "Calendar" },
    { id: "d2", title: "Google Ads optimization", client: "RoofRight Co.", date: "Oct 26", priority: "Medium", icon: "Calendar" },
    { id: "d3", title: "Monthly client call", client: "Bright Dental", date: "Oct 28", priority: "Medium", icon: "Phone" },
    { id: "d4", title: "Content calendar", client: "GreenLeaf Landscaping", date: "Oct 30", priority: "Low", icon: "Calendar" },
    { id: "d5", title: "Technical SEO audit", client: "Summit HVAC", date: "Nov 2", priority: "Low", icon: "Calendar" },
  ],

  topClients: [
    { id: "elite", client: "Elite Septic Service", revenue: 3000, cost: 900 },
    { id: "roofright", client: "RoofRight Co.", revenue: 2000, cost: 1200 },
    { id: "bright", client: "Bright Dental", revenue: 1500, cost: 400 },
    { id: "greenleaf", client: "GreenLeaf Landscaping", revenue: 1200, cost: 450 },
    { id: "summit", client: "Summit HVAC", revenue: 1000, cost: 650 },
  ],
};
