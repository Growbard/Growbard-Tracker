"use client";

import { useStore } from "@/lib/store";
import KpiRow from "@/components/ui/KpiRow";
import { BarChartCard, LineChartCard } from "@/components/ui/Charts";

export default function CashFlowPage() {
  const { data } = useStore();
  const cf = data.cashFlow;
  const last = cf[cf.length - 1] || { inflow: 0, outflow: 0, balance: 0 };
  const netThis = last.inflow - last.outflow;
  const totalIn = cf.reduce((a, c) => a + c.inflow, 0);
  const totalOut = cf.reduce((a, c) => a + c.outflow, 0);

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Cash Balance", value: last.balance, format: "currency", icon: "Landmark", iconColor: "#22c55e" },
        { label: "Net Cash This Month", value: netThis, format: "currency", icon: "TrendingUp", iconColor: netThis >= 0 ? "#22c55e" : "#ef4444" },
        { label: "Total Inflow", value: totalIn, format: "currency", icon: "ArrowDownCircle", iconColor: "#3b82f6" },
        { label: "Total Outflow", value: totalOut, format: "currency", icon: "ArrowUpCircle", iconColor: "#f59e0b" },
      ]} />
      <BarChartCard title="Inflow vs Outflow" data={cf} xKey="month" currency series={[
        { key: "inflow", name: "Inflow", color: "#22c55e" },
        { key: "outflow", name: "Outflow", color: "#f87171" },
      ]} />
      <LineChartCard title="Running Balance" data={cf} xKey="month" currency series={[{ key: "balance", name: "Balance", color: "#3b82f6" }]} />
    </div>
  );
}
