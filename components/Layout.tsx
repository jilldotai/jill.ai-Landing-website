import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import GlowingCursor from './GlowingCursor';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', () => {
      // @ts-ignore
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.update();
      });
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Global Custom Cursor */}
      <GlowingCursor />

      {/* Global Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-8 mix-blend-difference text-white">
        <div className="text-2xl font-semibold tracking-tighter">JILL.AI</div>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-medium">
          <a href="#" className="hover:text-accent transition-colors">Vision</a>
          <a href="#" className="hover:text-accent transition-colors">Neural</a>
          <a href="#" className="hover:text-accent transition-colors">Manifesto</a>
          <a href="#" className="hover:text-accent transition-colors">API</a>
        </div>
        <button className="px-5 py-2 border border-white/30 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Waitlist
        </button>
      </nav>
      {children}
    </div>
  );
};

export default Layout;