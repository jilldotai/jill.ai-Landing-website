
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const features = [
  {
    title: "Live Paper™ Display",
    desc: "A revolutionary display that looks like paper and feels like magic. Zero glare, zero eye strain.",
    img: "https://picsum.photos/id/101/600/800"
  },
  {
    title: "Pure Analog Audio",
    desc: "Disconnect from the noise with high-fidelity components that bring back the warmth of sound.",
    img: "https://picsum.photos/id/102/600/800"
  },
  {
    title: "Modular Design",
    desc: "Built to last decades, not years. Every part is user-replaceable and upgradable.",
    img: "https://picsum.photos/id/103/600/800"
  },
  {
    title: "Intentional OS",
    desc: "A minimal software layer designed to help you finish your tasks and put the device down.",
    img: "https://picsum.photos/id/104/600/800"
  }
];

const FeatureGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gsap.utils.toArray('.feature-item');
    
    items.forEach((item: any) => {
      gsap.fromTo(item, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-20 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {features.map((f, i) => (
          <div key={i} className="feature-item flex flex-col group">
            <div className="overflow-hidden mb-8 rounded-lg">
              <img 
                src={f.img} 
                alt={f.title} 
                className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </div>
            <h3 className="text-3xl font-light mb-4">{f.title}</h3>
            <p className="text-foreground/60 leading-relaxed font-light">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
