"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Eye,
  Filter,
  Layers,
  Maximize2,
  RefreshCw,
  Sliders,
  Sparkles,
  XCircle,
  Zap,
} from "lucide-react";
import { DEMO_CORRESPONDENCES } from "@/lib/mockData";
import { MatchCorrespondence } from "@/types/registration";

export default function VisualizationPage() {
  const [filterMode, setFilterMode] = useState<"all" | "inliers" | "outliers">("all");
  const [showKeypoints, setShowKeypoints] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [ransacStage, setRansacStage] = useState<"raw" | "ransac" | "inliers">("inliers");
  const [hoveredMatch, setHoveredMatch] = useState<MatchCorrespondence | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Statistics
  const totalMatches = DEMO_CORRESPONDENCES.length;
  const inliersCount = DEMO_CORRESPONDENCES.filter((m) => m.status === "inlier").length;
  const outliersCount = DEMO_CORRESPONDENCES.filter((m) => m.status === "outlier").length;
  const candidatesCount = DEMO_CORRESPONDENCES.filter((m) => m.status === "candidate").length;

  // Filter correspondences based on active toggle and RANSAC explainer state
  const visibleCorrespondences = DEMO_CORRESPONDENCES.filter((m) => {
    if (ransacStage === "raw") return true; // Show all raw matches
    if (ransacStage === "inliers") return m.status === "inlier"; // Show verified inliers only

    // If in standard filter mode:
    if (filterMode === "inliers") return m.status === "inlier";
    if (filterMode === "outliers") return m.status === "outlier";
    return true; // "all"
  });

  // Render correspondence lines and keypoints on canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Each panel occupies half width
    const halfW = width / 2;

    // Draw correspondence vectors
    visibleCorrespondences.forEach((corr) => {
      // Source point (left panel)
      const srcX = (corr.sourcePoint.x / 100) * halfW;
      const srcY = (corr.sourcePoint.y / 100) * height;

      // Reference point (right panel)
      const refX = halfW + (corr.referencePoint.x / 100) * halfW;
      const refY = (corr.referencePoint.y / 100) * height;

      const isHovered = hoveredMatch?.id === corr.id;

      // Select line color
      let strokeColor = "rgba(85, 230, 255, 0.6)"; // candidate cyan
      let pointColor = "#55E6FF";

      if (corr.status === "inlier") {
        strokeColor = isHovered ? "#35E6A2" : "rgba(53, 230, 162, 0.65)"; // green
        pointColor = "#35E6A2";
      } else if (corr.status === "outlier") {
        strokeColor = isHovered ? "#FF5C6C" : "rgba(255, 92, 108, 0.65)"; // red
        pointColor = "#FF5C6C";
      }

      // Draw vector line
      if (showLines) {
        ctx.beginPath();
        ctx.moveTo(srcX, srcY);
        // Subtle cubic curve for aesthetic trajectory
        const midX = (srcX + refX) / 2;
        const midY = (srcY + refY) / 2;
        ctx.quadraticCurveTo(midX, midY - 6, refX, refY);

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = isHovered ? 2.5 : 1.2;
        ctx.stroke();
      }

      // Draw Keypoint circles
      if (showKeypoints) {
        // Source keypoint
        ctx.beginPath();
        ctx.arc(srcX, srcY, isHovered ? 4.5 : 2.8, 0, Math.PI * 2);
        ctx.fillStyle = pointColor;
        ctx.fill();
        ctx.strokeStyle = "#05070B";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Reference keypoint
        ctx.beginPath();
        ctx.arc(refX, refY, isHovered ? 4.5 : 2.8, 0, Math.PI * 2);
        ctx.fillStyle = pointColor;
        ctx.fill();
        ctx.strokeStyle = "#05070B";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw central dividing guide
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.moveTo(halfW, 0);
    ctx.lineTo(halfW, height);
    ctx.strokeStyle = "rgba(85, 230, 255, 0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);
  };

  // Resize canvas to parent container dimensions
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
        drawCanvas();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [filterMode, showKeypoints, showLines, ransacStage, hoveredMatch]);

  useEffect(() => {
    drawCanvas();
  }, [filterMode, showKeypoints, showLines, ransacStage, hoveredMatch]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg bg-surface-dark border border-panel-border reticle-corner shadow-panel-glow">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>INTERACTIVE CORRESPONDENCE ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold text-foreground tracking-tight">
            FEATURE MATCH VISUALIZATION
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 font-light">
            Side-by-side keypoint correspondences between Chandrayaan-2 OHRC and NASA LRO NAC.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app/results"
            className="flex items-center gap-2 px-4 py-2 rounded bg-cyan text-background font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-cyan-glow"
          >
            <span>VIEW WARPED RESULT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* RANSAC Explainer Interactive Stepper for Judges (Section 21) */}
      <div className="p-5 rounded-lg bg-panel border border-panel-border shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="text-[10px] font-mono text-cyan uppercase font-semibold">
              STAGE 05 EXPLAINER // FOR SIH JURY
            </div>
            <h2 className="text-sm font-mono font-bold text-foreground">
              HOW RANSAC REJECTS FALSE CORRESPONDENCES
            </h2>
          </div>
          <span className="text-xs font-mono text-muted">
            Click stages to see outlier rejection in action:
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => {
              setRansacStage("raw");
              setFilterMode("all");
            }}
            className={`p-3 rounded-lg border text-left transition-all ${
              ransacStage === "raw"
                ? "bg-cyan/15 border-cyan text-cyan"
                : "bg-surface-dark border-panel-border text-muted hover:border-panel-border/80"
            }`}
          >
            <div className="font-mono text-xs font-bold mb-1">1. RAW MATCHES</div>
            <div className="text-[11px] text-muted">
              Deep descriptors generate initial candidate vectors, including lighting noise.
            </div>
          </button>

          <button
            onClick={() => {
              setRansacStage("ransac");
              setFilterMode("outliers");
            }}
            className={`p-3 rounded-lg border text-left transition-all ${
              ransacStage === "ransac"
                ? "bg-error/15 border-error text-error"
                : "bg-surface-dark border-panel-border text-muted hover:border-panel-border/80"
            }`}
          >
            <div className="font-mono text-xs font-bold mb-1">2. DETECT OUTLIERS</div>
            <div className="text-[11px] text-muted">
              RANSAC estimates consensus epipolar geometry; inconsistent matches flag as red.
            </div>
          </button>

          <button
            onClick={() => {
              setRansacStage("inliers");
              setFilterMode("inliers");
            }}
            className={`p-3 rounded-lg border text-left transition-all ${
              ransacStage === "inliers"
                ? "bg-success/15 border-success text-success"
                : "bg-surface-dark border-panel-border text-muted hover:border-panel-border/80"
            }`}
          >
            <div className="font-mono text-xs font-bold mb-1">3. PURIFIED INLIERS</div>
            <div className="text-[11px] text-muted">
              False matches purged. Only verified green correspondences guide the 3x3 homography.
            </div>
          </button>
        </div>
      </div>

      {/* Main Dual-Image Visualization Canvas Container */}
      <div className="rounded-lg bg-panel border border-panel-border p-6 shadow-xl space-y-4 reticle-corner">
        {/* Controls and Legend Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-panel-border pb-4 text-xs font-mono">
          {/* Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1.5 rounded transition-all ${
                filterMode === "all"
                  ? "bg-cyan text-background font-bold"
                  : "bg-surface-dark text-muted hover:text-foreground border border-panel-border"
              }`}
            >
              ALL MATCHES ({totalMatches})
            </button>
            <button
              onClick={() => setFilterMode("inliers")}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                filterMode === "inliers"
                  ? "bg-success text-background font-bold"
                  : "bg-surface-dark text-success hover:bg-success/10 border border-success/30"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>INLIERS ({inliersCount})</span>
            </button>
            <button
              onClick={() => setFilterMode("outliers")}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                filterMode === "outliers"
                  ? "bg-error text-background font-bold"
                  : "bg-surface-dark text-error hover:bg-error/10 border border-error/30"
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>OUTLIERS ({outliersCount})</span>
            </button>
          </div>

          {/* Visibility Checkboxes */}
          <div className="flex items-center gap-4 text-muted">
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-foreground">
              <input
                type="checkbox"
                checked={showKeypoints}
                onChange={(e) => setShowKeypoints(e.target.checked)}
                className="accent-cyan rounded"
              />
              <span>KEYPOINTS</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-foreground">
              <input
                type="checkbox"
                checked={showLines}
                onChange={(e) => setShowLines(e.target.checked)}
                className="accent-cyan rounded"
              />
              <span>VECTORS</span>
            </label>
          </div>

          {/* Color Code Legend */}
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan" />
              <span className="text-muted">Candidate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-success" />
              <span className="text-muted">Inlier</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-error" />
              <span className="text-muted">Outlier</span>
            </div>
          </div>
        </div>

        {/* Canvas Display Viewport */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[2/1] min-h-[420px] max-h-[620px] rounded-lg overflow-hidden border border-panel-border bg-background"
        >
          {/* Background Dual Observation Images */}
          <div className="absolute inset-0 grid grid-cols-2">
            {/* Left: Source Image */}
            <div className="relative h-full border-r border-panel-border/50 overflow-hidden">
              <img
                src="/demo/source_ohrc.svg"
                alt="Source: Chandrayaan-2 OHRC"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute top-3 left-3 z-10 bg-background/85 px-2.5 py-1 rounded text-[10px] font-mono text-cyan border border-cyan/30">
                SOURCE: CHANDRAYAAN-2 OHRC (0.25 m/px)
              </div>
            </div>

            {/* Right: Reference Image */}
            <div className="relative h-full overflow-hidden">
              <img
                src="/demo/ref_lro.svg"
                alt="Reference: NASA LRO NAC"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute top-3 right-3 z-10 bg-background/85 px-2.5 py-1 rounded text-[10px] font-mono text-orbital border border-orbital/30">
                REFERENCE: NASA LRO NAC (0.50 m/px)
              </div>
            </div>
          </div>

          {/* Interactive Correspondence Vector Overlay Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-20 cursor-crosshair"
          />
        </div>

        {/* Footer Metrics Breakdown */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-panel-border text-xs font-mono text-muted">
          <div>
            <span>ACTIVE CORRESPONDENCES RENDERED: </span>
            <span className="text-cyan font-bold">{visibleCorrespondences.length}</span>
            <span className="mx-2">•</span>
            <span>INLIER RATIO: </span>
            <span className="text-success font-bold">92.7%</span>
          </div>
          <div className="flex items-center gap-3">
            <span>RANSAC RESIDUAL THRESHOLD: </span>
            <span className="text-foreground font-semibold">1.5 px</span>
          </div>
        </div>
      </div>
    </div>
  );
}
