import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GlowingCursor: React.FC = () => {
  const orbRef = useRef<HTMLDivElement>(null);
  const tailRefs = useRef<(HTMLDivElement | null)[]>([]);
  // High particle count for a dense, continuous light stream
  const particleCount = 20; 

  useEffect(() => {
    // Check if device supports hover (desktop)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const orb = orbRef.current;
    if (!orb) return;

    // Responsive main orb movement (24px / w-6)
    const xTo = gsap.quickTo(orb, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(orb, "y", { duration: 0.1, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Center the main orb (24px wide -> 12px offset)
      xTo(clientX - 12);
      yTo(clientY - 12);

      // Animate tail particles with a dense stagger for a continuous comet effect
      tailRefs.current.forEach((particle, index) => {
        if (particle) {
          gsap.to(particle, {
            x: clientX - 10, // 20px wide -> 10px offset
            y: clientY - 10,
            // Tight duration scaling for a fluid, thick stream
            duration: 0.08 + (index * 0.025), 
            ease: "power2.out"
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Don't render on mobile/touch devices
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Main Orb: Core of the light (24px) with iridescent breathing pulse */}
      <div 
        ref={orbRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full z-[9999] pointer-events-none glow-pulse cursor-gradient main-orb-breathe blur-[1px] opacity-100"
      />
      
      {/* Tail Particles: Substantial glowing stream (20px base) */}
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (tailRefs.current[i] = el)}
          className="fixed top-0 left-0 w-5 h-5 rounded-full z-[9998] pointer-events-none glow-pulse cursor-gradient blur-[2px]"
          style={{
            // High initial opacity that tapers off slowly
            opacity: Math.max(0, (1 - (i / (particleCount * 1.1))) * 0.7),
            // Minimal scaling reduction to keep the trail "thick" and substantial
            transform: `scale(${Math.max(0.3, 1 - (i / (particleCount * 1.5)))})`,
          }}
        />
      ))}
    </>
  );
};

export default GlowingCursor;