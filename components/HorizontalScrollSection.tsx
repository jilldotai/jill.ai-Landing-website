import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Panel {
  id: string;
  title: string;
  body?: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: "00",
    title: "IOkT",
    subtitle: "The Reset",
    description:
      "The internet wasn't built for kids. We are changing the architecture of childhood.",
    mediaUrl: "/assets/videos/problem.webm",
    sideImage: "/assets/images/problem-visual.jpeg",
    isVideo: true,
  },
  {
    id: "01",
    title: "IOkTKey",
    subtitle: "The Bouncer",
    description:
      "The Keyboard that Intervenes. Real-time sentiment detection for grooming and bullying.",
    mediaUrl: "/assets/videos/app1.webm",
    sideImage: "/assets/images/ioktkey-interface.jpeg",
    isVideo: true,
  },
  {
    id: "02",
    title: "IOkTNet",
    subtitle: "The Shield",
    description:
      "The Browser that Scrubs. Blocks behavioral profiling and neutralizes aggressive algorithms.",
    mediaUrl: "/assets/videos/app2.webm",
    sideImage: "/assets/images/ioktnet-shield.jpeg",
    isVideo: true,
  },
  {
    id: "03",
    title: "IOkTID",
    subtitle: "The Passport",
    description:
      "Self-Sovereign Identity. Prove age without revealing data. Includes Sentinel Mode.",
    mediaUrl: "/assets/videos/app3.webm",
    sideImage: "/assets/images/ioktid-anchor.jpeg",
    isVideo: true,
  },
  {
    id: "04",
    title: "IOkTtutor",
    subtitle: "The Guide",
    description:
      "Personalized AI learning agent for neurodiverse minds. Private, secure, local.",
    mediaUrl: "/assets/videos/app4.webm",
    sideImage: "/assets/images/iokttutor-guide.jpeg",
    isVideo: true,
  },
];

const HorizontalScrollSection: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { x: 0 },
        {
          x: '-400vw',
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '+=420%',
            scrub: 1.1,
            pin: true,
          },
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="showcase" ref={triggerRef} className="overflow-hidden bg-black/70 relative border-y border-white/5">
      <div ref={sectionRef} className="flex h-screen w-max items-center">
        {panels.map((panel, idx) => (
          <article key={panel.id} className="narrative-panel w-screen h-screen px-6 md:px-16 flex items-center justify-center">
            <div className="w-full max-w-5xl rounded-[2.2rem] border border-white/10 bg-[linear-gradient(120deg,rgba(7,8,18,0.92),rgba(19,23,34,0.72))] p-10 md:p-16">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#8ee7ff] mb-8">Panel {idx + 1} / {panels.length}</p>
              <h3 className="text-4xl md:text-7xl font-light leading-tight tracking-tight max-w-4xl">{panel.title}</h3>
              {panel.body && <p className="mt-6 text-xl md:text-3xl text-foreground/70">{panel.body}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
