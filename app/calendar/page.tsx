"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/Card";
import KpiRow from "@/components/ui/KpiRow";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function CalendarPage() {
  const { data } = useStore();
  // default to Oct 2024 (where the seed events live)
  const [cursor, setCursor] = useState(new Date(2024, 9, 1));
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  const eventsFor = (d: number) => {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    return data.calendar.filter((e) => e.date === key);
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);

  const monthEvents = data.calendar.filter((e) => e.date.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`));

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Events This Month", value: monthEvents.length, format: "number", icon: "CalendarDays", iconColor: "#3b82f6" },
        { label: "Meetings", value: monthEvents.filter((e) => e.type === "Meeting").length, format: "number", icon: "Users", iconColor: "#22c55e" },
        { label: "Deadlines", value: monthEvents.filter((e) => e.type === "Deadline").length, format: "number", icon: "AlertTriangle", iconColor: "#ef4444" },
        { label: "Tasks", value: monthEvents.filter((e) => e.type === "Task").length, format: "number", icon: "ListTodo", iconColor: "#f59e0b" },
      ]} />
      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-ink-900">{MONTHS[month]} {year}</h3>
          <div className="flex gap-1">
            <button onClick={() => setCursor(new Date(year, month - 1, 1))} className="rounded-md border border-ink-200 p-1.5 text-ink-500 hover:bg-ink-50"><ChevronLeft size={16} /></button>
            <button onClick={() => setCursor(new Date(year, month + 1, 1))} className="rounded-md border border-ink-200 p-1.5 text-ink-500 hover:bg-ink-50"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase text-ink-400">
          {WD.map((d) => <div key={d} className="py-1">{d}</div>)}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((d, i) => (
            <div key={i} className={`min-h-[84px] rounded-lg border p-1.5 ${d ? "border-ink-100 bg-white" : "border-transparent"}`}>
              {d && <div className="mb-1 text-[11px] font-medium text-ink-400">{d}</div>}
              <div className="space-y-1">
                {d && eventsFor(d).map((e) => (
                  <div key={e.id} className="truncate rounded px-1.5 py-0.5 text-[10px] font-medium text-white" style={{ backgroundColor: e.color }} title={e.title}>
                    {e.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
