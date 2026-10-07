"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { BarChartCard } from "@/components/ui/Charts";
import type { OutreachSeq } from "@/lib/data";

export default function OutreachPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("outreach");
  const sent = data.outreach.reduce((a, s) => a + s.sent, 0);
  const replied = data.outreach.reduce((a, s) => a + s.replied, 0);
  const booked = data.outreach.reduce((a, s) => a + s.booked, 0);
  const replyRate = sent ? ((replied / sent) * 100).toFixed(1) + "%" : "0%";

  const chart = data.outreach.map((s) => ({ name: s.name, Replied: s.replied, Booked: s.booked }));

  const columns: Column<OutreachSeq>[] = [
    { key: "name", header: "Sequence", editable: true },
    { key: "channel", header: "Channel", render: (r) => <Badge label={r.channel} color="blue" /> },
    { key: "sent", header: "Sent", align: "right", editable: true, format: "number" },
    { key: "opened", header: "Opened", align: "right", editable: true, format: "number" },
    { key: "replied", header: "Replied", align: "right", editable: true, format: "number" },
    { key: "booked", header: "Booked", align: "right", editable: true, format: "number" },
    { key: "sent", header: "Reply %", align: "right", render: (r) => <span>{r.sent ? ((r.replied / r.sent) * 100).toFixed(1) : 0}%</span> },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Messages Sent", value: sent, format: "number", icon: "Send", iconColor: "#3b82f6" },
        { label: "Replies", value: replied, format: "number", icon: "MessageSquare", iconColor: "#22c55e" },
        { label: "Reply Rate", value: replyRate, icon: "Percent", iconColor: "#a855f7" },
        { label: "Meetings Booked", value: booked, format: "number", icon: "CalendarCheck", iconColor: "#f59e0b" },
      ]} />
      <BarChartCard title="Replies & Meetings by Sequence" data={chart} xKey="name"
        series={[{ key: "Replied", name: "Replied", color: "#3b82f6" }, { key: "Booked", name: "Booked", color: "#22c55e" }]} />
      <DataTable title="Outreach Sequences" columns={columns} rows={data.outreach} onEdit={onEdit} />
    </div>
  );
}
