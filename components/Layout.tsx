import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
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
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisInstance);

    lenisInstance.on('scroll', () => {
      // @ts-ignore
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.update();
      });
    });

    const raf = (time: number) => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen">
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