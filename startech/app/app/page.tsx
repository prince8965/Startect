"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  Layers,
  Play,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { HISTORICAL_JOBS } from "@/lib/mockData";

export default function MissionControlOverview() {
  const kpis = [
    {
      label: "TOTAL REGISTRATIONS",
      value: "128",
      sub: "+14 this cycle",
      icon: Layers,
      color: "text-cyan",
      border: "border-cyan/30",
    },
    {
      label: "SUCCESS RATE",
      value: "94.6%",
      sub: "Inlier convergence > 70%",
      icon: CheckCircle2,
      color: "text-success",
      border: "border-success/30",
    },
    {
      label: "AVG RMSE",
      value: "1.14 px",
      sub: "Sub-pixel geometric accuracy",
      icon: Compass,
      color: "text-cyan",
      border: "border-cyan/30",
    },
    {
      label: "AVG INLIER RATIO",
      value: "88.2%",
      sub: "Robust consensus consensus",
      icon: ShieldCheck,
      color: "text-orbital",
      border: "border-orbital/30",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto relative z-10">
      {/* Top Banner: Mission Control Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg bg-surface-dark/85 backdrop-blur-md border border-panel-border reticle-corner shadow-panel-glow">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan mb-1">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span>SIH 2026 // PS 26166 CORRESPONDENCE SUITE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold text-foreground tracking-tight">
            MISSION CONTROL OVERVIEW
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 font-light">
            Autonomous multi-sensor lunar terrain registration and sub-pixel correspondence verification.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/app/registration?demo=true"
            className="flex items-center gap-2 px-4 py-2.5 rounded bg-cyan text-background font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-cyan-glow group"
          >
            <Sparkles className="w-4 h-4" />
            <span>TRY DEMO MISSION</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/app/registration"
            className="flex items-center gap-2 px-4 py-2.5 rounded bg-panel hover:bg-panel-hover border border-panel-border text-foreground font-mono text-xs font-semibold tracking-wider transition-colors"
          >
            <Zap className="w-4 h-4 text-cyan" />
            <span>NEW REGISTRATION</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-lg bg-panel/85 backdrop-blur-md border ${kpi.border} shadow-lg relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono tracking-widest text-muted">
                  {kpi.label}
                </span>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <div className={`text-3xl font-mono font-bold ${kpi.color} mb-1 tracking-tight`}>
                {kpi.value}
              </div>
              <div className="text-[11px] font-mono text-muted/80">
                {kpi.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-Column Section: Demo Mission Showcase + Telemetry Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Featured Benchmark Mission */}
        <div className="lg:col-span-2 rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border p-6 reticle-corner shadow-lg">
          <div className="flex items-center justify-between border-b border-panel-border pb-4 mb-4">
            <div>
              <div className="text-[11px] font-mono text-cyan">ACTIVE REFERENCE ALIGNMENT</div>
              <h2 className="text-base font-mono font-bold text-foreground mt-0.5">
                CH-2 OHRC (0.25m) ↔ NASA LRO NAC (0.50m)
              </h2>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-success/15 border border-success/30 text-success">
              RMSE: 0.84 px
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="relative rounded overflow-hidden border border-panel-border aspect-[4/3]">
              <div className="absolute top-2 left-2 z-10 text-[9px] font-mono px-1.5 py-0.5 rounded bg-background/80 text-cyan border border-cyan/30">
                SOURCE: OHRC
              </div>
              <img
                src="/demo/source_ohrc.svg"
                alt="OHRC Observation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative rounded overflow-hidden border border-panel-border aspect-[4/3]">
              <div className="absolute top-2 left-2 z-10 text-[9px] font-mono px-1.5 py-0.5 rounded bg-background/80 text-orbital border border-orbital/30">
                WARPED ALIGNMENT
              </div>
              <img
                src="/demo/registered_warp.svg"
                alt="Registered Observation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-panel-border text-xs font-mono text-muted">
            <span>Terrain: Boguslawsky South-East Rim</span>
            <div className="flex gap-4">
              <Link href="/app/visualization" className="text-cyan hover:underline flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" /> Inspect Matches
              </Link>
              <Link href="/app/results" className="text-success hover:underline flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> Before/After Slider
              </Link>
            </div>
          </div>
        </div>

        {/* Right Col: Sensor Coverage & Algorithmic Presets */}
        <div className="space-y-6">
          <div className="rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border p-5">
            <h3 className="text-xs font-mono tracking-widest text-muted uppercase mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan" />
              <span>ORBITAL SENSOR INTEGRITY</span>
            </h3>

            <div className="space-y-3">
              {[
                { name: "Chandrayaan-2 OHRC", status: "Calibrated", res: "0.25 m", ping: "Ready" },
                { name: "Chandrayaan-2 TMC-2", status: "Online", res: "5.0 m", ping: "Ready" },
                { name: "NASA LRO NAC", status: "Calibrated", res: "0.50 m", ping: "Ready" },
                { name: "JAXA SELENE TC", status: "Archived", res: "10.0 m", ping: "Ready" },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded bg-surface-dark border border-panel-border/60 text-xs font-mono"
                >
                  <div>
                    <div className="text-foreground font-medium">{s.name}</div>
                    <div className="text-[10px] text-muted">{s.res} / pixel</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-success/15 text-success border border-success/30 font-semibold">
                    {s.ping}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border p-5">
            <h3 className="text-xs font-mono tracking-widest text-muted uppercase mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan" />
              <span>SIH DEMO SHORTCUT</span>
            </h3>
            <p className="text-xs text-muted leading-relaxed mb-4">
              Need to demonstrate to jury members immediately? The demo pre-loads high-resolution Chandrayaan-2
              and NASA LRO crater coordinates with zero upload wait times.
            </p>
            <Link
              href="/app/registration?demo=true"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded bg-cyan/15 hover:bg-cyan/25 text-cyan border border-cyan/40 text-xs font-mono font-bold transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-cyan" />
              <span>LAUNCH 1-CLICK DEMO</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Processing Jobs Summary */}
      <div className="rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] font-mono text-cyan">MISSION AUDIT LOG</div>
            <h3 className="text-base font-mono font-bold text-foreground">
              RECENT REGISTRATION JOBS
            </h3>
          </div>
          <Link
            href="/app/jobs"
            className="text-xs font-mono text-cyan hover:underline flex items-center gap-1"
          >
            <span>View All Jobs</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-panel-border text-muted text-[11px]">
                <th className="pb-3 font-semibold">JOB ID</th>
                <th className="pb-3 font-semibold">SOURCE</th>
                <th className="pb-3 font-semibold">REFERENCE</th>
                <th className="pb-3 font-semibold">DETECTOR / MATCHER</th>
                <th className="pb-3 font-semibold">STATUS</th>
                <th className="pb-3 font-semibold">RMSE</th>
                <th className="pb-3 font-semibold">INLIER RATIO</th>
                <th className="pb-3 font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panel-border/60">
              {HISTORICAL_JOBS.slice(0, 3).map((job) => (
                <tr key={job.id} className="hover:bg-surface-dark/50 transition-colors">
                  <td className="py-3 font-bold text-cyan">{job.id}</td>
                  <td className="py-3 text-foreground">
                    {job.source.mission} ({job.source.instrument})
                  </td>
                  <td className="py-3 text-foreground">
                    {job.reference.mission} ({job.reference.instrument})
                  </td>
                  <td className="py-3 text-muted">
                    {job.algorithm.detector} + {job.algorithm.matcher}
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] bg-success/15 text-success border border-success/30 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                      COMPLETED
                    </span>
                  </td>
                  <td className="py-3 text-foreground font-semibold">
                    {job.metrics.rmse} px
                  </td>
                  <td className="py-3 text-success font-semibold">
                    {job.metrics.inlierRatio}%
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href="/app/results"
                      className="px-2.5 py-1 rounded bg-panel border border-panel-border hover:border-cyan/50 text-cyan text-[11px] transition-colors"
                    >
                      View Result
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


