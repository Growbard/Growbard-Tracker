"use client";

import React from "react";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import Editable from "./Editable";
import { Card } from "./Card";

export default function TopClients() {
  const { data, setData } = useStore();

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-ink-900">
          Top Clients by Profitability
        </h3>
        <div className="rounded-md border border-ink-200 px-2.5 py-1 text-[12px] text-ink-500">
          This Month ▾
        </div>
      </div>

      <table className="mt-3 w-full text-[13px]">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-ink-400">
            <th className="pb-2 font-medium">Client</th>
            <th className="pb-2 text-right font-medium">Revenue</th>
            <th className="pb-2 text-right font-medium">Cost</th>
            <th className="pb-2 text-right font-medium">Profit</th>
            <th className="pb-2 text-right font-medium">Margin</th>
          </tr>
        </thead>
        <tbody>
          {data.topClients.map((c, i) => {
            const profit = c.revenue - c.cost;
            const margin = c.revenue > 0 ? Math.round((profit / c.revenue) * 100) : 0;
            const marginColor =
              margin >= 60 ? "text-green-600" : margin >= 45 ? "text-amber-600" : "text-red-500";
            return (
              <tr key={c.id} className="border-t border-ink-100">
                <td className="py-2 font-medium text-ink-900">{c.client}</td>
                <td className="py-2 text-right text-ink-700">
                  <Editable
                    value={c.revenue}
                    type="number"
                    display={<span>{formatCurrency(c.revenue)}</span>}
                    onCommit={(raw) => {
                      const num = parseFloat(raw);
                      if (!isNaN(num))
                        setData((p) => {
                          const next = [...p.topClients];
                          next[i] = { ...next[i], revenue: num };
                          return { ...p, topClients: next };
                        });
                    }}
                  />
                </td>
                <td className="py-2 text-right text-ink-700">
                  <Editable
                    value={c.cost}
                    type="number"
                    display={<span>{formatCurrency(c.cost)}</span>}
                    onCommit={(raw) => {
                      const num = parseFloat(raw);
                      if (!isNaN(num))
                        setData((p) => {
                          const next = [...p.topClients];
                          next[i] = { ...next[i], cost: num };
                          return { ...p, topClients: next };
                        });
                    }}
                  />
                </td>
                <td className="py-2 text-right font-medium text-green-600">
                  {formatCurrency(profit)}
                </td>
                <td className={`py-2 text-right font-semibold ${marginColor}`}>
                  {margin}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
