"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { StartechLogo } from "@/components/common/StartechLogo";

export const LunarHero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20 pb-16">
      {/* Background Coordinate Grid */}
      <div className="absolute inset-0 lunar-grid-bg opacity-40 pointer-events-none" />

      {/* Subtle Radial Glow in Space */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-[500px] h-[350px] bg-orbital/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Telemetry Header Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <StartechLogo size="md" />
        <div className="hidden md:flex items-center gap-6 font-mono text-xs text-muted">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            ORBITAL CORRESPONDENCE ENGINE ONLINE
          </span>
          <span className="text-cyan/60">CH-2 / LRO / SELENE</span>
          <Link
            href="/app"
            className="px-3.5 py-1.5 rounded border border-cyan/40 bg-cyan/10 text-cyan hover:bg-cyan/20 transition-all font-semibold"
          >
            CONSOLE
          </Link>
        </div>
      </div>

      {/* Central Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mt-8">
        {/* Mission Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-dark border border-panel-border text-xs font-mono text-cyan mb-8 reticle-corner shadow-panel-glow">
          <Sparkles className="w-3.5 h-3.5 text-cyan" />
          <span className="tracking-widest uppercase text-muted">SIH 2026 // PROBLEM STATEMENT 26166</span>
          <span className="w-1 h-1 rounded-full bg-cyan/50" />
          <span className="text-foreground">LUNAR SURFACE REGISTRATION</span>
        </div>

        {/* Main Cinematic Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-foreground to-muted">
            STARTECH
          </span>
          <span className="block text-2xl sm:text-4xl lg:text-5xl font-mono text-cyan tracking-wider mt-2 font-normal">
            LUNAR IMAGE CORRESPONDENCE
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto font-light leading-relaxed mb-10">
          Cross-mission image registration for lunar observations. Automatically detect terrain features,
          reject false matches across disparate illumination and scale regimes, and compute sub-pixel geometric transformations.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/app"
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-cyan text-background font-mono font-bold text-sm tracking-wider flex items-center justify-center gap-3 hover:bg-white hover:shadow-cyan-glow transition-all duration-300 group"
          >
            <span>ENTER STARTECH</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="#pipeline"
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-surface-dark border border-panel-border text-foreground font-mono font-medium text-sm tracking-wider hover:border-cyan/50 hover:bg-panel transition-all flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4 text-cyan" />
            <span>EXPLORE TECHNOLOGY</span>
          </a>
        </div>

        {/* Lunar Surface Reticle Visualization Graphic */}
        <div className="relative max-w-4xl mx-auto rounded-lg border border-panel-border bg-surface-dark/90 p-4 sm:p-6 shadow-2xl overflow-hidden reticle-corner">
          <div className="scanline-effect" />
          
          {/* Telemetry bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-muted border-b border-panel-border pb-3 mb-4">
            <div className="flex items-center gap-4">
              <span className="text-cyan">SENSOR PAIR: CH-2 OHRC ↔ NASA LRO NAC</span>
              <span className="hidden sm:inline text-muted/60">TARGET: BOGUSLAWSKY CRATER RIM</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-success">SUB-PIXEL RMSE: 0.84 px</span>
              <span className="hidden sm:inline">COORD: 72.90°S 43.20°E</span>
            </div>
          </div>

          {/* Dual Satellite Observation Overlay Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            {/* Source Panel */}
            <div className="relative rounded bg-background border border-panel-border/60 p-2 overflow-hidden group">
              <div className="absolute top-3 left-3 z-10 bg-background/80 px-2 py-0.5 rounded text-[10px] font-mono text-cyan border border-cyan/30">
                SOURCE: CH-2 OHRC (0.25 m/px)
              </div>
              <img
                src="/demo/source_ohrc.svg"
                alt="Chandrayaan-2 OHRC Lunar Surface"
                className="w-full h-56 sm:h-64 object-cover rounded opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-muted bg-background/90 px-1.5 py-0.5 rounded">
                SUN ELEV: 22.4°
              </div>
            </div>

            {/* Reference Panel */}
            <div className="relative rounded bg-background border border-panel-border/60 p-2 overflow-hidden group">
              <div className="absolute top-3 left-3 z-10 bg-background/80 px-2 py-0.5 rounded text-[10px] font-mono text-orbital border border-orbital/30">
                REFERENCE: NASA LRO NAC (0.50 m/px)
              </div>
              <img
                src="/demo/ref_lro.svg"
                alt="NASA LRO NAC Lunar Surface"
                className="w-full h-56 sm:h-64 object-cover rounded opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-muted bg-background/90 px-1.5 py-0.5 rounded">
                SUN ELEV: 34.8°
              </div>
            </div>

            {/* Simulated Live Correspondence Lines Badge in center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-panel/90 border border-cyan/60 rounded-full px-4 py-1.5 shadow-cyan-glow flex items-center gap-2 text-xs font-mono text-cyan backdrop-blur-sm">
                <Compass className="w-3.5 h-3.5 animate-spin" />
                <span>3,847 CORRESPONDENCES ALIGNED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
