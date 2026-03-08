import React from 'react';
import JillMark from './JillMark';

interface NavbarProps {
  onMenuOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuOpen }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[1200] px-6 md:px-14 py-6 backdrop-blur-md bg-black/15 border-b border-white/5">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        <div className="relative">
          <div id="navbar-brand-lock" className="absolute left-0 top-0 w-[1px] h-[1px] opacity-0 pointer-events-none" />
          <a href="#" className="inline-flex items-center" aria-label="Jill AI">
            <JillMark compact className="text-white" />
          </a>
        </div>

        <button
          onClick={onMenuOpen}
          className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.5em] font-bold text-foreground"
        >
          <span className="hidden md:block opacity-60 group-hover:opacity-100 transition-opacity">
            Menu
          </span>
          <div className="flex flex-col gap-1.5 w-10">
            <div className="w-full h-[1.5px] bg-foreground transition-all duration-500 group-hover:translate-y-[-2px]" />
            <div className="w-2/3 h-[1.5px] bg-foreground transition-all duration-500 group-hover:w-full self-end" />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
