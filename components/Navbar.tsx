import React from 'react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Technology', href: '#technology' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Team', href: '#team' },
];

interface NavbarProps {
  onMenuOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuOpen }) => {
  function handleLogoClick( event: React.MouseEvent<HTMLDivElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-8 bg-transparent backdrop-blur-md bg-black/50 transition-all duration-700">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 flex justify-between items-center w-full">
        {/* LOGO & TYPOGRAPHY LOGO GROUP */}
        <div onClick={handleLogoClick}>
          {/* ICON LOGO (Solid Fill White SVG) */}
          <div className="w-10 h-10 flex items-center justify-center transition-transform duration-500 group-hover:rotate-6">
            <img
              src="/assets/icons/logo.svg"
              alt="Jill.ai Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* TYPOGRAPHY LOGO (Solid Fill White SVG) */}
          <div className="flex flex-col h-8">
            <img
              src="/assets/icons/logo-text.svg"
              alt="Jill.ai Typography"
              className="h-full w-auto object-contain"
            />
          </div>
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
        </m.a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <m.a
              key={link.href}
              href={link.href}
              whileHover={{ y: -3, color: 'rgb(213, 197, 255)' }}
              className="text-[0.68rem] uppercase tracking-[0.28em] text-paper/70 transition"
            >
              {link.label}
            </m.a>
          ))}
        </nav>

        <m.a
          href="#contact"
          whileHover={{ y: -3, borderColor: 'rgba(213, 197, 255, 0.6)', color: 'rgb(213, 197, 255)' }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-[0.64rem] font-semibold 
          uppercase tracking-[0.3em] text-paper transition md:px-5"
        >
          Join now
        </m.a>
      </div>
    </m.header>
  );
}
