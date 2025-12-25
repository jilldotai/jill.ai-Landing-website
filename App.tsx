import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from './components/Layout';
import Hero from './components/Hero';
import ScrollVideoSection from './components/ScrollVideoSection';
import FeatureGrid from './components/FeatureGrid';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  useEffect(() => {
    // Refresh ScrollTrigger on mount to ensure heights are calculated correctly
    ScrollTrigger.refresh();
  }, []);

  return (
    <Layout>
      <main className="relative z-10">
        <Hero />
        
        {/* Philosophy Section */}
        <section className="py-32 px-6 md:px-20 bg-background border-y border-foreground/5 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-xs uppercase tracking-[0.4em] text-accent mb-6 block">The Paradigm Shift</span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-10 leading-tight">
              A New Philosophy of Digital Interaction.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-foreground/70 font-light leading-relaxed">
              <p>
                Jill.ai integrates seamlessly into your cognitive workspace, providing a buffer between thought and execution that feels entirely natural. We've redesigned the interface from the ground up to minimize friction.
              </p>
              <p>
                By utilizing low-latency neural processing and a focus on intentional design, we enable a flow state that was previously impossible. This is not just an assistant; it's an extension of your creative will.
              </p>
            </div>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
        </section>

        {/* Core Scrollytelling Section - Using a reliable, high-performance test video */}
        <ScrollVideoSection 
          videoSrc="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4" 
          startFrame={0}
          endFrame={10}
          backgroundImage="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1920&auto=format&fit=crop"
        >
          <div className="text-center px-6">
            <h2 className="text-white text-5xl md:text-9xl font-light tracking-tighter mix-blend-difference drop-shadow-sm">
              Jill.ai<br/><span className="italic">Visualizes.</span>
            </h2>
            <p className="text-white/40 uppercase tracking-[0.6em] mt-10 text-[9px] font-medium">Scroll to traverse the sequence</p>
          </div>
        </ScrollVideoSection>

        {/* Technical Specification Section */}
        <section className="py-32 px-6 md:px-20 bg-background border-b border-foreground/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-end justify-between gap-16">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-8 text-foreground leading-none">Built for Purpose.</h2>
              <p className="text-foreground/50 font-light leading-relaxed text-lg">
                The essence of Jill.ai lies in its invisibility. It stays out of the way until you need it, then manifests with surgical precision to assist your most complex tasks.
              </p>
              <div className="mt-12 flex gap-6">
                <div className="h-[1px] w-12 bg-accent mt-3"></div>
                <p className="text-xs uppercase tracking-widest text-foreground/60 max-w-[200px]">Design is not just what it looks like, but how it works.</p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="relative">
                <p className="text-7xl md:text-[10rem] font-serif italic text-accent opacity-20 leading-none">0.001</p>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_40%,_var(--background)_100%)] pointer-events-none" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] mt-4 text-foreground/40 font-semibold">Latency threshold / ms</p>
            </div>
          </div>
        </section>

        <FeatureGrid />

        {/* Infrastructure Section */}
        <section className="py-40 px-6 md:px-20 bg-[#0a0a0a] text-background overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent/80 mb-8 block font-semibold">The Infrastructure</span>
            <h2 className="text-4xl md:text-7xl font-light tracking-tight mb-10 leading-tight">Uncompromising<br/>Performance.</h2>
            <p className="text-background/40 font-light max-w-2xl mx-auto mb-20 text-lg leading-relaxed">
              Our hardware stack is optimized for the Jill Neural Engine, ensuring privacy, speed, and reliability in every interaction. We don't compromise on the substrate of intelligence.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {['Neural', 'Edge', 'Cloud', 'Vocal'].map((tech) => (
                <div key={tech} className="border border-white/5 p-8 rounded-sm bg-white/[0.02] backdrop-blur-3xl hover:border-white/20 transition-colors group cursor-default">
                  <p className="text-[9px] uppercase tracking-widest opacity-30 mb-4 group-hover:text-accent transition-colors">Protocol</p>
                  <p className="text-2xl font-light tracking-tight">{tech}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="h-[90vh] flex items-center justify-center bg-background px-6">
          <div className="max-w-4xl text-center">
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-10 text-foreground leading-none">Experience Jill.ai</h2>
            <p className="text-xl text-foreground/50 mb-14 max-w-xl mx-auto font-light leading-relaxed">
              We are slowly inviting members to our alpha testing phase. Reserve your spot in the future of human-computer synergy.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button className="px-12 py-5 bg-foreground text-background rounded-full hover:bg-accent transition-all duration-700 text-[10px] font-bold uppercase tracking-[0.4em] hover:scale-105 active:scale-95 shadow-2xl shadow-black/10">
                Request Invitation
              </button>
              <button className="px-12 py-5 border border-foreground/10 rounded-full hover:border-foreground transition-all duration-700 text-[10px] font-bold uppercase tracking-[0.4em]">
                Read Manifesto
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-24 bg-[#080808] text-background/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-16 mb-20">
            <div>
              <div className="text-3xl font-semibold tracking-tighter text-background mb-4">JILL.AI</div>
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">Intelligence with Intent.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div className="flex flex-col gap-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/10 mb-2">Connect</span>
                <a href="#" className="text-xs hover:text-white transition-colors">Twitter / X</a>
                <a href="#" className="text-xs hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-xs hover:text-white transition-colors">Instagram</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/10 mb-2">Resources</span>
                <a href="#" className="text-xs hover:text-white transition-colors">Journal</a>
                <a href="#" className="text-xs hover:text-white transition-colors">Documentation</a>
                <a href="#" className="text-xs hover:text-white transition-colors">API Status</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/10 mb-2">Legal</span>
                <a href="#" className="text-xs hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-xs hover:text-white transition-colors">Security</a>
                <a href="#" className="text-xs hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
            <div className="text-[9px] uppercase tracking-[0.3em] font-medium opacity-40">
              &copy; 2024 JILL.AI SYSTEMS &bull; LONDON / SAN FRANCISCO
            </div>
            <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] opacity-40">
              <span>System Status: Optimal</span>
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default App;