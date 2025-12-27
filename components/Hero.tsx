import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, delay: 0.5 }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=1"
    )
    .fromTo('.hero-image',
      { scale: 1.1, filter: 'blur(10px)', opacity: 0 },
      { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 2 },
      "-=1.5"
    );
  }, []);

  const handleScrollClick = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo('#showcase', { offset: 0, duration: 1.5 });
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-background px-6">
      <div className="hero-image absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1920&auto=format&fit=crop" 
          alt="Abstract neural network" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      
      <div className="relative z-10 text-center max-w-5xl">
        <h1 
          ref={titleRef} 
          className="text-6xl md:text-9xl font-light tracking-tighter text-foreground mb-6"
        >
          Intuitive.<br/>Infinite.
        </h1>
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Jill.ai represents the pinnacle of generative synergy—an intelligence that doesn't just process, but understands your flow.
        </p>
      </div>

      <button 
        onClick={handleScrollClick}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40 hover:opacity-100 transition-opacity cursor-pointer group pointer-events-auto"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] group-hover:text-accent transition-colors">Scroll</span>
        <div className="w-[1px] h-10 bg-foreground group-hover:bg-accent transition-colors"></div>
      </button>
    </section>
  );
};

export default Hero;