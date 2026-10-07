"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useStore } from "@/lib/store";
import { Card } from "./Card";

export default function RevenueExpenses() {
  const { data } = useStore();

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-ink-900">
          Revenue vs Expenses
        </h3>
        <div className="rounded-md border border-ink-200 px-2.5 py-1 text-[12px] text-ink-500">
          Last 12 months ▾
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 text-[12px] text-ink-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" /> Revenue
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" /> Expenses
        </span>
      </div>

      <div className="mt-2 h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data.revenueVsExpenses}
            margin={{ top: 10, right: 0, bottom: 0, left: -18 }}
            barGap={3}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}K`)}
            />
            <Tooltip
              cursor={{ fill: "#f8fafc" }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 12,
              }}
              formatter={(v: number) => "$" + v.toLocaleString()}
            />
            <Bar dataKey="revenue" fill="#22c55e" radius={[3, 3, 0, 0]} maxBarSize={14} />
            <Bar dataKey="expenses" fill="#f87171" radius={[3, 3, 0, 0]} maxBarSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
