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

  // Handle media switching logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const finalSrc = isMobile && mobileVideoSrc ? mobileVideoSrc : videoSrc;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const handleVideoReady = () => {
      setIsLoaded(true);
      
      if (!isFooter) {
        // --- HERO MODE: INTRO AUTOPLAY ---
        // Start at introStart
        video.currentTime = introStart;
        
        // Autoplay sequence: introStart -> introEnd
        introAnimRef.current = gsap.to(video, {
          currentTime: introEnd,
          duration: Math.max(2, introEnd - introStart), // Natural speed or minimum 2s
          ease: "power2.inOut",
          onStart: () => {
            gsap.to(video, { opacity: 1, duration: 1 });
          },
          onComplete: () => {
            initScrollTrigger();
          }
        });
      } else {
        // --- FOOTER MODE: NO AUTOPLAY ---
        video.currentTime = introStart;
        gsap.set(video, { opacity: 1 });
        initScrollTrigger();
      }
    };

    const initScrollTrigger = () => {
      // Determine time ranges based on mode
      // Hero mode: Scrubs from introEnd (post-autoplay) to scrollEnd
      // Footer mode: Scrubs from introStart to introEnd (to build up at bottom)
      const startT = isFooter ? introStart : introEnd;
      const endT = isFooter ? introEnd : scrollEnd;

      ScrollTrigger.create({
        trigger: container,
        start: isFooter ? "top bottom" : "top top",
        end: isFooter ? "bottom bottom" : "+=300%",
        pin: !isFooter, // Usually hero is pinned, footer just occupies space or is sticky
        scrub: 1,
        onUpdate: (self) => {
          // If the intro animation is still playing and user starts scrolling, kill it
          if (introAnimRef.current && introAnimRef.current.isActive()) {
            introAnimRef.current.kill();
          }

          const targetTime = startT + (endT - startT) * self.progress;
          
          // Ultra-smooth scrubbing
          gsap.to(video, {
            currentTime: targetTime,
            duration: 0.1,
            ease: "none",
            overwrite: true
          });

          // Sync progress bar if present
          const progressBar = container.querySelector('.progress-bar-inner');
          if (progressBar) {
            gsap.set(progressBar, { scaleX: self.progress });
          }
        }
      });
    };

    video.addEventListener('loadedmetadata', handleVideoReady);
    // Fallback if already loaded
    if (video.readyState >= 1) handleVideoReady();

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
      className={`relative w-full overflow-hidden bg-black ${isFooter ? 'h-[80vh]' : 'h-screen'}`}
    >
      {/* Loading Overlay */}
      {backgroundImage && !isLoaded && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Video Layer */}
      <video
        ref={videoRef}
        src={finalSrc}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none z-10"
      />

      {/* Interaction Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        {children}
      </div>

      {/* Progress UI (Optional) */}
      {!isFooter && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 w-48 h-[1px] bg-white/10 overflow-hidden">
          <div className="progress-bar-inner h-full bg-accent w-full origin-left scale-x-0 transition-transform duration-100" />
        </div>
      )}
    </div>
  );
};

export default ScrollVideoSection;