import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LabSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.lab-line',
        { opacity: 0.15, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(
        '.lab-founder',
        { opacity: 0, y: 45, filter: 'blur(9px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.lab-founder',
            start: 'top 85%',
            end: 'top 45%',
            scrub: 1,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 md:py-40 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-20">
        <div className="space-y-14 md:space-y-20 text-3xl md:text-6xl font-light tracking-tight">
          <p className="lab-line">Jillᴬᴵ is not a company chasing trends.</p>
          <p className="lab-line">We&apos;re a research lab exploring ethical AI.</p>
          <p className="lab-line">One problem at a time.</p>
        </div>

        <div className="lab-founder mt-20 md:mt-24 grid md:grid-cols-[1.25fr_1fr] gap-10 items-center rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-12">
          <p className="text-2xl md:text-5xl font-light leading-tight">
            Built by a mom who refused<br />to accept that the internet<br />couldn&apos;t be safer.
          </p>
          <img src="/assets/images/founder-no-bg.png.png" alt="Founder of Jill AI" className="w-full max-w-sm mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default LabSection;
