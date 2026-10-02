import React from "react";
import { ArrowRight, CheckCircle2, Cpu, Filter, GitMerge, Scan, Sparkles, Wand2 } from "lucide-react";

export const SolutionSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: Scan,
      title: "RAW OBSERVATIONS",
      desc: "Ingest dual multi-spectral or panchromatic orbital imagery with PDS4 label metadata.",
      tag: "Multi-Mission",
    },
    {
      num: "02",
      icon: Sparkles,
      title: "DEEP FEATURE DETECTION",
      desc: "Extract invariant keypoints across crater rims, ridges, and boulder clusters.",
      tag: "SuperPoint / SIFT",
    },
    {
      num: "03",
      icon: GitMerge,
      title: "ATTENTIONAL MATCHING",
      desc: "Form candidate correspondence vectors across varying rotations and illumination shifts.",
      tag: "LightGlue / FLANN",
    },
    {
      num: "04",
      icon: Filter,
      title: "GEOMETRIC OUTLIER PRUNING",
      desc: "Apply adaptive RANSAC to eliminate false correspondences and isolate true terrain inliers.",
      tag: "RANSAC / PROSAC",
    },
    {
      num: "05",
      icon: Wand2,
      title: "TRANSFORMATION & WARPING",
      desc: "Compute optimal 3x3 homography or thin plate spline matrix and project the source image.",
      tag: "Homography / TPS",
    },
    {
      num: "06",
      icon: CheckCircle2,
      title: "REGISTERED TERRAIN",
      desc: "Produce sub-pixel aligned mosaic with quantitative RMSE and repeatability metrics.",
      tag: "RMSE < 1.0 px",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-panel-border relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan/10 text-cyan border border-cyan/30 font-mono text-xs mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>ALGORITHMIC ALIGNMENT WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-mono font-bold text-foreground tracking-tight mb-4">
            FROM RAW OBSERVATIONS
            <br />
            <span className="text-success">TO REGISTERED TERRAIN</span>
          </h2>
          <p className="text-muted text-base sm:text-lg">
            STARTECH transforms disparate orbital captures into unified, sub-pixel registered science products
            through an end-to-end robust pipeline.
          </p>
        </div>

        {/* Step-by-Step Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-lg bg-panel border border-panel-border hover:border-cyan/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xl font-bold text-cyan group-hover:text-white transition-colors">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-dark border border-panel-border text-muted uppercase">
                    {step.tag}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-md bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan mb-4 group-hover:bg-cyan group-hover:text-background transition-colors">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-mono text-base font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
