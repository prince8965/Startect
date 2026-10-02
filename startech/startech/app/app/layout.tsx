import React from "react";
import { MissionHeader } from "@/components/common/MissionHeader";
import { MissionSidebar } from "@/components/common/MissionSidebar";
import { DashboardVideoBackground } from "@/components/dashboard/DashboardVideoBackground";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <DashboardVideoBackground />
      <MissionHeader />
      <div className="flex flex-1 relative z-10">
        <MissionSidebar />
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-4rem)] relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
