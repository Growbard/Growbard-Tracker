"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import type { ContentPiece } from "@/lib/data";

export default function ContentPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("content");
  const count = (s: string) => data.content.filter((c) => c.status === s).length;

  const columns: Column<ContentPiece>[] = [
    { key: "title", header: "Title", editable: true },
    { key: "type", header: "Type", render: (r) => <Badge label={r.type} color="purple" /> },
    { key: "client", header: "Client", editable: true },
    { key: "status", header: "Status", render: (r) => <Badge label={r.status} /> },
    { key: "author", header: "Author", editable: true },
    { key: "publishDate", header: "Publish", align: "right", editable: true },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Ideas", value: count("Idea"), format: "number", icon: "Lightbulb", iconColor: "#64748b" },
        { label: "Writing", value: count("Writing"), format: "number", icon: "PenLine", iconColor: "#f59e0b" },
        { label: "In Review", value: count("Review"), format: "number", icon: "Eye", iconColor: "#a855f7" },
        { label: "Published", value: count("Published"), format: "number", icon: "CheckCircle2", iconColor: "#22c55e" },
      ]} />
      <DataTable title="Content Pipeline" columns={columns} rows={data.content} onEdit={onEdit} />
    </div>
  );
}
