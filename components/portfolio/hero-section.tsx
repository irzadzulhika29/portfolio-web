import LightRays from "@/components/react-bits/light-rays";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative h-screen min-h-screen overflow-hidden"
    >
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
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex w-full max-w-7xl items-end px-5 sm:px-6 lg:px-8">
          <div className="w-full">
            <p className="max-w-4xl text-lg font-light tracking-[-0.04em] text-white sm:text-2xl lg:text-[3rem] lg:leading-[1.1]">
              Crafting purpose driven experiences that inspire & engage.
            </p>
            <h1 className="mt-6 flex flex-wrap items-end gap-x-4 leading-[0.82] tracking-[-0.08em] text-white sm:gap-x-6 lg:mt-8">
              <span className="font-serif text-[4.5rem] italic font-light sm:text-[7rem] lg:text-[12rem] xl:text-[15rem]">
                HI!
              </span>
              <span className="text-[4.75rem] font-semibold sm:text-[7.25rem] lg:text-[12.5rem] xl:text-[15.5rem]">
                ZAA.
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
