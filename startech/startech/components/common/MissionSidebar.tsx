"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Compass,
  Cpu,
  FileCheck,
  History,
  LayoutDashboard,
  Layers,
  Settings,
  Sparkles,
  Zap,
} from "lucide-react";

export const MissionSidebar: React.FC = () => {
  const pathname = usePathname();

  const navigation = [
    {
      group: "MISSION CONTROL",
      items: [
        {
          name: "Overview",
          href: "/app",
          icon: LayoutDashboard,
          exact: true,
        },
        {
          name: "New Registration",
          href: "/app/registration",
          icon: Zap,
          badge: "New",
        },
        {
          name: "Live Pipeline",
          href: "/app/processing",
          icon: Activity,
        },
        {
          name: "Feature Matches",
          href: "/app/visualization",
          icon: Compass,
        },
        {
          name: "Results & Compare",
          href: "/app/results",
          icon: Layers,
        },
        {
          name: "Evaluation Metrics",
          href: "/app/evaluation",
          icon: BarChart3,
        },
        {
          name: "Algorithm Lab",
          href: "/app/algorithms",
          icon: Cpu,
        },
        {
          name: "Processing Jobs",
          href: "/app/jobs",
          icon: History,
        },
      ],
    },
    {
      group: "SYSTEM",
      items: [
        {
          name: "API Status & Config",
          href: "/app/settings",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-surface-dark/85 backdrop-blur-md border-r border-panel-border flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 select-none shrink-0 z-20">
      {/* Navigation Links */}
      <div className="p-4 space-y-6 overflow-y-auto">
        {navigation.map((section, sIdx) => (
          <div key={sIdx}>
            <div className="text-[10px] font-mono tracking-widest text-muted uppercase px-3 mb-2 font-semibold">
              {section.group}
            </div>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-mono transition-all group ${
                      isActive
                        ? "bg-cyan/15 text-cyan border border-cyan/40 font-semibold shadow-cyan-glow"
                        : "text-muted hover:text-foreground hover:bg-panel border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-cyan" : "text-muted group-hover:text-cyan"
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan/20 text-cyan border border-cyan/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Sidebar Footer: System Status */}
      <div className="p-4 border-t border-panel-border bg-background/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            <span className="text-xs font-mono font-bold text-success tracking-wider">
              PIPELINE ONLINE
            </span>
          </div>
          <span className="text-[10px] font-mono text-muted">v2.6</span>
        </div>
        <div className="text-[10px] font-mono text-muted/80 leading-tight">
          FASTAPI / PYTORCH READY
        </div>
      </div>
    </aside>
  );
};
