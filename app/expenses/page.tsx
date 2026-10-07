"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { DonutCard } from "@/components/ui/Charts";
import { formatCurrency } from "@/lib/format";
import type { Expense } from "@/lib/data";

const CAT_COLORS: Record<string, string> = {
  Payroll: "#3b82f6", "Paid Ads": "#22c55e", Software: "#a855f7",
  Contractors: "#f59e0b", Office: "#06b6d4", Other: "#94a3b8",
};

export default function ExpensesPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("expenses");
  const total = data.expenses.reduce((a, e) => a + e.amount, 0);
  const recurring = data.expenses.filter((e) => e.recurring).reduce((a, e) => a + e.amount, 0);

  const byCat = Object.values(
    data.expenses.reduce<Record<string, { id: string; name: string; value: number; color: string }>>((acc, e) => {
      acc[e.category] = acc[e.category] || { id: e.category, name: e.category, value: 0, color: CAT_COLORS[e.category] || "#94a3b8" };
      acc[e.category].value += e.amount;
      return acc;
    }, {})
  );

  const columns: Column<Expense>[] = [
    { key: "category", header: "Category", render: (r) => <Badge label={r.category} color="blue" /> },
    { key: "vendor", header: "Vendor / Note", editable: true },
    { key: "amount", header: "Amount", align: "right", editable: true, format: "currency" },
    { key: "recurring", header: "Recurring", align: "center", render: (r) => <Badge label={r.recurring ? "Recurring" : "One-off"} color={r.recurring ? "purple" : "gray"} /> },
    { key: "date", header: "Date", align: "right", editable: true },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Total Expenses", value: total, format: "currency", icon: "Wallet", iconColor: "#ef4444" },
        { label: "Recurring / mo", value: recurring, format: "currency", icon: "Repeat", iconColor: "#f59e0b" },
        { label: "One-off", value: total - recurring, format: "currency", icon: "Receipt", iconColor: "#a855f7" },
        { label: "Line Items", value: data.expenses.length, format: "number", icon: "List", iconColor: "#3b82f6" },
      ]} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <DonutCard title="By Category" data={byCat} centerValue={formatCurrency(total)} centerLabel="Total" />
        <div className="lg:col-span-2">
          <DataTable title="All Expenses" columns={columns} rows={data.expenses} onEdit={onEdit} />
        </div>
      </div>
    </div>
  );
}
