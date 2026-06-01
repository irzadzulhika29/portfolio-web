"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";

import {
  portfolioAchievements,
  portfolioProjects,
} from "@/components/portfolio";

import { ProjectShowcaseCard } from "./project-showcase-card";
import { AchievementShowcaseCard } from "./achievement-showcase-card";
import { SectionHeading } from "./section-primitives";
import { DetailOverlay } from "./detail-overlay";
import { HighlightText } from "@/components/animate-ui/primitives/texts/highlight";
import type { DetailItem } from "./detail-overlay";

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

export function ProjectsSection() {
  const [detailItem, setDetailItem] = useState<DetailItem | null>(null);

  const closeDetail = useCallback(() => setDetailItem(null), []);

  return (
    <>
      <section
        id="projects"
        className="relative bg-black"
      >
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="relative space-y-24">
            {/* Featured Works */}
            <div className="relative -mx-5 space-y-10 bg-black px-5 py-20 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 lg:py-24">
              <SectionHeading
                eyebrow="Selected Projects"
                title={
                  <HighlightText
                    text="Featured Works"
                    inView={true}
                    className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-500 dark:to-purple-500 px-3 py-1 rounded-none text-zinc-900 dark:text-white"
                  />
                }
                description="A set of portfolio pieces presented as visible product surfaces rather than plain case-study entries."
                titleClassName="text-white"
                descriptionClassName="text-zinc-400"
                align="center"
              />
              <motion.div
                className="grid gap-6 xl:grid-cols-3"
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                {portfolioProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    variants={cardReveal}
                    className={index === 0 ? "xl:col-span-2 xl:row-span-2" : ""}
                  >
                    <ProjectShowcaseCard
                      project={project}
                      index={index}
                      large={index === 0}
                      onSelect={() => setDetailItem({ type: "project", data: project })}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Achievements */}
            <div className="-mx-5 space-y-10 bg-black px-5 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 lg:py-24">
              <SectionHeading
                eyebrow="Key Achievements"
                title={
                  <HighlightText
                    text="Achievements"
                    inView={true}
                    className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-500 dark:to-purple-500 px-3 py-1 rounded-none text-zinc-900 dark:text-white"
                  />
                }
                description="These outcomes describe how the portfolio translates into product instincts, interface quality, and operational clarity."
                titleClassName="text-white"
                descriptionClassName="text-zinc-400"
                align="center"
              />
              <motion.div
                className="grid gap-6 md:grid-cols-2"
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                {portfolioAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    variants={cardReveal}
                    className="h-full"
                  >
                    <AchievementShowcaseCard
                      achievement={achievement}
                      index={index}
                      large={true}
                      onSelect={() => setDetailItem({ type: "achievement", data: achievement })}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <DetailOverlay item={detailItem} onClose={closeDetail} />
    </>
  );
}
