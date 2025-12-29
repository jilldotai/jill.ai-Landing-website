
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const hooks = [
  "Resetting the internet for the next generation",
  "Because \"Enough is Enough\" isn't enough anymore",
  "Give your child a safer digital experience, not a restricted one",
  "The Privacy Air Gap: On-device protection that doesn't compromise",
  "300 million children are targeted online every year",
  "It's time to change the math"
];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hookRef = useRef<HTMLDivElement>(null);
  const [hookIndex, setHookIndex] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.8 } });
    if (titleRef.current) {
      tl.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, delay: 0.5 });
    }

    // Hook stack transition logic
    const interval = setInterval(() => {
      if (!hookRef.current) return;

      gsap.to(hookRef.current, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          setHookIndex((prev) => (prev + 1) % hooks.length);
          gsap.fromTo(
            hookRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8 }
          );
        }
      });
    }, 4000); // 3 seconds visible + 1 second transition

    return () => clearInterval(interval);
  }, []);

  const handleScrollClick = () => {
    if ((window as any).lenis) (window as any).lenis.scrollTo('#roadmap', { duration: 1.8 });
  };

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent px-6">
      <div className="relative z-10 text-center max-w-6xl">
        <div className="mb-12 flex justify-center opacity-40">
          <span className="text-[10px] uppercase tracking-[1em] font-medium text-foreground">Global Infrastructure Standard</span>
        </div>

        <h1
          ref={titleRef}
          className="text-[6vw] md:text-[5vw] font-bold tracking-[-0.07em] text-foreground leading-[0.9] mb-8"
        >
          Intelligence Empowered<br />by <span className="italic font-serif font-light text-accent">Integrity.</span>
        </h1>

        <div className="space-y-8 max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-light text-foreground/80 tracking-tight">
            The internet was never built for kids. <span className="text-accent underline decoration-white/20 underline-offset-8 font-medium">So we are re-building it.</span>
          </h2>

          <p className="text-sm md:text-base text-foreground/50 font-light leading-relaxed tracking-wide max-w-2xl mx-auto">
            Jill.ai introduces IOkT (The Internet of Kids' Things): An on-device, AI-driven operating environment that acts as a proactive guardian. We replace reactive blocking with real-time safety, emotional guidance, and biometric verification—without sensitive data ever leaving the device.
          </p>

          {/* HOOK STACK */}
          <div className="pt-24 min-h-[80px] flex flex-col items-center justify-center">
            <div
              ref={hookRef}
              className="text-sm md:text-base uppercase tracking-[0.4em] font-bold text-accent h-full text-center"
            >
              {hooks[hookIndex]}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleScrollClick}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer"
      >
        <span className="text-[9px] uppercase tracking-[0.5em] font-bold opacity-30 group-hover:opacity-100 group-hover:text-accent transition-all">The Reset</span>
        <div className="w-[1.5px] h-12 bg-foreground/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-accent -translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
        </div>
      </button>
    </section>
  );
};

export default Hero;
