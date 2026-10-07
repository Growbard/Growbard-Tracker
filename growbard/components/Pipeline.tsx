"use client";

import React from "react";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import Editable from "./Editable";
import { Card } from "./Card";

export default function Pipeline() {
  const { data, setData } = useStore();

  const totalPipeline = data.pipeline.reduce((a, s) => a + s.amount, 0);
  const maxAmount = Math.max(...data.pipeline.map((s) => s.amount), 1);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-ink-900">Pipeline Value</h3>
        <div className="rounded-md border border-ink-200 px-2.5 py-1 text-[12px] text-ink-500">
          This Month ▾
        </div>
      </div>

      <div className="mt-2 text-[26px] font-bold leading-none text-ink-900">
        {formatCurrency(totalPipeline)}
      </div>
      <div className="text-[12px] text-ink-400">Total Pipeline</div>

      <div className="mt-4 space-y-3">
        {data.pipeline.map((stage, i) => (
          <div key={stage.id}>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-ink-700">{stage.name}</span>
              <div className="flex items-center gap-4">
                <span className="font-medium text-ink-900">
                  <Editable
                    value={stage.amount}
                    type="number"
                    display={<span>{formatCurrency(stage.amount)}</span>}
                    onCommit={(raw) => {
                      const num = parseFloat(raw);
                      if (!isNaN(num))
                        setData((p) => {
                          const next = [...p.pipeline];
                          next[i] = { ...next[i], amount: num };
                          return { ...p, pipeline: next };
                        });
                    }}
                  />
                </span>
                <span className="w-4 text-right text-ink-400">
                  <Editable
                    value={stage.count}
                    type="number"
                    display={<span>{stage.count}</span>}
                    onCommit={(raw) => {
                      const num = parseInt(raw, 10);
                      if (!isNaN(num))
                        setData((p) => {
                          const next = [...p.pipeline];
                          next[i] = { ...next[i], count: num };
                          return { ...p, pipeline: next };
                        });
                    }}
                  />
                </span>
              </div>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(stage.amount / maxAmount) * 100}%`,
                  backgroundColor: stage.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
