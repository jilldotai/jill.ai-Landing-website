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
    // 1. Initialize Lenis for a "heavy", premium feel
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisInstance);
    (window as any).lenis = lenisInstance;

    // 2. Synchronize with ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // 3. Drive Lenis with GSAP Ticker for perfect frame synchronization
    const tick = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Initial Refresh
    ScrollTrigger.refresh();

    // 4. Cleanup
    return () => {
      gsap.ticker.remove(tick);
      lenisInstance.destroy();
      delete (window as any).lenis;
    };
  }, []);

  // Control scrolling availability based on menu state
  useEffect(() => {
    if (lenis) {
      if (isMenuOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [isMenuOpen, lenis]);

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white relative bg-background">
      {/* Highest Z-Index Layer: Cursor (9999) */}
      <GlowingCursor />
      
      {/* UI Layers: Navbar (50), Overlay (100) */}
      <Navbar onMenuOpen={() => setIsMenuOpen(true)} />
      
      <MenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        lenis={lenis}
      />
      
      {/* Main Content Layer: Z-10 ensures it is above background effects but below UI */}
      <div id="main-content-wrapper" className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;