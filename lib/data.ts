// =============================================================
// GROWBARD DASHBOARD — DEFAULT DATA (single source of truth)
// -------------------------------------------------------------
// Edit numbers here (commit -> Vercel redeploys) OR edit live on
// the site (Edit button). Live edits save in your browser and
// override these defaults. Every chart/table recomputes from this.
// =============================================================

export type Trend = "up" | "down";
export type Fmt = "currency" | "number" | "percent";

/* ---------------- Dashboard (home) ---------------- */
export interface StatCard {
  id: string; label: string; value: number; format: Fmt;
  changePct: number; trend: Trend; accent: string; spark: number[]; icon: string;
}
export interface MiniStat {
  id: string; label: string; value: number; format: Fmt;
  changePct: number; trend: Trend; icon: string; iconColor: string;
}
export interface MonthPoint { month: string; revenue: number; expenses: number; }
export interface ChannelSlice { id: string; name: string; value: number; color: string; }
export interface PipelineStage { id: string; name: string; amount: number; count: number; color: string; }
export interface ProjectStatusSlice { id: string; name: string; count: number; color: string; }
export interface HealthRow { id: string; name: string; score: number; icon: string; }
export interface CapacityRow { id: string; name: string; load: number; avatarColor: string; }
export interface ActivityRow { id: string; type: string; title: string; subject: string; time: string; color: string; }
export interface DeadlineRow { id: string; title: string; client: string; date: string; priority: "High" | "Medium" | "Low"; icon: string; }
export interface ClientProfitRow { id: string; client: string; revenue: number; cost: number; }

/* ---------------- Sales ---------------- */
export interface Deal { id: string; name: string; client: string; stage: string; value: number; owner: string; closeDate: string; probability: number; }
export interface OutreachSeq { id: string; name: string; channel: string; sent: number; opened: number; replied: number; booked: number; }
export interface Meeting { id: string; title: string; client: string; date: string; time: string; type: string; owner: string; }
export interface Proposal { id: string; title: string; client: string; value: number; status: "Draft" | "Sent" | "Won" | "Lost"; sentDate: string; }

/* ---------------- Clients ---------------- */
export interface Client { id: string; name: string; industry: string; status: "Active" | "Onboarding" | "Paused" | "Churned"; mrr: number; since: string; owner: string; }
export interface Contract { id: string; client: string; type: string; value: number; start: string; end: string; status: "Active" | "Expiring" | "Expired"; }

/* ---------------- Projects ---------------- */
export interface Project { id: string; name: string; client: string; status: "On Track" | "At Risk" | "Delayed" | "Completed"; progress: number; budget: number; spent: number; due: string; }
export interface Task { id: string; title: string; project: string; assignee: string; priority: "High" | "Medium" | "Low"; status: "To Do" | "In Progress" | "Done"; due: string; }
export interface CalendarEvent { id: string; title: string; date: string; type: string; color: string; }
export interface TeamMember { id: string; name: string; role: string; load: number; billableHours: number; capacityHours: number; avatarColor: string; }

/* ---------------- Marketing ---------------- */
export interface Keyword { id: string; keyword: string; position: number; volume: number; change: number; client: string; }
export interface AdChannel { id: string; channel: string; spend: number; clicks: number; conversions: number; roas: number; color: string; }
export interface ContentPiece { id: string; title: string; type: string; status: "Idea" | "Writing" | "Review" | "Published"; client: string; publishDate: string; author: string; }
export interface Campaign { id: string; name: string; channel: string; status: "Active" | "Paused" | "Ended"; budget: number; spent: number; leads: number; roi: number; }
export interface TrafficPoint { month: string; organic: number; paid: number; social: number; direct: number; }

/* ---------------- Finance ---------------- */
export interface RevenueStream { id: string; service: string; amount: number; color: string; }
export interface Expense { id: string; category: string; vendor: string; amount: number; recurring: boolean; date: string; }
export interface Invoice { id: string; number: string; client: string; amount: number; status: "Paid" | "Pending" | "Overdue"; issued: string; due: string; }
export interface PnlLine { id: string; label: string; amount: number; kind: "revenue" | "cogs" | "opex"; }
export interface CashPoint { month: string; inflow: number; outflow: number; balance: number; }

/* ---------------- Operations ---------------- */
export interface Tool { id: string; name: string; category: string; cost: number; billing: "Monthly" | "Yearly"; seats: number; renewal: string; }
export interface Vendor { id: string; name: string; service: string; monthlyCost: number; contact: string; status: "Active" | "Inactive"; }
export interface Doc { id: string; title: string; category: string; owner: string; updated: string; }
export interface Report { id: string; name: string; type: string; period: string; lastRun: string; }

/* ---------------- Inbox ---------------- */
export interface Message { id: string; from: string; subject: string; preview: string; time: string; unread: boolean; }

export interface AppData {
  agencyName: string;
  userName: string;
  dateLabel: string;
  currency: string;
  timezone: string;

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

  deals: Deal[];
  outreach: OutreachSeq[];
  meetings: Meeting[];
  proposals: Proposal[];

  clients: Client[];
  contracts: Contract[];

  projects: Project[];
  tasks: Task[];
  calendar: CalendarEvent[];
  team: TeamMember[];

  keywords: Keyword[];
  seoTraffic: TrafficPoint[];
  adChannels: AdChannel[];
  content: ContentPiece[];
  campaigns: Campaign[];
  analyticsTraffic: TrafficPoint[];

  revenueStreams: RevenueStream[];
  expenses: Expense[];
  invoices: Invoice[];
  pnl: PnlLine[];
  cashFlow: CashPoint[];

  tools: Tool[];
  vendors: Vendor[];
  docs: Doc[];
  reports: Report[];

  inbox: Message[];
}

// Kept for backwards-compatible imports
export type DashboardData = AppData;

export const defaultData: AppData = {
  agencyName: "Growbard",
  userName: "Alex",
  dateLabel: "Thu, Oct 24, 2024",
  currency: "USD",
  timezone: "Asia/Dhaka",

  topStats: [
    { id: "mrr", label: "Monthly Recurring Revenue", value: 18400, format: "currency", changePct: 12, trend: "up", accent: "#3b82f6", spark: [12, 14, 13, 16, 15, 18, 17, 19, 18.4], icon: "DollarSign" },
    { id: "rev-month", label: "Revenue This Month", value: 25600, format: "currency", changePct: 18, trend: "up", accent: "#22c55e", spark: [18, 20, 19, 22, 21, 24, 23, 25, 25.6], icon: "BarChart3" },
    { id: "exp-month", label: "Expenses This Month", value: 14200, format: "currency", changePct: 6, trend: "up", accent: "#ef4444", spark: [13, 14, 13.5, 15, 14, 14.5, 14, 14.2, 14.2], icon: "Briefcase" },
    { id: "net-profit", label: "Net Profit", value: 11400, format: "currency", changePct: 28, trend: "up", accent: "#a855f7", spark: [7, 8, 7.5, 9, 9.5, 10, 10.5, 11, 11.4], icon: "LineChart" },
    { id: "margin", label: "Profit Margin", value: 44.5, format: "percent", changePct: 10, trend: "up", accent: "#06b6d4", spark: [38, 40, 39, 41, 42, 43, 43.5, 44, 44.5], icon: "Percent" },
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

  /* ---------------- Sales ---------------- */
  deals: [
    { id: "dl1", name: "SEO + Ads retainer", client: "Acme Roofing", stage: "Proposal", value: 4500, owner: "Alex Johnson", closeDate: "Nov 5", probability: 60 },
    { id: "dl2", name: "Website redesign", client: "Bright Dental", stage: "Negotiation", value: 8000, owner: "Sarah Kim", closeDate: "Nov 8", probability: 75 },
    { id: "dl3", name: "Local SEO package", client: "Peak Plumbing", stage: "Qualified", value: 2500, owner: "Mike Chen", closeDate: "Nov 12", probability: 40 },
    { id: "dl4", name: "Full funnel growth", client: "Nova Fitness", stage: "New Leads", value: 6000, owner: "Alex Johnson", closeDate: "Nov 20", probability: 20 },
    { id: "dl5", name: "PPC management", client: "Urban Dental", stage: "Proposal", value: 3000, owner: "Emily Davis", closeDate: "Nov 7", probability: 55 },
    { id: "dl6", name: "Content retainer", client: "GreenLeaf Landscaping", stage: "Won", value: 1800, owner: "Sarah Kim", closeDate: "Oct 22", probability: 100 },
  ],

  outreach: [
    { id: "o1", name: "Roofing cold email Q4", channel: "Email", sent: 820, opened: 356, replied: 48, booked: 11 },
    { id: "o2", name: "Dental LinkedIn DMs", channel: "LinkedIn", sent: 240, opened: 180, replied: 32, booked: 9 },
    { id: "o3", name: "HVAC winter push", channel: "Email", sent: 540, opened: 210, replied: 27, booked: 6 },
    { id: "o4", name: "Fitness studios outreach", channel: "Instagram", sent: 160, opened: 95, replied: 21, booked: 4 },
  ],

  meetings: [
    { id: "m1", title: "Discovery call", client: "Acme Roofing", date: "Oct 24", time: "10:00 AM", type: "Sales", owner: "Alex Johnson" },
    { id: "m2", title: "Monthly review", client: "Elite Septic Service", date: "Oct 25", time: "2:00 PM", type: "Client", owner: "Sarah Kim" },
    { id: "m3", title: "Proposal walkthrough", client: "Bright Dental", date: "Oct 26", time: "11:30 AM", type: "Sales", owner: "Emily Davis" },
    { id: "m4", title: "Onboarding kickoff", client: "GreenLeaf Landscaping", date: "Oct 28", time: "9:00 AM", type: "Onboarding", owner: "Mike Chen" },
    { id: "m5", title: "Strategy session", client: "Summit HVAC", date: "Oct 30", time: "3:00 PM", type: "Client", owner: "Alex Johnson" },
  ],

  proposals: [
    { id: "p1", title: "SEO + Ads retainer", client: "Acme Roofing", value: 4500, status: "Sent", sentDate: "Oct 20" },
    { id: "p2", title: "Website redesign", client: "Bright Dental", value: 8000, status: "Sent", sentDate: "Oct 21" },
    { id: "p3", title: "Local SEO package", client: "Peak Plumbing", value: 2500, status: "Draft", sentDate: "—" },
    { id: "p4", title: "Content retainer", client: "GreenLeaf Landscaping", value: 1800, status: "Won", sentDate: "Oct 15" },
    { id: "p5", title: "PPC management", client: "Northside Law", value: 3200, status: "Lost", sentDate: "Oct 10" },
  ],

  /* ---------------- Clients ---------------- */
  clients: [
    { id: "c1", name: "Elite Septic Service", industry: "Home Services", status: "Active", mrr: 3000, since: "Jan 2023", owner: "Sarah Kim" },
    { id: "c2", name: "RoofRight Co.", industry: "Roofing", status: "Active", mrr: 2000, since: "Mar 2023", owner: "Alex Johnson" },
    { id: "c3", name: "Bright Dental", industry: "Healthcare", status: "Active", mrr: 1500, since: "Jun 2023", owner: "Emily Davis" },
    { id: "c4", name: "GreenLeaf Landscaping", industry: "Landscaping", status: "Onboarding", mrr: 1200, since: "Oct 2024", owner: "Mike Chen" },
    { id: "c5", name: "Summit HVAC", industry: "HVAC", status: "Active", mrr: 1000, since: "Aug 2023", owner: "Alex Johnson" },
    { id: "c6", name: "Peak Plumbing", industry: "Plumbing", status: "Paused", mrr: 0, since: "Feb 2024", owner: "Mike Chen" },
  ],

  contracts: [
    { id: "ct1", client: "Elite Septic Service", type: "Retainer", value: 36000, start: "Jan 2024", end: "Dec 2024", status: "Active" },
    { id: "ct2", client: "RoofRight Co.", type: "Retainer", value: 24000, start: "Mar 2024", end: "Nov 2024", status: "Expiring" },
    { id: "ct3", client: "Bright Dental", type: "Project", value: 8000, start: "Sep 2024", end: "Dec 2024", status: "Active" },
    { id: "ct4", client: "Summit HVAC", type: "Retainer", value: 12000, start: "Aug 2024", end: "Jul 2025", status: "Active" },
    { id: "ct5", client: "Northside Law", type: "Retainer", value: 18000, start: "Jan 2024", end: "Sep 2024", status: "Expired" },
  ],

  /* ---------------- Projects ---------------- */
  projects: [
    { id: "pr1", name: "Local SEO campaign", client: "Elite Septic Service", status: "On Track", progress: 72, budget: 6000, spent: 4100, due: "Nov 15" },
    { id: "pr2", name: "Google Ads revamp", client: "RoofRight Co.", status: "At Risk", progress: 45, budget: 4000, spent: 2600, due: "Nov 5" },
    { id: "pr3", name: "Website redesign", client: "Bright Dental", status: "On Track", progress: 60, budget: 8000, spent: 3800, due: "Dec 1" },
    { id: "pr4", name: "Content engine setup", client: "GreenLeaf Landscaping", status: "Delayed", progress: 20, budget: 3000, spent: 900, due: "Oct 30" },
    { id: "pr5", name: "Technical SEO audit", client: "Summit HVAC", status: "On Track", progress: 85, budget: 2500, spent: 2000, due: "Nov 2" },
    { id: "pr6", name: "Brand refresh", client: "Nova Fitness", status: "Completed", progress: 100, budget: 5000, spent: 4800, due: "Oct 10" },
  ],

  tasks: [
    { id: "t1", title: "Publish 4 blog posts", project: "Content engine setup", assignee: "Sarah Kim", priority: "High", status: "In Progress", due: "Oct 28" },
    { id: "t2", title: "Fix crawl errors", project: "Technical SEO audit", assignee: "Mike Chen", priority: "High", status: "To Do", due: "Oct 26" },
    { id: "t3", title: "A/B test ad creatives", project: "Google Ads revamp", assignee: "Emily Davis", priority: "Medium", status: "In Progress", due: "Oct 29" },
    { id: "t4", title: "Design homepage mockup", project: "Website redesign", assignee: "Alex Johnson", priority: "Medium", status: "In Progress", due: "Nov 1" },
    { id: "t5", title: "Keyword research", project: "Local SEO campaign", assignee: "Mike Chen", priority: "Low", status: "Done", due: "Oct 20" },
    { id: "t6", title: "Set up GA4 funnels", project: "Local SEO campaign", assignee: "Emily Davis", priority: "Medium", status: "To Do", due: "Oct 31" },
    { id: "t7", title: "Monthly report prep", project: "Google Ads revamp", assignee: "Sarah Kim", priority: "High", status: "To Do", due: "Oct 27" },
  ],

  calendar: [
    { id: "e1", title: "Discovery call — Acme", date: "2024-10-24", type: "Meeting", color: "#3b82f6" },
    { id: "e2", title: "SEO report due", date: "2024-10-25", type: "Deadline", color: "#ef4444" },
    { id: "e3", title: "Client review — Elite", date: "2024-10-25", type: "Meeting", color: "#3b82f6" },
    { id: "e4", title: "Ads optimization", date: "2024-10-26", type: "Task", color: "#f59e0b" },
    { id: "e5", title: "Monthly call — Bright", date: "2024-10-28", type: "Meeting", color: "#3b82f6" },
    { id: "e6", title: "Content calendar", date: "2024-10-30", type: "Deadline", color: "#ef4444" },
    { id: "e7", title: "Technical SEO audit", date: "2024-11-02", type: "Deadline", color: "#ef4444" },
  ],

  team: [
    { id: "alex", name: "Alex Johnson", role: "Founder / Strategist", load: 91, billableHours: 32, capacityHours: 35, avatarColor: "#3b82f6" },
    { id: "sarah", name: "Sarah Kim", role: "Account Manager", load: 66, billableHours: 23, capacityHours: 35, avatarColor: "#ec4899" },
    { id: "mike", name: "Mike Chen", role: "SEO Specialist", load: 109, billableHours: 38, capacityHours: 35, avatarColor: "#f59e0b" },
    { id: "emily", name: "Emily Davis", role: "PPC Specialist", load: 72, billableHours: 25, capacityHours: 35, avatarColor: "#8b5cf6" },
    { id: "david", name: "David Wilson", role: "Content Writer", load: 58, billableHours: 20, capacityHours: 35, avatarColor: "#22c55e" },
  ],

  /* ---------------- Marketing ---------------- */
  keywords: [
    { id: "k1", keyword: "septic service near me", position: 3, volume: 2400, change: 2, client: "Elite Septic Service" },
    { id: "k2", keyword: "emergency roof repair", position: 5, volume: 1900, change: -1, client: "RoofRight Co." },
    { id: "k3", keyword: "dental implants cost", position: 8, volume: 5400, change: 4, client: "Bright Dental" },
    { id: "k4", keyword: "landscaping company", position: 12, volume: 3200, change: 3, client: "GreenLeaf Landscaping" },
    { id: "k5", keyword: "hvac repair", position: 6, volume: 4100, change: 1, client: "Summit HVAC" },
    { id: "k6", keyword: "septic tank pumping", position: 2, volume: 1600, change: 5, client: "Elite Septic Service" },
  ],
  seoTraffic: [
    { month: "May", organic: 8200, paid: 0, social: 0, direct: 0 },
    { month: "Jun", organic: 9100, paid: 0, social: 0, direct: 0 },
    { month: "Jul", organic: 9800, paid: 0, social: 0, direct: 0 },
    { month: "Aug", organic: 11200, paid: 0, social: 0, direct: 0 },
    { month: "Sep", organic: 12400, paid: 0, social: 0, direct: 0 },
    { month: "Oct", organic: 13900, paid: 0, social: 0, direct: 0 },
  ],
  adChannels: [
    { id: "g", channel: "Google Ads", spend: 5200, clicks: 4100, conversions: 182, roas: 4.2, color: "#3b82f6" },
    { id: "m", channel: "Meta Ads", spend: 3100, clicks: 6200, conversions: 141, roas: 3.1, color: "#22c55e" },
    { id: "b", channel: "Bing Ads", spend: 900, clicks: 720, conversions: 28, roas: 2.4, color: "#f59e0b" },
    { id: "l", channel: "LinkedIn Ads", spend: 1400, clicks: 510, conversions: 19, roas: 1.8, color: "#f97316" },
  ],
  content: [
    { id: "cn1", title: "5 signs you need a new roof", type: "Blog", status: "Published", client: "RoofRight Co.", publishDate: "Oct 18", author: "David Wilson" },
    { id: "cn2", title: "Septic maintenance guide", type: "Guide", status: "Review", client: "Elite Septic Service", publishDate: "Oct 29", author: "David Wilson" },
    { id: "cn3", title: "Invisalign vs braces", type: "Blog", status: "Writing", client: "Bright Dental", publishDate: "Nov 1", author: "Sarah Kim" },
    { id: "cn4", title: "Winter lawn care tips", type: "Blog", status: "Idea", client: "GreenLeaf Landscaping", publishDate: "Nov 5", author: "David Wilson" },
    { id: "cn5", title: "When to replace your AC", type: "Blog", status: "Published", client: "Summit HVAC", publishDate: "Oct 12", author: "David Wilson" },
  ],
  campaigns: [
    { id: "cp1", name: "Fall roofing promo", channel: "Google Ads", status: "Active", budget: 3000, spent: 1850, leads: 62, roi: 3.4 },
    { id: "cp2", name: "Dental new patient", channel: "Meta Ads", status: "Active", budget: 2500, spent: 1600, leads: 48, roi: 2.9 },
    { id: "cp3", name: "Septic emergency", channel: "Google Ads", status: "Active", budget: 2000, spent: 1200, leads: 37, roi: 4.1 },
    { id: "cp4", name: "Spring landscaping", channel: "Meta Ads", status: "Paused", budget: 1500, spent: 600, leads: 14, roi: 1.6 },
    { id: "cp5", name: "HVAC tune-up", channel: "Bing Ads", status: "Ended", budget: 1000, spent: 1000, leads: 22, roi: 2.2 },
  ],
  analyticsTraffic: [
    { month: "May", organic: 8200, paid: 3100, social: 1400, direct: 2200 },
    { month: "Jun", organic: 9100, paid: 3400, social: 1600, direct: 2300 },
    { month: "Jul", organic: 9800, paid: 3000, social: 1800, direct: 2500 },
    { month: "Aug", organic: 11200, paid: 3600, social: 2100, direct: 2700 },
    { month: "Sep", organic: 12400, paid: 3900, social: 2400, direct: 2900 },
    { month: "Oct", organic: 13900, paid: 4200, social: 2700, direct: 3100 },
  ],

  /* ---------------- Finance ---------------- */
  revenueStreams: [
    { id: "rs1", service: "SEO Retainers", amount: 11000, color: "#3b82f6" },
    { id: "rs2", service: "Paid Ads Mgmt", amount: 6500, color: "#22c55e" },
    { id: "rs3", service: "Web Design", amount: 4200, color: "#f59e0b" },
    { id: "rs4", service: "Content", amount: 2400, color: "#a855f7" },
    { id: "rs5", service: "Consulting", amount: 1500, color: "#06b6d4" },
  ],
  expenses: [
    { id: "ex1", category: "Payroll", vendor: "Team salaries", amount: 8500, recurring: true, date: "Oct 1" },
    { id: "ex2", category: "Paid Ads", vendor: "Google Ads (client pass-through)", amount: 2600, recurring: true, date: "Oct 1" },
    { id: "ex3", category: "Software", vendor: "Ahrefs", amount: 199, recurring: true, date: "Oct 3" },
    { id: "ex4", category: "Software", vendor: "HubSpot", amount: 450, recurring: true, date: "Oct 3" },
    { id: "ex5", category: "Contractors", vendor: "Freelance designer", amount: 1200, recurring: false, date: "Oct 8" },
    { id: "ex6", category: "Office", vendor: "Coworking space", amount: 600, recurring: true, date: "Oct 1" },
    { id: "ex7", category: "Software", vendor: "Canva + misc tools", amount: 151, recurring: true, date: "Oct 5" },
  ],
  invoices: [
    { id: "iv1", number: "INV-1042", client: "Elite Septic Service", amount: 3000, status: "Paid", issued: "Oct 1", due: "Oct 15" },
    { id: "iv2", number: "INV-1043", client: "RoofRight Co.", amount: 2000, status: "Paid", issued: "Oct 1", due: "Oct 15" },
    { id: "iv3", number: "INV-1044", client: "Bright Dental", amount: 1500, status: "Pending", issued: "Oct 10", due: "Oct 25" },
    { id: "iv4", number: "INV-1045", client: "Summit HVAC", amount: 1000, status: "Overdue", issued: "Sep 20", due: "Oct 5" },
    { id: "iv5", number: "INV-1046", client: "GreenLeaf Landscaping", amount: 1200, status: "Pending", issued: "Oct 15", due: "Oct 30" },
  ],
  pnl: [
    { id: "pl1", label: "Service Revenue", amount: 25600, kind: "revenue" },
    { id: "pl2", label: "Ad spend (pass-through)", amount: 2600, kind: "cogs" },
    { id: "pl3", label: "Contractor costs", amount: 1200, kind: "cogs" },
    { id: "pl4", label: "Payroll", amount: 8500, kind: "opex" },
    { id: "pl5", label: "Software & tools", amount: 800, kind: "opex" },
    { id: "pl6", label: "Office & admin", amount: 1100, kind: "opex" },
  ],
  cashFlow: [
    { month: "May", inflow: 24000, outflow: 19000, balance: 21000 },
    { month: "Jun", inflow: 26000, outflow: 20000, balance: 27000 },
    { month: "Jul", inflow: 25000, outflow: 18000, balance: 34000 },
    { month: "Aug", inflow: 28000, outflow: 21000, balance: 41000 },
    { month: "Sep", inflow: 27000, outflow: 22000, balance: 46000 },
    { month: "Oct", inflow: 25600, outflow: 14200, balance: 32800 },
  ],

  /* ---------------- Operations ---------------- */
  tools: [
    { id: "tl1", name: "Ahrefs", category: "SEO", cost: 199, billing: "Monthly", seats: 3, renewal: "Nov 3" },
    { id: "tl2", name: "HubSpot", category: "CRM", cost: 450, billing: "Monthly", seats: 5, renewal: "Nov 3" },
    { id: "tl3", name: "Figma", category: "Design", cost: 45, billing: "Monthly", seats: 3, renewal: "Nov 10" },
    { id: "tl4", name: "Google Workspace", category: "Productivity", cost: 72, billing: "Monthly", seats: 6, renewal: "Nov 1" },
    { id: "tl5", name: "Canva", category: "Design", cost: 30, billing: "Monthly", seats: 5, renewal: "Nov 5" },
    { id: "tl6", name: "Slack", category: "Comms", cost: 48, billing: "Monthly", seats: 6, renewal: "Nov 8" },
  ],
  vendors: [
    { id: "vn1", name: "Freelance Design Co.", service: "Graphic design", monthlyCost: 1200, contact: "hello@fdc.com", status: "Active" },
    { id: "vn2", name: "DevShop LLC", service: "Web development", monthlyCost: 2400, contact: "team@devshop.io", status: "Active" },
    { id: "vn3", name: "VoiceOver Pros", service: "Video VO", monthlyCost: 400, contact: "jobs@vopros.com", status: "Inactive" },
    { id: "vn4", name: "PrintHouse", service: "Print collateral", monthlyCost: 300, contact: "orders@printhouse.com", status: "Active" },
  ],
  docs: [
    { id: "dc1", title: "Client onboarding SOP", category: "Onboarding", owner: "Sarah Kim", updated: "Oct 12" },
    { id: "dc2", title: "SEO audit checklist", category: "SEO", owner: "Mike Chen", updated: "Oct 18" },
    { id: "dc3", title: "Ad account setup guide", category: "Paid Ads", owner: "Emily Davis", updated: "Oct 9" },
    { id: "dc4", title: "Monthly reporting template", category: "Reporting", owner: "Sarah Kim", updated: "Oct 20" },
    { id: "dc5", title: "Brand voice guidelines", category: "Content", owner: "David Wilson", updated: "Sep 30" },
  ],
  reports: [
    { id: "rp1", name: "Monthly client report", type: "Client", period: "Monthly", lastRun: "Oct 1" },
    { id: "rp2", name: "Pipeline forecast", type: "Sales", period: "Weekly", lastRun: "Oct 21" },
    { id: "rp3", name: "P&L summary", type: "Finance", period: "Monthly", lastRun: "Oct 1" },
    { id: "rp4", name: "Team utilization", type: "Ops", period: "Weekly", lastRun: "Oct 21" },
    { id: "rp5", name: "SEO performance", type: "Marketing", period: "Monthly", lastRun: "Oct 1" },
  ],

  /* ---------------- Inbox ---------------- */
  inbox: [
    { id: "in1", from: "Acme Roofing", subject: "Re: Proposal questions", preview: "Thanks for sending this over, we had a couple of questions about...", time: "2 min ago", unread: true },
    { id: "in2", from: "Bright Dental", subject: "New patient numbers", preview: "Can we hop on a call to discuss last month's lead volume?", time: "1 hour ago", unread: true },
    { id: "in3", from: "Stripe", subject: "Payout sent", preview: "A payout of $4,500 is on its way to your bank account.", time: "3 hours ago", unread: true },
    { id: "in4", from: "Mike Chen", subject: "SEO audit ready", preview: "Finished the Summit HVAC technical audit — findings attached.", time: "Yesterday", unread: false },
    { id: "in5", from: "GreenLeaf Landscaping", subject: "Onboarding docs", preview: "Here are the brand assets you requested for the content work.", time: "Yesterday", unread: false },
  ],
};
