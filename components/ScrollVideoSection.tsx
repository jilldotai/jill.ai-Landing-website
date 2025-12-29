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
  fadeOnScroll?: boolean;
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
  fadeOnScroll = false,
  backgroundImage,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const introAnimRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth && window.innerWidth < 768);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const finalSrc = isPortrait && mobileVideoSrc ? mobileVideoSrc : videoSrc;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const handleVideoReady = () => {
      setIsLoaded(true);
      if (!isFooter) {
        // Hero Mode: Autoplay Intro then enable ScrollTrigger
        video.currentTime = introStart;
        introAnimRef.current = gsap.to(video, {
          currentTime: introEnd,
          duration: 3,
          ease: "power2.inOut",
          onStart: () => gsap.to(video, { opacity: 1, duration: 1.5 })
        });
        initScrollTrigger(); // Init immediately so scrub is ready
      } else {
        // Footer Mode: No Autoplay, start at introStart
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
        scrub: true,
        onUpdate: (self) => {
          // If the intro is still playing and user scrolls, kill it to let them take control
          if (introAnimRef.current?.isActive() && self.progress > 0.01) {
            introAnimRef.current.kill();
          }

          const targetTime = startT + (endT - startT) * self.progress;

          // Butter-smooth scrubbing with a slight ease
          gsap.to(video, {
            currentTime: targetTime,
            duration: 0.1,
            ease: "power1.out",
            overwrite: true
          });

          // Handle Landing Fade Out
          if (fadeOnScroll) {
            // Start fading after 10% scroll, complete by 90%
            const fadeStart = 0.1;
            const fadeEnd = 0.9;
            const opacity = self.progress < fadeStart ? 1 :
              self.progress > fadeEnd ? 0 :
                1 - (self.progress - fadeStart) / (fadeEnd - fadeStart);

            gsap.to(video, {
              opacity: opacity,
              duration: 0.3,
              overwrite: 'auto'
            });
          }

          if (isFooter && self.progress >= 0.99) {
            video.currentTime = endT; // Ensure we land perfectly on the final frame
          }
        }
      });
    };

    video.addEventListener('canplaythrough', handleVideoReady);
    if (video.readyState >= 4) handleVideoReady();

    return () => {
      video.removeEventListener('canplaythrough', handleVideoReady);
      if (introAnimRef.current) introAnimRef.current.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [finalSrc, isFooter, introStart, introEnd, scrollEnd]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-transparent"
    >
      {(backgroundImage && (!isLoaded || fadeOnScroll)) && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
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
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ScrollVideoSection;
