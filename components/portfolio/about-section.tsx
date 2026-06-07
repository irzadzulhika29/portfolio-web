'use client';

import * as React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/react-bits/scroll-reveal";
import { Button } from "@/components/ui/button";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

function PhotoCard3D() {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y - height / 2) / (height / 2)) * -8;
    const rotateY = ((x - width / 2) / (width / 2)) * 8;
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.4s ease-in-out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, transformStyle: "preserve-3d", willChange: "transform" }}
      className="relative mt-4 w-full max-w-[260px] aspect-[3/4] rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.22)] cursor-pointer overflow-hidden lg:mt-8 lg:hidden"
    >
      {/* Background image */}
      <Image
          src="/fotodiri.png"
          alt="Irza"
        fill
        sizes="(max-width: 1024px) 260px, 0px"
        className="object-cover rounded-3xl"
        style={{ transform: "translateZ(-20px) scale(1.1)" }}
        priority
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent rounded-3xl" />

      {/* Glare */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-3xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 55%)",
        }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 p-5 flex flex-col justify-end"
        style={{ transform: "translateZ(40px)" }}
      >
        {/* Name & role dock at bottom */}
        <div className="flex items-start justify-between rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-white leading-tight">Irza</h3>
            <p className="text-xs text-white/70">Full Stack Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen overflow-hidden rounded-b-[3rem] bg-[#f4f1eb] text-black sm:rounded-b-[4rem] lg:rounded-b-[5rem]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_45%)]"
      />
      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-2 px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-24 lg:pt-0">
        <div className="relative flex flex-col items-center justify-center">
          <p className="font-serif text-3xl italic tracking-[-0.04em] text-black/55 sm:text-4xl">
            Who I Am
          </p>
          <PhotoCard3D />
          <div className="relative mt-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 w-[180vw] whitespace-nowrap text-[6rem] font-semibold uppercase leading-none tracking-[0.08em] text-black/[0.05] sm:text-[12rem] lg:text-[19rem] hidden lg:block"
            >
              PROFILE
            </div>
            <div className="relative z-10">
              <div className="hidden lg:block text-5xl font-semibold leading-[0.8] tracking-[-0.1em] text-black sm:text-[6.5rem] lg:text-[8.8rem]">
                <div>I&apos;m</div>
                <div>IRZAA</div>
              </div>
              <p className="hidden lg:block mt-5 text-lg uppercase tracking-[0.32em] text-black/78 sm:text-2xl">
                Full Stack Developer
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center">
          <div className="flex w-full flex-col">
            <div
              className={`${openSans.className} w-full max-w-[100vh] text-md leading-[1.7] text-black sm:text-md`}
            >
              <div className="border-l-2 border-black/30 pl-6">
              <ScrollReveal
                baseOpacity={0.05}
                enableBlur={true}
                baseRotation={3}
                blurStrength={14}
                containerClassName="my-0"
                textClassName="!text-sm md:!text-2xl leading-[1.65] font-light text-black"
                rotationStart="top bottom+=40%"
                rotationEnd="top 70%"
                wordAnimationStart="top bottom+=35%"
                wordAnimationEnd="top 30%"
              >
                <>
                 As an Information Systems graduate and Software Engineer, I specialize in translating complex business needs into efficient web applications.

From digitizing operational workflows to architecting frontend interfaces, I thrive on building scalable full-stack solutions from the ground up that deliver real-world impact.
                 </>
              </ScrollReveal>
              </div>
              <motion.a
                href="https://www.linkedin.com/in/irza-dzulhika/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 lg:mt-8 inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <Button className="h-12 rounded-full bg-black px-4 text-sm font-medium text-white hover:bg-black/90">
                  Let&apos;s Connect
                  <ChevronRight className="size-5" />
                </Button>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
