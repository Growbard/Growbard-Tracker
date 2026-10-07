"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import { AreaChartCard } from "@/components/ui/Charts";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { Keyword } from "@/lib/data";

export default function SeoPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("keywords");
  const latest = data.seoTraffic[data.seoTraffic.length - 1]?.organic ?? 0;
  const prev = data.seoTraffic[data.seoTraffic.length - 2]?.organic ?? latest;
  const growth = prev ? Math.round(((latest - prev) / prev) * 100) : 0;
  const top10 = data.keywords.filter((k) => k.position <= 10).length;
  const avgPos = (data.keywords.reduce((a, k) => a + k.position, 0) / (data.keywords.length || 1)).toFixed(1);

  const columns: Column<Keyword>[] = [
    { key: "keyword", header: "Keyword", editable: true },
    { key: "client", header: "Client", editable: true },
    { key: "position", header: "Position", align: "right", editable: true, format: "number" },
    { key: "volume", header: "Volume", align: "right", editable: true, format: "number" },
    { key: "change", header: "Change", align: "right", render: (r) => (
      <span className={`inline-flex items-center gap-0.5 font-medium ${r.change >= 0 ? "text-green-600" : "text-red-500"}`}>
        {r.change >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{Math.abs(r.change)}
      </span>
    ) },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Organic Traffic", value: latest, format: "number", icon: "Globe", iconColor: "#3b82f6" },
        { label: "MoM Growth", value: growth + "%", icon: "TrendingUp", iconColor: "#22c55e" },
        { label: "Keywords in Top 10", value: top10, format: "number", icon: "Target", iconColor: "#a855f7" },
        { label: "Avg Position", value: avgPos, icon: "Hash", iconColor: "#f59e0b" },
      ]} />
      <AreaChartCard title="Organic Traffic" data={data.seoTraffic} xKey="month" series={[{ key: "organic", name: "Organic Sessions", color: "#3b82f6" }]} />
      <DataTable title="Tracked Keywords" columns={columns} rows={data.keywords} onEdit={onEdit} />
    </div>
  );
}
