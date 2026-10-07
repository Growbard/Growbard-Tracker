"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import Editable from "./Editable";
import { Card } from "./Card";

export default function RevenueByChannel() {
  const { data, setData } = useStore();

  // Total revenue used in the center is driven by the "Revenue This Month"
  // stat so the donut and the KPI stay consistent.
  const totalRevenue =
    data.topStats.find((s) => s.id === "rev-month")?.value ?? 25600;

  const total = data.revenueByChannel.reduce((a, c) => a + c.value, 0) || 1;

  return (
    <Card className="p-5">
      <h3 className="text-[15px] font-semibold text-ink-900">Revenue by Channel</h3>

      <div className="mt-2 flex items-center gap-2">
        <div className="relative h-[180px] w-[180px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.revenueByChannel}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={82}
                paddingAngle={2}
                stroke="none"
              >
                {data.revenueByChannel.map((slice) => (
                  <Cell key={slice.id} fill={slice.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[18px] font-bold text-ink-900">
              {formatCurrency(totalRevenue)}
            </span>
            <span className="text-[11px] text-ink-400">Total Revenue</span>
          </div>
        </div>

        <div className="flex-1 space-y-1.5">
          {data.revenueByChannel.map((slice, i) => (
            <div key={slice.id} className="flex items-center gap-2 text-[12px]">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              <span className="flex-1 text-ink-700">{slice.name}</span>
              <span className="font-medium text-ink-900">
                <Editable
                  value={slice.value}
                  type="number"
                  display={<span>{Math.round((slice.value / total) * 100)}%</span>}
                  onCommit={(raw) => {
                    const num = parseFloat(raw);
                    if (!isNaN(num))
                      setData((p) => {
                        const next = [...p.revenueByChannel];
                        next[i] = { ...next[i], value: num };
                        return { ...p, revenueByChannel: next };
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
