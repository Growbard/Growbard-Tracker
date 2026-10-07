"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import { BarChartCard, DonutCard } from "@/components/ui/Charts";
import { formatCurrency } from "@/lib/format";
import type { RevenueStream } from "@/lib/data";

export default function RevenuePage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("revenueStreams");
  const total = data.revenueStreams.reduce((a, s) => a + s.amount, 0);
  const trend = data.revenueVsExpenses.map((m) => ({ month: m.month, Revenue: m.revenue }));
  const donut = data.revenueStreams.map((s) => ({ id: s.id, name: s.service, value: s.amount, color: s.color }));

  const columns: Column<RevenueStream>[] = [
    { key: "service", header: "Service Line", editable: true },
    { key: "amount", header: "Revenue", align: "right", editable: true, format: "currency" },
    { key: "amount", header: "Share", align: "right", render: (r) => <span>{Math.round((r.amount / (total || 1)) * 100)}%</span> },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Revenue This Month", value: total, format: "currency", icon: "DollarSign", iconColor: "#22c55e" },
        { label: "Top Service Line", value: [...data.revenueStreams].sort((a, b) => b.amount - a.amount)[0]?.service ?? "—", icon: "Award", iconColor: "#3b82f6" },
        { label: "Service Lines", value: data.revenueStreams.length, format: "number", icon: "Layers", iconColor: "#a855f7" },
        { label: "Avg per Line", value: Math.round(total / (data.revenueStreams.length || 1)), format: "currency", icon: "BarChart3", iconColor: "#f59e0b" },
      ]} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <DonutCard title="Revenue by Service" data={donut} centerValue={formatCurrency(total)} centerLabel="Total" />
        <div className="lg:col-span-2">
          <BarChartCard title="Revenue Trend" data={trend} xKey="month" currency series={[{ key: "Revenue", name: "Revenue", color: "#22c55e" }]} />
        </div>
      </div>
      <DataTable title="Revenue Streams" columns={columns} rows={data.revenueStreams} onEdit={onEdit} />
    </div>
  );
}
