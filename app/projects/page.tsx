"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { DonutCard } from "@/components/ui/Charts";
import { formatCurrency } from "@/lib/format";
import type { Project } from "@/lib/data";

export default function ProjectsPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("projects");
  const active = data.projects.filter((p) => p.status !== "Completed").length;
  const budget = data.projects.reduce((a, p) => a + p.budget, 0);
  const spent = data.projects.reduce((a, p) => a + p.spent, 0);

  const donut = data.projectStatus.map((s) => ({ id: s.id, name: s.name, value: s.count, color: s.color }));

  const columns: Column<Project>[] = [
    { key: "name", header: "Project", editable: true },
    { key: "client", header: "Client", editable: true },
    { key: "status", header: "Status", render: (r) => <Badge label={r.status} /> },
    { key: "progress", header: "Progress", render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-2 w-24 overflow-hidden rounded-full bg-ink-100">
          <div className="h-full rounded-full bg-brand-500" style={{ width: `${r.progress}%` }} />
        </div>
        <span className="text-ink-500">{r.progress}%</span>
      </div>
    ) },
    { key: "budget", header: "Budget", align: "right", editable: true, format: "currency" },
    { key: "spent", header: "Spent", align: "right", editable: true, format: "currency" },
    { key: "due", header: "Due", align: "right", editable: true },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Active Projects", value: active, format: "number", icon: "FolderKanban", iconColor: "#3b82f6" },
        { label: "Total Budget", value: budget, format: "currency", icon: "Wallet", iconColor: "#a855f7" },
        { label: "Spent", value: spent, format: "currency", icon: "CreditCard", iconColor: "#f59e0b" },
        { label: "Budget Remaining", value: budget - spent, format: "currency", icon: "PiggyBank", iconColor: "#22c55e" },
      ]} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <DonutCard title="By Status" data={donut} centerValue={String(data.projects.length)} centerLabel="Projects" />
        <div className="lg:col-span-2">
          <DataTable title="All Projects" columns={columns} rows={data.projects} onEdit={onEdit}
            footer={<span className="text-ink-500">Total spent {formatCurrency(spent)} of {formatCurrency(budget)} budgeted.</span>} />
        </div>
      </div>
    </div>
  );
}
