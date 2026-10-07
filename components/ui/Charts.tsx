"use client";

import React from "react";
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { Card } from "../Card";

const axis = { fontSize: 11, fill: "#94a3b8" };
const tooltipStyle = { borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 };
const kfmt = (v: number) => (Math.abs(v) >= 1000 ? `${v / 1000}K` : `${v}`);

export function ChartCard({ title, right, children, height = 260 }: {
  title: string; right?: React.ReactNode; children: React.ReactNode; height?: number;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-ink-900">{title}</h3>
        {right}
      </div>
      <div className="mt-3" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export interface Series { key: string; name: string; color: string; }

export function BarChartCard<T,>({
  title, data, xKey, series, right, currency, height,
}: { title: string; data: T[]; xKey: string; series: Series[]; right?: React.ReactNode; currency?: boolean; height?: number }) {
  return (
    <ChartCard title={title} right={right} height={height}>
      <BarChart data={data} margin={{ top: 10, right: 0, bottom: 0, left: -12 }} barGap={3}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey={xKey} tick={axis} axisLine={false} tickLine={false} />
        <YAxis tick={axis} axisLine={false} tickLine={false} tickFormatter={kfmt} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => (currency ? "$" + v.toLocaleString() : v.toLocaleString())} cursor={{ fill: "#f8fafc" }} />
        {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {series.map((s) => (
          <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color} radius={[3, 3, 0, 0]} maxBarSize={28} />
        ))}
      </BarChart>
    </ChartCard>
  );
}

export function LineChartCard<T,>({
  title, data, xKey, series, right, currency, height,
}: { title: string; data: T[]; xKey: string; series: Series[]; right?: React.ReactNode; currency?: boolean; height?: number }) {
  return (
    <ChartCard title={title} right={right} height={height}>
      <LineChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -12 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey={xKey} tick={axis} axisLine={false} tickLine={false} />
        <YAxis tick={axis} axisLine={false} tickLine={false} tickFormatter={kfmt} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => (currency ? "$" + v.toLocaleString() : v.toLocaleString())} />
        {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {series.map((s) => (
          <Line key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color} strokeWidth={2} dot={false} />
        ))}
      </LineChart>
    </ChartCard>
  );
}

export function AreaChartCard<T,>({
  title, data, xKey, series, right, currency, height,
}: { title: string; data: T[]; xKey: string; series: Series[]; right?: React.ReactNode; currency?: boolean; height?: number }) {
  return (
    <ChartCard title={title} right={right} height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -12 }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`g-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey={xKey} tick={axis} axisLine={false} tickLine={false} />
        <YAxis tick={axis} axisLine={false} tickLine={false} tickFormatter={kfmt} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => (currency ? "$" + v.toLocaleString() : v.toLocaleString())} />
        {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {series.map((s) => (
          <Area key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color} strokeWidth={2} fill={`url(#g-${s.key})`} />
        ))}
      </AreaChart>
    </ChartCard>
  );
}

export function DonutCard({
  title, data, centerLabel, centerValue, right, height = 260,
}: {
  title: string;
  data: { id: string; name: string; value: number; color: string }[];
  centerLabel?: string; centerValue?: string; right?: React.ReactNode; height?: number;
}) {
  const total = data.reduce((a, d) => a + d.value, 0) || 1;
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-ink-900">{title}</h3>
        {right}
      </div>
      <div className="mt-2 flex items-center gap-4">
        <div className="relative" style={{ width: 170, height }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={54} outerRadius={78} paddingAngle={2} stroke="none">
                {data.map((d) => <Cell key={d.id} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => v.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
          {centerValue && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[16px] font-bold text-ink-900">{centerValue}</span>
              {centerLabel && <span className="text-[11px] text-ink-400">{centerLabel}</span>}
            </div>
          )}
        </div>
        <div className="flex-1 space-y-1.5">
          {data.map((d) => (
            <div key={d.id} className="flex items-center gap-2 text-[12px]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="flex-1 text-ink-700">{d.name}</span>
              <span className="font-medium text-ink-900">{Math.round((d.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
