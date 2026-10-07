"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { BarChartCard } from "@/components/ui/Charts";
import type { Campaign } from "@/lib/data";

export default function CampaignsPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("campaigns");
  const active = data.campaigns.filter((c) => c.status === "Active").length;
  const spent = data.campaigns.reduce((a, c) => a + c.spent, 0);
  const leads = data.campaigns.reduce((a, c) => a + c.leads, 0);
  const avgRoi = (data.campaigns.reduce((a, c) => a + c.roi, 0) / (data.campaigns.length || 1)).toFixed(1);

  const chart = data.campaigns.map((c) => ({ name: c.name, Leads: c.leads }));

  const columns: Column<Campaign>[] = [
    { key: "name", header: "Campaign", editable: true },
    { key: "channel", header: "Channel", editable: true },
    { key: "status", header: "Status", render: (r) => <Badge label={r.status} /> },
    { key: "budget", header: "Budget", align: "right", editable: true, format: "currency" },
    { key: "spent", header: "Spent", align: "right", editable: true, format: "currency" },
    { key: "leads", header: "Leads", align: "right", editable: true, format: "number" },
    { key: "roi", header: "ROI", align: "right", editable: true, render: (r) => <span>{r.roi}x</span> },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Active Campaigns", value: active, format: "number", icon: "Rocket", iconColor: "#3b82f6" },
        { label: "Total Spent", value: spent, format: "currency", icon: "Wallet", iconColor: "#f59e0b" },
        { label: "Leads Generated", value: leads, format: "number", icon: "Users", iconColor: "#22c55e" },
        { label: "Avg ROI", value: avgRoi + "x", icon: "TrendingUp", iconColor: "#a855f7" },
      ]} />
      <BarChartCard title="Leads by Campaign" data={chart} xKey="name" series={[{ key: "Leads", name: "Leads", color: "#22c55e" }]} />
      <DataTable title="Campaigns" columns={columns} rows={data.campaigns} onEdit={onEdit} />
    </div>
  );
}
