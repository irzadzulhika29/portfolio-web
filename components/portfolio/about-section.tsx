import { ChevronRight } from "lucide-react";

import ScrollReveal from "@/components/react-bits/scroll-reveal";
import { Button } from "@/components/ui/button";

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
      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-16 px-5 pb-16 sm:px-6 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-24">
        <div className="relative">
          <p className="font-serif text-3xl italic tracking-[-0.04em] text-black/55 sm:text-4xl">
            Who I Am
          </p>
          <div className="relative mt-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 w-[180vw] whitespace-nowrap text-[6rem] font-semibold uppercase leading-none tracking-[0.08em] text-black/[0.05] sm:text-[12rem] lg:text-[19rem]"
            >
              PROFILE
            </div>
            <div className="relative z-10">
              <div className="text-5xl font-semibold leading-[0.8] tracking-[-0.1em] text-black sm:text-[6.5rem] lg:text-[8.8rem]">
                <div>I&apos;m</div>
                <div>IRZAA</div>
              </div>
              <p className="mt-5 text-lg uppercase tracking-[0.32em] text-black/78 sm:text-2xl">
                Full Stack Developer
              </p>
              <a href="#contact">
                <Button className="mt-8 h-14 rounded-full bg-black px-7 text-base font-medium text-white hover:bg-black/90">
                  Let&apos;s Connect
                  <ChevronRight className="size-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex items-center">
          <div className="flex w-full flex-col">
            <div className="w-full max-w-[100vh] text-lg leading-[1.8] text-black/88 sm:text-xl">
              <ScrollReveal
                baseOpacity={0.18}
                enableBlur={true}
                baseRotation={2.5}
                blurStrength={7}
                containerClassName="my-0"
                textClassName="text-lg leading-[1.8] font-normal text-black/88 sm:text-xl"
                rotationStart="top bottom+=18%"
                rotationEnd="top 60%"
                wordAnimationStart="top bottom+=12%"
                wordAnimationEnd="top 56%"
              >
                <>
                  Hi, I&apos;m <span className="font-semibold italic">Irza</span>.
                </>
              </ScrollReveal>

              <ScrollReveal
                baseOpacity={0.16}
                enableBlur={true}
                baseRotation={2}
                blurStrength={6}
                containerClassName="mt-6"
                textClassName="text-lg leading-[1.8] font-normal text-black/88 sm:text-xl"
                rotationStart="top bottom+=18%"
                rotationEnd="top 60%"
                wordAnimationStart="top bottom+=12%"
                wordAnimationEnd="top 56%"
              >
                I&apos;m an Information Systems student passionate about web
                development, AI/ML, automation, and quality assurance. I focus
                on building modern, interactive, and reliable digital products
                by combining clean web development, intelligent systems, and
                structured testing.
              </ScrollReveal>

              <ScrollReveal
                baseOpacity={0.16}
                enableBlur={true}
                baseRotation={2}
                blurStrength={6}
                containerClassName="mt-6"
                textClassName="text-lg leading-[1.8] font-normal text-black/88 sm:text-xl"
                rotationStart="top bottom+=18%"
                rotationEnd="top 60%"
                wordAnimationStart="top bottom+=12%"
                wordAnimationEnd="top 56%"
              >
                <>
                  I&apos;m familiar with technologies such as{" "}
                  <span className="text-[#2563eb]">Next.js</span>,{" "}
                  <span className="text-zinc-800">Express.js</span>,{" "}
                  <span className="text-[#ef4444]">PyTorch</span>,{" "}
                  <span className="text-[#f59e0b]">TensorFlow</span>, and other
                  modern tools that help me turn ideas into functional and
                  scalable solutions.
                </>
              </ScrollReveal>

              <ScrollReveal
                baseOpacity={0.16}
                enableBlur={true}
                baseRotation={2}
                blurStrength={6}
                containerClassName="mt-6"
                textClassName="text-lg leading-[1.8] font-normal text-black/88 sm:text-xl"
                rotationStart="top bottom+=18%"
                rotationEnd="top 60%"
                wordAnimationStart="top bottom+=12%"
                wordAnimationEnd="top 56%"
              >
                I&apos;m always open to learning, collaborating, and working on
                meaningful technology-driven projects.
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
