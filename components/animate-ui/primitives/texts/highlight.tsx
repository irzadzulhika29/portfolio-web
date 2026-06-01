'use client';

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface HighlightTextProps extends Omit<HTMLMotionProps<"span">, "children"> {
  text: string;
  gradient?: string;
  transition?: any;
  inView?: boolean;
  inViewMargin?: string;
  inViewOnce?: boolean;
  delay?: number;
}

export const HighlightText = React.forwardRef<HTMLSpanElement, HighlightTextProps>(
  (
    {
      text,
      gradient = "linear-gradient(90deg, #3b82f6 0%, #a855f7 20%, #ec4899 50%, #a855f7 80%, #3b82f6 100%)",
      transition = { duration: 2, ease: "easeInOut" },
      inView = false,
      inViewMargin = "0px",
      inViewOnce = true,
      delay = 0,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Check if the className already contains background classes to avoid overriding them
    const hasBgClass = className?.split(" ").some((c) => c.startsWith("bg-"));
    const finalBackgroundImage = hasBgClass ? undefined : gradient;

    const finalTransition = {
      ...transition,
      delay: delay ?? transition.delay ?? 0,
    };

    const animationProps = inView
      ? {
          initial: { backgroundSize: "0% 100%" },
          whileInView: { backgroundSize: "100% 100%" },
          viewport: { once: inViewOnce, margin: inViewMargin },
        }
      : {
          initial: { backgroundSize: "0% 100%" },
          animate: { backgroundSize: "100% 100%" },
        };

    return (
      <motion.span
        ref={ref}
        className={cn("inline-block", className)}
        style={{
          backgroundImage: finalBackgroundImage,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
          ...style,
        }}
        {...animationProps}
        transition={finalTransition}
        {...props}
      >
        {text}
      </motion.span>
    );
  }
);

HighlightText.displayName = "HighlightText";
