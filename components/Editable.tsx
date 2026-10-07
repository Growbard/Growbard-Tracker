"use client";

import React, { useState, useRef, useEffect } from "react";
import { useStore } from "@/lib/store";

interface EditableProps {
  value: string | number;
  onCommit: (raw: string) => void;
  /** render for display when not editing */
  display: React.ReactNode;
  type?: "text" | "number";
  className?: string;
  inputClassName?: string;
}

/**
 * Wraps any displayed value. When global edit mode is ON, clicking it
 * turns it into an input. On blur / Enter it commits the new value and
 * the dashboard (and all its charts) recompute.
 */
export default function Editable({
  value,
  onCommit,
  display,
  type = "text",
  className = "",
  inputClassName = "",
}: EditableProps) {
  const { editMode } = useStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  if (!editMode) {
    return <>{display}</>;
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        type={type}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          onCommit(draft);
          setEditing(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onCommit(draft);
            setEditing(false);
          }
          if (e.key === "Escape") {
            setDraft(String(value));
            setEditing(false);
          }
        }}
        className={`rounded border border-blue-400 bg-blue-50 px-1 py-0.5 text-inherit outline-none ring-2 ring-blue-200 ${inputClassName}`}
        style={{ width: `${Math.max(String(draft).length + 1, 3)}ch` }}
      />
    );
  }

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        setEditing(true);
      }}
      className={`cursor-pointer rounded px-0.5 outline-dashed outline-1 outline-blue-300 hover:bg-blue-50 ${className}`}
      title="Click to edit"
    >
      {display}
    </span>
  );
}
