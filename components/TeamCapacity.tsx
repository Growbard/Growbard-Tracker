"use client";

import React from "react";
import { useStore } from "@/lib/store";
import Editable from "./Editable";
import { Card } from "./Card";

function loadColor(load: number): string {
  if (load > 100) return "#ef4444";
  if (load >= 85) return "#22c55e";
  if (load >= 70) return "#f59e0b";
  return "#22c55e";
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TeamCapacity() {
  const { data, setData } = useStore();

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-ink-900">Team Capacity</h3>
        <button className="text-[12px] font-medium text-brand-600 hover:underline">
          View All
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {data.teamCapacity.map((m, i) => {
          const color = loadColor(m.load);
          return (
            <div key={m.id} className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                style={{ backgroundColor: m.avatarColor }}
              >
                {initials(m.name)}
              </span>
              <span className="w-28 shrink-0 truncate text-[13px] text-ink-700">
                {m.name}
              </span>
              <span
                className="w-10 shrink-0 text-right text-[13px] font-semibold"
                style={{ color }}
              >
                <Editable
                  value={m.load}
                  type="number"
                  display={<span>{m.load}%</span>}
                  onCommit={(raw) => {
                    const num = parseInt(raw, 10);
                    if (!isNaN(num))
                      setData((p) => {
                        const next = [...p.teamCapacity];
                        next[i] = { ...next[i], load: num };
                        return { ...p, teamCapacity: next };
                      });
                  }}
                />
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${Math.min(m.load, 100)}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
