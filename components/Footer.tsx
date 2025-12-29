import React, { useState } from 'react';
import LegalOverlay from './LegalOverlay';

const Footer: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<'privacy' | 'paia' | 'terms' | null>(null);

  return (
    <footer className="relative w-full">
      <div className="w-full bg-[#050505]/95 backdrop-blur-3xl border-t border-white/5 p-8 md:p-12 relative z-30">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 items-end">
            <div className="flex flex-col gap-4">
              <span className="text-5xl md:text-8xl font-bold tracking-tighter text-white">JILL.AI</span>
              <p className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-medium">Restoring Human Agency. Period.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 mt-8 pt-8 border-t border-white/5 text-[9px] uppercase tracking-widest text-white/40">
                <div>
                  <p className="text-white/20 mb-1">Entity</p>
                  <p>JillAI (Pty) Ltd t/a jill.ai</p>
                  <p className="mt-2 text-white/20 mb-1">Registration</p>
                  <p>2025 / 631008 / 07</p>
                </div>
                <div>
                  <p className="text-white/20 mb-1">Tax / VAT</p>
                  <p>9976067190</p>
                  <p className="mt-2 text-white/20 mb-1">Regulator Reg</p>
                  <p>2025-068501</p>
                </div>
                <div className="sm:col-span-2 mt-4 text-[8px] opacity-30 leading-relaxed font-light normal-case">
                  Director: Estelle Coetzee • Information Officer: Estelle Coetzee<br />
                  Physical Address: Vaalpark, Sasolburg, Freestate, South Africa
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 md:items-end">
              <nav className="flex flex-wrap gap-8 text-[10px] font-bold uppercase tracking-[0.4em]">
                <button
                  onClick={() => setActiveDoc('privacy')}
                  className="text-white/40 hover:text-white hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-500"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveDoc('paia')}
                  className="text-white/40 hover:text-white hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] transition-all duration-500"
                >
                  PAIA Manual
                </button>
                <button
                  onClick={() => setActiveDoc('terms')}
                  className="text-white/40 hover:text-white hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-500"
                >
                  Terms of Use
                </button>
              </nav>
              <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 mt-4">© 2025 Jill.AI. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
      <LegalOverlay isOpen={activeDoc !== null} onClose={() => setActiveDoc(null)} title={activeDoc || ''} content={null} />
    </footer>
  );
};

export default Footer;
