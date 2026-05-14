"use client";

export function ScrollVideoSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video with bottom crop to hide watermark */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <video
          className="absolute left-0 top-0 h-[110%] w-full object-cover"
          src="/hero/hero_animation_2.mp4"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
        />
      </div>
    </section>
  );
}
