
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  mediaUrl: string;
  isVideo: boolean;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: "01",
    title: "The Problem",
    subtitle: "Digital Entropy",
    description: "Modern interfaces are designed for capture, not intent. Jill replaces noise with neural clarity.",
    mediaUrl: "/assets/videos/problem.webm",
    isVideo: true
  },
  {
    id: "02",
    title: "Identity",
    subtitle: "Neural Sovereignty",
    description: "Your digital self, secured by Jill's private-edge encryption nodes.",
    mediaUrl: "/assets/videos/app1.webm",
    isVideo: true
  },
  {
    id: "03",
    title: "Synthesis",
    subtitle: "Refined Insight",
    description: "Information distilled into actionable knowledge in real-time.",
    mediaUrl: "/assets/videos/app2.webm",
    isVideo: true
  },
  {
    id: "04",
    title: "Flow",
    subtitle: "Cognitive Sync",
    description: "The seamless buffer between thought and execution.",
    mediaUrl: "/assets/videos/app3.webm",
    isVideo: true
  }
];

const HorizontalScrollSection: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.fromTo(sectionRef.current, { translateX: 0 }, {
      translateX: "-300vw",
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "3000 top",
        scrub: 1.2,
        pin: true,
      },
    });
    return () => pin.kill();
  }, []);

  return (
    <div id="showcase" ref={triggerRef} className="overflow-hidden bg-background">
      <div ref={sectionRef} className="relative flex h-screen w-[400vw] flex-row items-center">
        {showcaseItems.map((item) => (
          <div key={item.id} className="flex h-screen w-screen items-center justify-center px-12 md:px-32">
            <div className="relative flex h-[75vh] w-full max-w-7xl flex-col md:flex-row overflow-hidden rounded-[3rem] bg-foreground text-background shadow-2xl">
              <div className="flex flex-col justify-center p-12 md:w-1/2">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6">{item.id} / NODE</span>
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4">{item.title}</h2>
                <p className="text-background/40 font-light text-lg leading-relaxed max-w-sm">{item.description}</p>
              </div>
              <div className="relative h-full w-full md:w-1/2 overflow-hidden">
                {item.isVideo ? (
                  <video src={item.mediaUrl} autoPlay loop muted playsInline className="h-full w-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000" />
                ) : (
                  <img src={item.mediaUrl} alt={item.title} className="h-full w-full object-cover grayscale opacity-60 transition-all duration-1000" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollSection;
