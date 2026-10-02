import React from "react";
import Link from "next/link";
import { ArrowRight, Globe2, ShieldCheck, Terminal } from "lucide-react";
import { StartechLogo } from "@/components/common/StartechLogo";

export const LandingFooter: React.FC = () => {
  return (
    <footer className="relative border-t border-panel-border bg-surface-dark overflow-hidden">
      {/* Final Call to Action Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 text-cyan border border-cyan/30 font-mono text-xs mb-6">
          <Globe2 className="w-3.5 h-3.5" />
          <span>MISSION CONTROL CONSOLE READY</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-mono font-bold text-foreground mb-4 tracking-tight">
          READY TO ALIGN THE MOON?
        </h2>
        <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto mb-8 font-light">
          Experience sub-pixel cross-mission correspondence with Chandrayaan-2 and NASA LRO data in real-time.
        </p>

        <Link
          href="/app"
          className="inline-flex items-center gap-3 px-9 py-4 rounded-md bg-cyan text-background font-mono font-bold text-base tracking-wider hover:bg-white hover:shadow-cyan-glow transition-all duration-300 group"
        >
          <span>ENTER STARTECH</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
        </Link>
      </div>

      {/* Technical Footnote & Attribution */}
      <div className="border-t border-panel-border/80 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
        <StartechLogo size="sm" linkHref="/" />
        <div className="flex items-center gap-6">
          <span>SMART INDIA HACKATHON 2026</span>
          <span className="text-cyan">PS ID: 26166</span>
          <span className="hidden sm:inline">COORDINATE REF: MOON 2000 IAU</span>
        </div>
      </div>
    </footer>
  );
};
