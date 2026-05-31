"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const greetings = [
  "Halo",
  "Sampurasun",
  "Hello",
  "\u041f\u0440\u0438\u0432\u0435\u0442",
  "\u0645\u0631\u062d\u0628\u0627",
  "\u4f60\u597d",
  "\u3053\u3093\u306b\u3061\u306f",
  "\uc548\ub155\ud558\uc138\uc694",
  "\u05e9\u05dc\u05d5\u05dd",
  "Hola",
  "Ciao",
];

export function IntroGreeting() {
  const [phase, setPhase] = useState<"showing" | "closing" | "hidden">("showing");
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const storageKey = "intro-greeting-shown";
    const alreadyShown = sessionStorage.getItem(storageKey);
    if (alreadyShown) {
      setPhase("hidden");
      return;
    }

    let currentIndex = 0;
    const switchInterval = window.setInterval(() => {
      currentIndex += 1;
      if (currentIndex >= greetings.length) {
        window.clearInterval(switchInterval);
        setPhase("closing");
        window.setTimeout(() => {
          setPhase("hidden");
          sessionStorage.setItem(storageKey, "true");
        }, 500);
        return;
      }
      setGreetingIndex(currentIndex);
    }, 400);

    return () => {
      window.clearInterval(switchInterval);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <AnimatePresence>
      {phase !== "hidden" && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0d]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.span
            key={greetingIndex}
            initial={{ opacity: 0, y: 24, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, scale: 0.96, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.2, 0.9, 0.2, 1] }}
            className="text-5xl font-black tracking-[-0.04em] text-white sm:text-6xl"
          >
            {greetings[greetingIndex]}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
