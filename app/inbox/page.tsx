"use client";

import { useStore } from "@/lib/store";
import { Card } from "@/components/Card";
import KpiRow from "@/components/ui/KpiRow";

export default function InboxPage() {
  const { data } = useStore();
  const unread = data.inbox.filter((m) => m.unread).length;

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Messages", value: data.inbox.length, format: "number", icon: "Inbox", iconColor: "#3b82f6" },
        { label: "Unread", value: unread, format: "number", icon: "Mail", iconColor: "#ef4444" },
        { label: "From Clients", value: data.inbox.filter((m) => !["Stripe", "Mike Chen"].includes(m.from)).length, format: "number", icon: "Users", iconColor: "#22c55e" },
        { label: "Read", value: data.inbox.length - unread, format: "number", icon: "MailOpen", iconColor: "#a855f7" },
      ]} />
      <Card className="overflow-hidden">
        <div className="border-b border-ink-100 px-5 py-3.5"><h3 className="text-[15px] font-semibold text-ink-900">Inbox</h3></div>
        <ul>
          {data.inbox.map((m) => (
            <li key={m.id} className={`flex items-start gap-3 border-b border-ink-100 px-5 py-3.5 last:border-0 hover:bg-ink-50/60 ${m.unread ? "bg-blue-50/40" : ""}`}>
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${m.unread ? "bg-brand-500" : "bg-transparent"}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className={`truncate text-[13px] ${m.unread ? "font-semibold text-ink-900" : "font-medium text-ink-700"}`}>{m.from}</span>
                  <span className="shrink-0 text-[11px] text-ink-400">{m.time}</span>
                </div>
                <div className="truncate text-[13px] text-ink-700">{m.subject}</div>
                <div className="truncate text-[12px] text-ink-400">{m.preview}</div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
