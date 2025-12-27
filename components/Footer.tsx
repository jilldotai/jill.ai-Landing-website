
import React, { useState, useEffect } from 'react';
import ScrollVideoSection from './ScrollVideoSection';
import LegalOverlay from './LegalOverlay';

const Footer: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<'privacy' | 'paia' | 'terms' | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMedia = () => setIsMobile(window.innerWidth < 768);
    checkMedia();
    window.addEventListener('resize', checkMedia);
    return () => window.removeEventListener('resize', checkMedia);
  }, []);

  const videoSrc = isMobile ? "/assets/videos/hero-mobile.webm" : "/assets/videos/hero-desktop.webm";
  const bgImage = isMobile ? "/assets/images/bg-mobile.jpg" : "/assets/images/bg-desktop.jpg";

  return (
    <footer className="relative w-full">
      <ScrollVideoSection
        videoSrc={videoSrc}
        introEnd={0}
        scrollEnd={10} // Adjusting to ensure we scrub through the full sequence
        isFooter={true}
        backgroundImage={bgImage}
      >
        <div className="absolute inset-0 z-30 flex flex-col justify-end pointer-events-none">
          <div className="w-full bg-[#050505]/90 backdrop-blur-3xl border-t border-white/5 p-12 md:p-20 pointer-events-auto">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end gap-16 mb-20">
                <div className="flex flex-col gap-6">
                  <span className="text-5xl md:text-8xl font-bold tracking-tighter text-white">JILL.AI</span>
                  <p className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-medium">Restoring Human Agency. Period.</p>
                </div>
                <div className="flex flex-col gap-4 text-right">
                  <nav className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-6">
                    <button onClick={() => setActiveDoc('privacy')} className="hover:text-accent transition-colors">Privacy</button>
                    <button onClick={() => setActiveDoc('paia')} className="hover:text-accent transition-colors">PAIA</button>
                    <button onClick={() => setActiveDoc('terms')} className="hover:text-accent transition-colors">Terms</button>
                  </nav>
                  <p className="text-[9px] uppercase tracking-widest text-white/20">© 2025 JillAI (Pty) Ltd. T/A Jill.AI. Reg: 2025/631008/07</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollVideoSection>
      <LegalOverlay isOpen={activeDoc !== null} onClose={() => setActiveDoc(null)} title={activeDoc || ''} content={null} />
    </footer>
  );
};

export default Footer;
