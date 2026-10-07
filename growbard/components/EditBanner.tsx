"use client";

import React from "react";
import { Info } from "lucide-react";
import { useStore } from "@/lib/store";

export default function EditBanner() {
  const { editMode } = useStore();
  if (!editMode) return null;

  return (
    <div className="mb-4 flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-[13px] text-blue-700">
      <Info size={15} />
      <span>
        <strong>Edit mode on.</strong> Click any highlighted number or text to
        change it. Charts update instantly. Your changes save automatically in
        this browser — use <strong>Export</strong> to download a backup.
      </span>
    </div>
  );
}
