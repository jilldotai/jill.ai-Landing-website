import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import JillMark from '../JillMark';

const ArrivalScene: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !markRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.arrival-line',
        { y: 28, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.22,
          delay: 0.35,
          duration: 1.2,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.arrival-cue',
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, delay: 1.35, duration: 0.9, ease: 'sine.out' }
      );

      const target = document.querySelector('#navbar-brand-lock');
      if (target) {
        const originRect = markRef.current!.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const dx = targetRect.left - originRect.left;
        const dy = targetRect.top - originRect.top;

        gsap.to(markRef.current, {
          x: dx,
          y: dy,
          scale: 0.24,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top+=60',
            scrub: 1,
          },
        });
      }

      gsap.to('.arrival-vignette', {
        opacity: 0.88,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[130vh] md:h-[145vh] flex items-start justify-center overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6">
        <div className="arrival-vignette absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_45%,rgba(93,247,255,0.18),rgba(5,5,5,0.96)_60%)]" />
        <div className="relative z-10 max-w-4xl text-center flex flex-col items-center gap-8">
          <div ref={markRef} className="arrival-line will-change-transform">
            <JillMark className="drop-shadow-[0_0_30px_rgba(98,240,255,0.35)]" />
          </div>
          <p className="arrival-line text-foreground/82 text-xl md:text-3xl font-light max-w-3xl leading-tight">
            Turning curiosity into clarity<br />and ideas into impact
          </p>
          <p className="arrival-line text-foreground/50 text-sm md:text-lg tracking-wide leading-relaxed max-w-xl">
            An independent AI research lab<br />building safer digital infrastructure.
          </p>
          <div className="arrival-cue text-foreground/45 text-xs uppercase tracking-[0.45em] mt-6 flex flex-col items-center gap-2">
            Scroll
            <span className="text-xl">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArrivalScene;
