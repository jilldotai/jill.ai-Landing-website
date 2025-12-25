import React, { useEffect } from 'react';
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

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  // Shared high-quality video for caching efficiency
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
              <p>
                By utilizing low-latency neural processing and a focus on intentional design, we enable a flow state that was previously impossible.
              </p>
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
        <section className="py-32 flex flex-col items-center justify-center bg-background p-10">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8 text-foreground text-center">Join the Alpha</h2>
          <p className="text-foreground/50 text-center max-w-lg mb-12 font-light">
            We are accepting a limited number of pioneers into our early access program. Secure your place in the next evolution of personal intelligence.
          </p>
          <button className="px-12 py-5 bg-foreground text-background rounded-full hover:bg-accent transition-all duration-700 text-[10px] font-bold uppercase tracking-[0.4em] hover:scale-105 active:scale-95 shadow-xl">
            Request Early Access
          </button>
        </section>

        {/* Final Footer */}
        <Footer />
      </main>
    </Layout>
  );
};

export default App;