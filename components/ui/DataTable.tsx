"use client";

import React from "react";
import { Card } from "../Card";
import Editable from "../Editable";
import { formatValue } from "@/lib/format";
import type { Fmt } from "@/lib/data";

export interface Column<T> {
  key: keyof T & string;
  header: string;
  align?: "left" | "right" | "center";
  /** make this cell inline-editable in Edit mode */
  editable?: boolean;
  type?: "number" | "text";
  /** number format for display */
  format?: Fmt;
  /** fully custom cell renderer (overrides editable/format) */
  render?: (row: T) => React.ReactNode;
  width?: string;
}

interface Props<T extends { id: string }> {
  title?: string;
  columns: Column<T>[];
  rows: T[];
  /** called when an editable cell commits a new value */
  onEdit?: (rowId: string, key: keyof T & string, raw: string) => void;
  /** when set, rows become clickable */
  onRowClick?: (row: T) => void;
  right?: React.ReactNode;
  footer?: React.ReactNode;
  dense?: boolean;
}

export default function DataTable<T extends { id: string }>({
  title, columns, rows, onEdit, onRowClick, right, footer, dense,
}: Props<T>) {
  const alignCls = (a?: string) => (a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left");

  return (
    <Card className="overflow-hidden">
      {(title || right) && (
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3.5">
          {title && <h3 className="text-[15px] font-semibold text-ink-900">{title}</h3>}
          {right}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-ink-100 text-[11px] uppercase tracking-wide text-ink-400">
              {columns.map((c) => (
                <th key={c.key} className={`px-5 ${dense ? "py-2" : "py-2.5"} font-medium ${alignCls(c.align)}`} style={c.width ? { width: c.width } : undefined}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`border-b border-ink-100 last:border-0 hover:bg-ink-50/60 ${onRowClick ? "cursor-pointer" : ""}`}>
                {columns.map((c) => {
                  const raw = row[c.key] as unknown;
                  let content: React.ReactNode;
                  if (c.render) {
                    content = c.render(row);
                  } else if (c.editable && onEdit) {
                    const display =
                      c.format && typeof raw === "number" ? formatValue(raw, c.format) : String(raw);
                    content = (
                      <Editable
                        value={raw as string | number}
                        type={c.type || (typeof raw === "number" ? "number" : "text")}
                        display={<span>{display}</span>}
                        onCommit={(v) => onEdit(row.id, c.key, v)}
                      />
                    );
                  } else {
                    content = c.format && typeof raw === "number" ? formatValue(raw, c.format) : String(raw);
                  }
                  return (
                    <td key={c.key} className={`px-5 ${dense ? "py-2" : "py-3"} ${alignCls(c.align)} text-ink-700`}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={columns.length} className="px-5 py-8 text-center text-ink-400">No records yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {footer && <div className="border-t border-ink-100 px-5 py-3 text-[13px]">{footer}</div>}
    </Card>
  );
}
