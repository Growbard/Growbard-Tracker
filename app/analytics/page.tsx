"use client";

import { useStore } from "@/lib/store";
import KpiRow from "@/components/ui/KpiRow";
import { AreaChartCard, DonutCard } from "@/components/ui/Charts";

export default function AnalyticsPage() {
  const { data } = useStore();
  const t = data.analyticsTraffic;
  const last = t[t.length - 1] || { organic: 0, paid: 0, social: 0, direct: 0 };
  const totalLast = last.organic + last.paid + last.social + last.direct;
  const prev = t[t.length - 2] || last;
  const totalPrev = prev.organic + prev.paid + prev.social + prev.direct;
  const growth = totalPrev ? Math.round(((totalLast - totalPrev) / totalPrev) * 100) : 0;

  const donut = [
    { id: "organic", name: "Organic", value: last.organic, color: "#3b82f6" },
    { id: "paid", name: "Paid", value: last.paid, color: "#22c55e" },
    { id: "social", name: "Social", value: last.social, color: "#f59e0b" },
    { id: "direct", name: "Direct", value: last.direct, color: "#a855f7" },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Total Sessions", value: totalLast, format: "number", icon: "BarChart3", iconColor: "#3b82f6" },
        { label: "MoM Growth", value: growth + "%", icon: "TrendingUp", iconColor: "#22c55e" },
        { label: "Organic Share", value: Math.round((last.organic / (totalLast || 1)) * 100) + "%", icon: "Globe", iconColor: "#a855f7" },
        { label: "Paid Share", value: Math.round((last.paid / (totalLast || 1)) * 100) + "%", icon: "Megaphone", iconColor: "#f59e0b" },
      ]} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AreaChartCard title="Traffic by Source" data={t} xKey="month" series={[
            { key: "organic", name: "Organic", color: "#3b82f6" },
            { key: "paid", name: "Paid", color: "#22c55e" },
            { key: "social", name: "Social", color: "#f59e0b" },
            { key: "direct", name: "Direct", color: "#a855f7" },
          ]} />
        </div>
        <DonutCard title="This Month's Mix" data={donut} centerValue={totalLast.toLocaleString()} centerLabel="Sessions" />
      </div>
    </div>
  );
}
