
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
    <nav className="fixed top-0 left-0 w-full z-50 py-8 bg-transparent backdrop-blur-md bg-black/50 transition-all duration-700">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 flex justify-between items-center w-full">
        {/* LOGO & TYPOGRAPHY LOGO GROUP */}
        <div onClick={handleLogoClick}>
          {/* ICON LOGO (Solid Fill White SVG) */}
          <div className="w-10 h-10 flex items-center justify-center transition-transform duration-500 group-hover:rotate-6">
            <img
              src="./assets/icons/logo.svg"
              alt="Jill.ai Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* TYPOGRAPHY LOGO (Solid Fill White SVG) */}
          <div className="flex flex-col h-8">
            <img
              src="./assets/icons/logo-text.svg"
              alt="Jill.ai Typography"
              className="h-full w-auto object-contain"
            />
          </div>
        </div>

        {/* MENU TOGGLE */}
        <button
          onClick={onMenuOpen}
          className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.5em] font-bold text-foreground"
        >
          <span className="hidden md:block opacity-60 group-hover:opacity-100 transition-opacity">
            {" "}
            Menu
          </span>
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
