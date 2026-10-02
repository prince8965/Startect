"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  FastForward,
  Layers,
  Loader2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { DEMO_PIPELINE_STAGES, DEMO_EVALUATION_METRICS } from "@/lib/mockData";
import { PipelineStage, StageStatus } from "@/types/registration";

export default function ProcessingPage() {
  const router = useRouter();
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0.0);

  // Live progressive metrics
  const [liveKeypoints, setLiveKeypoints] = useState(0);
  const [liveCandidates, setLiveCandidates] = useState(0);
  const [liveInliers, setLiveInliers] = useState(0);
  const [liveInlierRatio, setLiveInlierRatio] = useState(0.0);

  // Timer for elapsed seconds
  useEffect(() => {
    if (isCompleted) return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => +(prev + 0.1).toFixed(1));
    }, 100);
    return () => clearInterval(timer);
  }, [isCompleted]);

  // Progressive stage advancement
  useEffect(() => {
    if (currentStageIdx >= DEMO_PIPELINE_STAGES.length) {
      setIsCompleted(true);
      return;
    }

    const interval = setTimeout(() => {
      // Update metrics based on stage
      if (currentStageIdx === 2) {
        // Detection stage
        setLiveKeypoints(12482);
      } else if (currentStageIdx === 3) {
        // Matching stage
        setLiveCandidates(4921);
      } else if (currentStageIdx === 4) {
        // RANSAC filtering stage
        setLiveInliers(3847);
        setLiveInlierRatio(78.2);
      } else if (currentStageIdx === 5) {
        // Transform stage
        setLiveInlierRatio(92.7);
      }

      if (currentStageIdx < DEMO_PIPELINE_STAGES.length - 1) {
        setCurrentStageIdx((prev) => prev + 1);
      } else {
        setIsCompleted(true);
      }
    }, 1200); // 1.2s per stage

    return () => clearTimeout(interval);
  }, [currentStageIdx]);

  // Fast forward to completed state
  const handleFastForward = () => {
    setCurrentStageIdx(DEMO_PIPELINE_STAGES.length - 1);
    setLiveKeypoints(12482);
    setLiveCandidates(4921);
    setLiveInliers(3847);
    setLiveInlierRatio(92.7);
    setElapsedSeconds(8.4);
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setCurrentStageIdx(0);
    setIsCompleted(false);
    setElapsedSeconds(0.0);
    setLiveKeypoints(0);
    setLiveCandidates(0);
    setLiveInliers(0);
    setLiveInlierRatio(0.0);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg bg-surface-dark/85 backdrop-blur-md border border-panel-border reticle-corner shadow-panel-glow">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
            <span>LIVE EXECUTION TELEMETRY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold text-foreground tracking-tight">
            {isCompleted ? "REGISTRATION COMPLETED" : "STARTECH PROCESSING"}
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 font-light">
            Aligning Chandrayaan-2 OHRC (Source) to NASA LRO NAC (Reference).
          </p>
        </div>

        {/* Status controls */}
        <div className="flex items-center gap-3">
          {!isCompleted ? (
            <button
              onClick={handleFastForward}
              className="flex items-center gap-2 px-3.5 py-2 rounded bg-surface-dark hover:bg-panel border border-panel-border text-xs font-mono text-cyan transition-colors"
            >
              <FastForward className="w-4 h-4" />
              <span>SKIP ANIMATION</span>
            </button>
          ) : (
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-3.5 py-2 rounded bg-surface-dark hover:bg-panel border border-panel-border text-xs font-mono text-muted hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>REPLAY PIPELINE</span>
            </button>
          )}

          {isCompleted && (
            <Link
              href="/app/visualization"
              className="flex items-center gap-2 px-4 py-2 rounded bg-cyan text-background font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-cyan-glow"
            >
              <span>INSPECT MATCHES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Live Processing Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border">
          <div className="text-[10px] font-mono text-muted uppercase">KEYPOINTS DETECTED</div>
          <div className="text-2xl font-mono font-bold text-cyan mt-1">
            {liveKeypoints > 0 ? liveKeypoints.toLocaleString() : "..."}
          </div>
          <div className="text-[10px] font-mono text-muted/80 mt-0.5">SuperPoint extract</div>
        </div>

        <div className="p-4 rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border">
          <div className="text-[10px] font-mono text-muted uppercase">CANDIDATE MATCHES</div>
          <div className="text-2xl font-mono font-bold text-orbital mt-1">
            {liveCandidates > 0 ? liveCandidates.toLocaleString() : "..."}
          </div>
          <div className="text-[10px] font-mono text-muted/80 mt-0.5">LightGlue GNN</div>
        </div>

        <div className="p-4 rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border">
          <div className="text-[10px] font-mono text-muted uppercase">RANSAC INLIERS</div>
          <div className="text-2xl font-mono font-bold text-success mt-1">
            {liveInliers > 0 ? liveInliers.toLocaleString() : "..."}
          </div>
          <div className="text-[10px] font-mono text-muted/80 mt-0.5">Geometrically verified</div>
        </div>

        <div className="p-4 rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border">
          <div className="text-[10px] font-mono text-muted uppercase">INLIER RATIO</div>
          <div className="text-2xl font-mono font-bold text-foreground mt-1">
            {liveInlierRatio > 0 ? `${liveInlierRatio}%` : "..."}
          </div>
          <div className="text-[10px] font-mono text-muted/80 mt-0.5">Consensus threshold</div>
        </div>

        <div className="p-4 rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border">
          <div className="text-[10px] font-mono text-muted uppercase">PROCESSING TIME</div>
          <div className="text-2xl font-mono font-bold text-cyan mt-1">
            {elapsedSeconds.toFixed(1)} s
          </div>
          <div className="text-[10px] font-mono text-muted/80 mt-0.5">Elapsed time</div>
        </div>
      </div>

      {/* 7-Stage Pipeline Live Progression Card */}
      <div className="rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border p-6 reticle-corner shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-panel-border pb-3">
          <div className="font-mono text-xs text-muted flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan" />
            <span>PROGRESSION TIMELINE // 7 STAGES</span>
          </div>
          <div className="text-xs font-mono text-cyan font-semibold">
            {isCompleted
              ? "ALL STAGES VERIFIED (100%)"
              : `RUNNING STAGE ${currentStageIdx + 1} OF 7 (${Math.round(
                  ((currentStageIdx + 0.5) / 7) * 100
                )}%)`}
          </div>
        </div>

        {/* Stage List */}
        <div className="space-y-3 pt-2">
          {DEMO_PIPELINE_STAGES.map((st, idx) => {
            const isStageDone = idx < currentStageIdx || isCompleted;
            const isStageActive = idx === currentStageIdx && !isCompleted;
            const isStagePending = idx > currentStageIdx && !isCompleted;

            return (
              <div
                key={st.id}
                className={`p-4 rounded-lg border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isStageDone
                    ? "bg-surface-dark border-panel-border text-foreground"
                    : isStageActive
                    ? "bg-cyan/10 border-cyan text-foreground shadow-cyan-glow animate-pulse"
                    : "bg-surface-dark/40 border-panel-border/40 text-muted opacity-60"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Status icon */}
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                    {isStageDone ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : isStageActive ? (
                      <Loader2 className="w-5 h-5 text-cyan animate-spin" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border border-muted" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold tracking-wider text-cyan">
                        {st.stepNumber}
                      </span>
                      <span className="font-mono text-sm font-bold">{st.title}</span>
                    </div>
                    <div className="text-xs text-muted mt-0.5">{st.subtitle}</div>
                  </div>
                </div>

                {/* Algorithmic Details & Timing */}
                <div className="flex items-center gap-4 md:text-right">
                  <div className="hidden sm:block">
                    <div className="text-[11px] font-mono text-cyan/90">
                      {st.algorithms.join(" • ")}
                    </div>
                    <div className="text-[10px] font-mono text-muted/70 mt-0.5">
                      {isStageDone
                        ? `Finished in ${st.durationMs}ms`
                        : isStageActive
                        ? "Calculating..."
                        : "Queued"}
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2.5 py-1 rounded font-semibold uppercase ${
                      isStageDone
                        ? "bg-success/15 text-success border border-success/30"
                        : isStageActive
                        ? "bg-cyan/20 text-cyan border border-cyan/40"
                        : "bg-surface-dark text-muted border border-panel-border"
                    }`}
                  >
                    {isStageDone ? "DONE" : isStageActive ? "ACTIVE" : "WAITING"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Call to Action */}
        {isCompleted && (
          <div className="mt-8 p-6 rounded-lg bg-surface-dark border border-success/40 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-500 shadow-panel-glow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/15 border border-success/40 flex items-center justify-center text-success shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="font-mono text-sm font-bold text-foreground">
                  REGISTRATION CONVERGED SUCCESSFULLY
                </div>
                <div className="text-xs font-mono text-muted mt-0.5">
                  Final Sub-Pixel RMSE: <span className="text-success font-semibold">0.84 px</span> • Inliers:{" "}
                  <span className="text-cyan font-semibold">3,847 (92.7%)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/app/visualization"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded bg-surface-dark hover:bg-panel border border-cyan/40 text-cyan text-xs font-mono font-bold tracking-wider text-center transition-colors"
              >
                FEATURE MATCHES
              </Link>
              <Link
                href="/app/results"
                className="flex-1 sm:flex-none px-5 py-2.5 rounded bg-cyan text-background text-xs font-mono font-bold tracking-wider text-center hover:bg-white transition-all shadow-cyan-glow flex items-center justify-center gap-2"
              >
                <span>VIEW RESULTS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
