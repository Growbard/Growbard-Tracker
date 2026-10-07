"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/Card";
import DataTable, { Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import {
  CalendarDays, Image as ImageIcon, ChevronLeft, ChevronRight,
  MoreVertical, Clock, Building2, User, Plug,
} from "lucide-react";
import type { Meeting } from "@/lib/data";

const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MON3 = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const typeColor = (t: string): "blue" | "green" | "purple" =>
  t === "Sales" ? "blue" : t === "Client" ? "green" : "purple";

// "Oct 24" -> {mon:9, day:24}
function parseMD(s: string): { mon: number; day: number } | null {
  const m = s.trim().match(/([A-Za-z]{3,})\s+(\d{1,2})/);
  if (!m) return null;
  const mon = MON3.indexOf(m[1].slice(0, 3));
  if (mon < 0) return null;
  return { mon, day: parseInt(m[2], 10) };
}
// "Thu, Oct 24, 2024" -> {mon, day, year}
function parseToday(s: string) {
  const m = s.match(/([A-Za-z]{3,})\s+(\d{1,2}),\s*(\d{4})/);
  if (!m) return null;
  const mon = MON3.indexOf(m[1].slice(0, 3));
  if (mon < 0) return null;
  return { mon, day: parseInt(m[2], 10), year: parseInt(m[3], 10) };
}

export default function MeetingsPage() {
  const { data } = useStore();
  const [tab, setTab] = useState<"calendar" | "image">("calendar");
  const [cursor, setCursor] = useState(new Date(2024, 9, 1)); // Oct 2024
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const today = parseToday(data.dateLabel);

  // meetings that fall in the displayed month
  const monthMeetings = data.meetings
    .map((m) => ({ m, md: parseMD(m.date) }))
    .filter((x) => x.md && x.md.mon === month)
    .map((x) => ({ ...x.m, day: x.md!.day }));

  const dayHasMeeting = (d: number) => monthMeetings.some((m) => m.day === d);
  const listMeetings = (selectedDay ? monthMeetings.filter((m) => m.day === selectedDay) : monthMeetings)
    .sort((a, b) => a.day - b.day);

  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);

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
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-ink-900">{MONTHS[month]} {year}</h3>
                <div className="flex gap-1">
                  <button onClick={() => { setCursor(new Date(year, month - 1, 1)); setSelectedDay(null); }}
                    className="rounded-md border border-ink-200 p-1 text-ink-500 hover:bg-ink-50"><ChevronLeft size={15} /></button>
                  <button onClick={() => { setCursor(new Date(year, month + 1, 1)); setSelectedDay(null); }}
                    className="rounded-md border border-ink-200 p-1 text-ink-500 hover:bg-ink-50"><ChevronRight size={15} /></button>
                </div>
              </div>

              <div className="grid grid-cols-7 text-center text-[10px] font-medium uppercase text-ink-400">
                {WD.map((d) => <div key={d} className="py-1">{d}</div>)}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1">
                {cells.map((d, i) => {
                  if (!d) return <div key={i} />;
                  const isToday = !!today && today.mon === month && today.year === year && today.day === d;
                  const hasM = dayHasMeeting(d);
                  const isSel = selectedDay === d;
                  return (
                    <button key={i} onClick={() => setSelectedDay(isSel ? null : d)}
                      className={`relative flex h-9 items-center justify-center rounded-lg text-[12px] ${
                        isToday ? "bg-brand-600 font-semibold text-white"
                        : isSel ? "bg-brand-100 font-medium text-brand-700"
                        : "text-ink-700 hover:bg-ink-50"
                      }`}>
                      {d}
                      {hasM && !isToday && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-brand-500" />}
                    </button>
                  );
                })}
              </div>

              {/* Booked meetings by date & time */}
              <div className="mt-4 border-t border-ink-100 pt-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-ink-700">
                    {selectedDay ? `${MON3[month]} ${selectedDay}` : "Booked this month"}
                  </span>
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700">
                    {listMeetings.length} booked
                  </span>
                </div>
                <div className="space-y-1.5">
                  {listMeetings.length === 0 && <div className="py-2 text-[12px] text-ink-400">No meetings{selectedDay ? " on this day" : ""}.</div>}
                  {listMeetings.map((m) => (
                    <button key={m.id} onClick={() => { setSelectedId(m.id); }}
                      className="flex w-full items-center gap-2 rounded-lg border border-ink-100 px-2.5 py-2 text-left hover:bg-ink-50">
                      <span className="flex h-7 w-9 shrink-0 flex-col items-center justify-center rounded-md bg-brand-50 text-brand-700">
                        <span className="text-[10px] leading-none">{MON3[month]}</span>
                        <span className="text-[12px] font-bold leading-none">{m.day}</span>
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[12px] font-medium text-ink-900">{m.title}</div>
                        <div className="flex items-center gap-1 text-[11px] text-ink-500"><Clock size={11} /> {m.time} · {m.client}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CALENDLY INTEGRATION — paste your embed/API here to auto-sync booked meetings */}
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-dashed border-ink-200 px-3 py-2.5 text-[12px] text-ink-500">
                <Plug size={14} className="text-ink-400" />
                <span>Connect <strong>Calendly</strong> here to auto-sync bookings by date &amp; time.</span>
              </div>
            </div>
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
