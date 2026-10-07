import React from "react";

const palette: Record<string, string> = {
  green: "bg-green-100 text-green-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-600",
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  gray: "bg-ink-100 text-ink-600",
};

// Map common status strings to a color
export function statusColor(status: string): keyof typeof palette {
  const s = status.toLowerCase();
  if (["active", "paid", "won", "published", "on track", "done", "active "].includes(s)) return "green";
  if (["pending", "onboarding", "sent", "at risk", "in progress", "review", "writing", "expiring", "medium", "paused"].includes(s)) return "amber";
  if (["overdue", "delayed", "lost", "churned", "expired", "high", "inactive"].includes(s)) return "red";
  if (["draft", "idea", "to do", "new leads", "qualified", "low", "completed"].includes(s)) return "gray";
  if (["proposal", "negotiation"].includes(s)) return "blue";
  return "gray";
}

export default function Badge({ label, color }: { label: string; color?: keyof typeof palette }) {
  const c = color || statusColor(label);
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${palette[c]}`}>
      {label}
    </span>
  );
}
