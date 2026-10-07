"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import { DonutCard } from "@/components/ui/Charts";
import { formatCurrency } from "@/lib/format";
import type { AdChannel } from "@/lib/data";

export default function PaidAdsPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("adChannels");
  const spend = data.adChannels.reduce((a, c) => a + c.spend, 0);
  const conv = data.adChannels.reduce((a, c) => a + c.conversions, 0);
  const clicks = data.adChannels.reduce((a, c) => a + c.clicks, 0);
  const avgRoas = (data.adChannels.reduce((a, c) => a + c.roas * c.spend, 0) / (spend || 1)).toFixed(1);
  const cpa = conv ? formatCurrency(Math.round(spend / conv)) : "—";

  const donut = data.adChannels.map((c) => ({ id: c.id, name: c.channel, value: c.spend, color: c.color }));

  const columns: Column<AdChannel>[] = [
    { key: "channel", header: "Channel", editable: true },
    { key: "spend", header: "Spend", align: "right", editable: true, format: "currency" },
    { key: "clicks", header: "Clicks", align: "right", editable: true, format: "number" },
    { key: "conversions", header: "Conv.", align: "right", editable: true, format: "number" },
    { key: "roas", header: "ROAS", align: "right", editable: true, render: (r) => <span>{r.roas}x</span> },
    { key: "spend", header: "CPA", align: "right", render: (r) => <span>{r.conversions ? formatCurrency(Math.round(r.spend / r.conversions)) : "—"}</span> },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Total Ad Spend", value: spend, format: "currency", icon: "Megaphone", iconColor: "#3b82f6" },
        { label: "Blended ROAS", value: avgRoas + "x", icon: "TrendingUp", iconColor: "#22c55e" },
        { label: "Conversions", value: conv, format: "number", icon: "Target", iconColor: "#a855f7" },
        { label: "Avg CPA", value: cpa, icon: "DollarSign", iconColor: "#f59e0b" },
      ]} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <DonutCard title="Spend by Channel" data={donut} centerValue={formatCurrency(spend)} centerLabel="Total Spend" />
        <div className="lg:col-span-2">
          <DataTable title="Channels" columns={columns} rows={data.adChannels} onEdit={onEdit}
            footer={<span className="text-ink-500">{clicks.toLocaleString()} clicks across {data.adChannels.length} channels.</span>} />
        </div>
      </div>
    </div>
  );
}
