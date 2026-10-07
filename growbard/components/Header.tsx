"use client";

import React, { useRef } from "react";
import { Sun, CalendarDays, Bell, Pencil, Check, RotateCcw, Download, Upload } from "lucide-react";
import { useStore } from "@/lib/store";
import Editable from "./Editable";

export default function Header() {
  const { data, setData, editMode, setEditMode, reset, exportJson, importJson } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "growbard-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => fileRef.current?.click();

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      const ok = importJson(String(r.result));
      if (!ok) alert("Could not import — the file isn't valid Growbard JSON.");
    };
    r.readAsText(file);
    e.target.value = "";
  };

  return (
    <header className="flex items-center justify-between gap-4 px-7 py-4">
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-500">
          <Sun size={16} />
        </div>
        <div>
          <h1 className="text-[22px] font-bold leading-tight text-ink-900">
            Good morning,{" "}
            <Editable
              value={data.userName}
              display={<span>{data.userName}</span>}
              onCommit={(raw) => setData((p) => ({ ...p, userName: raw }))}
            />
            !
          </h1>
          <p className="text-[13px] text-ink-500">
            Here&apos;s what&apos;s happening across your agency today.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {editMode && (
          <>
            <button
              onClick={handleImportClick}
              className="flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-ink-700 hover:bg-ink-50"
              title="Import data from a JSON file"
            >
              <Upload size={14} /> Import
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={handleImportFile}
            />
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-ink-700 hover:bg-ink-50"
              title="Download your data as JSON (backup / commit to GitHub)"
            >
              <Download size={14} /> Export
            </button>
            <button
              onClick={() => {
                if (confirm("Reset all data back to the defaults? Your edits will be lost.")) reset();
              }}
              className="flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-red-600 hover:bg-red-50"
              title="Reset to default data"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </>
        )}

        <button
          onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
            editMode
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-brand-600 text-white hover:bg-brand-700"
          }`}
        >
          {editMode ? (
            <>
              <Check size={14} /> Done
            </>
          ) : (
            <>
              <Pencil size={14} /> Edit
            </>
          )}
        </button>

        <div className="flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-ink-700">
          <CalendarDays size={15} className="text-ink-500" />
          <Editable
            value={data.dateLabel}
            display={<span>{data.dateLabel}</span>}
            onCommit={(raw) => setData((p) => ({ ...p, dateLabel: raw }))}
          />
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-500 hover:bg-ink-50">
          <Bell size={16} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
      </div>
    </header>
  );
}
