
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollVideoSectionProps {
  videoSrc: string;
  mobileVideoSrc?: string;
  introStart?: number;
  introEnd: number;
  scrollEnd: number;
  isFooter?: boolean;
  backgroundImage?: string;
  children?: React.ReactNode;
}

const ScrollVideoSection: React.FC<ScrollVideoSectionProps> = ({
  videoSrc,
  mobileVideoSrc,
  introStart = 0,
  introEnd,
  scrollEnd,
  isFooter = false,
  backgroundImage,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const introAnimRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const checkMedia = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) setIsMobile(mobile);
    };
    checkMedia();
    window.addEventListener('resize', checkMedia);
    return () => window.removeEventListener('resize', checkMedia);
  }, [isMobile]);

  const finalSrc = isMobile && mobileVideoSrc ? mobileVideoSrc : videoSrc;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const handleVideoReady = () => {
      setIsLoaded(true);
      if (!isFooter) {
        video.currentTime = introStart;
        introAnimRef.current = gsap.to(video, {
          currentTime: introEnd,
          duration: 2.5,
          ease: "power2.inOut",
          onStart: () => gsap.to(video, { opacity: 1, duration: 1.5 }),
          onComplete: () => initScrollTrigger()
        });
      } else {
        video.currentTime = introStart;
        gsap.set(video, { opacity: 1 });
        initScrollTrigger();
      }
    };

    const initScrollTrigger = () => {
      const startT = isFooter ? introStart : introEnd;
      const endT = isFooter ? introEnd : scrollEnd;

      ScrollTrigger.create({
        trigger: container,
        start: isFooter ? "top bottom" : "top top",
        end: isFooter ? "bottom bottom" : "+=350%",
        pin: !isFooter,
        scrub: 1.5,
        onUpdate: (self) => {
          if (introAnimRef.current?.isActive()) introAnimRef.current.kill();
          const targetTime = startT + (endT - startT) * self.progress;
          
          gsap.to(video, {
            currentTime: targetTime,
            duration: 0.05,
            ease: "none",
            overwrite: true
          });

          if (isFooter && self.progress >= 0.99) {
             video.currentTime = endT; // Ensure we land exactly on the final frame
          }
        }
      });
    };

    video.addEventListener('loadedmetadata', handleVideoReady);
    if (video.readyState >= 2) handleVideoReady();

    return () => {
      video.removeEventListener('loadedmetadata', handleVideoReady);
      if (introAnimRef.current) introAnimRef.current.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [finalSrc, isFooter, introStart, introEnd, scrollEnd]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full overflow-hidden bg-black ${isFooter ? 'h-screen' : 'h-screen'}`}
    >
      {backgroundImage && !isLoaded && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <video
        ref={videoRef}
        src={finalSrc}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none z-10"
      />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <div className="pointer-events-auto w-full h-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ScrollVideoSection;
