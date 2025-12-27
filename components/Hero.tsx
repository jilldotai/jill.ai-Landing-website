
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.8 } });
    tl.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, delay: 0.5 })
      .fromTo('.hero-bg', { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.5 }, "-=1.5");

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScrollClick = () => {
    if ((window as any).lenis) (window as any).lenis.scrollTo('#showcase', { duration: 1.8 });
  };

  const bgImage = isMobile ? "/assets/images/bg-mobile.jpg" : "/assets/images/bg-desktop.jpg";

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-background px-6">
      <div className="hero-bg absolute inset-0 z-0 overflow-hidden">
        <img 
          src={bgImage} 
          alt="Neural Backdrop" 
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      
      <div className="relative z-10 text-center max-w-6xl">
        <div className="mb-12 flex justify-center opacity-40">
           <span className="text-[10px] uppercase tracking-[1em] font-medium text-foreground">Protocol 01: Genesis</span>
        </div>
        <h1 
          ref={titleRef} 
          className="text-[12vw] md:text-[8vw] font-bold tracking-[-0.07em] text-foreground leading-[0.85] mb-8"
        >
          Intuitive.<br/><span className="italic font-serif font-light text-accent">Infinite.</span>
        </h1>
        <p className="text-sm md:text-base text-foreground/50 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
          Jill.ai represents the pinnacle of generative synergy—an intelligence that doesn't just process, but understands your flow.
        </p>
      </div>

      <button 
        onClick={handleScrollClick}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer"
      >
        <span className="text-[9px] uppercase tracking-[0.5em] font-bold opacity-30 group-hover:opacity-100 group-hover:text-accent transition-all">Engage Discovery</span>
        <div className="w-[1.5px] h-12 bg-foreground/10 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-accent -translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
        </div>
      </button>
    </section>
  );
};

export default Hero;
