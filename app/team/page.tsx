"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import type { TeamMember } from "@/lib/data";

function loadColor(load: number) {
  if (load > 100) return "#ef4444";
  if (load >= 85) return "#22c55e";
  if (load >= 70) return "#f59e0b";
  return "#22c55e";
}
function initials(n: string) { return n.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase(); }

export default function TeamPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("team");
  const avgLoad = Math.round(data.team.reduce((a, m) => a + m.load, 0) / (data.team.length || 1));
  const billable = data.team.reduce((a, m) => a + m.billableHours, 0);
  const capacity = data.team.reduce((a, m) => a + m.capacityHours, 0);
  const over = data.team.filter((m) => m.load > 100).length;

  const columns: Column<TeamMember>[] = [
    { key: "name", header: "Member", render: (r) => (
      <span className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold text-white" style={{ backgroundColor: r.avatarColor }}>{initials(r.name)}</span>
        <span className="font-medium text-ink-900">{r.name}</span>
      </span>
    ) },
    { key: "role", header: "Role", editable: true },
    { key: "billableHours", header: "Billable", align: "right", editable: true, format: "number" },
    { key: "capacityHours", header: "Capacity", align: "right", editable: true, format: "number" },
    { key: "load", header: "Utilization", render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-2 w-28 overflow-hidden rounded-full bg-ink-100">
          <div className="h-full rounded-full" style={{ width: `${Math.min(r.load, 100)}%`, backgroundColor: loadColor(r.load) }} />
        </div>
        <span className="font-medium" style={{ color: loadColor(r.load) }}>{r.load}%</span>
      </div>
    ) },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Team Members", value: data.team.length, format: "number", icon: "UsersRound", iconColor: "#3b82f6" },
        { label: "Avg Utilization", value: avgLoad + "%", icon: "Gauge", iconColor: "#a855f7" },
        { label: "Billable / Capacity", value: `${billable} / ${capacity}h`, icon: "Clock", iconColor: "#22c55e" },
        { label: "Over Capacity", value: over, format: "number", icon: "AlertTriangle", iconColor: "#ef4444" },
      ]} />
      <DataTable title="Team & Capacity" columns={columns} rows={data.team} onEdit={onEdit} />
    </div>
  );
}
