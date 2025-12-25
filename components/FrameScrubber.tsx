
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FrameScrubber: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 147; // Example number of frames
  
  // Generating placeholder image sequence URLs
  // In a real app, these would be high-quality exported frames
  const currentFrame = (index: number) => (
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_447d_bb6e_6943924c6752/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = 1158;
    canvas.height = 770;

    const img = new Image();
    img.src = currentFrame(1);
    
    const airpods = { frame: 0 };

    const images: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const image = new Image();
      image.src = currentFrame(i + 1);
      images.push(image);
    }

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const activeImage = images[airpods.frame];
      if (activeImage && activeImage.complete) {
        context.drawImage(activeImage, 0, 0);
      }
    };

    img.onload = render;

    // Scrubbing animation
    gsap.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: canvas.parentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
      onUpdate: render,
    });

    // Text Reveal Animations
    gsap.to("#scrub-title-1", {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: canvas.parentElement,
        start: "20% center",
        end: "40% center",
        scrub: true,
      }
    });

    gsap.to("#scrub-title-1", {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: canvas.parentElement,
        start: "45% center",
        end: "55% center",
        scrub: true,
      }
    });

    gsap.to("#scrub-title-2", {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: canvas.parentElement,
        start: "60% center",
        end: "80% center",
        scrub: true,
      }
    });

  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="max-w-full max-h-screen object-contain pointer-events-none"
    />
  );
};

export default FrameScrubber;
