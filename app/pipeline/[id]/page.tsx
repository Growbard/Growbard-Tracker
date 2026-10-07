import { defaultData } from "@/lib/data";
import DealProfile from "@/components/DealProfile";

// Prerender the default prospects; new ones (added via edits) still render at runtime.
export function generateStaticParams() {
  return defaultData.deals.map((d) => ({ id: d.id }));
}
export const dynamicParams = true;

export default async function DealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DealProfile id={id} />;
}
