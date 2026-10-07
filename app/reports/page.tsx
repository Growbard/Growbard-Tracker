"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import type { Report } from "@/lib/data";

export default function ReportsPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("reports");

  const columns: Column<Report>[] = [
    { key: "name", header: "Report", editable: true },
    { key: "type", header: "Type", render: (r) => <Badge label={r.type} color="blue" /> },
    { key: "period", header: "Cadence", render: (r) => <Badge label={r.period} color="gray" /> },
    { key: "lastRun", header: "Last Run", align: "right", editable: true },
    { key: "id", header: "", align: "right", render: () => <button className="rounded-md border border-ink-200 px-2.5 py-1 text-[12px] text-ink-600 hover:bg-ink-50">Run</button> },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Saved Reports", value: data.reports.length, format: "number", icon: "FileBarChart", iconColor: "#3b82f6" },
        { label: "Weekly", value: data.reports.filter((r) => r.period === "Weekly").length, format: "number", icon: "CalendarDays", iconColor: "#f59e0b" },
        { label: "Monthly", value: data.reports.filter((r) => r.period === "Monthly").length, format: "number", icon: "CalendarClock", iconColor: "#a855f7" },
        { label: "Report Types", value: new Set(data.reports.map((r) => r.type)).size, format: "number", icon: "Layers", iconColor: "#22c55e" },
      ]} />
      <DataTable title="Reports" columns={columns} rows={data.reports} onEdit={onEdit} />
    </div>
  );
}
