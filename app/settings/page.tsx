"use client";

import { useRef } from "react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/Card";
import { Download, Upload, RotateCcw } from "lucide-react";

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-medium text-ink-500">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-ink-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
    </label>
  );
}

export default function SettingsPage() {
  const { data, setData, reset, exportJson, importJson } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "growbard-data.json"; a.click();
    URL.revokeObjectURL(url);
  };
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => { if (!importJson(String(r.result))) alert("Not valid Growbard JSON."); };
    r.readAsText(f); e.target.value = "";
  };

  return (
    <div className="max-w-2xl space-y-4">
      <Card className="p-5">
        <h3 className="text-[15px] font-semibold text-ink-900">Agency Profile</h3>
        <p className="mb-4 text-[13px] text-ink-500">These update the sidebar logo, greeting and header across the app.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Agency Name" value={data.agencyName} onChange={(v) => setData((p) => ({ ...p, agencyName: v }))} />
          <Field label="Your Name" value={data.userName} onChange={(v) => setData((p) => ({ ...p, userName: v }))} />
          <Field label="Date Label" value={data.dateLabel} onChange={(v) => setData((p) => ({ ...p, dateLabel: v }))} />
          <Field label="Currency" value={data.currency} onChange={(v) => setData((p) => ({ ...p, currency: v }))} />
          <Field label="Timezone" value={data.timezone} onChange={(v) => setData((p) => ({ ...p, timezone: v }))} />
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="text-[15px] font-semibold text-ink-900">Data</h3>
        <p className="mb-4 text-[13px] text-ink-500">
          Your edits are saved in this browser automatically. Export a backup, import it on another device, or reset everything to the shipped defaults.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button onClick={handleExport} className="flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-ink-700 hover:bg-ink-50">
            <Download size={14} /> Export JSON
          </button>
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-ink-700 hover:bg-ink-50">
            <Upload size={14} /> Import JSON
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={handleImport} />
          <button onClick={() => { if (confirm("Reset ALL data to defaults? This cannot be undone.")) reset(); }}
            className="flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-red-600 hover:bg-red-50">
            <RotateCcw size={14} /> Reset to defaults
          </button>
        </div>
      </Card>
    </div>
  );
}
