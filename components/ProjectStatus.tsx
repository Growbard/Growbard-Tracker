"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useStore } from "@/lib/store";
import Editable from "./Editable";
import { Card } from "./Card";

export default function ProjectStatus() {
  const { data, setData } = useStore();
  const total = data.projectStatus.reduce((a, s) => a + s.count, 0);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-ink-900">Project Status</h3>
        <button className="text-[12px] font-medium text-brand-600 hover:underline">
          View All
        </button>
      </div>

      <div className="mt-2 flex items-center gap-4">
        <div className="relative h-[140px] w-[140px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.projectStatus}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={44}
                outerRadius={64}
                paddingAngle={2}
                stroke="none"
              >
                {data.projectStatus.map((s) => (
                  <Cell key={s.id} fill={s.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[22px] font-bold text-ink-900">{total}</span>
            <span className="text-[11px] text-ink-400">Projects</span>
          </div>
        </div>

        <div className="flex-1 space-y-2.5">
          {data.projectStatus.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 text-[13px]">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="flex-1 text-ink-700">{s.name}</span>
              <span className="font-semibold text-ink-900">
                <Editable
                  value={s.count}
                  type="number"
                  display={<span>{s.count}</span>}
                  onCommit={(raw) => {
                    const num = parseInt(raw, 10);
                    if (!isNaN(num))
                      setData((p) => {
                        const next = [...p.projectStatus];
                        next[i] = { ...next[i], count: num };
                        return { ...p, projectStatus: next };
                      });
                  }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
