"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import KpiRow from "@/components/ui/KpiRow";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import type { Task } from "@/lib/data";

export default function TasksPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("tasks");
  const todo = data.tasks.filter((t) => t.status === "To Do").length;
  const doing = data.tasks.filter((t) => t.status === "In Progress").length;
  const done = data.tasks.filter((t) => t.status === "Done").length;
  const high = data.tasks.filter((t) => t.priority === "High").length;

  const columns: Column<Task>[] = [
    { key: "title", header: "Task", editable: true },
    { key: "project", header: "Project", editable: true },
    { key: "assignee", header: "Assignee", editable: true },
    { key: "priority", header: "Priority", render: (r) => <Badge label={r.priority} /> },
    { key: "status", header: "Status", render: (r) => <Badge label={r.status} /> },
    { key: "due", header: "Due", align: "right", editable: true },
  ];

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "To Do", value: todo, format: "number", icon: "Circle", iconColor: "#64748b" },
        { label: "In Progress", value: doing, format: "number", icon: "Loader", iconColor: "#f59e0b" },
        { label: "Done", value: done, format: "number", icon: "CheckCircle2", iconColor: "#22c55e" },
        { label: "High Priority", value: high, format: "number", icon: "Flag", iconColor: "#ef4444" },
      ]} />
      <DataTable title="All Tasks" columns={columns} rows={data.tasks} onEdit={onEdit} />
    </div>
  );
}
