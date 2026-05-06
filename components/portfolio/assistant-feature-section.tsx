import { Bot } from "lucide-react";

import { sampleQuestions } from "./content";
import { SectionHeading, SectionShell } from "./section-primitives";

export function AssistantFeatureSection() {
  return (
    <SectionShell>
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <SectionHeading
          eyebrow="Ask My Portfolio"
          title="An assistant layer that can guide visitors through my work."
          description="This concept turns the portfolio into a conversational interface where visitors can explore projects, skills, and fit without searching through every section manually."
        />
        <div className="panel overflow-hidden p-0">
          <div className="border-b border-white/10 bg-white/4 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="inline-flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6">
                  <Bot className="size-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Portfolio Assistant
                  </p>
                  <p className="text-xs text-zinc-500">
                    Interactive visitor guidance
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-zinc-300">
                Online
              </span>
            </div>
          </div>
          <div className="space-y-4 p-6">
            <div className="ml-auto max-w-md rounded-[24px] rounded-br-md border border-white/10 bg-white px-5 py-4 text-sm leading-7 text-black">
              What kind of digital products does Irza usually build?
            </div>
            <div className="max-w-lg rounded-[24px] rounded-bl-md border border-white/10 bg-white/6 px-5 py-4 text-sm leading-7 text-zinc-200">
              Irza works across product-facing websites, AI-powered
              experiences, and quality-focused delivery systems. The goal is
              usually the same: make the product smarter, clearer, and more
              reliable.
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span className="size-2 animate-pulse rounded-full bg-white/70" />
              Typing intelligent suggestions...
            </div>
            <div className="flex flex-wrap gap-3 pt-3">
              {sampleQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-4 py-2 text-left text-sm text-zinc-300 transition-all duration-200 hover:border-white/20 hover:bg-white/8 hover:text-white"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
