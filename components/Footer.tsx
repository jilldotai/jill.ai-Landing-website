import React from 'react';
import ScrollVideoSection from './ScrollVideoSection';

const Footer: React.FC = () => {
  // Using the same cached video resource for visual continuity
  const footerVideo = "https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-woman-in-a-field-of-flowers-43187-large.mp4";

  return (
    <footer className="relative w-full">
      <ScrollVideoSection
        videoSrc={footerVideo}
        introStart={0}
        introEnd={7}
        scrollEnd={7}
        isFooter={true}
        backgroundImage="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1920&auto=format&fit=crop"
      >
        {/* Foreground Content Overlay */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end pointer-events-none">
          <div className="w-full bg-black/30 backdrop-blur-lg border-t border-white/10 p-8 md:p-16 pointer-events-auto">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                
                {/* Brand & Corp Identity */}
                <div className="col-span-1 md:col-span-2">
                  <div className="text-3xl font-semibold tracking-tighter text-white mb-6">JILL.AI</div>
                  <div className="space-y-2 text-[10px] uppercase tracking-[0.2em] text-white/50 font-light">
                    <p>Company: <span className="text-white/80">JillAI (Pty) Ltd t/a jill.ai</span></p>
                    <p>Registration No: <span className="text-white/80">2025 / 631008 / 07</span></p>
                    <p>TAX No: <span className="text-white/80">9976067190</span></p>
                    <p>Regulator Reg No: <span className="text-white/80">2025-068501</span></p>
                  </div>
                </div>

                {/* Governance */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-6">Governance</h4>
                  <div className="space-y-2 text-[10px] uppercase tracking-[0.2em] text-white/50 font-light">
                    <p>Directors: <span className="text-white/80">E. Coetzee</span></p>
                    <p>Information Officer: <span className="text-white/80">E. Coetzee</span></p>
                    <p className="mt-4 leading-relaxed">
                      Vaalpark, Sasolburg,<br />
                      Freestate, South Africa
                    </p>
                  </div>
                </div>

                {/* Navigation Links */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-6">Legal Artifacts</h4>
                  <nav className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.2em] font-medium">
                    <a href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-105 origin-left" style={{ textShadow: '0 0 10px transparent' }}>
                      Privacy Policy
                    </a>
                    <a href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-105 origin-left">
                      PAIA Manual
                    </a>
                    <a href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-105 origin-left">
                      Terms of Use
                    </a>
                  </nav>
                </div>
              </div>

              {/* Bottom Copyright Strip */}
              <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/30">
                  © 2025 Jill.AI. All Rights Reserved.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">Secure Node: VAALPARK-01</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollVideoSection>

      <style dangerouslySetInnerHTML={{ __html: `
        a:hover {
          text-shadow: 0 0 15px var(--glow-color);
          color: white !important;
        }
      `}} />
    </footer>
  );
};

export default Footer;