"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/Icon";
import type { Doc } from "@/lib/data";

export default function DocsPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("docs");
  const categories = new Set(data.docs.map((d) => d.category)).size;

  const columns: Column<Doc>[] = [
    { key: "title", header: "Document", render: (r) => (
      <span className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink-100 text-ink-500"><Icon name="FileText" size={14} /></span>
        <span className="font-medium text-ink-900">{r.title}</span>
      </span>
    ) },
    { key: "category", header: "Category", render: (r) => <Badge label={r.category} color="blue" /> },
    { key: "owner", header: "Owner", editable: true },
    { key: "updated", header: "Updated", align: "right", editable: true },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Documents", value: data.docs.length, format: "number", icon: "BookText", iconColor: "#3b82f6" },
        { label: "Categories", value: categories, format: "number", icon: "FolderTree", iconColor: "#a855f7" },
        { label: "SOPs", value: data.docs.filter((d) => d.title.toLowerCase().includes("sop") || d.category === "Onboarding").length, format: "number", icon: "ClipboardList", iconColor: "#f59e0b" },
        { label: "Owners", value: new Set(data.docs.map((d) => d.owner)).size, format: "number", icon: "Users", iconColor: "#22c55e" },
      ]} />
      <DataTable title="SOPs & Documents" columns={columns} rows={data.docs} onEdit={onEdit} />
    </div>
  );
}
