"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import type { Client } from "@/lib/data";

export default function ClientsPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("clients");
  const active = data.clients.filter((c) => c.status === "Active").length;
  const mrr = data.clients.reduce((a, c) => a + c.mrr, 0);
  const avg = data.clients.length ? Math.round(mrr / data.clients.filter((c) => c.mrr > 0).length) : 0;

  const columns: Column<Client>[] = [
    { key: "name", header: "Client", editable: true },
    { key: "industry", header: "Industry", editable: true },
    { key: "status", header: "Status", render: (r) => <Badge label={r.status} /> },
    { key: "mrr", header: "MRR", align: "right", editable: true, format: "currency" },
    { key: "since", header: "Since", editable: true },
    { key: "owner", header: "Owner", editable: true },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Total Clients", value: data.clients.length, format: "number", icon: "Users", iconColor: "#3b82f6" },
        { label: "Active", value: active, format: "number", icon: "UserCheck", iconColor: "#22c55e" },
        { label: "Total MRR", value: mrr, format: "currency", icon: "DollarSign", iconColor: "#a855f7" },
        { label: "Avg MRR / Client", value: avg, format: "currency", icon: "BarChart3", iconColor: "#f59e0b" },
      ]} />
      <DataTable title="All Clients" columns={columns} rows={data.clients} onEdit={onEdit} />
    </div>
  );
}
