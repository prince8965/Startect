import React from "react";
import { Terminal } from "lucide-react";

export const PipelineSection: React.FC = () => {
  const stages = [
    {
      num: "01",
      name: "INGEST",
      summary: "Import orbital data with orbital geometry and PDS4/GeoTIFF metadata extraction.",
      libraries: ["GDAL", "PDS4 Parser", "RasterIO", "GeoTIFF Driver"],
    },
    {
      num: "02",
      name: "PREPROCESS",
      summary: "Contrast stretching, adaptive histogram equalization (CLAHE) & radiometric calibration.",
      libraries: ["Adaptive CLAHE", "Bilateral Denoise", "Dynamic Range Float32"],
    },
    {
      num: "03",
      name: "FEATURE DETECTION",
      summary: "Find distinctive invariant lunar terrain features across micro-crater rims.",
      libraries: ["SuperPoint (DL)", "SIFT", "AKAZE", "ASIFT"],
    },
    {
      num: "04",
      name: "FEATURE MATCHING",
      summary: "Establish mutual correspondence vectors between source and reference observations.",
      libraries: ["LightGlue (Attentional)", "LoFTR", "FLANN", "BFMatcher"],
    },
    {
      num: "05",
      name: "OUTLIER REJECTION",
      summary: "Remove geometrically inconsistent candidate matches through robust consensus.",
      libraries: ["RANSAC", "PROSAC", "Sampson Distance", "Epipolar Pruning"],
    },
    {
      num: "06",
      name: "TRANSFORM & WARP",
      summary: "Estimate geometric projection and resample source observation to reference coordinates.",
      libraries: ["Homography Matrix", "Affine Model", "Thin Plate Spline (TPS)"],
    },
    {
      num: "07",
      name: "EVALUATE",
      summary: "Compute geometric RMSE, inlier ratio, repeatability, and structural similarity index.",
      libraries: ["Sub-pixel RMSE Engine", "Repeatability Metric", "SSIM Index"],
    },
  ];

  return (
    <section id="pipeline" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-panel-border bg-surface-dark/60">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan/10 text-cyan border border-cyan/30 font-mono text-xs mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>ARCHITECTURE SPECIFICATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-mono font-bold text-foreground tracking-tight mb-4">
            THE STARTECH PIPELINE
          </h2>
          <p className="text-muted text-base sm:text-lg">
            A modular 7-stage computer-vision pipeline engineered to handle extreme lighting variations,
            scale discrepancies, and perspective distortion in orbital lunar imagery.
          </p>
        </div>

        {/* 7 Pipeline Stages List */}
        <div className="space-y-4">
          {stages.map((st, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-lg bg-panel border border-panel-border hover:border-cyan/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-xl sm:text-2xl font-bold text-cyan/70 group-hover:text-cyan transition-colors">
                  {st.num}
                </span>
                <div>
                  <h3 className="font-mono text-base sm:text-lg font-bold text-foreground group-hover:text-cyan transition-colors">
                    {st.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl">
                    {st.summary}
                  </p>
                </div>
              </div>

              {/* Algorithm / Library Badges */}
              <div className="flex flex-wrap gap-1.5 md:justify-end">
                {st.libraries.map((lib, lIdx) => (
                  <span
                    key={lIdx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded bg-surface-dark border border-panel-border text-cyan/80 group-hover:border-cyan/30 transition-colors"
                  >
                    {lib}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
