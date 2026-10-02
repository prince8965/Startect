"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  Filter,
  History,
  Layers,
  Search,
  XCircle,
  Zap,
} from "lucide-react";
import { HISTORICAL_JOBS } from "@/lib/mockData";

export default function ProcessingJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "failed">("all");

  const filteredJobs = HISTORICAL_JOBS.filter((job) => {
    const matchesSearch =
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.source.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.reference.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.algorithm.detector.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg bg-surface-dark border border-panel-border reticle-corner shadow-panel-glow">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan mb-1">
            <History className="w-3.5 h-3.5" />
            <span>MISSION REGISTRATION LEDGER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold text-foreground tracking-tight">
            PROCESSING JOBS
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 font-light">
            Audit history of multi-sensor orbital correspondences and geometric registration results.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app/registration"
            className="flex items-center gap-2 px-4 py-2 rounded bg-cyan text-background font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-cyan-glow"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>NEW JOB</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-lg bg-panel border border-panel-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Job ID, sensor, mission, or algorithm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-dark border border-panel-border rounded pl-9 pr-4 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-cyan"
          />
        </div>

        {/* Status Filter buttons */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-muted">FILTER:</span>
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded transition-colors ${
              statusFilter === "all"
                ? "bg-cyan text-background font-bold"
                : "bg-surface-dark text-muted hover:text-foreground border border-panel-border"
            }`}
          >
            ALL ({HISTORICAL_JOBS.length})
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            className={`px-3 py-1.5 rounded transition-colors ${
              statusFilter === "completed"
                ? "bg-success text-background font-bold"
                : "bg-surface-dark text-success hover:bg-success/10 border border-success/30"
            }`}
          >
            COMPLETED
          </button>
        </div>
      </div>

      {/* Jobs History Table */}
      <div className="rounded-lg bg-panel border border-panel-border p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-panel-border text-muted text-[11px]">
                <th className="pb-3 font-semibold">JOB ID</th>
                <th className="pb-3 font-semibold">SOURCE PAIR</th>
                <th className="pb-3 font-semibold">ALGORITHM SUITE</th>
                <th className="pb-3 font-semibold">STATUS</th>
                <th className="pb-3 font-semibold">RMSE</th>
                <th className="pb-3 font-semibold">INLIERS</th>
                <th className="pb-3 font-semibold">INLIER RATIO</th>
                <th className="pb-3 font-semibold">TIMESTAMP</th>
                <th className="pb-3 font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panel-border/60">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-surface-dark/60 transition-colors">
                  <td className="py-3.5 font-bold text-cyan">{job.id}</td>
                  <td className="py-3.5 text-foreground">
                    <div className="font-semibold">
                      {job.source.mission} ({job.source.instrument})
                    </div>
                    <div className="text-[10px] text-muted">
                      → {job.reference.mission} ({job.reference.instrument})
                    </div>
                  </td>
                  <td className="py-3.5 text-muted">
                    <div className="text-foreground font-medium">
                      {job.algorithm.detector} + {job.algorithm.matcher}
                    </div>
                    <div className="text-[10px] text-muted">
                      {job.algorithm.outlierRejection} • {job.algorithm.transform}
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] bg-success/15 text-success border border-success/30 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                      COMPLETED
                    </span>
                  </td>
                  <td className="py-3.5 font-bold text-success">{job.metrics.rmse} px</td>
                  <td className="py-3.5 text-foreground">
                    {job.metrics.inliers.toLocaleString()}
                  </td>
                  <td className="py-3.5 font-bold text-cyan">{job.metrics.inlierRatio}%</td>
                  <td className="py-3.5 text-muted text-[11px]">{job.timestamp}</td>
                  <td className="py-3.5 text-right">
                    <Link
                      href="/app/results"
                      className="px-3 py-1.5 rounded bg-surface-dark hover:bg-panel border border-panel-border hover:border-cyan/50 text-cyan text-xs font-semibold transition-colors"
                    >
                      Inspect Result
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-panel-border text-xs font-mono text-muted flex items-center justify-between">
          <span>Showing {filteredJobs.length} of {HISTORICAL_JOBS.length} jobs</span>
          <span className="text-cyan">FASTAPI ASYNC LOG COMPLIANT</span>
        </div>
      </div>
    </div>
  );
}
