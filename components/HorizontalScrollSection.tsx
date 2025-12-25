import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  mediaUrl: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: "01",
    title: "The Problem",
    subtitle: "Digital Static",
    description: "Modern interfaces are designed to capture your attention, not to serve your intentions. We've reached a breaking point where the tools we use are the primary sources of friction in our creative lives.",
    mediaUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "App 1: Identity",
    subtitle: "Neural Sovereignty",
    description: "Your digital self, secured by the Jill Neural Engine. Identity is no longer a set of credentials, but a unique signature of your creative intent, encrypted at the edge.",
    mediaUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "App 2: Synthesis",
    subtitle: "Knowledge Refined",
    description: "Stop searching and start knowing. Synthesis distills vast oceans of information into actionable insights, synchronized with your project context in real-time.",
    mediaUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "App 3: Flow",
    subtitle: "Zero-Latency Focus",
    description: "A sanctuary for deep work. Flow eliminates notifications and cognitive load, providing a responsive environment that anticipates your next requirement before you even vocalize it.",
    mediaUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
  }
];

const HorizontalScrollSection: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top", // Duration of the pin/scroll
          scrub: 1, // Momentum to match Lenis
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div id="showcase" ref={triggerRef} className="overflow-hidden bg-[#fcfaf7]">
      <div 
        ref={sectionRef} 
        className="relative flex h-screen w-[400vw] flex-row items-center px-[5vw]"
      >
        {showcaseItems.map((item, index) => (
          <div 
            key={item.id} 
            className="flex h-screen w-screen items-center justify-center px-10 md:px-20"
          >
            {/* Glassmorphic Card */}
            <div className="relative flex h-[70vh] w-full max-w-7xl flex-col overflow-hidden rounded-[3rem] border border-white/20 bg-white/10 p-8 backdrop-blur-xl md:flex-row md:p-16 shadow-2xl">
              
              {/* Left Side: Content */}
              <div className="flex h-full w-full flex-col justify-center md:w-1/2">
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">
                    {item.id} / 04
                  </span>
                  <div className="h-[1px] w-8 bg-accent/30" />
                </div>
                
                <h2 className="mb-4 text-4xl font-light tracking-tighter text-foreground md:text-7xl">
                  {item.title}
                </h2>
                <h3 className="mb-8 text-xl font-serif italic text-foreground/40 md:text-2xl">
                  {item.subtitle}
                </h3>
                <p className="max-w-md text-sm font-light leading-relaxed text-foreground/60 md:text-lg">
                  {item.description}
                </p>
                
                <div className="mt-12">
                  <button className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">
                    Learn more 
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Media Placeholder */}
              <div className="relative mt-8 h-full w-full overflow-hidden rounded-2xl md:mt-0 md:w-1/2">
                <img 
                  src={item.mediaUrl} 
                  alt={item.title}
                  className="h-full w-full object-cover grayscale transition-all duration-1000 hover:grayscale-0 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        ))}

        {/* Subtle Background Elements that travel with the container */}
        <div className="absolute -top-40 left-[50vw] h-96 w-96 rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 left-[250vw] h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      </div>
    </div>
  );
};

export default HorizontalScrollSection;