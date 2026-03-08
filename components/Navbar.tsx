'use client';

import Image from 'next/image';
import { m } from 'motion/react';

const links = [
  { href: '#mission', label: 'Mission' },
  { href: '#showcase', label: 'Showcase' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#founder', label: 'Founder' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  return (
<<<<<<< HEAD
    <m.header
      className="sticky top-0 z-50 px-5 py-4 md:px-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="iridescent-border mx-auto flex w-full max-w-360 items-center justify-between rounded-full border border-white/10 bg-black/35 px-5 py-4 backdrop-blur-xl md:px-7">
        <m.a
          href="#top"
          data-brand-anchor="true"
          className="flex items-center gap-3"
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
=======
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

        {/* MENU TOGGLE */}
        <button
          onClick={onMenuOpen}
          className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.5em] font-bold text-foreground"
>>>>>>> 1ef9574d953de48238ed3800f4740a5c6e21a9f0
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/4">
            <Image src="/assets/icons/logo-iridescent.svg" alt="Jill.ai logo" width={28} height={28} className="h-7 w-7" />
          </span>
          <div>
            <div className="iridescent-text text-sm uppercase tracking-[0.32em]">Jill.ai</div>
            <div className="text-[0.62rem] uppercase tracking-[0.28em] text-paper/42">Intelligence with intent</div>
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
          className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-paper transition md:px-5"
        >
          Join now
        </m.a>
      </div>
    </m.header>
  );
}
