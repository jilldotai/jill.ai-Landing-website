
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from './components/Layout';
import Hero from './components/Hero';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();

    // Zoom-out effect for technical explainer
    gsap.fromTo('.transition-explainer',
      { scale: 1.1, opacity: 0.8 },
      {
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: '.transition-explainer',
          start: 'top bottom',
          end: 'top center',
          scrub: true
        }
      }
    );
  }, []);

  const handleWhitepaperDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = './assets/IOkTSuite_Technical_Whitepaper_.pdf';
    link.download = 'IOkT_Technical_Whitepaper.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <main className="relative z-10 w-full px-6 md:px-12">
        {/* LANDING & HERO SECTION */}
        <div id="mission" className="relative h-screen flex flex-col items-center justify-center">
          <Hero />
        </div>

        {/* Manifesto Section */}
        <section className="py-32 px-6 md:px-20 bg-transparent border-y border-foreground/5 relative">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs uppercase tracking-[0.4em] text-accent mb-6 block">The Manifesto</span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-10 leading-tight text-foreground text-center md:text-left">
              IOkT is the reset button.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-foreground/70 font-light leading-relaxed">
              <div className="space-y-6">
                <p>
                  We gave our children the world’s most powerful library, but we put it in the middle of a red-light district. We installed tracking devices on their ankles and called it "connectivity." We traded their privacy for free apps.
                </p>
                <p>
                  We are building the Internet of Kids’ Things. A comprehensive, local-first ecosystem that acts as a digital immune system for the next generation. No cloud surveillance. No data harvesting.
                </p>
              </div>
              <div className="space-y-8">
                <p className="text-accent italic">
                  "The Cloud never forgets. IOkT never tells. Give your child a digital childhood that doesn't follow them forever."
                </p>
                <p>
                  Because their digital footprint shouldn't be sold before they are old enough to spell their own name. Just a private, secure, and intelligent infrastructure that grows with them.
                </p>
                <a
                  href="#showcase"
                  className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent group"
                >
                  Explore the Ecosystem
                  <span className="w-10 h-[1px] bg-accent group-hover:w-16 transition-all duration-500"></span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Showcase Section */}
        <HorizontalScrollSection />

        {/* Roadmap Section */}
        <RoadmapSection />

        {/* Founder Section */}
        <FounderSection />

        {/* Technical Explainer Section: The Privacy Air Gap */}
        <section id="why" className="py-32 bg-transparent overflow-hidden relative transition-explainer">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="h-[1px] w-full bg-foreground/10 mb-20" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-6 block">Structural Safety Model</span>
                <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">
                  The Privacy <br /><span className="italic font-serif font-light text-accent">Air Gap.</span>
                </h2>
                <div className="space-y-6 text-foreground/50 text-lg font-light leading-relaxed">
                  <p>
                    <strong className="text-foreground font-medium">The Problem:</strong> Current safety solutions rely on invasive cloud-based surveillance or reactive blocking. One compromises privacy; the other fails to teach digital literacy and provides our kids on a silver platter to predators.
                  </p>
                  <p>
                    <strong className="text-foreground font-medium">The IOkT Architecture:</strong> We leverage Edge Computing and On-Device AI to create a "protective mesh" around the operating system.
                  </p>
                </div>
              </div>
              <div className="bg-foreground text-background p-12 rounded-[3rem] shadow-2xl">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Zero-Data Exfiltration</h3>
                    <p className="text-background/60 text-sm font-light leading-relaxed">All keystroke analysis and sentiment intervention occur locally on the device’s Neural Processing Unit (NPU). No chat logs are ever transmitted to a cloud.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Zero-Knowledge Proofs</h3>
                    <p className="text-background/60 text-sm font-light leading-relaxed">We verify age and identity without revealing the child's real-world identity to third-party apps.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Proactive Nurturing</h3>
                    <p className="text-background/60 text-sm font-light leading-relaxed">We don't just block; we guide. Our AI suggests rephrasing hurtful messages to foster empathy and detects grooming patterns before they escalate.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Modules Section */}
        <section className="py-32 bg-transparent">
          <div className="max-w-6xl mx-auto px-6">
            <div className="h-[1px] w-full bg-foreground/10 mb-20" />
            <h3 className="text-2xl uppercase tracking-widest font-light mb-20 text-center">Infrastructure of Safety</h3>
            <FeatureGrid />
          </div>
        </section>

        {/* Contact Section */}
        <div id="contact">
          <ContactSection />
        </div>

        {/* Final CTA Section: Founding 50 */}
        <section className="py-32 flex flex-col items-center justify-center bg-transparent p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
            <span className="text-xs uppercase tracking-[0.5em] text-accent font-bold mb-8 block">The Movement & Mission</span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8 text-foreground">Join the Founding 50</h2>
            <p className="text-foreground/50 max-w-lg mb-12 font-light text-lg">
              Be one of the 50 families shaping the future of a safe digital childhood. Secure your child's digital future today.
            </p>

            {!showAlphaForm ? (
              <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={() => setShowAlphaForm(true)}
                  className="px-12 py-5 bg-foreground text-background rounded-full hover:bg-accent transition-all duration-700 text-[10px] font-bold uppercase tracking-[0.4em] hover:scale-105 active:scale-95 shadow-xl"
                >
                  Secure Early Access
                </button>
              </div>
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
                    title="IOkT Alpha Access Form"
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
