"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { useStore } from "@/lib/store";
import { Card } from "./Card";
import Badge from "./ui/Badge";
import { EditField, SelectField, TextAreaField } from "./ui/Field";
import { formatCurrency } from "@/lib/format";
import {
  DEAL_STAGES, DEAL_CHANNELS, CONVERSATION_STATUSES, MEETING_STATUSES, CLOSE_STATUSES,
  type Deal, type DealActivity,
} from "@/lib/data";
import {
  ArrowLeft, Plus, Trash2, Mail, Phone, Globe, User, Building2, Check,
  UserPlus, Target, MessageSquare, CalendarCheck, Flag,
  FileText, Upload, ExternalLink, Loader2,
} from "lucide-react";
import type { ProposalFile } from "@/lib/data";

const PIPELINE = ["New Leads", "Qualified", "Proposal", "Negotiation", "Won"];

export default function DealProfile({ id }: { id: string }) {
  const { data, setData } = useStore();
  const router = useRouter();
  const deal = data.deals.find((d) => d.id === id);

  const patch = (p: Partial<Deal>) =>
    setData((prev) => ({ ...prev, deals: prev.deals.map((d) => (d.id === id ? { ...d, ...p } : d)) }));
  const setActivities = (fn: (a: DealActivity[]) => DealActivity[]) =>
    patch({ activities: fn(deal?.activities ?? []) });

  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const onPickFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const blob = await upload(file.name, file, { access: "public", handleUploadUrl: "/api/upload" });
      const rec: ProposalFile = {
        id: "f" + Date.now(),
        name: file.name,
        url: blob.url,
        size: file.size,
        uploadedAt: new Date().toLocaleDateString(),
      };
      patch({ proposalFiles: [...(deal?.proposalFiles ?? []), rec] });
    } catch (e) {
      alert("Upload failed: " + (e as Error).message);
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };
  const removeFile = (fid: string) =>
    patch({ proposalFiles: (deal?.proposalFiles ?? []).filter((f) => f.id !== fid) });

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

  const activities = deal.activities ?? [];
  const weighted = Math.round((deal.value * deal.probability) / 100);
  const stageIdx = PIPELINE.indexOf(deal.stage);
  const alreadyClient = data.clients.some((c) => c.name.toLowerCase() === deal.client.toLowerCase());

  const convertToClient = () => {
    if (alreadyClient) { alert(`${deal.client} is already in your client list.`); return; }
    const c = {
      id: "c" + Date.now(), name: deal.client, industry: "—",
      status: "Onboarding" as const, mrr: deal.value, since: "This month", owner: deal.owner || "—",
    };
    patch({ stage: "Won", closeStatus: "Won", probability: 100 });
    setData((p) => ({ ...p, clients: [...p.clients, c] }));
    if (confirm(`${deal.client} added to clients 🎉  Go to the clients list now?`)) router.push("/clients");
  };

  const deleteProspect = () => {
    if (!confirm(`Delete ${deal.client} from the pipeline? This can't be undone.`)) return;
    setData((p) => ({ ...p, deals: p.deals.filter((d) => d.id !== id) }));
    router.push("/pipeline");
  };

  const Section = ({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => (
    <Card className="p-5">
      <h3 className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-ink-900">{icon}{title}</h3>
      {children}
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link href="/pipeline" className="inline-flex items-center gap-1.5 text-[13px] text-brand-600 hover:underline">
          <ArrowLeft size={15} /> Back to Pipeline
        </Link>
        <div className="flex gap-2">
          <button onClick={convertToClient}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium ${
              alreadyClient ? "border border-ink-200 bg-white text-ink-400" : "bg-green-600 text-white hover:bg-green-700"
            }`}>
            {alreadyClient ? <><Check size={14} /> Client</> : <><UserPlus size={14} /> Convert to Client</>}
          </button>
          <button onClick={deleteProspect}
            className="flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-[13px] text-red-600 hover:bg-red-50">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      {/* Premium header with gradient */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-5 text-white">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-[22px] font-bold backdrop-blur">
                {deal.client.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-[22px] font-bold leading-tight">{deal.client}</h2>
                <p className="text-[13px] text-white/80">{deal.name}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-medium backdrop-blur">{deal.stage}</span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-medium backdrop-blur">{deal.channel}</span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-medium backdrop-blur">{deal.closeStatus}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div><div className="text-[11px] uppercase tracking-wide text-white/70">Deal Value</div><div className="text-[24px] font-bold">{formatCurrency(deal.value)}</div></div>
              <div><div className="text-[11px] uppercase tracking-wide text-white/70">Weighted</div><div className="text-[24px] font-bold">{formatCurrency(weighted)}</div><div className="text-[11px] text-white/70">{deal.probability}% prob.</div></div>
            </div>
          </div>
        </div>

        {/* Stage stepper */}
        <div className="flex items-center gap-1 overflow-x-auto px-6 py-4">
          {PIPELINE.map((st, i) => {
            const done = stageIdx >= 0 && i <= stageIdx;
            const current = i === stageIdx;
            return (
              <div key={st} className="flex flex-1 items-center">
                <button onClick={() => patch({ stage: st })} className="flex flex-col items-center gap-1" title={`Set stage: ${st}`}>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-semibold ${
                    done ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-400"
                  } ${current ? "ring-2 ring-brand-200" : ""}`}>
                    {done ? <Check size={14} /> : i + 1}
                  </span>
                  <span className={`whitespace-nowrap text-[11px] ${current ? "font-semibold text-brand-700" : "text-ink-500"}`}>{st}</span>
                </button>
                {i < PIPELINE.length - 1 && <div className={`mx-1 h-0.5 flex-1 ${i < stageIdx ? "bg-brand-500" : "bg-ink-100"}`} />}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Quick status tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Target Stage", value: deal.targetStage, icon: <Target size={15} className="text-brand-500" /> },
          { label: "Conversation", value: deal.conversationStatus, icon: <MessageSquare size={15} className="text-purple-500" /> },
          { label: "Meeting", value: deal.meetingStatus === "Scheduled" && deal.meetingDate ? `Scheduled · ${deal.meetingDate}` : deal.meetingStatus, icon: <CalendarCheck size={15} className="text-green-500" /> },
          { label: "Next Step", value: deal.nextStep || "—", icon: <Flag size={15} className="text-amber-500" /> },
        ].map((t, i) => (
          <Card key={i} className="px-4 py-3.5">
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-ink-500">{t.icon}{t.label}</div>
            <div className="mt-1 truncate text-[14px] font-semibold text-ink-900" title={t.value}>{t.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Pipeline & Targeting" icon={<Target size={15} className="text-ink-400" />}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <SelectField label="Current Stage" value={deal.stage} options={DEAL_STAGES} onCommit={(v) => patch({ stage: v })} />
            <SelectField label="Target Stage (next)" value={deal.targetStage} options={DEAL_STAGES} onCommit={(v) => patch({ targetStage: v })} />
            <SelectField label="Channel (where targeting)" value={deal.channel} options={DEAL_CHANNELS} onCommit={(v) => patch({ channel: v })} />
            <EditField label="Owner" value={deal.owner} onCommit={(v) => patch({ owner: v })} placeholder="Owner" />
            <SelectField label="Conversation" value={deal.conversationStatus} options={CONVERSATION_STATUSES} onCommit={(v) => patch({ conversationStatus: v })} />
            <SelectField label="Meeting" value={deal.meetingStatus} options={MEETING_STATUSES} onCommit={(v) => patch({ meetingStatus: v })} />
            <EditField label="Meeting Date" value={deal.meetingDate} onCommit={(v) => patch({ meetingDate: v })} placeholder="e.g. Nov 2, 3:00 PM" />
            <SelectField label="Close / Done" value={deal.closeStatus} options={CLOSE_STATUSES} onCommit={(v) => patch({ closeStatus: v })} />
            <EditField label="Expected Close" value={deal.closeDate} onCommit={(v) => patch({ closeDate: v })} placeholder="e.g. Nov 5" />
            <EditField label="Deal Value ($)" type="number" value={String(deal.value)} onCommit={(v) => patch({ value: parseFloat(v) || 0 })} />
            <EditField label="Probability (%)" type="number" value={String(deal.probability)} onCommit={(v) => patch({ probability: parseFloat(v) || 0 })} />
          </div>
          <div className="mt-3">
            <EditField label="Next Step" value={deal.nextStep} onCommit={(v) => patch({ nextStep: v })} placeholder="What's the next action?" />
          </div>
        </Section>

        <Section title="Contact" icon={<User size={15} className="text-ink-400" />}>
          <div className="space-y-3">
            {[
              { icon: <User size={15} className="text-ink-400" />, key: "contactName", ph: "Contact name" },
              { icon: <Mail size={15} className="text-ink-400" />, key: "email", ph: "Email" },
              { icon: <Phone size={15} className="text-ink-400" />, key: "phone", ph: "Phone" },
              { icon: <Globe size={15} className="text-ink-400" />, key: "website", ph: "Website" },
              { icon: <Building2 size={15} className="text-ink-400" />, key: "client", ph: "Company" },
            ].map((f) => (
              <div key={f.key} className="flex items-center gap-2">
                {f.icon}
                <div className="flex-1">
                  <EditField value={String(deal[f.key as keyof Deal] ?? "")} placeholder={f.ph}
                    onCommit={(v) => patch({ [f.key]: v } as Partial<Deal>)} />
                </div>
              </div>
            ))}
          </div>

          {/* Proposal / documents — upload PDFs & docs to revisit later */}
          <div className="mt-4 border-t border-ink-100 pt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-wide text-ink-400">Proposal &amp; Documents</span>
              <input ref={fileInput} type="file" accept=".pdf,.doc,.docx,image/*" className="hidden"
                onChange={(e) => onPickFile(e.target.files?.[0])} />
              <button onClick={() => fileInput.current?.click()} disabled={uploading}
                className="flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-[12px] text-ink-700 hover:bg-ink-50 disabled:opacity-50">
                {uploading ? <><Loader2 size={13} className="animate-spin" /> Uploading…</> : <><Upload size={13} /> Upload</>}
              </button>
            </div>

            {(deal.proposalFiles ?? []).length === 0 ? (
              <button onClick={() => fileInput.current?.click()}
                className="flex w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-ink-200 bg-ink-50/50 px-4 py-5 text-center text-ink-400 hover:bg-ink-50">
                <FileText size={22} />
                <span className="text-[12px] font-medium text-ink-500">Upload proposal PDF / doc</span>
                <span className="text-[11px]">Click to add — you can reopen it anytime. (PDF, DOC, image · up to 25MB)</span>
              </button>
            ) : (
              <div className="space-y-1.5">
                {(deal.proposalFiles ?? []).map((f) => (
                  <div key={f.id} className="flex items-center gap-2.5 rounded-lg border border-ink-100 px-3 py-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-50 text-red-500">
                      <FileText size={15} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[12.5px] font-medium text-ink-900">{f.name}</div>
                      <div className="text-[11px] text-ink-400">{(f.size / 1024).toFixed(0)} KB · {f.uploadedAt}</div>
                    </div>
                    <a href={f.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-md px-2 py-1 text-[12px] text-brand-600 hover:bg-brand-50" title="Open">
                      <ExternalLink size={13} /> Open
                    </a>
                    <button onClick={() => removeFile(f.id)}
                      className="rounded p-1 text-ink-300 hover:bg-red-50 hover:text-red-500" title="Remove">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Section>
      </div>

      <Section title="Notes">
        <TextAreaField value={deal.notes} onCommit={(v) => patch({ notes: v })} placeholder="Anything useful about this prospect…" />
      </Section>

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[14px] font-semibold text-ink-900">Conversation &amp; Activity Log</h3>
          <button onClick={() => setActivities((a) => [{ id: "ac" + Date.now(), date: "Today", note: "" }, ...a])}
            className="flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-[12px] text-ink-700 hover:bg-ink-50">
            <Plus size={14} /> Add entry
          </button>
        </div>
        <div className="relative space-y-2 before:absolute before:left-[5px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-ink-100">
          {activities.length === 0 && <div className="py-4 text-center text-[13px] text-ink-400">No activity yet. Add your first touchpoint.</div>}
          {activities.map((act) => (
            <div key={act.id} className="relative flex items-start gap-3 rounded-lg pl-5">
              <span className="absolute left-0 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-500" />
              <div className="w-24 shrink-0 pt-1">
                <EditField value={act.date} onCommit={(v) => setActivities((a) => a.map((x) => x.id === act.id ? { ...x, date: v } : x))} placeholder="Date" />
              </div>
              <div className="flex-1 pt-1">
                <EditField value={act.note} onCommit={(v) => setActivities((a) => a.map((x) => x.id === act.id ? { ...x, note: v } : x))} placeholder="What happened?" />
              </div>
              <button onClick={() => setActivities((a) => a.filter((x) => x.id !== act.id))}
                className="mt-1.5 rounded p-1 text-ink-300 hover:bg-red-50 hover:text-red-500" title="Delete entry">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
