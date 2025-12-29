import React, { useEffect, useRef } from 'react';
import gsap from "gsap";

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
        autoAlpha: 1,
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
        autoAlpha: 0,
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.8,
        ease: 'power4.inOut',
      });
    }
  }, [isOpen]);

  const handleLinkClick = (id: string) => {
    onClose();
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: 0, duration: 2 });
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1500] bg-black/95 backdrop-blur-2xl flex items-center justify-center opacity-0 pointer-events-none"
      style={{ clipPath: 'circle(0% at 100% 0%)', pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      <button
        onClick={onClose}
        className="absolute top-10 right-10 group p-4"
        title="Close Menu"
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-white rotate-45 transition-transform duration-500 group-hover:rotate-[135deg]"></div>
          <div className="absolute w-full h-[1px] bg-white -rotate-45 transition-transform duration-500 group-hover:rotate-[45deg]"></div>
        </div>
      </button>

      <div className="flex flex-col items-center gap-6 md:gap-10 w-full max-w-4xl px-6">
        {menuItems.map((item, i) => (
          <div
            key={item.id}
            ref={el => { itemsRef.current[i] = el; }}
            className="group relative overflow-hidden w-full text-center"
          >
            <button
              onClick={() => handleLinkClick(item.id)}
               className="text-[18px] md:text-3xl font-light tracking-widest text-white/50 hover:text-white transition-all duration-500 uppercase py-2"
            >
              {item.label}
            </button>
          </div>
        ))}

        {/* WHITEPAPER BUTTON */}
        <div
          ref={el => { itemsRef.current[menuItems.length] = el; }}
          className="mt-12 w-full max-w-sm"
        >
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/assets/IOkTSuite_Technical_Whitepaper_.pdf';
              link.download = 'IOkT_Technical_Whitepaper.pdf';
              link.click();
              onClose();
            }}
            className="w-full py-6 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-cyan-400 hover:scale-105 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
          >
            Alpha Whitepaper
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;