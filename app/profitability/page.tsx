"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import { formatCurrency } from "@/lib/format";
import type { ClientProfitRow } from "@/lib/data";

export default function ProfitabilityPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("topClients");
  const rows = [...data.topClients].sort((a, b) => (b.revenue - b.cost) - (a.revenue - a.cost));
  const totalRev = rows.reduce((a, r) => a + r.revenue, 0);
  const totalCost = rows.reduce((a, r) => a + r.cost, 0);
  const totalProfit = totalRev - totalCost;
  const avgMargin = totalRev ? Math.round((totalProfit / totalRev) * 100) : 0;

  const marginColor = (m: number) => (m >= 60 ? "text-green-600" : m >= 45 ? "text-amber-600" : "text-red-500");

  const columns: Column<ClientProfitRow>[] = [
    { key: "client", header: "Client", editable: true },
    { key: "revenue", header: "Revenue", align: "right", editable: true, format: "currency" },
    { key: "cost", header: "Cost", align: "right", editable: true, format: "currency" },
    { key: "revenue", header: "Profit", align: "right", render: (r) => <span className="font-medium text-green-600">{formatCurrency(r.revenue - r.cost)}</span> },
    { key: "cost", header: "Margin", align: "right", render: (r) => {
      const m = r.revenue ? Math.round(((r.revenue - r.cost) / r.revenue) * 100) : 0;
      return <span className={`font-semibold ${marginColor(m)}`}>{m}%</span>;
    } },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Total Revenue", value: totalRev, format: "currency", icon: "DollarSign", iconColor: "#22c55e" },
        { label: "Total Cost", value: totalCost, format: "currency", icon: "CreditCard", iconColor: "#f59e0b" },
        { label: "Total Profit", value: totalProfit, format: "currency", icon: "PiggyBank", iconColor: "#3b82f6" },
        { label: "Avg Margin", value: avgMargin + "%", icon: "Percent", iconColor: "#a855f7" },
      ]} />
      <DataTable title="Client Profitability" columns={columns} rows={rows} onEdit={onEdit} />
    </div>
  );
}
