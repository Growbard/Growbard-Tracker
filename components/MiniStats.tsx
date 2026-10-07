"use client";

import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatValue } from "@/lib/format";
import Editable from "./Editable";
import Icon from "./Icon";
import { Card } from "./Card";

export default function MiniStats() {
  const { data, setData } = useStore();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
      {data.miniStats.map((s, i) => (
        <Card key={s.id} className="px-4 py-3.5">
          <div className="flex items-start justify-between">
            <span className="text-[12px] font-medium text-ink-500">{s.label}</span>
            <Icon name={s.icon} size={15} color={s.iconColor} />
          </div>
          <div className="mt-1.5 text-[22px] font-bold leading-none text-ink-900">
            <Editable
              value={s.value}
              type="number"
              display={<span>{formatValue(s.value, s.format)}</span>}
              onCommit={(raw) => {
                const num = parseFloat(raw);
                if (!isNaN(num))
                  setData((p) => {
                    const next = [...p.miniStats];
                    next[i] = { ...next[i], value: num };
                    return { ...p, miniStats: next };
                  });
              }}
            />
          </div>
          {s.changePct !== 0 && (
            <div
              className={`mt-1.5 flex items-center gap-0.5 text-[12px] font-medium ${
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
                      const next = [...p.miniStats];
                      next[i] = { ...next[i], changePct: num };
                      return { ...p, miniStats: next };
                    });
                }}
              />
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
