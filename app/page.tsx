"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import EditBanner from "@/components/EditBanner";
import StatCards from "@/components/StatCards";
import MiniStats from "@/components/MiniStats";
import RevenueExpenses from "@/components/RevenueExpenses";
import RevenueByChannel from "@/components/RevenueByChannel";
import Pipeline from "@/components/Pipeline";
import ProjectStatus from "@/components/ProjectStatus";
import ClientHealth from "@/components/ClientHealth";
import TeamCapacity from "@/components/TeamCapacity";
import RecentActivity from "@/components/RecentActivity";
import UpcomingDeadlines from "@/components/UpcomingDeadlines";
import TopClients from "@/components/TopClients";
import { useStore } from "@/lib/store";

export default function Home() {
  const { loaded } = useStore();

  return (
    <div className="flex h-screen overflow-hidden bg-ink-100">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto px-7 pb-8">
          <EditBanner />

          {/* Row 1 — big stat cards */}
          <StatCards />

          {/* Row 2 — mini stats */}
          <div className="mt-4">
            <MiniStats />
          </div>

          {/* Row 3 — charts */}
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <RevenueExpenses />
            </div>
            <div className="lg:col-span-4">
              <RevenueByChannel />
            </div>
            <div className="lg:col-span-3">
              <Pipeline />
            </div>
          </div>

          {/* Row 4 — status / health / capacity */}
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <ProjectStatus />
            <ClientHealth />
            <TeamCapacity />
          </div>

          {/* Row 5 — activity / deadlines / top clients */}
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <RecentActivity />
            <UpcomingDeadlines />
            <TopClients />
          </div>

          {!loaded && (
            <div className="py-10 text-center text-sm text-ink-400">Loading…</div>
          )}
        </main>
      </div>
    </div>
  );
}
