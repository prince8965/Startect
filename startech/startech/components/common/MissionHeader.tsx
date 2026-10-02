"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, Sparkles, Activity, ShieldCheck, Terminal } from "lucide-react";
import { StartechLogo } from "./StartechLogo";

export const MissionHeader: React.FC = () => {
  const router = useRouter();

  const handleLaunchDemo = () => {
    router.push("/app/registration?demo=true");
  };

  return (
    <header className="h-16 border-b border-panel-border bg-surface-dark/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0">
      {/* Left: Brand + Breadcrumb */}
      <div className="flex items-center gap-4">
        <StartechLogo size="sm" linkHref="/app" />
        <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-panel-border text-xs font-mono text-muted">
          <span className="text-cyan font-medium">MISSION CONTROL</span>
          <span>/</span>
          <span>ORBITAL CORRESPONDENCE STATION</span>
        </div>
      </div>

      {/* Middle: System Telemetry */}
      <div className="hidden md:flex items-center gap-6 font-mono text-xs text-muted">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-foreground font-semibold">SYSTEM OK</span>
        </div>
        <div className="hidden xl:flex items-center gap-2 text-muted">
          <Activity className="w-3.5 h-3.5 text-cyan" />
          <span>EPHEMERIS: MOON 2000 IAU</span>
        </div>
        <div className="hidden 2xl:flex items-center gap-2 text-muted">
          <span>LAT: -72.90° // LON: 43.20°</span>
        </div>
      </div>

      {/* Right: Quick Action Demo Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleLaunchDemo}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-cyan/15 hover:bg-cyan/25 border border-cyan/40 text-cyan text-xs font-mono font-bold tracking-wider transition-all shadow-cyan-glow"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>TRY DEMO</span>
        </button>

        <Link
          href="/"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-dark hover:bg-panel border border-panel-border text-muted hover:text-foreground text-xs font-mono transition-colors"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>DOCS</span>
        </Link>
      </div>
    </header>
  );
};
