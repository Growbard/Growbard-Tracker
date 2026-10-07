"use client";

import React from "react";
import { useStore } from "@/lib/store";
import Editable from "./Editable";
import Icon from "./Icon";
import { Card } from "./Card";

function scoreColor(score: number): string {
  if (score >= 85) return "#22c55e";
  if (score >= 70) return "#f59e0b";
  return "#f97316";
}

export default function ClientHealth() {
  const { data, setData } = useStore();

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-ink-900">Client Health</h3>
        <button className="text-[12px] font-medium text-brand-600 hover:underline">
          View All
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {data.clientHealth.map((c, i) => {
          const color = scoreColor(c.score);
          return (
            <div key={c.id} className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-ink-100 text-ink-500">
                <Icon name={c.icon} size={14} />
              </span>
              <span className="w-36 shrink-0 truncate text-[13px] text-ink-700">
                {c.name}
              </span>
              <span className="w-7 shrink-0 text-right text-[13px] font-semibold text-ink-900">
                <Editable
                  value={c.score}
                  type="number"
                  display={<span>{c.score}</span>}
                  onCommit={(raw) => {
                    const num = parseInt(raw, 10);
                    if (!isNaN(num))
                      setData((p) => {
                        const next = [...p.clientHealth];
                        next[i] = { ...next[i], score: num };
                        return { ...p, clientHealth: next };
                      });
                  }}
                />
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${Math.min(c.score, 100)}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
