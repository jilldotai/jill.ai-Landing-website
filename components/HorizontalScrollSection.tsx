import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    description:
      "The internet wasn't built for kids. We are changing the architecture of childhood.",
    mediaUrl: "./assets/videos/problem.webm",
    sideImage: "./assets/images/problem-visual.jpeg",
    isVideo: true,
  },
  {
    id: "01",
    title: "IOkTKey",
    subtitle: "The Bouncer",
    description:
      "The Keyboard that Intervenes. Real-time sentiment detection for grooming and bullying.",
    mediaUrl: "./assets/videos/app1.webm",
    sideImage: "./assets/images/ioktkey-interface.jpeg",
    isVideo: true,
  },
  {
    id: "02",
    title: "IOkTNet",
    subtitle: "The Shield",
    description:
      "The Browser that Scrubs. Blocks behavioral profiling and neutralizes aggressive algorithms.",
    mediaUrl: "./assets/videos/app2.webm",
    sideImage: "./assets/images/ioktnet-shield.jpeg",
    isVideo: true,
  },
  {
    id: "03",
    title: "IOkTID",
    subtitle: "The Passport",
    description:
      "Self-Sovereign Identity. Prove age without revealing data. Includes Sentinel Mode.",
    mediaUrl: "./assets/videos/app3.webm",
    sideImage: "./assets/images/ioktid-anchor.jpeg",
    isVideo: true,
  },
  {
    id: "04",
    title: "IOkTtutor",
    subtitle: "The Guide",
    description:
      "Personalized AI learning agent for neurodiverse minds. Private, secure, local.",
    mediaUrl: "./assets/videos/app4.webm",
    sideImage: "./assets/images/iokttutor-guide.jpeg",
    isVideo: true,
  },
];

const HorizontalScrollSection: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { x: 0 },
        {
          x: "-400vw", // 5 items = 4 movements
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=400%",
            scrub: 1,
            pin: true,
          },
        }
      );
    }, triggerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      id="showcase"
      ref={triggerRef}
      className="overflow-hidden bg-black relative"
    >
      <div ref={sectionRef} className="flex h-screen w-max items-center">
        {showcaseItems.map((item) => (
          <ShowcaseCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// Sub-component to handle Video State individually
const ShowcaseCard: React.FC<{ item: ShowcaseItem }> = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-screen h-screen flex items-center justify-center px-4 md:px-20">
      {/* Card Container - Reduced Size */}
      <div className="relative w-full max-w-[1400px] h-[65vh] md:h-[70vh] flex flex-col md:flex-row bg-[#080808] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
        {/* Left Side: Text */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
          <div className="text-cyan-500 text-[10px] font-bold tracking-[0.4em] mb-4">
            NODE / {item.id}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter">
            {item.title}
          </h2>
          <h3 className="text-xl md:text-2xl text-white/50 font-light mb-6 tracking-wide">
            {item.subtitle}
          </h3>
          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md mb-8">
            {item.description}
          </p>

          {/* Action Button */}
          {item.isVideo && (
            <button
              onClick={() => setIsPlaying(true)}
              className="flex items-center gap-4 group w-fit"
            >
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all">
                {isPlaying ? (
                  <div className="w-2 h-2 bg-white rounded-sm" />
                ) : (
                  <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-white border-b-[4px] border-b-transparent ml-1" />
                )}
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white group-hover:text-cyan-400 transition-colors">
                {isPlaying ? "Playing Demo" : "Watch Demo"}
              </span>
            </button>
          )}
        </div>

        {/* Right Side: Visuals */}
        <div className="w-full md:w-1/2 h-full relative bg-white/5 border-l border-white/5">
          {/* Static Image (Fades out when playing) */}
          <img
            src={item.sideImage}
            alt={item.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />

          {/* Video (Fades in when playing) */}
          {item.isVideo && (
            <video
              src={item.mediaUrl}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                isPlaying ? "opacity-100" : "opacity-0"
              }`}
              autoPlay={isPlaying}
              loop
              playsInline
              muted={false}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] to-transparent w-32 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollSection;
