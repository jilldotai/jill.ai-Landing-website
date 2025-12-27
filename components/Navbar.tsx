
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onMenuOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.5 });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[150] transition-all duration-700 ${
      isScrolled ? 'py-4 bg-background/80 backdrop-blur-lg border-b border-foreground/5' : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 flex justify-between items-center w-full">
        {/* LOGO & TYPOGRAPHY LOGO GROUP */}
        <div 
          className="flex items-center gap-6 group cursor-pointer" 
          onClick={handleLogoClick}
        >
          {/* ICON LOGO (Solid Fill White SVG) */}
          <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-6">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 28V12H16V24H24V28H12Z" fill="white" />
              <circle cx="28" cy="12" r="4" fill="white" />
            </svg>
          </div>

          {/* TYPOGRAPHY LOGO (Solid Fill SVG/Text for Jill.AI) */}
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-[-0.05em] text-foreground leading-none">JILL.AI</span>
            <span className="text-[7px] uppercase tracking-[0.6em] text-foreground/40 mt-1">Intelligence</span>
          </div>
        </div>

        {/* MENU TOGGLE */}
        <button 
          onClick={onMenuOpen}
          className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.5em] font-bold text-foreground"
        >
          <span className="hidden md:block opacity-40 group-hover:opacity-100 transition-opacity">Node Menu</span>
          <div className="flex flex-col gap-1.5 w-10">
            <div className="w-full h-[1.5px] bg-foreground transition-all duration-500 group-hover:translate-y-[-2px]"></div>
            <div className="w-2/3 h-[1.5px] bg-foreground transition-all duration-500 group-hover:w-full self-end"></div>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
