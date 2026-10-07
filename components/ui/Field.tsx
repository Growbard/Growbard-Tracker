"use client";

import React, { useState, useRef, useEffect } from "react";

/** Always-on click-to-edit text field for the prospect profile. */
export function EditField({
  label, value, onCommit, type = "text", placeholder,
}: {
  label?: string; value: string; onCommit: (v: string) => void;
  type?: "text" | "number"; placeholder?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => setDraft(value), [value]);
  useEffect(() => { if (editing) { ref.current?.focus(); ref.current?.select(); } }, [editing]);

  return (
    <div>
      {label && <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-400">{label}</div>}
      {editing ? (
        <input
          ref={ref} type={type} value={draft} placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => { onCommit(draft); setEditing(false); }}
          onKeyDown={(e) => {
            if (e.key === "Enter") { onCommit(draft); setEditing(false); }
            if (e.key === "Escape") { setDraft(value); setEditing(false); }
          }}
          className="w-full rounded-md border border-brand-400 bg-blue-50 px-2 py-1 text-[13px] text-ink-900 outline-none ring-2 ring-brand-100"
        />
      ) : (
        <div
          onClick={() => setEditing(true)}
          className="cursor-text rounded-md px-2 py-1 text-[13px] text-ink-900 hover:bg-ink-50"
          title="Click to edit"
        >
          {value || <span className="text-ink-300">{placeholder || "—"}</span>}
        </div>
      )}
    </div>
  );
}

/** Always-on dropdown field for status/stage/channel selection. */
export function SelectField({
  label, value, options, onCommit,
}: {
  label?: string; value: string; options: string[]; onCommit: (v: string) => void;
}) {
  return (
    <div>
      {label && <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-400">{label}</div>}
      <select
        value={value}
        onChange={(e) => onCommit(e.target.value)}
        className="w-full cursor-pointer rounded-md border border-ink-200 bg-white px-2 py-1.5 text-[13px] text-ink-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      >
        {!options.includes(value) && <option value={value}>{value}</option>}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

/** Always-on multiline notes field. */
export function TextAreaField({
  label, value, onCommit, placeholder,
}: { label?: string; value: string; onCommit: (v: string) => void; placeholder?: string }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  return (
    <div>
      {label && <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-400">{label}</div>}
      <textarea
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => onCommit(draft)}
        rows={3}
        className="w-full resize-y rounded-md border border-ink-200 bg-white px-2.5 py-2 text-[13px] text-ink-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
    </div>
  );
}
