
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from './components/Layout';
import Hero from './components/Hero';
import ScrollVideoSection from './components/ScrollVideoSection';
import FeatureGrid from './components/FeatureGrid';
import HorizontalScrollSection from './components/HorizontalScrollSection';
import RoadmapSection from './components/RoadmapSection';
import FounderSection from './components/FounderSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SupportAgent from './components/SupportAgent';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [showAlphaForm, setShowAlphaForm] = useState(false);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  const handleWhitepaperDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    // Simulate a high-quality PDF generation and download
    const mockContent = `
      JILL.AI | TECHNICAL WHITEPAPER v1.0
      ----------------------------------
      MISSION: INTELLIGENCE WITH INTENT
      The next era of personal agency.
      ... full documentation ...
    `;
    const blob = new Blob([mockContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'JillAI_Whitepaper_2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const heroVideo = "https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-woman-in-a-field-of-flowers-43187-large.mp4";

  return (
    <Layout>
      <main className="relative z-10">
        <div id="mission">
          <Hero />
        </div>
        
        {/* Intro Section */}
        <section className="py-32 px-6 md:px-20 bg-background border-y border-foreground/5 relative">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs uppercase tracking-[0.4em] text-accent mb-6 block">The Paradigm Shift</span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-10 leading-tight text-foreground">
              A New Philosophy of Digital Interaction.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-foreground/70 font-light leading-relaxed">
              <p>
                Jill.ai integrates seamlessly into your cognitive workspace, providing a buffer between thought and execution that feels entirely natural. 
              </p>
              <div>
                <p className="mb-8">
                  By utilizing low-latency neural processing and a focus on intentional design, we enable a flow state that was previously impossible.
                </p>
                <a 
                  href="/whitepaper" 
                  onClick={handleWhitepaperDownload}
                  className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent group"
                >
                  Download Whitepaper
                  <span className="w-10 h-[1px] bg-accent group-hover:w-16 transition-all duration-500"></span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Showcase Section */}
        <div id="showcase">
          <HorizontalScrollSection />
        </div>

        {/* HERO MODE SCROLL SECTION */}
        <ScrollVideoSection 
          videoSrc={heroVideo}
          introStart={0}
          introEnd={3}
          scrollEnd={10}
          isFooter={false}
          backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop"
        >
          <div className="text-center px-6">
            <h2 className="text-white text-5xl md:text-9xl font-light tracking-tighter mix-blend-difference">
              Jill.ai<br/><span className="italic font-serif">Unfolding.</span>
            </h2>
            <p className="text-white/40 uppercase tracking-[0.6em] mt-10 text-[9px] font-medium">Scroll to deconstruct the neural link</p>
          </div>
        </ScrollVideoSection>

        {/* Roadmap Section */}
        <RoadmapSection />

        {/* Founder Section */}
        <FounderSection />

        {/* Modules Section */}
        <section className="py-32 bg-background">
          <div className="max-w-6xl mx-auto px-6">
             <div className="h-[1px] w-full bg-foreground/10 mb-20" />
             <h3 className="text-2xl uppercase tracking-widest font-light mb-20 text-center">Core Modules</h3>
             <FeatureGrid />
          </div>
        </section>

        {/* Contact Section */}
        <div id="contact">
          <ContactSection />
        </div>

        {/* Final CTA Section */}
        <section className="py-32 flex flex-col items-center justify-center bg-background p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8 text-foreground text-center">Join the Alpha</h2>
            
            {!showAlphaForm ? (
              <>
                <p className="text-foreground/50 text-center max-w-lg mb-12 font-light text-lg">
                  We are accepting a limited number of pioneers into our early access program. Secure your place in the next evolution of personal intelligence.
                </p>
                <button 
                  onClick={() => setShowAlphaForm(true)}
                  className="px-12 py-5 bg-foreground text-background rounded-full hover:bg-accent transition-all duration-700 text-[10px] font-bold uppercase tracking-[0.4em] hover:scale-105 active:scale-95 shadow-xl"
                >
                  Request Early Access
                </button>
              </>
            ) : (
              <div className="w-full animate-in fade-in zoom-in-95 duration-1000">
                <div className="bg-white/50 backdrop-blur-xl border border-foreground/5 rounded-[2rem] p-2 md:p-6 shadow-2xl overflow-hidden min-h-[600px] flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center -z-10 text-[10px] uppercase tracking-widest text-foreground/20 font-bold">
                    Initializing Form...
                  </div>
                  <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLScgw_eG4OksAxJhydemrh92TwyTo9dIELfOkj3hqxdR18Ordw/viewform?embedded=true" 
                    width="100%" 
                    height="700" 
                    frameBorder="0" 
                    marginHeight={0} 
                    marginWidth={0}
                    className="rounded-2xl"
                  >
                    Loading…
                  </iframe>
                </div>
                <button 
                  onClick={() => setShowAlphaForm(false)}
                  className="mt-8 text-[9px] uppercase tracking-[0.4em] text-foreground/30 hover:text-accent transition-colors font-bold"
                >
                  Return to Overview
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Final Footer */}
        <Footer />
        
        {/* Support Agent AI */}
        <SupportAgent />
      </main>
    </Layout>
  );
};

export default App;
