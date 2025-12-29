import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GlowingCursor: React.FC = () => {
  const orbRef = useRef<HTMLDivElement>(null);
  const tailRefs = useRef<(HTMLDivElement | null)[]>([]);
  // High particle count for a dense, continuous light stream
  const particleCount = 20;

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    // Responsive main orb movement (24px / w-6)
    const xTo = gsap.quickTo(orb, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(orb, "y", { duration: 0.1, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Reveal cursor and hide system cursor only on first real movement
      if (orb.style.visibility === "hidden") {
        document.body.classList.add('custom-cursor');
        gsap.to([orb, ...tailRefs.current], {
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.01
        });
      }

      // Center the main orb (24px wide -> 12px offset)
      xTo(clientX - 12);
      yTo(clientY - 12);

      // Animate tail particles
      tailRefs.current.forEach((particle, index) => {
        if (particle) {
          gsap.to(particle, {
            x: clientX - 10,
            y: clientY - 10,
            duration: 0.08 + (index * 0.025),
            ease: "power2.out"
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('custom-cursor');
    };
  }, []);

  return (
    <>
      {/* Main Orb */}
      <div
        ref={orbRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full z-[9999] pointer-events-none glow-pulse cursor-gradient main-orb-breathe blur-[1px] opacity-0 invisible"
        style={{ visibility: 'hidden' }}
      />

      {/* Tail Particles */}
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={i}
          ref={(el) => { tailRefs.current[i] = el; }}
          className="fixed top-0 left-0 w-5 h-5 rounded-full z-[9998] pointer-events-none glow-pulse cursor-gradient blur-[2px] opacity-0 invisible"
          style={{
            transform: `scale(${Math.max(0.3, 1 - (i / (particleCount * 1.5)))})`,
            visibility: 'hidden'
          }}
        />
      ))}
    </>
  );
};

export default GlowingCursor;