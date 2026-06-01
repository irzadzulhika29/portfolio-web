"use client";

import { Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import ScrollFloat from "@/components/react-bits/scroll-float";
import { experienceEntries } from "./content";
import { SectionShell } from "./section-primitives";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/animate-ui/components/radix/accordion';

interface AnimatedExperienceItemProps {
  entry: {
    period: string;
    role: string;
    company: string;
    description?: string;
  };
  index: number;
}

function AnimatedExperienceItem({
  entry,
  index,
}: AnimatedExperienceItemProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });

  return (
    <motion.article
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <AccordionItem value={`item-${index}`} className="border-b border-white/10">
        <AccordionTrigger showArrow={true} className="py-8 w-full hover:no-underline hover:opacity-80 transition-opacity">
          <div className="grid gap-6 w-full text-left lg:grid-cols-[180px_minmax(0,1fr)_280px] lg:items-center pr-4">
            <p className={cn("text-base tracking-[0.08em] text-zinc-500", openSans.className)}>{entry.period}</p>
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-zinc-200 sm:text-2xl lg:text-3xl">
              {entry.role}
            </h3>
            <p className={cn("text-xl text-zinc-400 lg:text-right", openSans.className)}>{entry.company}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className={cn("text-zinc-400 text-lg leading-relaxed max-w-3xl pb-8 lg:ml-[204px]", openSans.className)}>
          {entry.description}
        </AccordionContent>
      </AccordionItem>
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
              textClassName="text-5xl font-semibold uppercase text-white sm:text-[5rem] lg:text-[7rem] leading-[0.84] tracking-[-0.08em]"
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
              textClassName="text-5xl font-semibold uppercase text-zinc-500 sm:text-[5rem] lg:text-[7rem] leading-[0.84] tracking-[-0.08em]"
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
        <Accordion type="single" collapsible className="w-full space-y-0">
          {experienceEntries.map((entry, index) => (
            <AnimatedExperienceItem
              key={`${entry.role}-${entry.company}`}
              entry={entry}
              index={index}
            />
          ))}
        </Accordion>
      </div>
    </SectionShell>
  );
}
