
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  mediaUrl: string;
  sideImage: string;
  isVideo: boolean;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: "00",
    title: "IOkT",
    subtitle: "The Reset",
    description: "The internet wasn't built for kids. From data harvesting to behavioral loops, the next generation is being processed, not protected. We are here to change the architecture of childhood.",
    mediaUrl: "./assets/videos/problem.webm",
    sideImage: "./assets/images/problem-visual.jpeg",
    isVideo: false
  },
  {
    id: "01",
    title: "IOkTKey",
    subtitle: "The Bouncer",
    description: "The Keyboard that Intervenes. On-device Sentiment Intervention detects grooming, bullying, and distress in real-time.",
    mediaUrl: "./assets/videos/app1.webm",
    sideImage: "./assets/images/ioktkey-interface.jpeg",
    isVideo: false
  },
  {
    id: "02",
    title: "IOkTNet",
    subtitle: "The Shield",
    description: "The Browser that Scrubs. Blocks behavioral profiling and neutralizes aggressive algorithms for a Clean Web experience.",
    mediaUrl: "./assets/videos/app2.webm",
    sideImage: "./assets/images/ioktnet-shield.jpeg",
    isVideo: false
  },
  {
    id: "03",
    title: "IOkTID",
    subtitle: "The Passport",
    description: "Self-Sovereign Identity using Zero-Knowledge Proofs. Prove age without revealing PII. Includes Sentinel Mode.",
    mediaUrl: "./assets/videos/app3.webm",
    sideImage: "./assets/images/ioktid-anchor.jpeg",
    isVideo: false
  },
  {
    id: "04",
    title: "IOkTtutor",
    subtitle: "The Guide",
    description: "Personalized AI learning agent for neurodiverse minds. Runs locally, keeping milestones private and secure.",
    mediaUrl: "./assets/videos/app4.webm",
    sideImage: "./assets/images/iokttutor-guide.jpeg",
    isVideo: false
  }
];

const HorizontalScrollSection: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.fromTo(sectionRef.current,
      { x: 0 },
      {
        x: "-400vw", // 5 items => 4 transitions (00‑04)
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
        },
      }
    );
    return () => { pin.kill(); };
  }, []);

  return (
    <div id="showcase" ref={triggerRef} className="overflow-hidden bg-transparent mb-24">
      {/* Container must be w-max to hold all full-width items side-by-side */}
      <div
        ref={sectionRef}
        className="relative flex h-screen w-max flex-row items-center flex-nowrap"
      >
        {showcaseItems.map((item) => (
          <div key={item.id} className="flex h-screen w-screen items-center justify-center px-4 md:px-12 lg:px-24 shrink-0">
            <div className="relative flex h-[85vh] md:h-[80vh] w-full max-w-[1600px] flex-col md:flex-row overflow-hidden rounded-[3rem] md:rounded-[5rem] bg-[#050505] border border-white/5 text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]">
              {/* Internal Glow Effect to match screenshot */}
              <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[600px] bg-accent/20 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-30" />

              <div className="flex flex-col justify-center p-12 md:p-16 lg:p-24 md:w-1/2 lg:w-[45%] relative z-10 shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-8">{item.id} / NODE</span>
                <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-[0.85] mb-10 text-white">
                  {item.title.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word}<br className="hidden md:block" />
                      <span className="md:hidden"> </span>
                    </React.Fragment>
                  ))}
                </h2>
                <p className="text-white/40 font-light text-lg lg:text-2xl leading-relaxed max-w-sm md:max-w-md">
                  {item.description}
                </p>
              </div>

              <div className="relative h-1/2 md:h-full w-full md:w-1/2 lg:flex-1 overflow-hidden border-t md:border-t-0 md:border-l border-white/5">
                {item.isVideo ? (
                  <video
                    src={item.mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                  />
                ) : (
                  <img
                    src={item.sideImage}
                    alt={item.title}
                    className="h-full w-full object-cover grayscale opacity-40 hover:grayscale-0 transition-all duration-1000"
                  />
                )}
                {/* Gradient overlay for smooth transition */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent md:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent md:hidden block" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollSection;
