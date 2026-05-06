import { BriefcaseBusiness, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionShell } from "./section-primitives";

export function ContactSection() {
  return (
    <SectionShell id="contact" className="pb-16 sm:pb-20">
      <div className="panel relative overflow-hidden px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.11),transparent_32%)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">
            Contact
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            Let&apos;s build something reliable.
          </h2>
          <p className="mt-5 text-base leading-8 text-zinc-400">
            Have an idea, project, or product that needs web development, AI
            integration, or QA validation? Let&apos;s connect.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              render={<a href="mailto:irza@example.com" />}
              className="h-12 rounded-full border border-white/15 bg-white px-6 text-sm font-medium text-black hover:bg-zinc-200"
            >
              <Mail className="size-4" />
              Send Email
            </Button>
            <Button
              variant="outline"
              render={<a href="/Irza-CV.pdf" />}
              className="h-12 rounded-full border-white/15 bg-white/5 px-6 text-sm font-medium text-white hover:bg-white/10"
            >
              <BriefcaseBusiness className="size-4" />
              Download CV
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
