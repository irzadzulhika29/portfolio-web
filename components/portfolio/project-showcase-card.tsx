import Image from "next/image";
import { ArrowUpRight, Eye } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ProjectEntry } from "./projects";

export function ProjectShowcaseCard({
  project,
  index,
}: {
  project: ProjectEntry;
  index: number;
}) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-zinc-400/70 bg-[#0a0a0d] text-white shadow-[0_12px_24px_rgba(39,39,42,0.12),0_28px_80px_rgba(113,113,122,0.24),0_3px_0_rgba(228,228,231,0.28)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 -bottom-4 h-10 rounded-full bg-zinc-500/25 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-8px_20px_rgba(24,24,27,0.28)]"
      />
      <div className={cn("relative min-h-[20rem] overflow-hidden bg-gradient-to-br", project.palette.shell)}>
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : null}

        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-55 transition-transform duration-700 ease-out group-hover:scale-110",
            project.palette.glow
          )}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,13,0.92)_0%,rgba(7,8,13,0.38)_48%,rgba(7,8,13,0.78)_100%)] opacity-100 transition-opacity duration-500 ease-out group-hover:opacity-30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,7,10,0.08)_0%,rgba(5,7,10,0.74)_100%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        />

        <div className="relative flex min-h-[20rem] flex-col justify-between p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <span className="inline-flex rounded-full border border-white/12 bg-black/28 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.24em] text-white/72 backdrop-blur-md transition-all duration-500 group-hover:bg-white/10 group-hover:text-white">
              {project.previewBadge}
            </span>
            <span className="rounded-full border border-white/10 bg-black/24 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-[0.22em] text-white/48 backdrop-blur-md transition-all duration-500 group-hover:translate-y-1 group-hover:opacity-0">
              0{index + 1}
            </span>
          </div>

          <div className="max-w-xs transition-all duration-500 ease-out group-hover:translate-y-6 group-hover:opacity-0">
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-white/46">
              {project.category}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white sm:text-3xl">
              {project.title}
            </h3>
            <div className="mt-3 space-y-1 text-base font-medium text-white/88">
              <p>{project.previewTitle}</p>
              <p className="text-sm text-white/72">{project.previewMetric}</p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/92 via-black/35 to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-0" />

          <div className="absolute inset-0 flex items-end p-5 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 sm:p-6">
            <div className="max-w-xl translate-y-8 transition-transform duration-500 ease-out group-hover:translate-y-0">
              <p className="text-[0.65rem] uppercase tracking-[0.26em] text-white/55">
                0{index + 1}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-2 text-base font-medium text-white/88">
                {project.previewTitle}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/18"
                >
                  <ArrowUpRight className="size-4" />
                  Lihat Details
                </a>
                <a
                  href={project.image ?? "#projects"}
                  className="inline-flex items-center gap-2.5 rounded-full bg-white/8 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/14"
                >
                  <Eye className="size-4" />
                  Preview
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
