"use client";

import { useState } from "react";
import { Award, BadgeCheck, BriefcaseBusiness } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import {
  portfolioAchievements,
  portfolioCertifications,
  portfolioProjects,
} from "@/components/portfolio";
import { MagneticDock } from "@/components/ui/magnetic-dock";

import { ProjectShowcaseCard } from "./project-showcase-card";
import { AchievementShowcaseCard } from "./achievement-showcase-card";
import { SectionHeading } from "./section-primitives";

const dockSections = [
  {
    id: "projects-panel",
    label: "Projects",
    eyebrow: "Selected Projects",
    title: "Selected builds with stronger interface character and cleaner product framing.",
    description:
      "A set of portfolio pieces presented as visible product surfaces rather than plain case-study entries.",
    icon: BriefcaseBusiness,
  },
  {
    id: "achievements-panel",
    label: "Achievements",
    eyebrow: "Key Achievements",
    title: "Signals of craft, thinking, and delivery that keep showing up across the work.",
    description:
      "These outcomes describe how the portfolio translates into product instincts, interface quality, and operational clarity.",
    icon: Award,
  },
  {
    id: "certifications-panel",
    label: "Certifications",
    eyebrow: "Learning Tracks",
    title: "Technical tracks that show the direction of the stack and the depth behind the portfolio.",
    description:
      "The learning side is presented as a practical track record instead of a disconnected badge list.",
    icon: BadgeCheck,
  },
] as const;

type DockSectionId = (typeof dockSections)[number]["id"];
type DockSection = (typeof dockSections)[number];

const sectionReveal = {
  hidden: {
    opacity: 0,
    y: 48,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
      when: "beforeChildren",
      staggerChildren: 0.14,
    },
  },
};

const cardReveal = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const tabContentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function ProjectsSection() {
  const [activeSection, setActiveSection] =
    useState<DockSectionId>("projects-panel");

  const activeTabData = dockSections.find(
    (section) => section.id === activeSection
  );

  const dockItems = dockSections.map((section: DockSection) => ({
    id: section.id,
    icon: <section.icon size={24} strokeWidth={2.2} />,
    label: section.label,
    onClick: () => setActiveSection(section.id),
  }));

  const renderTabContent = () => {
    switch (activeSection) {
      case "projects-panel":
        return (
          <motion.div
            key="projects"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-10"
          >
            <motion.div
              className="grid gap-6 xl:grid-cols-3"
              variants={sectionReveal}
            >
              {portfolioProjects.map((project, index) => (
                <motion.div key={project.title} variants={cardReveal}>
                  <ProjectShowcaseCard project={project} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      case "achievements-panel":
        return (
          <motion.div
            key="achievements"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-10"
          >
            <motion.div
              className="grid gap-6 xl:grid-cols-3"
              variants={sectionReveal}
            >
              {portfolioAchievements.map((achievement, index) => (
                <motion.div key={achievement.title} variants={cardReveal}>
                  <AchievementShowcaseCard achievement={achievement} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      case "certifications-panel":
        return (
          <motion.div
            key="certifications"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-10"
          >
            <motion.div className="space-y-4" variants={sectionReveal}>
              {portfolioCertifications.map((certification) => (
                <motion.article
                  key={certification.title}
                  variants={cardReveal}
                  className="grid gap-5 rounded-[1.8rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(250,250,250,0.92))] p-6 shadow-[0_18px_55px_rgba(113,113,122,0.1)] sm:grid-cols-[0.95fr_1.05fr]"
                >
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-zinc-500">
                      {certification.year}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-zinc-950">
                      {certification.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-600">
                      {certification.issuer}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] bg-zinc-50 px-5 py-5">
                    <p className="text-[0.62rem] uppercase tracking-[0.24em] text-zinc-500">
                      Focus
                    </p>
                    <p className="mt-3 text-sm leading-7 text-zinc-700">
                      {certification.focus}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      id="projects"
      className="relative bg-[#f6f4ef] py-20 text-black lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.8),transparent_36%),linear-gradient(to_bottom,rgba(255,255,255,0.55),transparent_24%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="relative space-y-12">
          <div className="flex justify-center">
            <MagneticDock
              items={dockItems}
              defaultActiveIndex={0}
              activeIndex={dockSections.findIndex(
                (section) => section.id === activeSection
              )}
              onItemClick={(index) => setActiveSection(dockSections[index].id)}
              itemClassName="border-white/10 bg-zinc-800/90 text-white"
              activeItemClassName="ring-2 ring-zinc-100/30"
            />
          </div>

          <div className="space-y-10">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl"
            >
              {activeTabData && (
                <SectionHeading
                  eyebrow={activeTabData.eyebrow}
                  title={activeTabData.title}
                  description={activeTabData.description}
                  titleClassName="text-zinc-950"
                  descriptionClassName="text-zinc-600"
                />
              )}
            </motion.div>

            <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
