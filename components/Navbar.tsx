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
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    // CRITICAL: pointer-events-none here ensures the transparent parts of the nav
    // don't catch the mouse wheel.
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 pointer-events-none ${
      isScrolled ? 'bg-black/40 backdrop-blur-md py-4' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center w-full">
        {/* Logo - pointer-events-auto restores interactivity to the button */}
        <div 
          className="flex items-center gap-3 group cursor-pointer pointer-events-auto" 
          onClick={handleLogoClick}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover:rotate-12">
            <rect width="40" height="40" rx="10" fill="black" />
            <path d="M12 28V12H16V24H24V28H12Z" fill="#d48d5d" />
            <circle cx="28" cy="12" r="4" fill="#d48d5d" />
          </svg>
          <span className="text-2xl font-semibold tracking-tighter text-white mix-blend-difference">JILL.AI</span>
        </div>

        {/* Menu Toggle - pointer-events-auto restores interactivity to the button */}
        <button 
          onClick={onMenuOpen}
          className="group flex items-center gap-4 text-xs uppercase tracking-[0.4em] font-bold text-white mix-blend-difference pointer-events-auto"
        >
          <span className="hidden md:block opacity-60 group-hover:opacity-100 transition-opacity">Menu</span>
          <div className="flex flex-col gap-1.5">
            <div className="w-8 h-[1px] bg-white transition-all duration-500 group-hover:w-12"></div>
            <div className="w-5 h-[1px] bg-white transition-all duration-500 group-hover:w-12 self-end"></div>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;