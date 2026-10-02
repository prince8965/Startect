"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Volume2, VolumeX } from "lucide-react";
import { StartechLogo } from "@/components/common/StartechLogo";

interface MissionIntroProps {
  onEnterMission: () => void;
}

export const MissionIntro: React.FC<MissionIntroProps> = ({ onEnterMission }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative w-screen h-screen min-h-screen overflow-hidden bg-background select-none flex flex-col justify-between"
    >
      {/* Full-Bleed Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="/videos/poster.jpg"
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/chandrayan.mp4" type="video/mp4" />
        </video>

        {/* Ambient Overlays for Contrast & Sci-Fi Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/95" />
        <div className="absolute inset-0 bg-background/20" />
      </div>

      {/* Top Telemetry & Controls Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        <div className="flex items-center gap-4">
          <StartechLogo size="sm" />
          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-panel-border text-xs font-mono text-muted">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-cyan font-medium">CH-2 DESCENT TELEMETRY</span>
            <span>//</span>
            <span>SIH 2026</span>
          </div>
        </div>

        {/* Audio Toggle Control */}
        <button
          onClick={toggleAudio}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-dark/85 hover:bg-panel border border-panel-border text-cyan text-xs font-mono backdrop-blur-md transition-all shadow-panel-glow group cursor-pointer"
          title={isMuted ? "Click to unmute video audio" : "Click to mute video audio"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-muted group-hover:text-cyan transition-colors" />
              <span className="text-muted group-hover:text-foreground">UNMUTE</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-cyan animate-pulse" />
              <span className="text-cyan font-semibold">AUDIO ON</span>
            </>
          )}
        </button>
      </header>

      {/* Center Cinematic Title / Telemetry Badge */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 -mt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-dark/80 border border-panel-border text-[11px] font-mono text-cyan mb-4 backdrop-blur-sm shadow-panel-glow">
          <Sparkles className="w-3.5 h-3.5 text-cyan animate-pulse" />
          <span className="tracking-widest uppercase text-muted">CHANDRAYAAN-2 OBSERVATION ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-mono font-extrabold tracking-tight text-foreground leading-tight drop-shadow-2xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-foreground to-muted">
            STARTECH
          </span>
        </h1>
        <p className="text-xs sm:text-sm font-mono text-cyan/90 tracking-widest mt-2 uppercase">
          Autonomous Lunar Surface Correspondence & Sub-Pixel Registration
        </p>
      </div>

      {/* Bottom Action Bar: GO TO MISSION & Skip Intro */}
      <footer className="relative z-20 flex flex-col items-center justify-center pb-10 sm:pb-14 px-4">
        <button
          onClick={onEnterMission}
          className="px-8 sm:px-10 py-3.5 sm:py-4 rounded bg-cyan text-background font-mono font-bold text-sm sm:text-base tracking-wider flex items-center justify-center gap-3 hover:bg-white hover:shadow-cyan-glow transition-all duration-300 shadow-2xl group cursor-pointer"
        >
          <span>GO TO MISSION</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={onEnterMission}
          className="mt-4 text-xs font-mono text-muted hover:text-cyan transition-colors underline-offset-4 hover:underline cursor-pointer"
        >
          Skip Intro →
        </button>
      </footer>
    </motion.section>
  );
};
