"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import type { Invoice } from "@/lib/data";

export default function InvoicesPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("invoices");
  const sum = (s: string) => data.invoices.filter((i) => i.status === s).reduce((a, i) => a + i.amount, 0);

  const columns: Column<Invoice>[] = [
    { key: "number", header: "Invoice #", editable: true },
    { key: "client", header: "Client", editable: true },
    { key: "amount", header: "Amount", align: "right", editable: true, format: "currency" },
    { key: "status", header: "Status", render: (r) => <Badge label={r.status} /> },
    { key: "issued", header: "Issued", editable: true },
    { key: "due", header: "Due", align: "right", editable: true },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Paid", value: sum("Paid"), format: "currency", icon: "CheckCircle2", iconColor: "#22c55e" },
        { label: "Pending", value: sum("Pending"), format: "currency", icon: "Clock", iconColor: "#f59e0b" },
        { label: "Overdue", value: sum("Overdue"), format: "currency", icon: "AlertTriangle", iconColor: "#ef4444" },
        { label: "Outstanding", value: sum("Pending") + sum("Overdue"), format: "currency", icon: "ReceiptText", iconColor: "#3b82f6" },
      ]} />
      <DataTable title="Invoices" columns={columns} rows={data.invoices} onEdit={onEdit} />
    </div>
  );
}
