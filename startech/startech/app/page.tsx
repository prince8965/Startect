"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MissionIntro } from "@/components/landing/MissionIntro";
import { LandingPage as MainLandingContent } from "@/components/landing/LandingPage";

export default function Page() {
  const [view, setView] = useState<"intro" | "mission">("intro");

  return (
    <AnimatePresence mode="wait">
      {view === "intro" ? (
        <MissionIntro
          key="mission-intro"
          onEnterMission={() => setView("mission")}
        />
      ) : (
        <motion.div
          key="main-landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <MainLandingContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
