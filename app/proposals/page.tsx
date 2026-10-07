"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import type { Proposal } from "@/lib/data";

export default function ProposalsPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("proposals");
  const sent = data.proposals.filter((p) => p.status === "Sent").length;
  const won = data.proposals.filter((p) => p.status === "Won");
  const value = data.proposals.filter((p) => p.status === "Sent" || p.status === "Draft").reduce((a, p) => a + p.value, 0);
  const winRate = () => {
    const decided = data.proposals.filter((p) => p.status === "Won" || p.status === "Lost").length;
    return decided ? Math.round((won.length / decided) * 100) + "%" : "—";
  };

  const columns: Column<Proposal>[] = [
    { key: "title", header: "Proposal", editable: true },
    { key: "client", header: "Client", editable: true },
    { key: "value", header: "Value", align: "right", editable: true, format: "currency" },
    { key: "status", header: "Status", render: (r) => <Badge label={r.status} /> },
    { key: "sentDate", header: "Sent", align: "right", editable: true },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Out for Signature", value: sent, format: "number", icon: "FileText", iconColor: "#3b82f6" },
        { label: "Pipeline Value", value, format: "currency", icon: "DollarSign", iconColor: "#f59e0b" },
        { label: "Won", value: won.length, format: "number", icon: "Trophy", iconColor: "#22c55e" },
        { label: "Win Rate", value: winRate(), icon: "Percent", iconColor: "#a855f7" },
      ]} />
      <DataTable title="All Proposals" columns={columns} rows={data.proposals} onEdit={onEdit} />
    </div>
  );
}
