import React from 'react';

const roadmapData = [
  { phase: "Phase 1", title: "Alpha Genesis", date: "2025 Q1", desc: "Limited release of the IOkT Neural Engine to 500 select pioneers." },
  { phase: "Phase 2", title: "Universal Synthesis", date: "2025 Q2", desc: "Integration of the core ecosystem apps: Identity, Synthesis, and Flow." },
  { phase: "Phase 3", title: "Global Expansion", date: "2025 Q3", desc: "Public beta launch and expansion into enterprise cognitive clusters." },
  { phase: "Phase 4", title: "Singularity One", date: "2026", desc: "The official version 1.0 release, featuring hardware-accelerated neural links." },
];

const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-40 px-6 md:px-20 bg-transparent text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-6 block">The Trajectory</span>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter">Roadmap.</h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10"></div>

          <div className="space-y-24 relative z-10">
            {roadmapData.map((item, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                {/* Content */}
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="text-accent text-[10px] font-bold uppercase tracking-widest mb-2 block">{item.phase}</span>
                  <h3 className="text-2xl font-light mb-4">{item.title}</h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed max-w-sm mx-auto md:mx-0">{item.desc}</p>
                </div>

                {/* Point */}
                <div className="w-4 h-4 rounded-full bg-accent relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-accent animate-ping rounded-full opacity-20"></div>
                </div>

                {/* Date */}
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <span className="text-4xl md:text-6xl font-serif italic text-white/10">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHITE PAPER DOWNLOAD CTA */}
        <div className="mt-32 pt-16 border-t border-white/5 flex flex-col items-center">
          <div className="max-w-xl text-center mb-12">
            <h3 className="text-2xl font-light mb-4">Deep Technical Insight</h3>
            <p className="text-white/40 text-sm font-light leading-relaxed">
              Explore the mathematical and structural foundations of the IOkT ecosystem. Our Alpha Whitepaper details the Edge-AI protocols, Zero-Knowledge verification layers, and NPU-specific optimizations.
            </p>
          </div>
          <a
            href="/assets/IOkTSuite_Technical_Whitepaper_.pdf"
            download
            className="group flex items-center gap-6 px-12 py-6 bg-white text-black rounded-full hover:bg-accent hover:text-white transition-all duration-700 text-[10px] font-bold uppercase tracking-[0.5em] hover:scale-105 active:scale-95 shadow-2xl"
          >
            Download Technical Whitepaper
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-y-1 transition-transform duration-500">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;