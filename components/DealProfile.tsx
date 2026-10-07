"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { Card } from "./Card";
import Badge from "./ui/Badge";
import { EditField, SelectField, TextAreaField } from "./ui/Field";
import { formatCurrency } from "@/lib/format";
import {
  DEAL_STAGES, DEAL_CHANNELS, CONVERSATION_STATUSES, MEETING_STATUSES, CLOSE_STATUSES,
  type Deal, type DealActivity,
} from "@/lib/data";
import { ArrowLeft, Plus, Trash2, Mail, Phone, Globe, User, Building2 } from "lucide-react";

export default function DealProfile({ id }: { id: string }) {
  const { data, setData } = useStore();
  const deal = data.deals.find((d) => d.id === id);

  const patch = (p: Partial<Deal>) =>
    setData((prev) => ({ ...prev, deals: prev.deals.map((d) => (d.id === id ? { ...d, ...p } : d)) }));

  const setActivities = (fn: (a: DealActivity[]) => DealActivity[]) =>
    patch({ activities: fn(deal?.activities ?? []) });

  if (!deal) {
    return (
      <div className="space-y-4">
        <Link href="/pipeline" className="inline-flex items-center gap-1.5 text-[13px] text-brand-600 hover:underline">
          <ArrowLeft size={15} /> Back to Pipeline
        </Link>
        <Card className="p-8 text-center text-ink-400">Prospect not found. It may have been removed.</Card>
      </div>
    );
  }

  const weighted = Math.round((deal.value * deal.probability) / 100);

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Card className="p-5">
      <h3 className="mb-3 text-[14px] font-semibold text-ink-900">{title}</h3>
      {children}
    </Card>
  );

  return (
    <div className="space-y-4">
      <Link href="/pipeline" className="inline-flex items-center gap-1.5 text-[13px] text-brand-600 hover:underline">
        <ArrowLeft size={15} /> Back to Pipeline
      </Link>

      {/* Header */}
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-[18px] font-bold text-brand-600">
              {deal.client.charAt(0)}
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-ink-900">{deal.client}</h2>
              <p className="text-[13px] text-ink-500">{deal.name}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge label={deal.stage} />
                <Badge label={deal.channel} color="blue" />
                <Badge label={deal.closeStatus} color={deal.closeStatus === "Won" ? "green" : deal.closeStatus === "Lost" ? "red" : "gray"} />
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-ink-400">Deal Value</div>
              <div className="text-[22px] font-bold text-ink-900">{formatCurrency(deal.value)}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-ink-400">Weighted</div>
              <div className="text-[22px] font-bold text-ink-900">{formatCurrency(weighted)}</div>
              <div className="text-[11px] text-ink-400">{deal.probability}% prob.</div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Targeting & pipeline status */}
        <Section title="Pipeline & Targeting">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <SelectField label="Current Stage" value={deal.stage} options={DEAL_STAGES} onCommit={(v) => patch({ stage: v })} />
            <SelectField label="Target Stage (next)" value={deal.targetStage} options={DEAL_STAGES} onCommit={(v) => patch({ targetStage: v })} />
            <SelectField label="Channel (where targeting)" value={deal.channel} options={DEAL_CHANNELS} onCommit={(v) => patch({ channel: v })} />
            <EditField label="Owner" value={deal.owner} onCommit={(v) => patch({ owner: v })} />
            <SelectField label="Conversation" value={deal.conversationStatus} options={CONVERSATION_STATUSES} onCommit={(v) => patch({ conversationStatus: v })} />
            <SelectField label="Meeting" value={deal.meetingStatus} options={MEETING_STATUSES} onCommit={(v) => patch({ meetingStatus: v })} />
            <SelectField label="Close / Done" value={deal.closeStatus} options={CLOSE_STATUSES} onCommit={(v) => patch({ closeStatus: v })} />
            <EditField label="Expected Close" value={deal.closeDate} onCommit={(v) => patch({ closeDate: v })} />
            <EditField label="Deal Value ($)" type="number" value={String(deal.value)} onCommit={(v) => patch({ value: parseFloat(v) || 0 })} />
            <EditField label="Probability (%)" type="number" value={String(deal.probability)} onCommit={(v) => patch({ probability: parseFloat(v) || 0 })} />
          </div>
          <div className="mt-3">
            <EditField label="Next Step" value={deal.nextStep} onCommit={(v) => patch({ nextStep: v })} placeholder="What's the next action?" />
          </div>
        </Section>

        {/* Contact */}
        <Section title="Contact">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User size={15} className="text-ink-400" />
              <div className="flex-1"><EditField value={deal.contactName} onCommit={(v) => patch({ contactName: v })} placeholder="Contact name" /></div>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={15} className="text-ink-400" />
              <div className="flex-1"><EditField value={deal.email} onCommit={(v) => patch({ email: v })} placeholder="Email" /></div>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={15} className="text-ink-400" />
              <div className="flex-1"><EditField value={deal.phone} onCommit={(v) => patch({ phone: v })} placeholder="Phone" /></div>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={15} className="text-ink-400" />
              <div className="flex-1"><EditField value={deal.website} onCommit={(v) => patch({ website: v })} placeholder="Website" /></div>
            </div>
            <div className="flex items-center gap-2">
              <Building2 size={15} className="text-ink-400" />
              <div className="flex-1"><EditField value={deal.client} onCommit={(v) => patch({ client: v })} placeholder="Company" /></div>
            </div>
          </div>
        </Section>
      </div>

      {/* Notes */}
      <Section title="Notes">
        <TextAreaField value={deal.notes} onCommit={(v) => patch({ notes: v })} placeholder="Anything useful about this prospect…" />
      </Section>

      {/* Activity / conversation log */}
      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[14px] font-semibold text-ink-900">Conversation & Activity Log</h3>
          <button
            onClick={() => setActivities((a) => [{ id: "ac" + Date.now(), date: "Today", note: "" }, ...a])}
            className="flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-[12px] text-ink-700 hover:bg-ink-50"
          >
            <Plus size={14} /> Add entry
          </button>
        </div>
        <div className="space-y-2">
          {deal.activities.length === 0 && <div className="py-4 text-center text-[13px] text-ink-400">No activity yet. Add your first touchpoint.</div>}
          {deal.activities.map((act) => (
            <div key={act.id} className="flex items-start gap-3 rounded-lg border border-ink-100 p-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
              <div className="w-24 shrink-0">
                <EditField value={act.date} onCommit={(v) => setActivities((a) => a.map((x) => x.id === act.id ? { ...x, date: v } : x))} placeholder="Date" />
              </div>
              <div className="flex-1">
                <EditField value={act.note} onCommit={(v) => setActivities((a) => a.map((x) => x.id === act.id ? { ...x, note: v } : x))} placeholder="What happened?" />
              </div>
              <button
                onClick={() => setActivities((a) => a.filter((x) => x.id !== act.id))}
                className="mt-1 rounded p-1 text-ink-300 hover:bg-red-50 hover:text-red-500"
                title="Delete entry"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
