import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlowingCursor from './GlowingCursor';
import Navbar from './Navbar';
import MenuOverlay from './MenuOverlay';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(lenisInstance);
    (window as any).lenis = lenisInstance;

    lenisInstance.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white">
      <GlowingCursor />
      <Navbar onMenuOpen={() => setIsMenuOpen(true)} />
      <MenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        lenis={lenis}
      />
      {children}
    </div>
  );
};

export default Layout;