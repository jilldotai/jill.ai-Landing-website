import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lenis: any;
}

const menuItems = [
  { label: "Mission & Vision", id: "mission" },
  { label: "The Suite (Applications)", id: "showcase" },
  { label: "Roadmap", id: "roadmap" },
  { label: "Founder", id: "founder" },
  { label: "Contact Us", id: "contact" },
];

const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, lenis }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        clipPath: 'circle(150% at 100% 0%)',
        duration: 1,
        ease: 'power4.inOut',
      });
      gsap.fromTo(itemsRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, delay: 0.4, ease: 'power3.out' }
      );
    } else {
      gsap.to(overlayRef.current, {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.8,
        ease: 'power4.inOut',
      });
    }
  }, [isOpen]);

  const handleLinkClick = (id: string) => {
    onClose();
    if (lenis) {
      setTimeout(() => {
        lenis.scrollTo(`#${id}`, { offset: 0, duration: 2 });
      }, 600);
    }
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex items-center justify-center"
      style={{ clipPath: 'circle(0% at 100% 0%)' }}
    >
      <button 
        onClick={onClose}
        className="absolute top-10 right-10 group p-4"
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-white rotate-45 transition-transform duration-500 group-hover:rotate-[135deg]"></div>
          <div className="absolute w-full h-[1px] bg-white -rotate-45 transition-transform duration-500 group-hover:rotate-[45deg]"></div>
        </div>
      </button>

      <div className="flex flex-col items-center gap-8 md:gap-12">
        {menuItems.map((item, i) => (
          <div 
            key={item.id}
            ref={el => itemsRef.current[i] = el}
            className="group relative overflow-hidden"
          >
            <button 
              onClick={() => handleLinkClick(item.id)}
              className="text-4xl md:text-7xl font-light tracking-tighter text-white/40 hover:text-white transition-colors duration-500 uppercase"
            >
              {item.label}
            </button>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full"></div>
          </div>
        ))}

        <div className="mt-12 flex flex-col items-center gap-6">
          <button className="px-12 py-5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] text-white hover:bg-white hover:text-black transition-all">
            Download Whitepaper (PDF)
          </button>
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/20">Version 2.0.4 - Alpha Release</p>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;