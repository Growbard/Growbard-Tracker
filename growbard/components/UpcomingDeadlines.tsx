"use client";

import React from "react";
import { useStore } from "@/lib/store";
import Icon from "./Icon";
import { Card } from "./Card";

const priorityStyles: Record<string, string> = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-amber-100 text-amber-600",
  Low: "bg-green-100 text-green-600",
};

export default function UpcomingDeadlines() {
  const { data } = useStore();

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-ink-900">
          Upcoming Deadlines
        </h3>
        <button className="text-[12px] font-medium text-brand-600 hover:underline">
          View All
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {data.upcomingDeadlines.map((d) => (
          <div key={d.id} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink-100 text-ink-500">
              <Icon name={d.icon} size={15} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium text-ink-900">
                {d.title}
              </div>
              <div className="truncate text-[12px] text-ink-500">{d.client}</div>
            </div>
            <span className="shrink-0 text-[12px] text-ink-500">{d.date}</span>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                priorityStyles[d.priority]
              }`}
            >
              {d.priority}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
