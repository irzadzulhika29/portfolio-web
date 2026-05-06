"use client";

import {
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

export default function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1.2,
  ease = "power3.out",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.02,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";

    return text.split("").map((char, index) => (
      <span className="scroll-float-char inline-block" key={`${char}-${index}`}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const scroller = scrollContainerRef?.current ?? window;
    const charElements = element.querySelectorAll(".scroll-float-char");

    const animation = gsap.fromTo(
      charElements,
      {
        willChange: "opacity, transform",
        opacity: 0,
        yPercent: 65,
        scaleY: 1.35,
        scaleX: 0.92,
        filter: "blur(8px)",
        transformOrigin: "50% 50%",
      },
      {
        duration: animationDuration,
        ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        filter: "blur(0px)",
        stagger,
        scrollTrigger: {
          trigger: element,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: 1.1,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [
    animationDuration,
    ease,
    scrollContainerRef,
    scrollEnd,
    scrollStart,
    stagger,
  ]);

  return (
    <h2 ref={containerRef} className={`overflow-hidden ${containerClassName}`.trim()}>
      <span
        className={`block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`.trim()}
      >
        {splitText}
      </span>
    </h2>
  );
}
