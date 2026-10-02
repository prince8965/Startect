import React from "react";
import { AlertCircle, Clock, Eye, Moon, Sun, ZoomIn } from "lucide-react";

export const ProblemSection: React.FC = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-panel-border bg-surface-dark/40">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orbital/10 text-orbital border border-orbital/30 font-mono text-xs mb-4">
            <Moon className="w-3.5 h-3.5" />
            <span>CROSS-MISSION SENSOR DISPARITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-mono font-bold text-foreground tracking-tight mb-4">
            ONE MOON.
            <br />
            <span className="text-cyan">DIFFERENT OBSERVATIONS.</span>
          </h2>
          <p className="text-muted text-base sm:text-lg">
            Lunar payloads capture identical topographic terrain under dramatically disparate environmental conditions.
            Shadow reversals, extreme incidence angle shifts, and multi-fold resolution differences cause conventional
            matching algorithms to fail.
          </p>
        </div>

        {/* 5 Core Disparity Challenges */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
          {[
            {
              icon: ZoomIn,
              title: "RESOLUTION",
              desc: "0.25 m (OHRC) vs 0.50 m (LRO NAC) vs 5.0 m (TMC)",
            },
            {
              icon: Sun,
              title: "ILLUMINATION",
              desc: "Deep polar shadows, solar azimuth and elevation reversals",
            },
            {
              icon: Eye,
              title: "VIEWING ANGLE",
              desc: "Off-nadir pitch and roll during orbital tracking passes",
            },
            {
              icon: AlertCircle,
              title: "SENSOR SPECS",
              desc: "Varying radiometric sensitivity, SNR, and modulation transfer",
            },
            {
              icon: Clock,
              title: "ACQUISITION TIME",
              desc: "Years of interval between missions, changing seasonal libration",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded bg-panel/70 border border-panel-border/70 hover:border-cyan/40 transition-colors"
              >
                <Icon className="w-5 h-5 text-cyan mb-2" />
                <div className="font-mono text-xs font-semibold text-foreground mb-1">{item.title}</div>
                <div className="text-[11px] text-muted leading-snug">{item.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Dual Observation Comparison Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Source Image: Chandrayaan-2 OHRC */}
          <div className="rounded-lg border border-panel-border bg-panel p-5 relative reticle-corner">
            <div className="flex items-center justify-between font-mono text-xs mb-3">
              <span className="text-cyan font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan" />
                SOURCE OBSERVATION: OHRC
              </span>
              <span className="text-muted">CHANDRAYAAN-2</span>
            </div>

            <div className="relative rounded overflow-hidden border border-panel-border/80 aspect-square max-h-[380px]">
              <img
                src="/demo/source_ohrc.svg"
                alt="Chandrayaan-2 OHRC Crater Surface"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-muted flex justify-between bg-surface-dark/90 px-3 py-2 rounded border border-panel-border">
                <span>Spatial Res: 0.25 m/px</span>
                <span>Sun Elev: 22.4° (Low Sun)</span>
                <span>Aspect: Slanted Rims</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted leading-relaxed">
              Chandrayaan-2 Orbiter High Resolution Camera (OHRC) operates at extreme sub-meter resolution with steep
              raking shadows accentuating fine micro-craters and rim topography.
            </p>
          </div>

          {/* Reference Image: NASA LRO NAC */}
          <div className="rounded-lg border border-panel-border bg-panel p-5 relative reticle-corner">
            <div className="flex items-center justify-between font-mono text-xs mb-3">
              <span className="text-orbital font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orbital" />
                REFERENCE OBSERVATION: NAC
              </span>
              <span className="text-muted">NASA LRO</span>
            </div>

            <div className="relative rounded overflow-hidden border border-panel-border/80 aspect-square max-h-[380px]">
              <img
                src="/demo/ref_lro.svg"
                alt="NASA LRO NAC Crater Surface"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-muted flex justify-between bg-surface-dark/90 px-3 py-2 rounded border border-panel-border">
                <span>Spatial Res: 0.50 m/px</span>
                <span>Sun Elev: 34.8° (High Sun)</span>
                <span>Aspect: Flat Albedo</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted leading-relaxed">
              NASA Lunar Reconnaissance Orbiter Narrow Angle Camera (NAC) captures the same topographic region under
              higher solar incidence, resulting in diffused shadows and shifted apparent crater boundaries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
