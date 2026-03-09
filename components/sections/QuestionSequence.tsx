import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const lines = [
  'The internet was built for adults.',
  'Kids were added later.',
  'And now they live inside a system that was never designed for them.',
];

const QuestionSequence: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.question-overlay', {
        opacity: 0.65,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.utils.toArray('.question-line').forEach((line) => {
        gsap.fromTo(
          line as gsap.TweenTarget,
          { opacity: 0.12, y: 40, filter: 'blur(7px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line as Element,
              start: 'top 78%',
              end: 'top 45%',
              scrub: 0.9,
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-28 md:py-44">
      <div className="question-overlay pointer-events-none absolute inset-0 bg-black opacity-15" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-20 space-y-24 md:space-y-28">
        {lines.map((line, index) => (
          <p key={line} className={`question-line text-3xl md:text-6xl font-light tracking-tight ${index === 2 ? 'max-w-4xl' : ''}`}>
            {line}
          </p>
        ))}
      </div>
    </section>
  );
};

export default QuestionSequence;
