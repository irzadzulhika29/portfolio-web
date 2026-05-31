"use client";

import Image from "next/image";
import { X, Award, BriefcaseBusiness, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import type { ProjectEntry, AchievementEntry } from "./projects";

export type DetailItem =
  | { type: "project"; data: ProjectEntry }
  | { type: "achievement"; data: AchievementEntry };

interface DetailOverlayProps {
  item: DetailItem | null;
  onClose: () => void;
}

export function DetailOverlay({ item, onClose }: DetailOverlayProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="detail-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-y-0 left-0 w-full max-w-2xl overflow-y-auto bg-[#0a0a0d] text-white"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-[#0a0a0d]/90 backdrop-blur-md px-4 py-3 sm:px-6">
              <span className="text-[0.6rem] uppercase tracking-[0.24em] text-zinc-400">
                Detail
              </span>
              <button
                onClick={onClose}
                className="flex size-8 items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {item.data.image && (
              <div className="relative h-40 sm:h-52">
                <Image
                  src={item.data.image}
                  alt={item.data.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-transparent to-transparent" />
              </div>
            )}

            <div className="px-4 pb-6 sm:px-6 sm:pb-8">
              <div className="flex items-center gap-1.5 mb-2">
                {item.type === "project" ? (
                  <BriefcaseBusiness className="size-3.5 text-zinc-400" />
                ) : (
                  <Award className="size-3.5 text-zinc-400" />
                )}
                <span className="text-[0.6rem] uppercase tracking-[0.24em] text-zinc-400">
                  {item.type === "project" ? "Project" : "Achievement"}
                </span>
              </div>

              <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                {item.data.title}
              </h2>

              {item.type === "project" && (
                <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-zinc-400">
                  {item.data.category}
                </p>
              )}

              <p className="mt-3 text-sm leading-6 text-zinc-300">
                {item.data.description}
              </p>

              {item.type === "project" && (
                <>
                  {item.data.techStack.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Cpu className="size-3.5 text-zinc-400" />
                        <p className="text-[0.6rem] uppercase tracking-[0.24em] text-zinc-400">
                          Tech Stack
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.data.techStack.map((tech) => (
                          <span
                            key={tech}
                            className={cn(
                              "px-2.5 py-1 text-xs font-medium",
                              item.data.palette.accent || "bg-zinc-800"
                            )}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="bg-white/5 px-3 py-3">
                      <p className="text-[0.6rem] uppercase tracking-[0.24em] text-zinc-400">
                        Role
                      </p>
                      <p className="mt-1 text-xs leading-5 text-zinc-300">
                        {item.data.role}
                      </p>
                    </div>
                    <div className="bg-white/5 px-3 py-3">
                      <p className="text-[0.6rem] uppercase tracking-[0.24em] text-zinc-400">
                        Result
                      </p>
                      <p className="mt-1 text-xs leading-5 text-zinc-300">
                        {item.data.result}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {item.type === "achievement" && item.data.label && (
                <div className="mt-4 bg-white/5 px-3 py-3">
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-zinc-400">
                    Focus
                  </p>
                  <p className="mt-1 text-xs leading-5 text-zinc-300">
                    {item.data.label}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
