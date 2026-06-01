"use client";

import * as React from "react";

import Image from "next/image";
import { X, Award, BriefcaseBusiness, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectEntry, AchievementEntry } from "./projects";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/animate-ui/components/radix/sheet";

export type DetailItem =
  | { type: "project"; data: ProjectEntry }
  | { type: "achievement"; data: AchievementEntry };

interface DetailOverlayProps {
  item: DetailItem | null;
  onClose: () => void;
}

export function DetailOverlay({ item, onClose }: DetailOverlayProps) {
  const [activeItem, setActiveItem] = React.useState<DetailItem | null>(item);

  React.useEffect(() => {
    if (item) {
      setActiveItem(item);
    }
  }, [item]);

  return (
    <Sheet open={!!item} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-2xl bg-[#0a0a0d] text-white border-l border-white/10 p-0 overflow-y-auto"
      >
        {activeItem && (
          <>
            {/* Visually hidden header for accessibility */}
            <SheetHeader className="sr-only">
              <SheetTitle>{activeItem.data.title}</SheetTitle>
            </SheetHeader>

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

            {activeItem.data.image && (
              <div className="relative h-[50vh]">
                <Image
                  src={activeItem.data.image}
                  alt={activeItem.data.title}
                  fill
                  className={cn("object-cover", (activeItem.data as any).objectFit)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-transparent to-transparent" />
              </div>
            )}

            <div className="px-4 pb-6 sm:px-6 sm:pb-8 pt-4">
             

              <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                {activeItem.data.title}
              </h2>

              {activeItem.type === "project" && (
                <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-zinc-400">
                  {activeItem.data.category}
                </p>
              )}

              <p className="mt-3 text-sm leading-6 text-zinc-300">
                {activeItem.data.description}
              </p>

              {activeItem.type === "project" && (
                <>
                  {activeItem.data.techStack.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Cpu className="size-3.5 text-zinc-400" />
                        <p className="text-[0.6rem] uppercase tracking-[0.24em] text-zinc-400">
                          Tech Stack
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeItem.data.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-medium bg-zinc-800 text-white rounded-md"
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
                        {activeItem.data.role}
                      </p>
                    </div>
                    <div className="bg-white/5 px-3 py-3">
                      <p className="text-[0.6rem] uppercase tracking-[0.24em] text-zinc-400">
                        Result
                      </p>
                      <p className="mt-1 text-xs leading-5 text-zinc-300">
                        {activeItem.data.result}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {activeItem.type === "achievement" && (activeItem.data as any).label && (
                <div className="mt-4 bg-white/5 px-3 py-3">
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-zinc-400">
                    Focus
                  </p>
                  <p className="mt-1 text-xs leading-5 text-zinc-300">
                    {(activeItem.data as any).label}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
