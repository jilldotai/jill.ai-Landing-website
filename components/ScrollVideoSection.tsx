import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollVideoSectionProps {
  videoSrc: string;
  mobileVideoSrc?: string;
  startFrame: number;
  endFrame: number;
  backgroundImage?: string;
  children?: React.ReactNode;
}

const ScrollVideoSection: React.FC<ScrollVideoSectionProps> = ({
  videoSrc,
  mobileVideoSrc,
  startFrame,
  endFrame,
  backgroundImage,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Reset states
    setIsLoaded(false);
    setLoadError(null);

    const handleCanPlay = () => {
      console.log("Video source ready:", video.currentSrc);
      setIsLoaded(true);
      setLoadError(null);
      gsap.to(video, { opacity: 1, duration: 1, ease: 'power2.out' });
    };

    const handleError = () => {
      const error = video.error;
      let message = "Unknown playback error";
      if (error) {
        switch (error.code) {
          case 1: message = "Aborted by user"; break;
          case 2: message = "Network error"; break;
          case 3: message = "Decoding error"; break;
          case 4: message = "Format not supported or server denied access"; break;
        }
      }
      console.error("Video Error:", message, video.currentSrc);
      setLoadError(message);
    };

    // Event listeners
    video.addEventListener('loadedmetadata', handleCanPlay);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Initial check if already cached
    if (video.readyState >= 2) {
      handleCanPlay();
    }

    // Scrubbing Logic
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=400%', 
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (!video.duration || isNaN(video.duration)) return;
          
          const targetTime = startFrame + (endFrame - startFrame) * self.progress;
          
          // Smoothed seek
          gsap.to(video, {
            currentTime: targetTime,
            duration: 0.1,
            ease: 'none',
            overwrite: true
          });

          // Sync progress bar
          const progressEl = document.getElementById('video-progress-bar');
          if (progressEl) {
            gsap.to(progressEl, { scaleX: self.progress, duration: 0.1, ease: 'none' });
          }
        }
      }
    });

    return () => {
      video.removeEventListener('loadedmetadata', handleCanPlay);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      tl.kill();
      if (ScrollTrigger.getById(container.id)) {
        ScrollTrigger.getById(container.id)?.kill();
      }
    };
  }, [videoSrc, startFrame, endFrame]);

  const finalSrc = (typeof window !== 'undefined' && window.innerWidth < 768 && mobileVideoSrc) 
    ? mobileVideoSrc 
    : videoSrc;

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050505]">
      {/* Background/Poster Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            opacity: isLoaded ? 0.2 : 1,
            filter: 'grayscale(100%) brightness(0.3)'
          }}
        />
      )}

      {/* Main Video Element - Muted, playsinline are essential for iOS and scrub perf */}
      <video
        ref={videoRef}
        src={finalSrc}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-0 z-10"
        style={{ pointerEvents: 'none' }}
      />

      {/* Loading State Overlay */}
      {!isLoaded && !loadError && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="w-8 h-8 border-[1px] border-white/10 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-white/40 text-[9px] uppercase tracking-[0.4em] font-medium">Initializing Stream</p>
        </div>
      )}

      {/* Error State Overlay */}
      {loadError && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 p-10 text-center">
          <p className="text-accent text-[10px] uppercase tracking-[0.5em] mb-4">Sequence Fault</p>
          <p className="text-white/30 text-xs font-light max-w-xs">{loadError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-6 py-2 border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-white/50 hover:bg-white hover:text-black transition-all"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Overlay Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        {children}
      </div>
      
      {/* Progress UI */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 w-full max-w-xs px-10">
        <div className="w-full bg-white/5 h-[1px] relative overflow-hidden">
          <div id="video-progress-bar" className="absolute inset-y-0 left-0 w-full bg-white/30 origin-left scale-x-0" />
        </div>
        <span className="text-[8px] uppercase tracking-[0.4em] text-white/20">Temporal Scrub</span>
      </div>
    </div>
  );
};

export default ScrollVideoSection;