import LightRays from "@/components/react-bits/light-rays";
import GradientText from "@/components/react-bits/gradient-text";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative h-screen min-h-screen overflow-hidden"
    >
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src="/hero/liquid_bubbles.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.2}
          lightSpread={0.75}
          rayLength={1.6}
          fadeDistance={1.2}
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0.04}
          distortion={0.02}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_28%),linear-gradient(to_bottom,rgba(5,5,5,0.02),rgba(5,5,5,0.82)_72%,rgba(5,5,5,0.96)_100%)]" />
      <div className="absolute inset-0 z-10 flex items-center sm:inset-x-0 sm:bottom-0 sm:top-auto sm:block">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-5 text-center sm:items-end sm:justify-start sm:px-6 sm:text-left lg:px-8">
          <div className="w-full">
            <p className="mx-auto max-w-4xl font-sans text-lg font-light tracking-[-0.04em] text-white sm:mx-0 sm:text-2xl lg:text-[3rem] lg:leading-[1.1]">
              Crafting purpose driven experiences that inspire & engage.
            </p>
            <h1 className="mt-6 flex flex-wrap items-end justify-center gap-x-4 leading-[0.82] tracking-[-0.08em] text-white sm:justify-start sm:gap-x-6 lg:mt-8">
              <GradientText
                colors={["#5227FF", "#FF9FFC", "#B497CF"]}
                animationSpeed={3}
                showBorder={false}
                className="font-serif text-[4.5rem] italic font-light sm:text-[7rem] lg:text-[12rem] xl:text-[15rem]"
              >
                HI!
              </GradientText>
              <GradientText
                colors={["#5227FF", "#FF9FFC", "#B497CF"]}
                animationSpeed={3}
                showBorder={false}
                className="text-[4.75rem] font-semibold sm:text-[7.25rem] lg:text-[12.5rem] xl:text-[15.5rem]"
              >
                ZAA.
              </GradientText>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
