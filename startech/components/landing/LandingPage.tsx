import React from "react";
import { LunarHero } from "@/components/landing/LunarHero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { PipelineSection } from "@/components/landing/PipelineSection";
import { DatasetsSection } from "@/components/landing/DatasetsSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const LandingPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <LunarHero />
      <ProblemSection />
      <SolutionSection />
      <PipelineSection />
      <DatasetsSection />
      <LandingFooter />
    </main>
  );
};
