"use client";

import React from "react";
import { useStore } from "@/lib/store";
import Icon from "./Icon";
import { Card } from "./Card";

export default function RecentActivity() {
  const { data } = useStore();

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-ink-900">Recent Activity</h3>
        <button className="text-[12px] font-medium text-brand-600 hover:underline">
          View All
        </button>
      </div>

      <div className="mt-3 space-y-3.5">
        {data.recentActivity.map((a) => (
          <div key={a.id} className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: a.color + "1a", color: a.color }}
            >
              <Icon name={a.type} size={15} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium text-ink-900">
                {a.title}
              </div>
              <div className="truncate text-[12px] text-ink-500">{a.subject}</div>
            </div>
            <span className="shrink-0 text-[11px] text-ink-400">{a.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
