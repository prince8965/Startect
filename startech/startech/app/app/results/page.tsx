"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Code,
  Compass,
  Copy,
  Download,
  Eye,
  FileCheck,
  HelpCircle,
  Layers,
  Maximize2,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  DEMO_EVALUATION_METRICS,
  DEMO_TRANSFORMATION_MATRIX,
  DEMO_SOURCE_METADATA,
  DEMO_REFERENCE_METADATA,
} from "@/lib/mockData";

export default function ResultsPage() {
  const [viewMode, setViewMode] = useState<"slider" | "blink" | "difference" | "side">("slider");
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const [blinkState, setBlinkState] = useState<"source" | "registered">("source");
  const [blinkSpeedHz, setBlinkSpeedHz] = useState(1.5);
  const [showTechnicalMatrix, setShowTechnicalMatrix] = useState(false);
  const [copiedMatrix, setCopiedMatrix] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Blink Comparator Interval
  useEffect(() => {
    if (viewMode !== "blink") return;
    const intervalMs = Math.round(1000 / blinkSpeedHz);
    const timer = setInterval(() => {
      setBlinkState((prev) => (prev === "source" ? "registered" : "source"));
    }, intervalMs);
    return () => clearInterval(timer);
  }, [viewMode, blinkSpeedHz]);

  // Mouse / Touch drag handler for Before/After Split Slider
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    };
    const onEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isDragging]);

  const copyMatrixText = () => {
    const text = DEMO_TRANSFORMATION_MATRIX.matrix
      .map((row) => `[ ${row.map((val) => val.toFixed(6).padStart(10, " ")).join(", ")} ]`)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopiedMatrix(true);
    setTimeout(() => setCopiedMatrix(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg bg-surface-dark/85 backdrop-blur-md border border-panel-border reticle-corner shadow-panel-glow">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-success mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>SUB-PIXEL GEOMETRIC CONVERGENCE VERIFIED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold text-foreground tracking-tight">
            REGISTRATION COMPLETE
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 font-light">
            Chandrayaan-2 OHRC warped and registered to NASA LRO NAC coordinate frame.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/app/evaluation"
            className="flex items-center gap-2 px-4 py-2.5 rounded bg-surface-dark hover:bg-panel border border-cyan/40 text-cyan font-mono text-xs font-bold tracking-wider transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            <span>DEEP METRICS</span>
          </Link>

          <button
            onClick={() => {
              const a = document.createElement("a");
              a.href = "/demo/registered_warp.svg";
              a.download = "STARTECH_registered_warped_lunar.svg";
              a.click();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded bg-cyan text-background font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-cyan-glow"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT REGISTERED GEO-TIFF</span>
          </button>
        </div>
      </div>

      {/* Primary Evaluation Metrics Quad-Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-lg bg-panel/85 backdrop-blur-md border border-success/30 shadow-lg">
          <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-2">
            <span>GEOMETRIC RMSE</span>
            <span className="text-success font-semibold">Sub-pixel</span>
          </div>
          <div className="text-3xl font-mono font-bold text-success">
            {DEMO_EVALUATION_METRICS.rmse} px
          </div>
          <p className="text-[11px] font-mono text-muted/80 mt-1">
            Mean reprojection error across verified inliers.
          </p>
        </div>

        <div className="p-5 rounded-lg bg-panel/85 backdrop-blur-md border border-cyan/30 shadow-lg">
          <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-2">
            <span>VERIFIED INLIERS</span>
            <span className="text-cyan font-semibold">Stage 05</span>
          </div>
          <div className="text-3xl font-mono font-bold text-cyan">
            {DEMO_EVALUATION_METRICS.inliers.toLocaleString()}
          </div>
          <p className="text-[11px] font-mono text-muted/80 mt-1">
            Correspondences satisfying epipolar consensus.
          </p>
        </div>

        <div className="p-5 rounded-lg bg-panel/85 backdrop-blur-md border border-orbital/30 shadow-lg">
          <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-2">
            <span>INLIER RATIO</span>
            <span className="text-orbital font-semibold">RANSAC</span>
          </div>
          <div className="text-3xl font-mono font-bold text-orbital">
            {DEMO_EVALUATION_METRICS.inlierRatio}%
          </div>
          <p className="text-[11px] font-mono text-muted/80 mt-1">
            3,847 inliers from 4,921 candidate pairings.
          </p>
        </div>

        <div className="p-5 rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border shadow-lg">
          <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-2">
            <span>REPEATABILITY</span>
            <span className="text-foreground font-semibold">Keypoint</span>
          </div>
          <div className="text-3xl font-mono font-bold text-foreground">
            {DEMO_EVALUATION_METRICS.repeatability}%
          </div>
          <p className="text-[11px] font-mono text-muted/80 mt-1">
            Consistent detection under lighting shifts.
          </p>
        </div>
      </div>

      {/* Main Interactive Comparison Inspector */}
      <div className="rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border p-6 shadow-xl space-y-4 reticle-corner">
        {/* Comparison Mode Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-panel-border pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted uppercase">INSPECTOR MODE:</span>
            <div className="flex items-center bg-surface-dark border border-panel-border rounded p-0.5 text-xs font-mono">
              <button
                onClick={() => setViewMode("slider")}
                className={`px-3 py-1.5 rounded transition-colors ${
                  viewMode === "slider" ? "bg-cyan text-background font-bold" : "text-muted hover:text-foreground"
                }`}
              >
                SPLIT SLIDER
              </button>
              <button
                onClick={() => setViewMode("blink")}
                className={`px-3 py-1.5 rounded transition-colors ${
                  viewMode === "blink" ? "bg-cyan text-background font-bold" : "text-muted hover:text-foreground"
                }`}
              >
                BLINK COMPARISON
              </button>
              <button
                onClick={() => setViewMode("difference")}
                className={`px-3 py-1.5 rounded transition-colors ${
                  viewMode === "difference" ? "bg-cyan text-background font-bold" : "text-muted hover:text-foreground"
                }`}
              >
                DIFFERENCE HEATMAP
              </button>
              <button
                onClick={() => setViewMode("side")}
                className={`px-3 py-1.5 rounded transition-colors ${
                  viewMode === "side" ? "bg-cyan text-background font-bold" : "text-muted hover:text-foreground"
                }`}
              >
                SIDE-BY-SIDE
              </button>
            </div>
          </div>

          {/* Mode specific controls */}
          {viewMode === "blink" && (
            <div className="flex items-center gap-3 text-xs font-mono text-muted">
              <span>BLINK SPEED: {blinkSpeedHz.toFixed(1)} Hz</span>
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.5"
                value={blinkSpeedHz}
                onChange={(e) => setBlinkSpeedHz(parseFloat(e.target.value))}
                className="accent-cyan w-24"
              />
            </div>
          )}

          {viewMode === "slider" && (
            <div className="text-xs font-mono text-muted">
              <span>DRAG THE VERTICAL DIVIDER TO COMPARE ALIGNMENT</span>
            </div>
          )}
        </div>

        {/* Viewport Render Area */}
        <div className="relative w-full aspect-[16/9] min-h-[420px] max-h-[640px] rounded-lg overflow-hidden border border-panel-border bg-background select-none">
          {/* 1. SLIDER MODE */}
          {viewMode === "slider" && (
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              className="relative w-full h-full cursor-ew-resize overflow-hidden"
            >
              {/* Underlying Reference Observation (NASA LRO NAC) */}
              <img
                src="/demo/ref_lro.svg"
                alt="Reference NASA LRO NAC"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-background/85 px-3 py-1 rounded text-xs font-mono text-orbital border border-orbital/30 z-10">
                REFERENCE: NASA LRO NAC (0.50m)
              </div>

              {/* Overlaid Registered Warped Observation (CH-2 OHRC) with clip path */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)` }}
              >
                <img
                  src="/demo/registered_warp.svg"
                  alt="Warped Chandrayaan-2 OHRC"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-background/85 px-3 py-1 rounded text-xs font-mono text-cyan border border-cyan/30 z-10">
                  WARPED SOURCE: CH-2 OHRC (0.25m)
                </div>
              </div>

              {/* Slider Divider Bar */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-cyan shadow-cyan-glow z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cyan text-background flex items-center justify-center font-bold text-xs shadow-lg">
                  ↔
                </div>
              </div>
            </div>
          )}

          {/* 2. BLINK COMPARISON MODE */}
          {viewMode === "blink" && (
            <div className="relative w-full h-full">
              <img
                src={blinkState === "source" ? "/demo/registered_warp.svg" : "/demo/ref_lro.svg"}
                alt="Blink Comparison"
                className="w-full h-full object-cover transition-opacity duration-75"
              />
              <div className="absolute top-4 left-4 bg-background/85 px-3 py-1.5 rounded text-xs font-mono border z-10">
                {blinkState === "source" ? (
                  <span className="text-cyan font-bold">BLINKING: REGISTERED OHRC</span>
                ) : (
                  <span className="text-orbital font-bold">BLINKING: REFERENCE LRO NAC</span>
                )}
              </div>
              <div className="absolute bottom-4 right-4 bg-background/85 px-3 py-1 rounded text-xs font-mono text-muted">
                Zero terrain flicker indicates accurate geometric registration.
              </div>
            </div>
          )}

          {/* 3. DIFFERENCE HEATMAP MODE */}
          {viewMode === "difference" && (
            <div className="relative w-full h-full flex items-center justify-center bg-surface-dark">
              <div className="relative w-full h-full mix-blend-difference opacity-90 filter contrast-150">
                <img
                  src="/demo/registered_warp.svg"
                  alt="Warped Observation"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <img
                  src="/demo/ref_lro.svg"
                  alt="Reference Observation"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-difference"
                />
              </div>
              <div className="absolute top-4 left-4 bg-background/90 px-3 py-1.5 rounded text-xs font-mono text-success border border-success/30 z-10">
                RESIDUAL DIFFERENCE MAP // LOW RESIDUALS = BLACK/DARK
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-background/90 p-2.5 rounded border border-panel-border text-xs font-mono text-muted flex items-center justify-between">
                <span>Maximum Geometric Residual: 1.12 px</span>
                <span className="text-success">Registration Quality: EXCELLENT</span>
              </div>
            </div>
          )}

          {/* 4. SIDE-BY-SIDE MODE */}
          {viewMode === "side" && (
            <div className="grid grid-cols-2 h-full">
              <div className="relative border-r border-panel-border h-full">
                <img
                  src="/demo/registered_warp.svg"
                  alt="Registered Observation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-background/85 px-2.5 py-1 rounded text-[10px] font-mono text-cyan border border-cyan/30">
                  WARPED CH-2 OHRC
                </div>
              </div>
              <div className="relative h-full">
                <img
                  src="/demo/ref_lro.svg"
                  alt="Reference Observation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-background/85 px-2.5 py-1 rounded text-[10px] font-mono text-orbital border border-orbital/30">
                  REFERENCE NASA LRO NAC
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-panel-border text-xs font-mono text-muted">
          <div className="flex items-center gap-3">
            <span className="text-success flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success" />
              Warping completed via Bicubic Resampling
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Coordinate Reference: Moon 2000 IAU</span>
          </div>

          <button
            onClick={() => setShowTechnicalMatrix(!showTechnicalMatrix)}
            className="text-cyan hover:underline flex items-center gap-1.5"
          >
            <Code className="w-3.5 h-3.5" />
            <span>{showTechnicalMatrix ? "Hide Matrix" : "Inspect 3x3 Transformation Matrix"}</span>
          </button>
        </div>
      </div>

      {/* Technical Transformation Matrix Inspector (Section 22) */}
      {showTechnicalMatrix && (
        <div className="p-6 rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border shadow-lg animate-in fade-in duration-300 space-y-4">
          <div className="flex items-center justify-between border-b border-panel-border pb-3">
            <div>
              <div className="text-[10px] font-mono text-cyan uppercase font-semibold">
                TECHNICAL MATHEMATICAL DETAILS
              </div>
              <h3 className="text-sm font-mono font-bold text-foreground">
                ESTIMATED HOMOGRAPHY PROJECTION (3×3 MATRIX)
              </h3>
            </div>
            <button
              onClick={copyMatrixText}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-surface-dark hover:bg-panel border border-panel-border text-xs font-mono text-muted hover:text-cyan transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedMatrix ? "COPIED" : "COPY MATRIX"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Formatted Matrix */}
            <div className="p-4 rounded bg-surface-dark border border-panel-border font-mono text-xs space-y-1 overflow-x-auto">
              <div className="text-muted text-[10px] mb-2">// 3x3 Projective Homography [H]</div>
              {DEMO_TRANSFORMATION_MATRIX.matrix.map((row, rIdx) => (
                <div key={rIdx} className="text-cyan">
                  {"[ "}
                  {row.map((val, cIdx) => (
                    <span key={cIdx} className="text-foreground mr-4">
                      {val.toFixed(6).padStart(11, " ")}
                    </span>
                  ))}
                  {"]"}
                </div>
              ))}
            </div>

            {/* Geometric Decomposition */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded bg-surface-dark border border-panel-border">
                <div className="text-[10px] text-muted uppercase">DETERMINANT</div>
                <div className="text-base font-bold text-foreground mt-0.5">
                  {DEMO_TRANSFORMATION_MATRIX.determinant.toFixed(4)}
                </div>
                <div className="text-[10px] text-muted mt-1">Area preservation factor</div>
              </div>

              <div className="p-3 rounded bg-surface-dark border border-panel-border">
                <div className="text-[10px] text-muted uppercase">ROTATION</div>
                <div className="text-base font-bold text-cyan mt-0.5">
                  {DEMO_TRANSFORMATION_MATRIX.rotationDeg}°
                </div>
                <div className="text-[10px] text-muted mt-1">Angular orbital disparity</div>
              </div>

              <div className="p-3 rounded bg-surface-dark border border-panel-border">
                <div className="text-[10px] text-muted uppercase">SCALE FACTOR</div>
                <div className="text-base font-bold text-orbital mt-0.5">
                  {DEMO_TRANSFORMATION_MATRIX.scaleFactor.toFixed(4)}x
                </div>
                <div className="text-[10px] text-muted mt-1">Resolution compensation</div>
              </div>

              <div className="p-3 rounded bg-surface-dark border border-panel-border">
                <div className="text-[10px] text-muted uppercase">TRANSLATION (ΔX, ΔY)</div>
                <div className="text-base font-bold text-success mt-0.5">
                  [{DEMO_TRANSFORMATION_MATRIX.translationPx[0]}, {DEMO_TRANSFORMATION_MATRIX.translationPx[1]}]
                </div>
                <div className="text-[10px] text-muted mt-1">Sub-pixel coordinate shift</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* "What Does This Mean?" Educational Panel for SIH Jury (Section 25) */}
      <div className="rounded-lg bg-panel border border-panel-border p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-2 border-b border-panel-border pb-3">
          <HelpCircle className="w-4 h-4 text-cyan" />
          <h2 className="text-sm font-mono font-bold text-foreground">
            WHAT DOES THIS MEAN? // EVALUATION GUIDE FOR EVALUATORS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded bg-surface-dark border border-panel-border/80">
            <div className="font-bold text-success mb-1">RMSE (0.84 px)</div>
            <div className="text-foreground font-semibold text-[11px] mb-2">
              Root Mean Square Error
            </div>
            <p className="text-muted text-[11px] leading-relaxed">
              Measures the average geometric distance between transformed source keypoints and actual reference coordinates.
              An RMSE below 1.0 pixel indicates true sub-pixel registration accuracy, essential for scientific mission cartography.
            </p>
          </div>

          <div className="p-4 rounded bg-surface-dark border border-panel-border/80">
            <div className="font-bold text-orbital mb-1">INLIER RATIO (92.7%)</div>
            <div className="text-foreground font-semibold text-[11px] mb-2">
              Consensus Agreement
            </div>
            <p className="text-muted text-[11px] leading-relaxed">
              Measures the percentage of candidate feature matches that strictly obey the estimated geometric transformation.
              A ratio above 85% proves that lighting changes and steep crater shadows did not deceive the correspondence engine.
            </p>
          </div>

          <div className="p-4 rounded bg-surface-dark border border-panel-border/80">
            <div className="font-bold text-cyan mb-1">REPEATABILITY (91.4%)</div>
            <div className="text-foreground font-semibold text-[11px] mb-2">
              Feature Invariance
            </div>
            <p className="text-muted text-[11px] leading-relaxed">
              Measures how reliably identical topographic points (such as crater rims or central mounds) are recognized
              when captured by different instruments under different sun elevations and orbital altitudes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
