
import React from 'react';

const FounderSection: React.FC = () => {
  return (
    <section id="founder" className="py-40 px-6 md:px-20 bg-background border-t border-foreground/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24 items-center relative z-10">
        <div className="md:w-1/2 relative">
          <div className="relative aspect-[4/5] w-full max-w-lg mx-auto overflow-visible">
            <img 
              src="/assets/images/founder-transparent.png" 
              alt="E. Coetzee" 
              className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_40px_60px_rgba(0,0,0,0.1)] grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute bottom-10 left-10 right-10 top-20 bg-accent/5 rounded-[4rem] -z-0" />
          </div>
        </div>
        <div className="md:w-1/2">
          <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-6 block">Visionary Founder</span>
          <h2 className="text-6xl md:text-9xl font-bold tracking-[-0.06em] text-foreground mb-8">E. Coetzee</h2>
          <div className="space-y-6 text-foreground/50 font-light leading-relaxed text-xl">
            <p>
              "Jill is not a replacement for human thought, but the silent partner in your most complex endeavors."
            </p>
          </div>
          <div className="mt-16 pt-12 border-t border-foreground/10 grid grid-cols-2 gap-10">
            <div>
              <p className="text-4xl font-bold tracking-tight">2025</p>
              <p className="text-[10px] uppercase tracking-widest text-foreground/40 mt-1">Genesis Year</p>
            </div>
            <div>
              <p className="text-4xl font-bold tracking-tight">IOkT</p>
              <p className="text-[10px] uppercase tracking-widest text-foreground/40 mt-1">Foundational Node</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
