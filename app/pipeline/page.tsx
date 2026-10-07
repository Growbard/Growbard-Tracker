"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { BarChartCard } from "@/components/ui/Charts";
import type { Deal } from "@/lib/data";

export default function PipelinePage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("deals");
  const total = data.deals.reduce((a, d) => a + d.value, 0);
  const weighted = data.deals.reduce((a, d) => a + (d.value * d.probability) / 100, 0);
  const won = data.deals.filter((d) => d.stage === "Won").reduce((a, d) => a + d.value, 0);

  const byStage = data.pipeline.map((s) => ({ stage: s.name, value: s.amount }));

  const columns: Column<Deal>[] = [
    { key: "name", header: "Deal", editable: true },
    { key: "client", header: "Client", editable: true },
    { key: "stage", header: "Stage", render: (r) => <Badge label={r.stage} /> },
    { key: "value", header: "Value", align: "right", editable: true, format: "currency" },
    { key: "probability", header: "Prob.", align: "right", editable: true, render: (r) => <span>{r.probability}%</span> },
    { key: "owner", header: "Owner", editable: true },
    { key: "closeDate", header: "Close", align: "right", editable: true },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Open Pipeline", value: total, format: "currency", icon: "DollarSign", iconColor: "#3b82f6" },
        { label: "Weighted Value", value: Math.round(weighted), format: "currency", icon: "Scale", iconColor: "#a855f7" },
        { label: "Won This Month", value: won, format: "currency", icon: "Trophy", iconColor: "#22c55e" },
        { label: "Open Deals", value: data.deals.filter((d) => d.stage !== "Won").length, format: "number", icon: "Briefcase", iconColor: "#f59e0b" },
      ]} />
      <BarChartCard title="Pipeline by Stage" data={byStage} xKey="stage" currency series={[{ key: "value", name: "Value", color: "#3b82f6" }]} />
      <DataTable title="All Deals" columns={columns} rows={data.deals} onEdit={onEdit} />
    </div>
  );
}
