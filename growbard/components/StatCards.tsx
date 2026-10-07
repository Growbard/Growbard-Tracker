"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatValue } from "@/lib/format";
import Editable from "./Editable";
import Icon from "./Icon";
import { Card } from "./Card";

export default function StatCards() {
  const { data, setData } = useStore();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {data.topStats.map((s, i) => {
        const chartData = s.spark.map((v, idx) => ({ i: idx, v }));
        const gradId = `grad-${s.id}`;
        return (
          <Card key={s.id} className="px-4 pb-3 pt-3.5">
            <div className="flex items-start justify-between">
              <span className="text-[12px] font-medium text-ink-500">
                {s.label}
              </span>
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ backgroundColor: s.accent + "1a", color: s.accent }}
              >
                <Icon name={s.icon} size={15} />
              </span>
            </div>

            <div className="mt-1.5 text-[26px] font-bold leading-none text-ink-900">
              <Editable
                value={s.value}
                type="number"
                display={<span>{formatValue(s.value, s.format)}</span>}
                onCommit={(raw) => {
                  const num = parseFloat(raw);
                  if (!isNaN(num))
                    setData((p) => {
                      const next = [...p.topStats];
                      next[i] = { ...next[i], value: num };
                      return { ...p, topStats: next };
                    });
                }}
              />
            </div>

            <div className="mt-2 flex items-end justify-between">
              <div
                className={`flex items-center gap-0.5 text-[12px] font-medium ${
                  s.trend === "up" ? "text-green-600" : "text-red-500"
                }`}
              >
                {s.trend === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                <Editable
                  value={s.changePct}
                  type="number"
                  display={<span>{s.changePct}%</span>}
                  onCommit={(raw) => {
                    const num = parseFloat(raw);
                    if (!isNaN(num))
                      setData((p) => {
                        const next = [...p.topStats];
                        next[i] = { ...next[i], changePct: num };
                        return { ...p, topStats: next };
                      });
                  }}
                />
              </div>

              <div className="h-8 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={s.accent} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={s.accent} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={s.accent}
                      strokeWidth={1.75}
                      fill={`url(#${gradId})`}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
