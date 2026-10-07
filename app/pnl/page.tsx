"use client";

import { useStore } from "@/lib/store";
import { useCollectionEditor } from "@/lib/useCollection";
import { Card } from "@/components/Card";
import KpiRow from "@/components/ui/KpiRow";
import Editable from "@/components/Editable";
import { formatCurrency } from "@/lib/format";

export default function PnlPage() {
  const { data } = useStore();
  const onEdit = useCollectionEditor("pnl");
  const sum = (k: string) => data.pnl.filter((l) => l.kind === k).reduce((a, l) => a + l.amount, 0);
  const revenue = sum("revenue");
  const cogs = sum("cogs");
  const gross = revenue - cogs;
  const opex = sum("opex");
  const net = gross - opex;
  const margin = revenue ? Math.round((net / revenue) * 100) : 0;

  const Section = ({ title, kind }: { title: string; kind: string }) => {
    const rows = data.pnl.filter((l) => l.kind === kind);
    return (
      <>
        <tr className="bg-ink-50/60"><td className="px-5 py-2 text-[12px] font-semibold uppercase tracking-wide text-ink-500" colSpan={2}>{title}</td></tr>
        {rows.map((l) => (
          <tr key={l.id} className="border-b border-ink-100">
            <td className="px-5 py-2.5 text-ink-700">{l.label}</td>
            <td className="px-5 py-2.5 text-right text-ink-900">
              <Editable value={l.amount} type="number" display={<span>{formatCurrency(l.amount)}</span>} onCommit={(v) => onEdit(l.id, "amount", v)} />
            </td>
          </tr>
        ))}
      </>
    );
  };

  const Total = ({ label, value, strong }: { label: string; value: number; strong?: boolean }) => (
    <tr className={`border-b border-ink-100 ${strong ? "bg-ink-50" : ""}`}>
      <td className={`px-5 py-2.5 ${strong ? "font-bold text-ink-900" : "font-semibold text-ink-700"}`}>{label}</td>
      <td className={`px-5 py-2.5 text-right ${strong ? "font-bold" : "font-semibold"} ${value < 0 ? "text-red-500" : "text-ink-900"}`}>{formatCurrency(value)}</td>
    </tr>
  );

  return (
    <div className="space-y-4">
      <KpiRow items={[
        { label: "Revenue", value: revenue, format: "currency", icon: "DollarSign", iconColor: "#22c55e" },
        { label: "Gross Profit", value: gross, format: "currency", icon: "TrendingUp", iconColor: "#3b82f6" },
        { label: "Net Profit", value: net, format: "currency", icon: "PiggyBank", iconColor: "#a855f7" },
        { label: "Net Margin", value: margin + "%", icon: "Percent", iconColor: "#f59e0b" },
      ]} />
      <Card className="overflow-hidden">
        <div className="border-b border-ink-100 px-5 py-3.5"><h3 className="text-[15px] font-semibold text-ink-900">Profit &amp; Loss — This Month</h3></div>
        <table className="w-full text-[13px]">
          <tbody>
            <Section title="Revenue" kind="revenue" />
            <Section title="Cost of Goods Sold" kind="cogs" />
            <Total label="Gross Profit" value={gross} />
            <Section title="Operating Expenses" kind="opex" />
            <Total label="Net Profit" value={net} strong />
          </tbody>
        </table>
      </Card>
    </div>
  );
}
