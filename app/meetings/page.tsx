"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import type { Meeting } from "@/lib/data";

export default function MeetingsPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("meetings");
  const byType = (t: string) => data.meetings.filter((m) => m.type === t).length;

  const columns: Column<Meeting>[] = [
    { key: "title", header: "Meeting", editable: true },
    { key: "client", header: "Client", editable: true },
    { key: "type", header: "Type", render: (r) => <Badge label={r.type} color={r.type === "Sales" ? "blue" : r.type === "Client" ? "green" : "purple"} /> },
    { key: "date", header: "Date", editable: true },
    { key: "time", header: "Time", editable: true },
    { key: "owner", header: "Owner", editable: true },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Upcoming", value: data.meetings.length, format: "number", icon: "Calendar", iconColor: "#3b82f6" },
        { label: "Sales Calls", value: byType("Sales"), format: "number", icon: "PhoneCall", iconColor: "#a855f7" },
        { label: "Client Reviews", value: byType("Client"), format: "number", icon: "Users", iconColor: "#22c55e" },
        { label: "Onboarding", value: byType("Onboarding"), format: "number", icon: "UserPlus", iconColor: "#f59e0b" },
      ]} />
      <DataTable title="Upcoming Meetings" columns={columns} rows={data.meetings} onEdit={onEdit} />
    </div>
  );
}
