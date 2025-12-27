import React, { useEffect, useRef, useState } from 'react';
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
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Ensure the overlay is displayed and transparent before animating in
      gsap.set(overlayRef.current, { display: 'flex', autoAlpha: 0 });
      
      gsap.to(overlayRef.current, {
        autoAlpha: 1,
        clipPath: 'circle(150% at 100% 0%)',
        duration: 0.8,
        ease: 'power4.inOut',
      });
      
      gsap.fromTo(itemsRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, delay: 0.3, ease: 'power3.out' }
      );
    } else if (shouldRender) {
      // Animate out before unmounting or hiding
      gsap.to(overlayRef.current, {
        clipPath: 'circle(0% at 100% 0%)',
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power4.inOut',
        onComplete: () => {
          setShouldRender(false);
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { display: 'none' });
          }
        }
      });
    }
  }, [isOpen]);

  // Completely unmount when closed to avoid any DOM interference
  if (!shouldRender && !isOpen) return null;

  const handleLinkClick = (id: string) => {
    onClose();
    if (lenis) {
      setTimeout(() => {
        lenis.scrollTo(`#${id}`, { offset: 0, duration: 2 });
      }, 500);
    }
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center flex-col"
      style={{ 
        clipPath: 'circle(0% at 100% 0%)', 
        display: isOpen ? 'flex' : 'none',
        pointerEvents: isOpen ? 'auto' : 'none' 
      }}
    >
      <button 
        onClick={onClose}
        className="absolute top-10 right-10 group p-4 pointer-events-auto"
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-white rotate-45 transition-transform duration-500 group-hover:rotate-[135deg]"></div>
          <div className="absolute w-full h-[1px] bg-white -rotate-45 transition-transform duration-500 group-hover:rotate-[45deg]"></div>
        </div>
      </button>

      <div className="flex flex-col items-center gap-6 md:gap-10">
        {menuItems.map((item, i) => (
          <div 
            key={item.id}
            ref={el => itemsRef.current[i] = el}
            className="group relative overflow-hidden"
          >
            <button 
              onClick={() => handleLinkClick(item.id)}
              className="text-3xl md:text-7xl font-light tracking-tighter text-white/30 hover:text-white transition-all duration-500 uppercase py-2"
            >
              {item.label}
            </button>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full"></div>
          </div>
        ))}

        <div className="mt-10 flex flex-col items-center gap-6">
          <button className="px-10 py-4 border border-white/20 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] text-white hover:bg-white hover:text-black transition-all">
            Technical Specs
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;