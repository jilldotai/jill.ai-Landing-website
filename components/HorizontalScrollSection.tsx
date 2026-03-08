import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Panel {
  id: string;
  title: string;
  body?: string;
}

const panels: Panel[] = [
  { id: '01', title: 'Experiment 01' },
  { id: '02', title: 'IOkT', body: 'Internet of Kids Things' },
  { id: '03', title: 'A privacy-first safety layer for children online.' },
  { id: '04', title: 'Free for every child and parent.' },
  { id: '05', title: 'Licensed to platforms that care.' },
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
