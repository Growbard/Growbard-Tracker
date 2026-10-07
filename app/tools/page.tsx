"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/format";
import type { Tool } from "@/lib/data";

export default function ToolsPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("tools");
  const monthly = data.tools.reduce((a, t) => a + (t.billing === "Monthly" ? t.cost : t.cost / 12), 0);
  const seats = data.tools.reduce((a, t) => a + t.seats, 0);

  const columns: Column<Tool>[] = [
    { key: "name", header: "Tool", editable: true },
    { key: "category", header: "Category", render: (r) => <Badge label={r.category} color="blue" /> },
    { key: "cost", header: "Cost", align: "right", editable: true, format: "currency" },
    { key: "billing", header: "Billing", render: (r) => <Badge label={r.billing} color="gray" /> },
    { key: "seats", header: "Seats", align: "right", editable: true, format: "number" },
    { key: "renewal", header: "Renews", align: "right", editable: true },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Monthly Cost", value: Math.round(monthly), format: "currency", icon: "Wrench", iconColor: "#3b82f6" },
        { label: "Annual Cost", value: Math.round(monthly * 12), format: "currency", icon: "CalendarClock", iconColor: "#a855f7" },
        { label: "Tools", value: data.tools.length, format: "number", icon: "LayoutGrid", iconColor: "#f59e0b" },
        { label: "Total Seats", value: seats, format: "number", icon: "Users", iconColor: "#22c55e" },
      ]} />
      <DataTable title="Tools & Subscriptions" columns={columns} rows={data.tools} onEdit={onEdit}
        footer={<span className="text-ink-500">Estimated {formatCurrency(Math.round(monthly))}/mo across {data.tools.length} subscriptions.</span>} />
    </div>
  );
}
