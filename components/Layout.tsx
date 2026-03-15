import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.35,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
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

    // Ensure GSAP knows about the page layout after mounting
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      lenisInstance.destroy();
      delete (window as any).lenis;
    };
  }, []);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div className="relative">
      <Navbar onMenuOpen={handleMenuOpen} />
      {children}
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center">
          <button
            onClick={handleMenuClose}
            className="absolute top-8 right-8 text-white text-2xl font-bold"
          >
            &times;
          </button>
          <nav className="flex flex-col items-center gap-8">
            {[
              { label: 'About', href: '#about' },
              { label: 'Technology', href: '#technology' },
              { label: 'Use Cases', href: '#use-cases' },
              { label: 'Team', href: '#team' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white text-xl font-medium hover:text-blue-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Layout;