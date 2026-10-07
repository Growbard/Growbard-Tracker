"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/Card";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import {
  CalendarDays, Image as ImageIcon, MoreVertical, Building2, User, Link2, Pencil,
} from "lucide-react";
import type { Meeting } from "@/lib/data";

const typeColor = (t: string): "blue" | "green" | "purple" =>
  t === "Sales" ? "blue" : t === "Client" ? "green" : "purple";

// Accept a full <iframe …> snippet, an embed URL, or a plain calendar link.
function extractSrc(input: string): string {
  const t = input.trim();
  const m = t.match(/src=["']([^"']+)["']/i);
  return m ? m[1] : t;
}

export default function MeetingsPage() {
  const { data, setData } = useStore();
  const [tab, setTab] = useState<"calendar" | "image">("calendar");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState(false);

  const embed = data.calendarEmbedUrl;
  const saveEmbed = () => {
    const src = extractSrc(draft);
    setData((p) => ({ ...p, calendarEmbedUrl: src }));
    setEditing(false);
    setDraft("");
  };

  const selected = data.meetings.find((m) => m.id === selectedId) || null;

  const columns: Column<Meeting>[] = [
    { key: "title", header: "Meeting", render: (r) => <span className="font-medium text-ink-900">{r.title}</span> },
    { key: "client", header: "Client" },
    { key: "type", header: "Type", render: (r) => <Badge label={r.type} color={typeColor(r.type)} /> },
    { key: "date", header: "Date" },
    { key: "time", header: "Time" },
    { key: "owner", header: "Owner" },
    { key: "id", header: "", align: "right", width: "36px", render: () => <MoreVertical size={15} className="text-ink-300" /> },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      {/* LEFT — meetings list */}
      <div className="lg:col-span-3">
        <DataTable
          title="Upcoming Meetings"
          columns={columns}
          rows={data.meetings}
          onRowClick={(r) => { setSelectedId(r.id); setTab("image"); }}
          footer={<span className="text-ink-500">Click a meeting to preview it on the right.</span>}
        />
      </div>

      {/* RIGHT — calendar / image panel */}
      <div className="space-y-4 lg:col-span-2">
        <Card className="overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-ink-100">
            {([["calendar", "Calendar", CalendarDays], ["image", "Image", ImageIcon]] as const).map(([key, label, Icon]) => (
              <button key={key} onClick={() => setTab(key)}
                className={`flex items-center gap-1.5 px-5 py-3 text-[13px] font-medium transition-colors ${
                  tab === key ? "border-b-2 border-brand-600 text-brand-700" : "text-ink-500 hover:text-ink-700"
                }`}>
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          {tab === "calendar" ? (
            embed && !editing ? (
              /* Embedded Google Calendar / Calendly */
              <div>
                <iframe
                  src={embed}
                  title="Calendar"
                  className="block w-full border-0"
                  style={{ height: 620 }}
                  loading="lazy"
                />
                <div className="flex justify-end border-t border-ink-100 px-3 py-2">
                  <button onClick={() => { setDraft(embed); setEditing(true); }}
                    className="flex items-center gap-1.5 text-[12px] text-ink-500 hover:text-ink-700">
                    <Pencil size={12} /> Change calendar
                  </button>
                </div>
              </div>
            ) : (
              /* Setup: paste your Google Calendar / Calendly embed link */
              <div className="p-5">
                <div className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-ink-900">
                  <Link2 size={16} className="text-brand-600" /> Connect your calendar
                </div>
                <p className="mb-3 text-[12.5px] leading-relaxed text-ink-500">
                  Paste your <strong>Google Calendar</strong> embed link (or a Calendly link) and it will show right here —
                  live, with all your booked appointments.
                </p>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder='Paste the embed link or the full <iframe …> code here'
                  rows={3}
                  className="w-full resize-y rounded-lg border border-ink-200 bg-white px-3 py-2 text-[12.5px] text-ink-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={saveEmbed} disabled={!draft.trim()}
                    className="rounded-lg bg-brand-600 px-3 py-1.5 text-[13px] font-medium text-white hover:bg-brand-700 disabled:opacity-40">
                    Show calendar
                  </button>
                  {editing && (
                    <button onClick={() => { setEditing(false); setDraft(""); }}
                      className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-[13px] text-ink-600 hover:bg-ink-50">
                      Cancel
                    </button>
                  )}
                </div>
                <div className="mt-4 rounded-lg bg-ink-50 p-3 text-[11.5px] leading-relaxed text-ink-500">
                  <strong className="text-ink-600">How to get the link:</strong> Google Calendar → Settings → your
                  calendar → <em>Integrate calendar</em> → copy the <strong>Embed code</strong> (the whole
                  <span className="font-mono"> &lt;iframe…&gt; </span> or just its <span className="font-mono">src</span>) and paste above.
                </div>
              </div>
            )
          ) : (
            /* IMAGE tab */
            <div className="p-5">
              {selected ? (
                <div>
                  <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-ink-200 bg-ink-50 text-ink-300">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <ImageIcon size={28} />
                      <span className="text-[12px]">No image attached yet</span>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    <div className="text-[14px] font-semibold text-ink-900">{selected.title}</div>
                    <div className="flex items-center gap-1.5 text-[12px] text-ink-500"><Building2 size={13} /> {selected.client}</div>
                    <div className="flex items-center gap-1.5 text-[12px] text-ink-500"><CalendarDays size={13} /> {selected.date} · {selected.time}</div>
                    <div className="flex items-center gap-1.5 text-[12px] text-ink-500"><User size={13} /> {selected.owner}</div>
                    <Badge label={selected.type} color={typeColor(selected.type)} />
                  </div>
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-ink-200 bg-ink-50">
                  <div className="flex flex-col items-center gap-1 px-6 text-center text-ink-400">
                    <ImageIcon size={28} />
                    <span className="text-[13px] font-medium text-ink-500">Meeting image preview</span>
                    <span className="text-[12px]">Select a meeting to view related image or attachments here.</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Preview box (always visible, mirrors the selection) */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-ink-100 text-ink-400">
              <ImageIcon size={22} />
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-ink-900">
                {selected ? selected.title : "Meeting image preview"}
              </div>
              <div className="truncate text-[12px] text-ink-500">
                {selected ? `${selected.client} · ${selected.date} ${selected.time}` : "Select a meeting to view related image or attachments here."}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
