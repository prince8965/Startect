"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Check,
  Cpu,
  HelpCircle,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { ALGORITHM_LAB_DATA } from "@/lib/mockData";

export default function AlgorithmLabPage() {
  const [selectedAlgo, setSelectedAlgo] = useState(ALGORITHM_LAB_DATA[0].detector);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg bg-surface-dark border border-panel-border reticle-corner shadow-panel-glow">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>BENCHMARKING & ALGORITHM EVALUATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold text-foreground tracking-tight">
            ALGORITHM LAB
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 font-light">
            Compare classical computer vision vs modern attentional deep learning pipelines on lunar terrain.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app/registration"
            className="flex items-center gap-2 px-4 py-2 rounded bg-cyan text-background font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-cyan-glow"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>RUN PIPELINE</span>
          </Link>
        </div>
      </div>

      {/* Recommended Architecture Spotlight Card */}
      <div className="p-6 rounded-lg bg-panel border border-cyan/40 shadow-xl reticle-corner space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan">
            <Award className="w-4 h-4 text-cyan" />
            <span className="font-bold">STARTECH DEFAULT RECOMMENDED ARCHITECTURE</span>
          </div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-cyan/20 text-cyan border border-cyan/40 font-bold">
            BEST INLIER CONVERGENCE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-xl font-mono font-bold text-foreground">
              SuperPoint (Deep Feature Extraction) + LightGlue (Attentional GNN)
            </h2>
            <p className="text-xs text-muted leading-relaxed">
              Traditional keypoint descriptors (SIFT, ORB, SURF) compute gradients across local intensity patches.
              On the Moon, when the solar elevation changes between orbital passes, crater rims completely swap their
              shadows and highlights, causing classical gradient descriptors to fail.
            </p>
            <p className="text-xs text-muted leading-relaxed">
              SuperPoint learns geometric invariance directly from planetary surface textures, while LightGlue uses
              graph neural attention to contextually discard lighting outliers, resulting in 92.7% inlier retention
              and sub-pixel 0.84 px RMSE.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs bg-surface-dark/80 p-4 rounded-lg border border-panel-border">
            <div>
              <span className="text-muted text-[10px]">AVG RMSE</span>
              <div className="text-2xl font-bold text-success mt-0.5">0.84 px</div>
            </div>
            <div>
              <span className="text-muted text-[10px]">INLIER RATIO</span>
              <div className="text-2xl font-bold text-cyan mt-0.5">92.7%</div>
            </div>
            <div>
              <span className="text-muted text-[10px]">LATENCY</span>
              <div className="text-2xl font-bold text-foreground mt-0.5">8.4 s</div>
            </div>
            <div>
              <span className="text-muted text-[10px]">REPEATABILITY</span>
              <div className="text-2xl font-bold text-orbital mt-0.5">91.4%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Algorithm Comparison Table (Section 26) */}
      <div className="rounded-lg bg-panel border border-panel-border p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-panel-border pb-4">
          <div>
            <div className="text-[10px] font-mono text-cyan uppercase font-semibold">
              CROSS-ALGORITHM BENCHMARK MATRIX
            </div>
            <h3 className="text-base font-mono font-bold text-foreground">
              PERFORMANCE ON BOGUSLAWSKY CRATER SENSOR PAIR
            </h3>
          </div>
          <span className="text-xs font-mono text-muted">
            Chandrayaan-2 OHRC (0.25m) vs NASA LRO NAC (0.50m)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-panel-border text-muted text-[11px]">
                <th className="pb-3 font-semibold">ALGORITHM SUITE</th>
                <th className="pb-3 font-semibold">PARADIGM</th>
                <th className="pb-3 font-semibold">KEYPOINTS</th>
                <th className="pb-3 font-semibold">MATCHES</th>
                <th className="pb-3 font-semibold">INLIERS</th>
                <th className="pb-3 font-semibold">INLIER RATIO</th>
                <th className="pb-3 font-semibold">RMSE</th>
                <th className="pb-3 font-semibold">RUN TIME</th>
                <th className="pb-3 font-semibold">LIGHTING ROBUSTNESS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panel-border/60">
              {ALGORITHM_LAB_DATA.map((item, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-surface-dark/60 transition-colors ${
                    item.recommended ? "bg-cyan/5" : ""
                  }`}
                >
                  <td className="py-3 font-bold text-foreground flex items-center gap-2">
                    {item.recommended && <Sparkles className="w-3.5 h-3.5 text-cyan" />}
                    <span>{item.detector}</span>
                  </td>
                  <td className="py-3 text-muted text-[11px]">{item.type}</td>
                  <td className="py-3 text-foreground">{item.keypoints}</td>
                  <td className="py-3 text-foreground">{item.candidateMatches}</td>
                  <td className="py-3 text-foreground font-semibold">{item.inliers}</td>
                  <td className="py-3 font-bold text-cyan">{item.inlierRatio}</td>
                  <td className="py-3 font-bold text-success">{item.rmse}</td>
                  <td className="py-3 text-muted">{item.processingTime}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        item.illuminationRobustness === "Superior"
                          ? "bg-success/20 text-success border border-success/30"
                          : item.illuminationRobustness.includes("High")
                          ? "bg-cyan/20 text-cyan border border-cyan/30"
                          : "bg-surface-dark text-muted border border-panel-border"
                      }`}
                    >
                      {item.illuminationRobustness}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-panel-border text-xs font-mono text-muted flex items-center justify-between">
          <span>* Benchmark metrics computed under 12.4° solar elevation shift with polar terrain dataset.</span>
          <span className="text-cyan">FASTAPI INTEGRATION COMPLIANT</span>
        </div>
      </div>
    </div>
  );
}
