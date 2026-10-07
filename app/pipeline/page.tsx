"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { ChevronRight, Plus } from "lucide-react";
import type { Deal } from "@/lib/data";

function newDeal(): Deal {
  const id = "dl" + Date.now();
  return {
    id, name: "New opportunity", client: "New Prospect", owner: "",
    stage: "New Leads", channel: "Cold Email", value: 0, probability: 10, closeDate: "",
    targetStage: "Qualified", contactName: "", email: "", phone: "", website: "",
    conversationStatus: "Not Started", meetingStatus: "Not Scheduled", closeStatus: "Open",
    nextStep: "", notes: "", activities: [],
  };
}

export default function PipelinePage() {
  const { data, setData } = useStore();
  const router = useRouter();
  const total = data.deals.reduce((a, d) => a + d.value, 0);
  const weighted = data.deals.reduce((a, d) => a + (d.value * d.probability) / 100, 0);
  const won = data.deals.filter((d) => d.closeStatus === "Won").reduce((a, d) => a + d.value, 0);

  const addProspect = () => {
    const d = newDeal();
    setData((p) => ({ ...p, deals: [d, ...p.deals] }));
    router.push(`/pipeline/${d.id}`);
  };

  const columns: Column<Deal>[] = [
    { key: "owner", header: "Owner", render: (r) => <span className="font-medium text-ink-900">{r.owner || <span className="text-ink-300">Unassigned</span>}</span> },
    { key: "client", header: "Client" },
    { key: "stage", header: "Stage", render: (r) => <Badge label={r.stage} /> },
    { key: "channel", header: "Channel", render: (r) => <Badge label={r.channel} color="blue" /> },
    { key: "id", header: "", align: "right", width: "40px", render: () => <ChevronRight size={16} className="text-ink-300" /> },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Open Pipeline", value: total, format: "currency", icon: "DollarSign", iconColor: "#3b82f6" },
        { label: "Weighted Value", value: Math.round(weighted), format: "currency", icon: "Scale", iconColor: "#a855f7" },
        { label: "Won This Month", value: won, format: "currency", icon: "Trophy", iconColor: "#22c55e" },
        { label: "Open Deals", value: data.deals.filter((d) => d.closeStatus === "Open").length, format: "number", icon: "Briefcase", iconColor: "#f59e0b" },
      ]} />
      <DataTable
        title="All Deals"
        columns={columns}
        rows={data.deals}
        onRowClick={(r) => router.push(`/pipeline/${r.id}`)}
        right={
          <button onClick={addProspect}
            className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-[13px] font-medium text-white hover:bg-brand-700">
            <Plus size={15} /> New Prospect
          </button>
        }
        footer={<span className="text-ink-500">Click any prospect to open their full profile.</span>}
      />
    </div>
  );
}
