
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

    // Responsive main orb movement (32px / w-8)
    const xTo = gsap.quickTo(orb, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(orb, "y", { duration: 0.1, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Center the main orb (32px wide -> 16px offset)
      xTo(clientX - 16);
      yTo(clientY - 16);

      // Animate tail particles with a dense stagger for a continuous comet effect
      tailRefs.current.forEach((particle, index) => {
        if (particle) {
          gsap.to(particle, {
            x: clientX - 14, // 28px wide -> 14px offset
            y: clientY - 14,
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
      {/* Main Orb: Core of the light (32px) */}
      <div 
        ref={orbRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full z-[9999] pointer-events-none glow-pulse cursor-gradient blur-[1px] opacity-100"
      />
      
      {/* Tail Particles: Substantial glowing stream (28px base) */}
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (tailRefs.current[i] = el)}
          className="fixed top-0 left-0 w-7 h-7 rounded-full z-[9998] pointer-events-none glow-pulse cursor-gradient blur-[2px]"
          style={{
            // High initial opacity that tapers off slowly
            opacity: Math.max(0, (1 - (i / (particleCount * 1.1))) * 0.8),
            // Minimal scaling reduction to keep the trail "thick" and substantial
            transform: `scale(${Math.max(0.4, 1 - (i / (particleCount * 2)))})`,
          }}
        />
      ))}
    </>
  );
};

export default GlowingCursor;
