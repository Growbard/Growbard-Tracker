"use client";

import React from "react";
import { Card } from "../Card";
import Icon from "../Icon";
import { formatValue } from "@/lib/format";
import type { Fmt } from "@/lib/data";

export interface Kpi {
  label: string;
  value: number | string;
  format?: Fmt;
  icon?: string;
  iconColor?: string;
  hint?: string;
}

export default function KpiRow({ items, cols = 4 }: { items: Kpi[]; cols?: number }) {
  const gridCols =
    cols === 5 ? "xl:grid-cols-5" : cols === 3 ? "xl:grid-cols-3" : cols === 6 ? "xl:grid-cols-6" : "xl:grid-cols-4";
  return (
    <div className={`grid grid-cols-2 gap-4 md:grid-cols-4 ${gridCols}`}>
      {items.map((k, i) => (
        <Card key={i} className="px-4 py-3.5">
          <div className="flex items-start justify-between">
            <span className="text-[12px] font-medium text-ink-500">{k.label}</span>
            {k.icon && <Icon name={k.icon} size={15} color={k.iconColor || "#64748b"} />}
          </div>
          <div className="mt-1.5 text-[22px] font-bold leading-none text-ink-900">
            {typeof k.value === "number" && k.format ? formatValue(k.value, k.format) : k.value}
          </div>
          {k.hint && <div className="mt-1.5 text-[12px] text-ink-400">{k.hint}</div>}
        </Card>
      ))}
    </div>
  );
}
