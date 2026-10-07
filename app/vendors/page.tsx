"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import type { Vendor } from "@/lib/data";

export default function VendorsPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("vendors");
  const active = data.vendors.filter((v) => v.status === "Active");
  const monthly = active.reduce((a, v) => a + v.monthlyCost, 0);

  const columns: Column<Vendor>[] = [
    { key: "name", header: "Vendor", editable: true },
    { key: "service", header: "Service", editable: true },
    { key: "monthlyCost", header: "Monthly", align: "right", editable: true, format: "currency" },
    { key: "contact", header: "Contact", editable: true },
    { key: "status", header: "Status", render: (r) => <Badge label={r.status} /> },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Active Vendors", value: active.length, format: "number", icon: "Truck", iconColor: "#3b82f6" },
        { label: "Monthly Spend", value: monthly, format: "currency", icon: "Wallet", iconColor: "#f59e0b" },
        { label: "Annual Spend", value: monthly * 12, format: "currency", icon: "CalendarClock", iconColor: "#a855f7" },
        { label: "Total Vendors", value: data.vendors.length, format: "number", icon: "Building", iconColor: "#22c55e" },
      ]} />
      <DataTable title="Vendors" columns={columns} rows={data.vendors} onEdit={onEdit} />
    </div>
  );
}
