"use client";

import { AssistantTerminal } from "./assistant-terminal";
import { AboutSection } from "./about-section";
import { AssistantFeatureSection } from "./assistant-feature-section";
import { ExperienceSection } from "./experience-section";
import { FooterSection } from "./footer-section";
import { HeroSection } from "./hero-section";
import { ProcessSection } from "./process-section";
import { ProjectsSection } from "./projects-section";
import { ScrollVideoSection } from "./scroll-video-section";

export function PortfolioHomePage() {
  return (
    <main className="relative overflow-x-hidden bg-background text-foreground">
      <AssistantTerminal />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_32%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_20%),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:auto,auto,72px_72px,72px_72px] opacity-60"
      />
      <div
        aria-hidden="true"
        className="spotlight pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/8 blur-[120px]"
      />

      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ProcessSection />
      <ScrollVideoSection />
      <FooterSection />
    </main>
  );
}
