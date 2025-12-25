import React from 'react';

const FounderSection: React.FC = () => {
  return (
    <section id="founder" className="py-40 px-6 md:px-20 bg-background border-t border-foreground/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
        {/* Portrait */}
        <div className="md:w-1/2 relative">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-3xl">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop" 
              alt="E. Coetzee" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-accent/10 mix-blend-overlay pointer-events-none"></div>
          </div>
          {/* Accent decoration */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r border-b border-accent opacity-20 hidden md:block"></div>
        </div>

        {/* Bio */}
        <div className="md:w-1/2">
          <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-6 block">Visionary / Founder</span>
          <h2 className="text-5xl md:text-8xl font-light tracking-tighter text-foreground mb-8">E. Coetzee.</h2>
          <div className="space-y-6 text-foreground/60 font-light leading-relaxed text-lg">
            <p>
              With over a decade of research into the intersection of cognitive science and generative architectures, Coetzee founded Jill.ai with a singular focus: to restore human agency in a world of algorithmic noise.
            </p>
            <p>
              "We aren't building a tool to replace thought. We are building a substrate to enhance it. Jill is the silent partner in your most complex endeavors, a digital nervous system tuned to your specific frequency."
            </p>
          </div>
          <div className="mt-12 pt-8 border-t border-foreground/10 flex gap-8">
            <div className="text-center">
              <p className="text-2xl font-light">12+</p>
              <p className="text-[9px] uppercase tracking-widest text-foreground/40">Patents</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-light">0.01</p>
              <p className="text-[9px] uppercase tracking-widest text-foreground/40">Neural Lag</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;