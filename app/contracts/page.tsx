"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import type { Contract } from "@/lib/data";

export default function ContractsPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("contracts");
  const active = data.contracts.filter((c) => c.status === "Active").length;
  const expiring = data.contracts.filter((c) => c.status === "Expiring").length;
  const tcv = data.contracts.filter((c) => c.status !== "Expired").reduce((a, c) => a + c.value, 0);

  const columns: Column<Contract>[] = [
    { key: "client", header: "Client", editable: true },
    { key: "type", header: "Type", render: (r) => <Badge label={r.type} color="blue" /> },
    { key: "value", header: "Value", align: "right", editable: true, format: "currency" },
    { key: "start", header: "Start", editable: true },
    { key: "end", header: "End", editable: true },
    { key: "status", header: "Status", render: (r) => <Badge label={r.status} /> },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Total Contract Value", value: tcv, format: "currency", icon: "FileSignature", iconColor: "#3b82f6" },
        { label: "Active", value: active, format: "number", icon: "CheckCircle2", iconColor: "#22c55e" },
        { label: "Expiring Soon", value: expiring, format: "number", icon: "Clock", iconColor: "#f59e0b" },
        { label: "Total Contracts", value: data.contracts.length, format: "number", icon: "Files", iconColor: "#a855f7" },
      ]} />
      <DataTable title="Contracts" columns={columns} rows={data.contracts} onEdit={onEdit} />
    </div>
  );
}
