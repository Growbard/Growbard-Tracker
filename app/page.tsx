"use client";

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

export default function Home() {
  return (
    <div className="space-y-4">
      <StatCards />
      <MiniStats />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5"><RevenueExpenses /></div>
        <div className="lg:col-span-4"><RevenueByChannel /></div>
        <div className="lg:col-span-3"><Pipeline /></div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ProjectStatus />
        <ClientHealth />
        <TeamCapacity />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RecentActivity />
        <UpcomingDeadlines />
        <TopClients />
      </div>
    </div>
  );
}
