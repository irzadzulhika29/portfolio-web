"use client";

import {
  ArrowUpRight,
  Box,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";
import { processSteps } from "./content";
import { SectionShell } from "./section-primitives";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const stepIcons = [Target, Box, Zap, ShieldCheck];
const supportItems = [
  "shadcn project structure",
  "Tailwind CSS",
  "Typescript",
];

function AnimatedWords({
  text,
  startDelay = 0,
  stepDelay = 60,
  className,
}: {
  text: string;
  startDelay?: number;
  stepDelay?: number;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="process-word-animate inline-block opacity-0"
          style={{
            animationDelay: `${startDelay + index * stepDelay}ms`,
            marginRight: "0.3em",
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

function ProcessHeader() {
  return (
    <div className="relative w-full overflow-hidden pb-8 text-left">
      <style>{`
        @keyframes process-word-appear {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.92);
            filter: blur(10px);
          }
          60% {
            opacity: 0.82;
            transform: translateY(8px) scale(0.98);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .process-word-animate {
          animation: process-word-appear 0.8s ease-out forwards;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .process-word-animate:hover {
          color: rgb(228 228 231);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="mb-4 flex items-center gap-4">
        <span className="h-px w-12 bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-zinc-500">
          Component Integration
        </p>
      </div>

      <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-white sm:text-4xl md:text-5xl">
        <AnimatedWords
          text="You are given a task to integrate an existing React component in the codebase"
          startDelay={120}
        />
      </h2>

     

      <div className="my-10 flex flex-wrap gap-3">
        {supportItems.map((item, index) => (
          <span
            key={item}
            className="process-word-animate rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-zinc-300 opacity-0"
            style={{ animationDelay: `${980 + index * 110}ms` }}
          >
            {item}
          </span>
        ))}
      </div>

     
    </div>
  );
}

export function ProcessSection() {
  return (
    <SectionShell id="process">
      <ContainerScroll titleComponent={<ProcessHeader />}>
        <div className="grid h-full gap-4 overflow-y-auto lg:grid-cols-[1.08fr_1fr_1fr]">
          <div className="panel relative flex min-h-[18rem] flex-col overflow-hidden p-6 sm:p-8 lg:row-span-2">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_48%)]"
            />
            <div className="relative max-w-sm space-y-4">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.32em] text-zinc-500">
                Workflow Map
              </p>
              <p className="text-sm leading-7 text-zinc-400 sm:text-base">
                Strategy, design, build, automation, and validation stay
                visible throughout delivery instead of becoming late-stage
                fixes.
              </p>
            </div>

            <div className="relative mt-auto overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.02] p-5">
              <div
                aria-hidden="true"
                className="absolute inset-x-[-10%] bottom-[-15%] h-28 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.28),transparent_58%)] blur-2xl"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-3 h-24 opacity-60"
                style={{
                  backgroundImage:
                    "repeating-radial-gradient(circle at 10% 120%, transparent 0 18px, rgba(255,255,255,0.12) 19px 20px, transparent 21px 34px)",
                }}
              />
              <div className="relative flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-black/30 text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium leading-6 text-zinc-300">
                  Built for clarity.
                  <br />
                  Designed for impact.
                </p>
              </div>
            </div>
          </div>

          {processSteps.map((step, index) => {
            const Icon = stepIcons[index];

            return (
              <div
                key={step.title}
                className="panel group relative min-h-[12.5rem] overflow-hidden p-5 sm:p-6"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_55%)]"
                />
                <div className="relative flex h-full flex-col">
                  <p className="text-sm font-semibold tracking-[0.24em] text-zinc-500">
                    0{index + 1}
                  </p>
                  <div className="mt-7 flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-medium tracking-[-0.04em] text-white">
                        {step.title}
                      </h3>
                      <p className="max-w-[22ch] text-sm leading-7 text-zinc-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="mt-auto ml-auto h-5 w-5 text-zinc-500 transition-colors duration-300 group-hover:text-white" />
                </div>
              </div>
            );
          })}
        </div>
      </ContainerScroll>
    </SectionShell>
  );
}
