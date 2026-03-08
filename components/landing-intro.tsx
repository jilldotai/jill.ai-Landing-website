'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';

type LandingIntroProps = {
  visible: boolean;
  onFinish: () => void;
};

type IntroPhase = 'idle' | 'travel' | 'done';

type TargetMetrics = {
  x: number;
  y: number;
  scale: number;
};

const INTRO_WIDTH = 560;

function readTargetMetrics(): TargetMetrics {
  if (typeof window === 'undefined') {
    return { x: 0, y: 0, scale: 0.32 };
  }

  const anchor = document.querySelector('[data-brand-anchor="true"]') as HTMLElement | null;

  if (!anchor) {
    return { x: -window.innerWidth * 0.26, y: -window.innerHeight * 0.32, scale: 0.28 };
  }

  const rect = anchor.getBoundingClientRect();
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const targetCenterX = rect.left + rect.width / 2;
  const targetCenterY = rect.top + rect.height / 2;

  return {
    x: targetCenterX - centerX,
    y: targetCenterY - centerY,
    scale: Math.min(0.42, rect.width / INTRO_WIDTH),
  };
}

export function LandingIntro({ visible, onFinish }: LandingIntroProps) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<IntroPhase>('idle');
  const [target, setTarget] = useState<TargetMetrics>({ x: 0, y: 0, scale: 0.32 });

  useEffect(() => {
    if (!visible) {
      return;
    }

    const measure = () => setTarget(readTargetMetrics());

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    measure();
    window.addEventListener('resize', measure);

    const travelTimeout = window.setTimeout(() => {
      setPhase('travel');
    }, reduceMotion ? 120 : 950);

    const finishTimeout = window.setTimeout(
      () => {
        setPhase('done');
        document.body.style.overflow = originalOverflow;
        onFinish();
      },
      reduceMotion ? 300 : 1700,
    );

    return () => {
      window.clearTimeout(travelTimeout);
      window.clearTimeout(finishTimeout);
      window.removeEventListener('resize', measure);
      document.body.style.overflow = originalOverflow;
    };
  }, [onFinish, reduceMotion, visible]);

  const motionTarget = useMemo(() => {
    if (phase !== 'travel') {
      return {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
      };
    }

    return {
      x: target.x,
      y: target.y,
      scale: target.scale,
      opacity: 0.9,
      filter: 'blur(0px)',
    };
  }, [phase, target]);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="fixed inset-0 z-[120] overflow-hidden bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.08),transparent_16%),linear-gradient(180deg,#040405_0%,#070708_100%)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.18 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <m.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(213,197,255,0.14),transparent_28%),radial-gradient(circle_at_50%_65%,rgba(246,168,216,0.12),transparent_30%)]"
            animate={phase === 'travel' ? { opacity: 0.2 } : { opacity: 1 }}
            transition={{ duration: 0.45 }}
          />

          <m.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'travel' ? 0.34 : 0 }}
            transition={{ duration: 0.35 }}
          />

          <div className="absolute inset-0 flex items-center justify-center px-6">
            <m.div
              className="relative flex w-full max-w-[560px] flex-col items-center text-center"
              initial={{ x: '-28vw', opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
              animate={motionTarget}
              transition={{
                duration: phase === 'travel' ? 0.82 : 0.72,
                ease: [0.18, 1, 0.28, 1],
              }}
            >
              <m.div
                className="pointer-events-none absolute inset-x-[8%] top-8 h-32 rounded-full aurora-orb opacity-55"
                animate={phase === 'travel' ? { opacity: 0.18, scale: 0.82 } : { opacity: 0.58, scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10 flex flex-col items-center">
                <m.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.5 }}
                >
                  <Image
                    src="/assets/icons/logo-iridescent.svg"
                    alt="Jill.ai logo"
                    width={122}
                    height={122}
                    className="h-24 w-24 md:h-[7.5rem] md:w-[7.5rem]"
                  />
                </m.div>

                <m.p
                  className="mt-8 text-[0.64rem] uppercase tracking-[0.46em] text-paper/42"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.18, duration: 0.35 }}
                >
                  Intelligence with integrity
                </m.p>

                <div className="overflow-hidden">
                  <m.h1
                    className="mt-4 text-5xl font-semibold tracking-[0.18em] text-paper md:text-7xl"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.08, duration: 0.78, ease: [0.18, 1, 0.28, 1] }}
                  >
                    JILL.AI
                  </m.h1>
                </div>

                <m.div
                  className="mt-6 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent)]"
                  initial={{ scaleX: 0.2, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.28, duration: 0.45 }}
                />

                <m.p
                  className="mt-6 max-w-2xl text-sm uppercase tracking-[0.34em] text-paper/50 md:text-[0.78rem]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.45 }}
                >
                  Privacy-first infrastructure for a safer digital childhood
                </m.p>
              </div>
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
