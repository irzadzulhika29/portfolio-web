"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, X } from "lucide-react";

import { sampleQuestions, terminalResponses } from "./content";

type TerminalEntry = {
  id: string;
  prompt: string;
  response: string;
};

function getTerminalResponse(input: string) {
  const value = input.toLowerCase();

  if (value.includes("about") || value.includes("who")) return terminalResponses.about;
  if (value.includes("skill")) return terminalResponses.skills;
  if (value.includes("project")) return terminalResponses.projects;
  if (value.includes("experience") || value.includes("work") || value.includes("education")) {
    return terminalResponses.experience;
  }
  if (value.includes("contact") || value.includes("reach")) return terminalResponses.contact;

  return terminalResponses.default;
}

export function AssistantTerminal() {
  const containerRef = useRef<HTMLButtonElement | null>(null);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: "boot",
      prompt: "system.boot",
      response:
        "Portfolio assistant ready. Type a command or use a quick prompt below to inspect Irza's profile.",
    },
  ]);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();

      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY) || 1;
      const maxOffset = 3;

      setPupilOffset({
        x: (deltaX / distance) * maxOffset,
        y: (deltaY / distance) * maxOffset,
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let blinkResetId: ReturnType<typeof setTimeout>;

    const scheduleBlink = () => {
      timeoutId = setTimeout(() => {
        setIsBlinking(true);

        blinkResetId = setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 160);
      }, 2200 + Math.random() * 2200);
    };

    scheduleBlink();
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(blinkResetId);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    transcriptRef.current?.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [entries, isOpen]);

  useEffect(() => {
    const footer = document.getElementById("site-footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isFooterVisible) {
      setIsOpen(false);
    }
  }, [isFooterVisible]);

  const submitPrompt = (nextPrompt: string) => {
    const trimmed = nextPrompt.trim();

    if (!trimmed) return;

    setEntries((current) => [
      ...current,
      {
        id: `${Date.now()}-${current.length}`,
        prompt: trimmed,
        response: getTerminalResponse(trimmed),
      },
    ]);
    setInput("");
    setIsOpen(true);
  };

  return (
    <>
      {!isFooterVisible && isOpen ? (
        <div className="fixed bottom-5 right-5 z-50 w-[min(92vw,34rem)] overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#0f0f13] shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-400">
                irza-terminal
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-zinc-400 transition-colors hover:text-white"
              aria-label="Close terminal chat"
            >
              <X className="size-4" />
            </button>
          </div>

          <div
            ref={transcriptRef}
            className="max-h-[28rem] space-y-4 overflow-y-auto px-4 py-4 font-mono text-sm text-zinc-200"
          >
            <div className="space-y-1 border-b border-white/6 pb-4">
              <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
                hello_irza://assistant
              </p>
              <p className="text-zinc-500">
                Ask about profile, skills, projects, experience, or contact.
              </p>
            </div>
            {entries.map((entry) => (
              <div key={entry.id} className="space-y-2">
                <p className="text-zinc-400">
                  <span className="text-emerald-400">visitor@portfolio</span>
                  <span className="mx-2 text-zinc-600">%</span>
                  {entry.prompt}
                </p>
                <p className="pl-4 leading-7 text-zinc-200">{entry.response}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 px-4 py-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {sampleQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => submitPrompt(question)}
                  className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  {question}
                </button>
              ))}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                submitPrompt(input);
              }}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-3 py-3"
            >
              <span className="font-mono text-sm text-emerald-400">$</span>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="type a command..."
                className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-zinc-600"
              />
              <button
                type="submit"
                className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
              >
                Run
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {isFooterVisible ? (
        <a
          href="#top"
          className="fixed bottom-5 right-5 z-50 inline-flex size-16 items-center justify-center rounded-full bg-white text-black shadow-[0_10px_20px_rgba(0,0,0,0.28)] transition-transform duration-200 hover:-translate-y-1"
          aria-label="Back to top"
        >
          <ArrowUp className="size-8" />
        </a>
      ) : (
        <button
          ref={containerRef}
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="fixed bottom-5 right-5 z-50 flex size-10 items-center justify-center rounded-full bg-white shadow-[0_10px_20px_rgba(0,0,0,0.28)] transition-transform hover:scale-105"
          aria-label="Toggle assistant terminal"
        >
          <div
            className="absolute inset-[18%] rounded-full bg-white transition-transform duration-150"
            style={{ transform: `scaleY(${isBlinking ? 0.08 : 1})` }}
          />
          <div className="relative z-10 flex items-center gap-1">
            {[0, 1].map((eye) => (
              <div
                key={eye}
                className="relative flex h-[18px] w-[14px] items-center justify-center overflow-hidden rounded-full border border-black bg-white"
              >
                <div
                  className="h-2.5 w-2.5 rounded-full bg-black transition-transform duration-150"
                  style={{
                    transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                  }}
                >
                  <div className="ml-0.5 mt-0.5 h-0.5 w-0.5 rounded-full bg-white" />
                </div>
              </div>
            ))}
          </div>
        </button>
      )}
    </>
  );
}
