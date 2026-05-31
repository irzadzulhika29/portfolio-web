"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import ScrollFloat from "@/components/react-bits/scroll-float";
import { experienceEntries } from "./content";
import { SectionShell } from "./section-primitives";

interface AnimatedExperienceItemProps {
  entry: {
    period: string;
    role: string;
    company: string;
  };
  index: number;
  showPlus?: boolean;
}

function AnimatedExperienceItem({
  entry,
  index,
  showPlus = true,
}: AnimatedExperienceItemProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });

  return (
    <motion.article
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="grid gap-6 border-b border-white/10 py-8 lg:grid-cols-[180px_minmax(0,1fr)_280px_40px] lg:items-center"
    >
      <p className="text-base tracking-[0.08em] text-zinc-500">{entry.period}</p>
      <h3 className="text-3xl font-semibold tracking-[-0.04em] text-zinc-200 sm:text-2xl lg:text-3xl">
        {entry.role}
      </h3>
      <div className="flex justify-between items-center">
        <p className="text-xl text-zinc-400 lg:text-right">{entry.company}</p>
        {showPlus && (
          <span className="text-3xl font-light text-zinc-400 lg:text-right">
            +
          </span>
        )}
      </div>
    </motion.article>
  );
}

export function ExperienceSection() {
  return (
    <SectionShell id="experience" className="pt-24 sm:pt-28 lg:pt-32">
      <div className="flex flex-col gap-12">
        <div className="grid gap-8 border-b border-white/12 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="leading-[0.84] tracking-[-0.08em]">
            <ScrollFloat
              containerClassName="my-0"
              textClassName="text-[5rem] font-semibold uppercase text-white sm:text-[5rem] lg:text-[7rem] leading-[0.84] tracking-[-0.08em]"
              animationDuration={1.3}
              ease="power3.out"
              scrollStart="top bottom-=2%"
              scrollEnd="center center+=8%"
              stagger={0.012}
            >
              Professional
            </ScrollFloat>
            <ScrollFloat
              containerClassName="-mt-2 my-0"
              textClassName="text-[5rem] font-semibold uppercase text-zinc-500 sm:text-[5rem] lg:text-[7rem] leading-[0.84] tracking-[-0.08em]"
              animationDuration={1.3}
              ease="power3.out"
              scrollStart="top bottom+=4%"
              scrollEnd="center center+=10%"
              stagger={0.012}
            >
              Journey
            </ScrollFloat>
          </div>
          <p className="text-left text-base uppercase tracking-[0.3em] text-zinc-500 lg:text-right">
            Experience
          </p>
        </div>

        {/* Experience List */}
        <div className="space-y-0">
          {experienceEntries.map((entry, index) => (
            <AnimatedExperienceItem
              key={`${entry.role}-${entry.company}`}
              entry={entry}
              index={index}
              showPlus={true}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
