"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Cpu,
  FileImage,
  Info,
  Layers,
  Play,
  RotateCcw,
  Sliders,
  Sparkles,
  UploadCloud,
  Zap,
} from "lucide-react";
import {
  DEMO_SOURCE_METADATA,
  DEMO_REFERENCE_METADATA,
  DEFAULT_ALGORITHM_CONFIG,
} from "@/lib/mockData";
import {
  AlgorithmConfig,
  ImageMetadata,
  InstrumentName,
  MissionName,
  RegistrationMode,
} from "@/types/registration";

function RegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemoParam = searchParams.get("demo") === "true";

  // State
  const [sourceMission, setSourceMission] = useState<MissionName>("Chandrayaan-2");
  const [sourceInstrument, setSourceInstrument] = useState<InstrumentName>("OHRC");
  const [sourcePreview, setSourcePreview] = useState<string | null>(null);
  const [sourceMetadata, setSourceMetadata] = useState<ImageMetadata | null>(null);

  const [referenceMission, setReferenceMission] = useState<MissionName>("NASA LRO");
  const [referenceInstrument, setReferenceInstrument] = useState<InstrumentName>("LRO NAC");
  const [referencePreview, setReferencePreview] = useState<string | null>(null);
  const [referenceMetadata, setReferenceMetadata] = useState<ImageMetadata | null>(null);

  const [mode, setMode] = useState<RegistrationMode>("automatic");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [algorithmConfig, setAlgorithmConfig] = useState<AlgorithmConfig>(DEFAULT_ALGORITHM_CONFIG);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-load demo if url has ?demo=true or if requested
  const loadDemoMission = () => {
    setSourceMission(DEMO_SOURCE_METADATA.mission);
    setSourceInstrument(DEMO_SOURCE_METADATA.instrument);
    setSourcePreview("/demo/source_ohrc.svg");
    setSourceMetadata(DEMO_SOURCE_METADATA);

    setReferenceMission(DEMO_REFERENCE_METADATA.mission);
    setReferenceInstrument(DEMO_REFERENCE_METADATA.instrument);
    setReferencePreview("/demo/ref_lro.svg");
    setReferenceMetadata(DEMO_REFERENCE_METADATA);

    setMode("automatic");
    setAlgorithmConfig(DEFAULT_ALGORITHM_CONFIG);
  };

  useEffect(() => {
    if (isDemoParam) {
      loadDemoMission();
    }
  }, [isDemoParam]);

  // Handle local file uploads
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "source" | "reference"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "source") {
        setSourcePreview(url);
        setSourceMetadata({
          mission: sourceMission,
          instrument: sourceInstrument,
          resolution: sourceInstrument === "OHRC" ? "0.25 m/pixel" : "5.0 m/pixel",
          acquisitionDate: new Date().toISOString().split("T")[0],
          sunElevation: "24.5°",
          imageDimensions: `${file.name} (${Math.round(file.size / 1024)} KB)`,
          targetRegion: "Custom Lunar Region",
          coordinates: "72.90° S, 43.20° E",
          projection: "Polar Stereographic",
          bitDepth: "16-bit GeoTIFF",
        });
      } else {
        setReferencePreview(url);
        setReferenceMetadata({
          mission: referenceMission,
          instrument: referenceInstrument,
          resolution: referenceInstrument === "LRO NAC" ? "0.50 m/pixel" : "10.0 m/pixel",
          acquisitionDate: new Date().toISOString().split("T")[0],
          sunElevation: "32.1°",
          imageDimensions: `${file.name} (${Math.round(file.size / 1024)} KB)`,
          targetRegion: "Custom Reference Target",
          coordinates: "72.88° S, 43.18° E",
          projection: "Polar Stereographic",
          bitDepth: "16-bit GeoTIFF",
        });
      }
    }
  };

  const handleStartRegistration = () => {
    if (!sourcePreview || !referencePreview) {
      // If user hasn't loaded images, automatically load demo so they are never blocked!
      loadDemoMission();
    }
    setIsSubmitting(true);
    // Transition to processing screen
    setTimeout(() => {
      router.push("/app/processing");
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg bg-surface-dark/85 backdrop-blur-md border border-panel-border reticle-corner shadow-panel-glow">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>INGESTION & CORRESPONDENCE PIPELINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold text-foreground tracking-tight">
            NEW REGISTRATION
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 font-light">
            Upload or select dual cross-mission lunar observations to establish invariant feature correspondence.
          </p>
        </div>

        {/* Demo Mission Fast-Track Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={loadDemoMission}
            className="flex items-center gap-2 px-4 py-2.5 rounded bg-cyan/15 hover:bg-cyan/25 border border-cyan/40 text-cyan text-xs font-mono font-bold tracking-wider transition-all shadow-cyan-glow"
          >
            <Sparkles className="w-4 h-4" />
            <span>LOAD DEMO MISSION</span>
          </button>
          {sourcePreview && (
            <button
              onClick={() => {
                setSourcePreview(null);
                setSourceMetadata(null);
                setReferencePreview(null);
                setReferenceMetadata(null);
              }}
              className="p-2.5 rounded bg-panel hover:bg-panel-hover border border-panel-border text-muted hover:text-foreground text-xs font-mono transition-colors"
              title="Reset Uploads"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Upload Panels: Source vs Reference */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Image Panel */}
        <div className="rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border p-6 reticle-corner shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-panel-border pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan" />
              <span className="font-mono text-sm font-bold text-foreground">
                SOURCE OBSERVATION
              </span>
            </div>
            {/* Mission Selector */}
            <div className="flex items-center gap-2">
              <select
                value={sourceInstrument}
                onChange={(e) => {
                  const val = e.target.value as InstrumentName;
                  setSourceInstrument(val);
                  if (val === "OHRC" || val === "TMC" || val === "IIRS") {
                    setSourceMission("Chandrayaan-2");
                  }
                }}
                className="bg-surface-dark border border-panel-border rounded px-2.5 py-1 text-xs font-mono text-cyan focus:outline-none focus:border-cyan"
              >
                <option value="OHRC">CH-2 OHRC (0.25m)</option>
                <option value="TMC">CH-2 TMC-2 (5.0m)</option>
                <option value="IIRS">CH-2 IIRS (20m)</option>
              </select>
            </div>
          </div>

          {/* Upload Dropzone or Image Preview */}
          <div className="relative rounded-lg border-2 border-dashed border-panel-border hover:border-cyan/50 transition-colors aspect-[4/3] flex flex-col items-center justify-center p-4 bg-surface-dark/60 overflow-hidden group">
            {sourcePreview ? (
              <div className="relative w-full h-full">
                <img
                  src={sourcePreview}
                  alt="Source Observation"
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute top-2 left-2 bg-background/85 px-2 py-1 rounded text-[10px] font-mono text-cyan border border-cyan/30">
                  {sourceMission} // {sourceInstrument}
                </div>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center text-center w-full h-full justify-center">
                <UploadCloud className="w-10 h-10 text-cyan/70 group-hover:text-cyan transition-colors mb-2" />
                <span className="font-mono text-xs font-semibold text-foreground mb-1">
                  Drag & drop source image or browse
                </span>
                <span className="text-[11px] font-mono text-muted">
                  Supported: PDS4 / GeoTIFF / TIFF / PNG / JPEG
                </span>
                <input
                  type="file"
                  accept="image/*,.tif,.tiff,.pds4"
                  onChange={(e) => handleFileUpload(e, "source")}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Metadata Card */}
          {sourceMetadata ? (
            <div className="p-3 rounded bg-surface-dark border border-panel-border/80 font-mono text-xs space-y-1.5">
              <div className="text-[10px] tracking-widest text-cyan uppercase font-bold mb-1">
                METADATA TELEMETRY
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-muted">Resolution: </span>
                  <span className="text-foreground">{sourceMetadata.resolution}</span>
                </div>
                <div>
                  <span className="text-muted">Sun Elev: </span>
                  <span className="text-foreground">{sourceMetadata.sunElevation}</span>
                </div>
                <div>
                  <span className="text-muted">Dimensions: </span>
                  <span className="text-foreground">{sourceMetadata.imageDimensions}</span>
                </div>
                <div>
                  <span className="text-muted">Target: </span>
                  <span className="text-foreground truncate">{sourceMetadata.targetRegion}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded bg-surface-dark/40 border border-panel-border/40 font-mono text-[11px] text-muted text-center">
              Metadata will populate automatically upon ingestion.
            </div>
          )}
        </div>

        {/* Reference Image Panel */}
        <div className="rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border p-6 reticle-corner shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-panel-border pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orbital" />
              <span className="font-mono text-sm font-bold text-foreground">
                REFERENCE OBSERVATION
              </span>
            </div>
            {/* Mission Selector */}
            <div className="flex items-center gap-2">
              <select
                value={referenceInstrument}
                onChange={(e) => {
                  const val = e.target.value as InstrumentName;
                  setReferenceInstrument(val);
                  if (val === "LRO NAC") {
                    setReferenceMission("NASA LRO");
                  } else if (val === "SELENE TC") {
                    setReferenceMission("JAXA SELENE");
                  }
                }}
                className="bg-surface-dark border border-panel-border rounded px-2.5 py-1 text-xs font-mono text-orbital focus:outline-none focus:border-orbital"
              >
                <option value="LRO NAC">NASA LRO NAC (0.50m)</option>
                <option value="SELENE TC">JAXA SELENE TC (10m)</option>
              </select>
            </div>
          </div>

          {/* Upload Dropzone or Image Preview */}
          <div className="relative rounded-lg border-2 border-dashed border-panel-border hover:border-orbital/50 transition-colors aspect-[4/3] flex flex-col items-center justify-center p-4 bg-surface-dark/60 overflow-hidden group">
            {referencePreview ? (
              <div className="relative w-full h-full">
                <img
                  src={referencePreview}
                  alt="Reference Observation"
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute top-2 left-2 bg-background/85 px-2 py-1 rounded text-[10px] font-mono text-orbital border border-orbital/30">
                  {referenceMission} // {referenceInstrument}
                </div>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center text-center w-full h-full justify-center">
                <UploadCloud className="w-10 h-10 text-orbital/70 group-hover:text-orbital transition-colors mb-2" />
                <span className="font-mono text-xs font-semibold text-foreground mb-1">
                  Drag & drop reference image or browse
                </span>
                <span className="text-[11px] font-mono text-muted">
                  Supported: PDS4 / GeoTIFF / TIFF / PNG / JPEG
                </span>
                <input
                  type="file"
                  accept="image/*,.tif,.tiff,.pds4"
                  onChange={(e) => handleFileUpload(e, "reference")}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Metadata Card */}
          {referenceMetadata ? (
            <div className="p-3 rounded bg-surface-dark border border-panel-border/80 font-mono text-xs space-y-1.5">
              <div className="text-[10px] tracking-widest text-orbital uppercase font-bold mb-1">
                METADATA TELEMETRY
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-muted">Resolution: </span>
                  <span className="text-foreground">{referenceMetadata.resolution}</span>
                </div>
                <div>
                  <span className="text-muted">Sun Elev: </span>
                  <span className="text-foreground">{referenceMetadata.sunElevation}</span>
                </div>
                <div>
                  <span className="text-muted">Dimensions: </span>
                  <span className="text-foreground">{referenceMetadata.imageDimensions}</span>
                </div>
                <div>
                  <span className="text-muted">Target: </span>
                  <span className="text-foreground truncate">{referenceMetadata.targetRegion}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded bg-surface-dark/40 border border-panel-border/40 font-mono text-[11px] text-muted text-center">
              Metadata will populate automatically upon ingestion.
            </div>
          )}
        </div>
      </div>

      {/* Registration Configuration Panel */}
      <div className="rounded-lg bg-panel/85 backdrop-blur-md border border-panel-border p-6 reticle-corner shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-panel-border pb-4">
          <div>
            <div className="text-[11px] font-mono text-cyan">PIPELINE CONFIGURATION</div>
            <h2 className="text-base font-mono font-bold text-foreground">
              REGISTRATION MODE
            </h2>
          </div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-cyan transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showAdvanced ? "Hide Advanced Settings" : "Configure Advanced Algorithms"}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Mode Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            {
              id: "automatic",
              label: "Automatic",
              desc: "Recommended for SIH. Uses deep learning SuperPoint + LightGlue + RANSAC.",
              badge: "Recommended",
            },
            {
              id: "classical",
              label: "Classical",
              desc: "SIFT / AKAZE keypoints with FLANN matcher and PROSAC filtering.",
            },
            {
              id: "deep_learning",
              label: "Deep Learning",
              desc: "Attentional GNN LoFTR transformer matcher for extreme illumination differences.",
            },
            {
              id: "advanced",
              label: "Custom Lab",
              desc: "Manually configure detector, matcher, rejection threshold, and warp model.",
            },
          ].map((m) => {
            const isSelected = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setMode(m.id as RegistrationMode);
                  if (m.id === "advanced") setShowAdvanced(true);
                }}
                className={`text-left p-4 rounded-lg border transition-all ${
                  isSelected
                    ? "bg-cyan/10 border-cyan text-cyan shadow-cyan-glow"
                    : "bg-surface-dark border-panel-border text-muted hover:border-panel-border/80 hover:text-foreground"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold">{m.label}</span>
                  {m.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan/20 text-cyan border border-cyan/30">
                      {m.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed text-muted/80">{m.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Advanced Algorithm Fine-Tuning (Shown when requested) */}
        {showAdvanced && (
          <div className="pt-4 border-t border-panel-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
            <div>
              <label className="block text-[11px] font-mono text-muted mb-1.5">
                FEATURE DETECTOR
              </label>
              <select
                value={algorithmConfig.detector}
                onChange={(e) =>
                  setAlgorithmConfig({ ...algorithmConfig, detector: e.target.value as any })
                }
                className="w-full bg-surface-dark border border-panel-border rounded p-2 text-xs font-mono text-foreground focus:outline-none focus:border-cyan"
              >
                <option value="SuperPoint">SuperPoint (Deep Learning)</option>
                <option value="SIFT">SIFT (Scale-Invariant)</option>
                <option value="AKAZE">AKAZE (Nonlinear Scale)</option>
                <option value="ASIFT">ASIFT (Affine Simulation)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-muted mb-1.5">
                FEATURE MATCHER
              </label>
              <select
                value={algorithmConfig.matcher}
                onChange={(e) =>
                  setAlgorithmConfig({ ...algorithmConfig, matcher: e.target.value as any })
                }
                className="w-full bg-surface-dark border border-panel-border rounded p-2 text-xs font-mono text-foreground focus:outline-none focus:border-cyan"
              >
                <option value="LightGlue">LightGlue (Attentional GNN)</option>
                <option value="FLANN">FLANN (Fast Approximate)</option>
                <option value="LoFTR">LoFTR (Transformer)</option>
                <option value="BFMatcher">BFMatcher (Brute Force)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-muted mb-1.5">
                OUTLIER REJECTION
              </label>
              <select
                value={algorithmConfig.outlierRejection}
                onChange={(e) =>
                  setAlgorithmConfig({ ...algorithmConfig, outlierRejection: e.target.value as any })
                }
                className="w-full bg-surface-dark border border-panel-border rounded p-2 text-xs font-mono text-foreground focus:outline-none focus:border-cyan"
              >
                <option value="RANSAC">RANSAC (Random Sample Consensus)</option>
                <option value="PROSAC">PROSAC (Progressive Consensus)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-muted mb-1.5">
                GEOMETRIC TRANSFORMATION
              </label>
              <select
                value={algorithmConfig.transform}
                onChange={(e) =>
                  setAlgorithmConfig({ ...algorithmConfig, transform: e.target.value as any })
                }
                className="w-full bg-surface-dark border border-panel-border rounded p-2 text-xs font-mono text-foreground focus:outline-none focus:border-cyan"
              >
                <option value="Homography">Homography (Planar 3x3 Projective)</option>
                <option value="Affine">Affine (6-DOF Translation/Rotation/Scale)</option>
                <option value="TPS">Thin Plate Spline (Non-rigid Topography)</option>
              </select>
            </div>
          </div>
        )}

        {/* Primary Start Registration Button */}
        <div className="pt-4 border-t border-panel-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <Info className="w-4 h-4 text-cyan" />
            <span>
              {sourcePreview && referencePreview
                ? "Images loaded and verified. Ready for pipeline execution."
                : "No files selected? Clicking Start will automatically execute the demonstration dataset."}
            </span>
          </div>

          <button
            onClick={handleStartRegistration}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded bg-cyan text-background font-mono font-bold text-sm tracking-wider flex items-center justify-center gap-3 hover:bg-white hover:shadow-cyan-glow transition-all duration-300 disabled:opacity-50 group"
          >
            <span>{isSubmitting ? "INITIALIZING..." : "START REGISTRATION"}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewRegistrationPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center font-mono text-xs text-cyan animate-pulse">
          INITIALIZING REGISTRATION CONSOLE...
        </div>
      }
    >
      <RegistrationForm />
    </Suspense>
  );
}
