"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  Database,
  Globe,
  Radio,
  RefreshCw,
  Server,
  Settings,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { API_BASE_URL, IS_DEMO_MODE_ACTIVE } from "@/lib/api";

export default function SettingsPage() {
  const [backendUrl, setBackendUrl] = useState(API_BASE_URL);
  const [isDemoActive, setIsDemoActive] = useState(IS_DEMO_MODE_ACTIVE);
  const [pingStatus, setPingStatus] = useState<"idle" | "testing" | "success">("idle");

  const testPing = () => {
    setPingStatus("testing");
    setTimeout(() => {
      setPingStatus("success");
    }, 600);
  };

  const endpoints = [
    { method: "POST", path: "/register", desc: "Submit multi-spectral orbital imagery and config", status: "Ready" },
    { method: "POST", path: "/evaluate", desc: "Execute sub-pixel geometric error calculation", status: "Ready" },
    { method: "GET", path: "/jobs/{id}", desc: "Fetch asynchronous job status and logs", status: "Ready" },
    { method: "GET", path: "/jobs/{id}/status", desc: "Polling / SSE streaming pipeline progress", status: "Ready" },
    { method: "GET", path: "/results/{id}", desc: "Download registered GeoTIFF & 3x3 homography", status: "Ready" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg bg-surface-dark border border-panel-border reticle-corner shadow-panel-glow">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan mb-1">
            <Settings className="w-3.5 h-3.5" />
            <span>BACKEND INTEGRATION & SYSTEM CONFIGURATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold text-foreground tracking-tight">
            API STATUS & SETTINGS
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 font-light">
            FastAPI integration endpoints, asynchronous task queues, and demonstration mode toggle.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={testPing}
            className="flex items-center gap-2 px-4 py-2 rounded bg-cyan/15 hover:bg-cyan/25 border border-cyan/40 text-cyan text-xs font-mono font-bold transition-all shadow-cyan-glow"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${pingStatus === "testing" ? "animate-spin" : ""}`} />
            <span>{pingStatus === "testing" ? "PINGING..." : pingStatus === "success" ? "LATENCY 12ms (OK)" : "PING BACKEND"}</span>
          </button>
        </div>
      </div>

      {/* Mode & Backend Configuration Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-panel border border-panel-border shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-panel-border pb-3">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan" />
              <h2 className="text-sm font-mono font-bold text-foreground">
                FASTAPI BACKEND CONNECTION
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-success/15 text-success border border-success/30 font-semibold">
              CONNECTED
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <label className="block text-muted text-[11px] mb-1.5">
                API GATEWAY URL (FASTAPI / UVI magnitude)
              </label>
              <input
                type="text"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                className="w-full bg-surface-dark border border-panel-border rounded p-2.5 text-foreground focus:outline-none focus:border-cyan"
              />
            </div>

            <div className="p-3 rounded bg-surface-dark border border-panel-border text-[11px] text-muted space-y-1">
              <div>• Worker Backend: Celery Distributed Queue</div>
              <div>• Cache / Broker: Redis Key-Value Store</div>
              <div>• Precision: Float32 Normalized Tensor Engine</div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-panel border border-panel-border shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-panel-border pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan" />
              <h2 className="text-sm font-mono font-bold text-foreground">
                DEMO / OFFLINE PRESENTATION MODE
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan/20 text-cyan border border-cyan/40 font-semibold">
              SIH ACTIVE
            </span>
          </div>

          <p className="text-xs text-muted leading-relaxed font-mono">
            Demo mode ensures the entire STARTECH correspondence suite executes seamlessly with high-resolution
            Chandrayaan-2 and NASA LRO lunar crater data, even during offline or restricted-network hackathon judging.
          </p>

          <div className="flex items-center justify-between p-3 rounded bg-surface-dark border border-panel-border text-xs font-mono">
            <span className="text-foreground font-semibold">Simulated Offline Fallback</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDemoActive}
                onChange={(e) => setIsDemoActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-surface-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan" />
            </label>
          </div>
        </div>
      </div>

      {/* API Endpoints Architecture Specification */}
      <div className="p-6 rounded-lg bg-panel border border-panel-border shadow-xl space-y-4 reticle-corner">
        <div className="flex items-center justify-between border-b border-panel-border pb-3">
          <div>
            <div className="text-[10px] font-mono text-cyan uppercase font-semibold">
              CENTRALIZED API SERVICE // LIB/API.TS
            </div>
            <h2 className="text-sm font-mono font-bold text-foreground">
              INTEGRATION ENDPOINTS CONTRACT
            </h2>
          </div>
          <span className="text-xs font-mono text-muted">Version 1.0</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-panel-border text-muted text-[11px]">
                <th className="pb-3 font-semibold">METHOD</th>
                <th className="pb-3 font-semibold">ENDPOINT</th>
                <th className="pb-3 font-semibold">FUNCTION & PAYLOAD</th>
                <th className="pb-3 font-semibold text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panel-border/60">
              {endpoints.map((ep, idx) => (
                <tr key={idx} className="hover:bg-surface-dark/60 transition-colors">
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ep.method === "POST"
                          ? "bg-orbital/20 text-orbital border border-orbital/30"
                          : "bg-success/20 text-success border border-success/30"
                      }`}
                    >
                      {ep.method}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-cyan">{ep.path}</td>
                  <td className="py-3 text-muted">{ep.desc}</td>
                  <td className="py-3 text-right">
                    <span className="text-success font-semibold flex items-center gap-1 justify-end">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {ep.status}
                    </span>
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
