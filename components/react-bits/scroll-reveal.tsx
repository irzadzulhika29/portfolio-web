"use client";

import React, {
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationStart?: string;
  rotationEnd?: string;
  wordAnimationStart?: string;
  wordAnimationEnd?: string;
}

function splitNode(node: ReactNode, keyPrefix = "node"): ReactNode[] {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, index) => {
      if (/^\s+$/.test(part)) {
        return part;
      }

      return (
        <span className="word inline-block" key={`${keyPrefix}-${index}`}>
          {part}
        </span>
      );
    });
  }

  if (Array.isArray(node)) {
    return node.flatMap((child, index) =>
      splitNode(child, `${keyPrefix}-${index}`)
    );
  }

  if (isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: ReactNode }>;
    const processedChildren = splitNode(
      element.props.children,
      `${keyPrefix}-child`
    );

    return [
      cloneElement(element, {
        key: keyPrefix,
        ...element.props,
        children: processedChildren,
      }),
    ];
  }

  return [node];
}

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationStart = "top bottom",
  rotationEnd = "bottom bottom",
  wordAnimationStart = "top bottom-=20%",
  wordAnimationEnd = "bottom bottom",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(
    () =>
      Children.toArray(children).flatMap((child, index) =>
        splitNode(child, `chunk-${index}`)
      ),
    [children]
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const scroller = scrollContainerRef?.current ?? window;
    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: element,
            scroller,
            start: rotationStart,
            end: rotationEnd,
            scrub: 0.35,
          },
        }
      );

      const wordElements = element.querySelectorAll<HTMLElement>(".word");

      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: "opacity" },
        {
          ease: "none",
          opacity: 1,
          stagger: 0.025,
          scrollTrigger: {
            trigger: element,
            scroller,
            start: wordAnimationStart,
            end: wordAnimationEnd,
            scrub: 0.35,
          },
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: "none",
            filter: "blur(0px)",
            stagger: 0.025,
            scrollTrigger: {
              trigger: element,
              scroller,
              start: wordAnimationStart,
              end: wordAnimationEnd,
              scrub: 0.35,
            },
          }
        );
      }
    }, containerRef);

    return () => context.revert();
  }, [
    baseOpacity,
    baseRotation,
    blurStrength,
    enableBlur,
    rotationStart,
    rotationEnd,
    scrollContainerRef,
    wordAnimationStart,
    wordAnimationEnd,
  ]);

  return (
    <div ref={containerRef} className={`my-5 ${containerClassName}`.trim()}>
      <div
        className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`.trim()}
      >
        {splitText}
      </div>
    </div>
  );
}
