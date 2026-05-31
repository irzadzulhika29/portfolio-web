"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

const welcomeWords = [
  "Selamat Datang", // Indonesian
  "Bienvenido",     // Spanish
  "Bienvenue",      // French
  "Yokoso",         // Japanese
  "Welcome",        // English
];

export function WelcomeScreen() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const progress = useMotionValue(0);

  useEffect(() => {
    // Disable scroll while welcome screen is active
    document.body.style.overflow = "hidden";
    
    if (index < welcomeWords.length - 1) {
      const timer = setTimeout(() => {
        setIndex(index + 1);
      }, 600); // Slower word cycle (600ms)
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsExiting(true);
        animate(progress, 1, {
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1], // Smooth easeInOutQuart
          onComplete: () => {
            setShow(false);
            document.body.style.overflow = ""; // Restore scroll
          },
        });
      }, 800); // Show final word slightly longer before exit
      return () => clearTimeout(timer);
    }
  }, [index, progress]);

  // Transform progress into circular mask values (from bottom center to top center)
  const maskImage = useTransform(progress, (p) => {
    const r = p * 130; // Radius up to 130%
    const y = 100 - p * 100; // Y center from 100% to 0%
    return `radial-gradient(circle at 50% ${y}%, transparent ${r}%, black ${r + 0.5}%)`;
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-3xl"
          style={{
            maskImage: maskImage,
            WebkitMaskImage: maskImage,
          }}
        >
          <AnimatePresence mode="wait">
            {!isExiting && (
              <motion.h1
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.25, ease: [0.215, 0.610, 0.355, 1.000] }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white font-sans"
              >
                {welcomeWords[index]}
              </motion.h1>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
