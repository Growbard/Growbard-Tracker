"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Icon from "@/components/Icon";
import type { HealthRow } from "@/lib/data";

function color(score: number) {
  if (score >= 85) return "#22c55e";
  if (score >= 70) return "#f59e0b";
  return "#f97316";
}

export default function ClientHealthPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("clientHealth");
  const avg = Math.round(data.clientHealth.reduce((a, c) => a + c.score, 0) / (data.clientHealth.length || 1));
  const healthy = data.clientHealth.filter((c) => c.score >= 85).length;
  const atRisk = data.clientHealth.filter((c) => c.score < 70).length;

  const columns: Column<HealthRow>[] = [
    { key: "name", header: "Client", render: (r) => (
      <span className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink-100 text-ink-500"><Icon name={r.icon} size={14} /></span>
        <span className="font-medium text-ink-900">{r.name}</span>
      </span>
    ) },
    { key: "score", header: "Score", align: "right", editable: true, format: "number", width: "90px" },
    { key: "score", header: "Health", render: (r) => (
      <div className="h-2 w-full max-w-[280px] overflow-hidden rounded-full bg-ink-100">
        <div className="h-full rounded-full" style={{ width: `${Math.min(r.score, 100)}%`, backgroundColor: color(r.score) }} />
      </div>
    ) },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Avg Health Score", value: avg, format: "number", icon: "HeartPulse", iconColor: "#ef4444" },
        { label: "Healthy (85+)", value: healthy, format: "number", icon: "ShieldCheck", iconColor: "#22c55e" },
        { label: "At Risk (<70)", value: atRisk, format: "number", icon: "AlertTriangle", iconColor: "#f97316" },
        { label: "Clients Tracked", value: data.clientHealth.length, format: "number", icon: "Users", iconColor: "#3b82f6" },
      ]} cols={4} />
      <DataTable title="Client Health Scores" columns={columns} rows={data.clientHealth} onEdit={onEdit} />
    </div>
  );
}
