"use client";

import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { Sun, CalendarDays, Bell, Pencil, Check, RotateCcw, Download, Upload, Menu } from "lucide-react";
import { useStore } from "@/lib/store";
import { routeMeta } from "@/lib/nav";
import Editable from "./Editable";

export default function Header({ onMenu }: { onMenu?: () => void }) {
  const { data, setData, editMode, setEditMode, reset, exportJson, importJson } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDealProfile = pathname.startsWith("/pipeline/");
  const meta = routeMeta[pathname] ?? (isDealProfile
    ? { label: "Prospect Profile", subtitle: "Full details and tracking for this prospect." }
    : { label: "Dashboard", subtitle: "" });

  const handleExport = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "growbard-data.json"; a.click();
    URL.revokeObjectURL(url);
  };
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => { if (!importJson(String(r.result))) alert("Could not import — not valid Growbard JSON."); };
    r.readAsText(file);
    e.target.value = "";
  };

  return (
    <header className="flex items-center justify-between gap-4 border-b border-ink-200 bg-ink-50/50 px-5 py-4 lg:px-7">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="rounded-lg border border-ink-200 bg-white p-2 text-ink-600 lg:hidden">
          <Menu size={18} />
        </button>
        {isHome ? (
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-500">
              <Sun size={16} />
            </div>
            <div>
              <h1 className="text-[22px] font-bold leading-tight text-ink-900">
                Good morning,{" "}
                <Editable value={data.userName} display={<span>{data.userName}</span>}
                  onCommit={(raw) => setData((p) => ({ ...p, userName: raw }))} />!
              </h1>
              <p className="text-[13px] text-ink-500">{meta.subtitle}</p>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-[20px] font-bold leading-tight text-ink-900">{meta.label}</h1>
            <p className="text-[13px] text-ink-500">{meta.subtitle}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        {editMode && (
          <>
            <button onClick={() => fileRef.current?.click()} title="Import JSON"
              className="hidden items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-ink-700 hover:bg-ink-50 sm:flex">
              <Upload size={14} /> Import
            </button>
            <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={handleImportFile} />
            <button onClick={handleExport} title="Export JSON backup"
              className="hidden items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-ink-700 hover:bg-ink-50 sm:flex">
              <Download size={14} /> Export
            </button>
            <button onClick={() => { if (confirm("Reset all data to defaults? Your edits will be lost.")) reset(); }}
              title="Reset to defaults"
              className="hidden items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 sm:flex">
              <RotateCcw size={14} /> Reset
            </button>
          </>
        )}

        <button onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
            editMode ? "bg-green-600 text-white hover:bg-green-700" : "bg-brand-600 text-white hover:bg-brand-700"
          }`}>
          {editMode ? (<><Check size={14} /> Done</>) : (<><Pencil size={14} /> Edit</>)}
        </button>

        <div className="hidden items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-ink-700 md:flex">
          <CalendarDays size={15} className="text-ink-500" />
          <Editable value={data.dateLabel} display={<span>{data.dateLabel}</span>}
            onCommit={(raw) => setData((p) => ({ ...p, dateLabel: raw }))} />
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-500 hover:bg-ink-50">
          <Bell size={16} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
      </div>
    </header>
  );
}
