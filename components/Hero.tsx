import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const hooks = [
  "Resetting the internet for the next generation",
  'Because "Enough is Enough" isn\'t enough anymore',
  "Give your child a safer digital experience",
  "The Privacy Air Gap: Protection without compromise",
  "300 million children are targeted online every year",
  "It's time to change the math",
];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hookRef = useRef<HTMLDivElement>(null);
  const [hookIndex, setHookIndex] = useState(0);

  useEffect(() => {
    // Title Animation
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
    );

    // Hooks Animation Loop
    const interval = setInterval(() => {
      if (!hookRef.current) return;
      const tl = gsap.timeline();

      // Fade Out
      tl.to(hookRef.current, {
        opacity: 0,
        blur: 10,
        duration: 0.5,
        ease: "power2.in",
      })
        // Swap Text
        .call(() => setHookIndex((prev) => (prev + 1) % hooks.length))
        // Fade In
        .fromTo(
          hookRef.current,
          { opacity: 0, filter: "blur(10px)" },
          { opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
        );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleScrollClick = () => {
    if ((window as any).lenis)
      (window as any).lenis.scrollTo("#roadmap", { duration: 1.8 });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl flex flex-col items-center gap-8">
        {/* Top Tagline */}
        <div className="opacity-60">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.8em] text-cyan-400/80">
            Global Infrastructure Standard
          </span>
        </div>

        {/* Hero Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.95]"
        >
          Intelligence Empowered
          <br />
          <span className="font-serif italic font-light text-cyan-400">
            by Integrity.
          </span>
        </h1>

        {/* Subtitle */}
        <h2 className="text-lg md:text-xl font-light text-white/70 max-w-2xl leading-relaxed">
          The internet was never built for kids.{" "}
          <br className="hidden md:block" />
          <span className="text-white border-b border-cyan-500/50 pb-1">
            So we are re-building it.
          </span>
        </h2>

        {/* THE HOOKS (Fixed height container to prevent jumping) */}
        <div className="h-24 md:h-32 flex items-center justify-center w-full max-w-3xl mt-4">
          <div
            ref={hookRef}
            className="text-sm md:text-xl uppercase tracking-[0.2em] font-bold text-cyan-300 text-center drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          >
            {hooks[hookIndex]}
          </div>
        </div>
      </div>

      {/* Scroll Button (Pinned to bottom) */}
      <button
        onClick={handleScrollClick}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group cursor-pointer z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 group-hover:text-cyan-400 transition-colors">
          The Reset
        </span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-cyan-400 -translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
        </div>
      </button>
    </section>
  );
};

export default Hero;
